"use server";

import { z } from "zod";
import { mailEnv } from "@/config/env";
import { sendFormMail } from "@/lib/mail";
import { phoneFromForm, phoneSchema } from "@/lib/phone";
import { formValues, toFieldErrors } from "@/lib/validation";
import { createSellerApplication } from "@/services";
import type { ActionResult } from "@/types";

const sellerSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(100),
  businessName: z.string().trim().min(2, "Enter your business name").max(120),
  email: z.email("Enter a valid email"),
  phone: phoneSchema,
});

export type SellerState = ActionResult<{ applicationId: string }> | null;

export async function sellerRegisterAction(_prev: SellerState, formData: FormData): Promise<SellerState> {
  const parsed = sellerSchema.safeParse({ ...Object.fromEntries(formData), phone: phoneFromForm(formData) });
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please check the highlighted fields.",
      fieldErrors: toFieldErrors(parsed.error),
      values: formValues(formData),
    };
  }
  const { fullName, businessName, email, phone } = parsed.data;
  try {
    const { applicationId } = await createSellerApplication(parsed.data);
    await sendFormMail({
      to: mailEnv.sellerTo,
      fromName: "Aariy Sellers",
      subject: `Seller application - ${businessName} - ${fullName}`,
      heading: "New seller application",
      subheading: "Submitted through the Become a seller form on the Aariy website.",
      replyTo: email,
      rows: [
        { label: "Application number", value: applicationId },
        { label: "Full name", value: fullName },
        { label: "Name of business", value: businessName },
        { label: "Email address", value: email },
        { label: "Phone number", value: phone },
      ],
    });
    return { ok: true, data: { applicationId } };
  } catch (error) {
    console.error("[sellers] application failed:", error);
    return { ok: false, error: "We couldn't send your details. Please try again.", values: formValues(formData) };
  }
}
