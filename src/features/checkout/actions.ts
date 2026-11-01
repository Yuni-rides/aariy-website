"use server";

import { formValues, toFieldErrors } from "@/lib/validation";
import { placeOrder } from "@/services";
import type { ActionResult } from "@/types";
import { checkoutSchema } from "./lib/schema";

export type PlaceOrderState = ActionResult<{ orderNumber: string; paymentRedirectUrl: string | null }> | null;

/**
 * Validates on the server (never trust the client), then calls the
 * checkout service. Prices are not sent: the API prices the basket.
 */
export async function placeOrderAction(_prev: PlaceOrderState, formData: FormData): Promise<PlaceOrderState> {
  let lines: unknown = [];
  try {
    lines = JSON.parse(String(formData.get("lines") ?? "[]"));
  } catch {
    return { ok: false, error: "Your basket could not be read. Please refresh and try again." };
  }

  const parsed = checkoutSchema.safeParse({ ...Object.fromEntries(formData), lines });
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please check the highlighted fields.",
      fieldErrors: toFieldErrors(parsed.error),
      values: formValues(formData),
    };
  }

  const { lines: orderLines, paymentMethod, email, ...address } = parsed.data;
  const idempotencyKey = String(formData.get("idempotencyKey") ?? crypto.randomUUID());

  try {
    const result = await placeOrder({ lines: orderLines, paymentMethod, email: email || undefined, address }, idempotencyKey);
    return { ok: true, data: result };
  } catch {
    return { ok: false, error: "We couldn't place your order. Please try again.", values: formValues(formData) };
  }
}
