"use server";

import { z } from "zod";
import { mailEnv } from "@/config/env";
import { sendFormMail } from "@/lib/mail";
import { optionalPhoneSchema, phoneFromForm } from "@/lib/phone";
import { formValues, toFieldErrors } from "@/lib/validation";
import { createSupportTicket } from "@/services";
import type { ActionResult } from "@/types";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name"),
  email: z.email("Enter a valid email"),
  phone: optionalPhoneSchema,
  orderNumber: z.string().trim().optional(),
  message: z.string().trim().min(10, "Tell us a little more (at least 10 characters)").max(2000),
});

export type ContactState = ActionResult<{ ticketId: string }> | null;

export async function contactAction(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const parsed = contactSchema.safeParse({ ...Object.fromEntries(formData), phone: phoneFromForm(formData) });
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please check the highlighted fields.",
      fieldErrors: toFieldErrors(parsed.error),
      values: formValues(formData),
    };
  }
  const { name, email, phone, orderNumber, message } = parsed.data;
  try {
    const { ticketId } = await createSupportTicket(parsed.data);
    await sendFormMail({
      to: mailEnv.contactTo,
      fromName: "Aariy Support",
      subject: `Contact message - ${name}${orderNumber ? ` - ${orderNumber}` : ""}`,
      heading: "New contact message",
      subheading: "Submitted through the Contact us form on the Aariy website.",
      replyTo: email,
      rows: [
        { label: "Ticket number", value: ticketId },
        { label: "Name", value: name },
        { label: "Email", value: email },
        ...(phone ? [{ label: "Phone", value: phone }] : []),
        ...(orderNumber ? [{ label: "Order number", value: orderNumber }] : []),
        { label: "Message", value: message },
      ],
    });
    return { ok: true, data: { ticketId } };
  } catch (error) {
    console.error("[support] contact message failed:", error);
    return { ok: false, error: "We couldn't send your message. Please try again.", values: formValues(formData) };
  }
}
