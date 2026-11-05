"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { routes } from "@/config/routes";
import { clearSessionToken, setSessionToken } from "@/lib/session";
import { requestOtp, verifyOtp } from "@/services";

export type OtpState =
  | { step: "email"; email?: string; error?: string }
  | {
      step: "code";
      email: string;
      expiresInSeconds: number;
      error?: string;
      resent?: boolean;
    };

const emailSchema = z
  .email("Enter a valid email address")
  .transform((v) => v.trim().toLowerCase());

function safeNext(value: FormDataEntryValue | null): string {
  const next = typeof value === "string" ? value : "";
  return next.startsWith("/") && !next.startsWith("//")
    ? next
    : routes.account();
}

export async function otpAction(
  prev: OtpState,
  formData: FormData,
): Promise<OtpState> {
  const intent = formData.get("intent");

  if (intent === "change-email") return { step: "email", email: prev.email };

  if (prev.step === "email" || intent === "resend") {
    const raw =
      prev.step === "code"
        ? prev.email
        : String(formData.get("email") ?? "").trim();
    const email = emailSchema.safeParse(raw);
    if (!email.success)
      return {
        step: "email",
        email: raw,
        error: email.error.issues[0].message,
      };
    try {
      const { expiresInSeconds } = await requestOtp(email.data, {
        newsletter: formData.get("newsletter") === "on",
      });
      return {
        step: "code",
        email: email.data,
        expiresInSeconds,
        resent: intent === "resend",
      };
    } catch {
      return {
        step: "email",
        email: raw,
        error: "We couldn't send a code right now. Please try again.",
      };
    }
  }

  const code = z
    .string()
    .regex(/^\d{6}$/)
    .safeParse(String(formData.get("code") ?? "").trim());
  if (!code.success)
    return { ...prev, resent: false, error: "Enter the 6-digit code" };

  try {
    const { token } = await verifyOtp(prev.email, code.data);
    await setSessionToken(token);
  } catch {
    return {
      ...prev,
      resent: false,
      error: "That code is incorrect or has expired.",
    };
  }
  redirect(safeNext(formData.get("next")));
}

export async function signOutAction() {
  await clearSessionToken();
  redirect(routes.home());
}
