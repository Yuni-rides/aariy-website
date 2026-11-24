"use server";

import { z } from "zod";
import { mailEnv } from "@/config/env";
import { sendFormMail } from "@/lib/mail";
import { phoneFromForm, phoneSchema } from "@/lib/phone";
import { formValues, toFieldErrors } from "@/lib/validation";
import { apiErrorMessage, registerSeller, requestSellerOtp } from "@/services";
import type { ActionResult } from "@/types";

const emailSchema = z
  .email("Enter a valid email address")
  .transform((v) => v.trim().toLowerCase());

export type SellerOtpResult =
  | { ok: true; sentTo: string; expiresInSeconds: number; resendAfterSeconds: number }
  | { ok: false; error: string };

/** Step 1: email the brand a 6-digit code. Called from the "Send code" button. */
export async function requestSellerOtpAction(rawEmail: string): Promise<SellerOtpResult> {
  const email = emailSchema.safeParse(String(rawEmail ?? "").trim());
  if (!email.success) return { ok: false, error: email.error.issues[0].message };
  try {
    return { ok: true, ...(await requestSellerOtp(email.data)) };
  } catch (error) {
    console.error("[sellers] OTP request failed:", error);
    return { ok: false, error: apiErrorMessage(error) ?? "We couldn't send a code right now. Please try again." };
  }
}

const sellerSchema = z
  .object({
    fullName: z.string().trim().min(2, "Enter your full name").max(100),
    businessName: z.string().trim().min(2, "Enter your business name").max(120),
    email: emailSchema,
    code: z.string().trim().regex(/^\d{6}$/, "Enter the 6-digit code from your email"),
    phone: phoneSchema,
    password: z
      .string()
      .min(8, "Use at least 8 characters")
      .max(72, "Use 72 characters or fewer")
      .regex(/[A-Za-z]/, "Include at least one letter")
      .regex(/\d/, "Include at least one number"),
    confirmPassword: z.string().min(1, "Type your password again"),
    acceptTerms: z.literal("on", { error: "Please accept the terms to continue" }),
  });

export type SellerState = ActionResult<{ email: string; message: string }> | null;

/** Never echo either password field back to the browser. */
function safeValues(formData: FormData) {
  const values = formValues(formData);
  delete values.password;
  delete values.confirmPassword;
  return values;
}

/** Step 2: create the seller account with the verified email. */
export async function sellerRegisterAction(_prev: SellerState, formData: FormData): Promise<SellerState> {
  const parsed = sellerSchema.safeParse({ ...Object.fromEntries(formData), phone: phoneFromForm(formData) });
  // Checked by hand so the mismatch shows together with any other field errors.
  const confirm = String(formData.get("confirmPassword") ?? "");
  const mismatch = confirm !== "" && confirm !== String(formData.get("password") ?? "");
  if (!parsed.success || mismatch) {
    return {
      ok: false,
      error: "Please check the highlighted fields.",
      fieldErrors: {
        ...(parsed.success ? {} : toFieldErrors(parsed.error)),
        ...(mismatch ? { confirmPassword: "Passwords don't match" } : {}),
      },
      values: safeValues(formData),
    };
  }
  const { fullName, businessName, email, phone, password, code } = parsed.data;

  let message: string;
  try {
    ({ message } = await registerSeller({ fullName, businessName, email, phone, password, code, acceptTerms: true }));
  } catch (error) {
    console.error("[sellers] registration failed:", error);
    return {
      ok: false,
      error: apiErrorMessage(error) ?? "We couldn't create your seller account. Please try again.",
      values: safeValues(formData),
    };
  }

  // Let the team know too. The account already exists, so a mail failure must not fail the sign-up.
  if (mailEnv.host && mailEnv.sellerTo) {
    await sendFormMail({
      to: mailEnv.sellerTo,
      fromName: "Aariee Sellers",
      subject: `New seller - ${businessName} - ${fullName}`,
      heading: "New seller registered",
      subheading: "Signed up through the Become a seller page on the Aariee website.",
      replyTo: email,
      rows: [
        { label: "Full name", value: fullName },
        { label: "Name of business", value: businessName },
        { label: "Email address", value: email },
        { label: "Phone number", value: phone },
      ],
    }).catch((error) => console.error("[sellers] notification mail failed:", error));
  }

  return { ok: true, data: { email, message } };
}
