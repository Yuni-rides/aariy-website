"use server";

import { z } from "zod";
import { formValues, toFieldErrors } from "@/lib/validation";
import { createSupportTicket } from "@/services";
import type { ActionResult } from "@/types";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name"),
  email: z.email("Enter a valid email"),
  phone: z.string().trim().optional(),
  orderNumber: z.string().trim().optional(),
  message: z.string().trim().min(10, "Tell us a little more (at least 10 characters)").max(2000),
});

export type ContactState = ActionResult<{ ticketId: string }> | null;

export async function contactAction(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const parsed = contactSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please check the highlighted fields.",
      fieldErrors: toFieldErrors(parsed.error),
      values: formValues(formData),
    };
  }
  try {
    return { ok: true, data: await createSupportTicket(parsed.data) };
  } catch {
    return { ok: false, error: "We couldn't send your message. Please try again.", values: formValues(formData) };
  }
}
