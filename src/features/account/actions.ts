"use server";

import { z } from "zod";
import { toFieldErrors } from "@/lib/validation";
import { requestReturn } from "@/services";
import type { ActionResult } from "@/types";

const returnSchema = z.object({
  orderNumber: z.string().min(1),
  variantIds: z.array(z.string()).min(1, "Choose at least one item"),
  reason: z.enum(
    ["wrong_size", "damaged", "not_as_described", "changed_mind", "other"],
    "Choose a reason",
  ),
  notes: z.string().trim().max(1000).optional(),
});

export type ReturnState = ActionResult<{ ticketId: string }> | null;

export async function requestReturnAction(
  _prev: ReturnState,
  formData: FormData,
): Promise<ReturnState> {
  const parsed = returnSchema.safeParse({
    orderNumber: formData.get("orderNumber"),
    variantIds: formData.getAll("variantIds"),
    reason: formData.get("reason"),
    notes: formData.get("notes") || undefined,
  });
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please check the form.",
      fieldErrors: toFieldErrors(parsed.error),
    };
  }
  const { orderNumber, ...input } = parsed.data;
  try {
    const result = await requestReturn(orderNumber, input);
    return { ok: true, data: result };
  } catch {
    return {
      ok: false,
      error: "We couldn't submit your request. Please try again.",
    };
  }
}
