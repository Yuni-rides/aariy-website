"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { routes } from "@/config/routes";
import { clearSessionToken, setSessionToken } from "@/lib/session";
import { pkPhone } from "@/lib/validation";
import { requestOtp, verifyOtp } from "@/services";

export type OtpState =
  | { step: "phone"; error?: string }
  | { step: "code"; phone: string; expiresInSeconds: number; error?: string };

/** Only allow same-site relative redirects after sign-in. */
function safeNext(value: FormDataEntryValue | null): string {
  const next = typeof value === "string" ? value : "";
  return next.startsWith("/") && !next.startsWith("//") ? next : routes.account();
}

export async function otpAction(prev: OtpState, formData: FormData): Promise<OtpState> {
  const intent = formData.get("intent");

  if (intent === "change-number") return { step: "phone" };

  if (prev.step === "phone" || intent === "resend") {
    const phone = pkPhone.safeParse(prev.step === "code" ? prev.phone : formData.get("phone"));
    if (!phone.success) return { step: "phone", error: phone.error.issues[0].message };
    try {
      const { expiresInSeconds } = await requestOtp(phone.data);
      return { step: "code", phone: phone.data, expiresInSeconds };
    } catch {
      return { step: "phone", error: "We couldn't send a code right now. Please try again." };
    }
  }

  const code = z.string().regex(/^\d{6}$/).safeParse(formData.get("code"));
  if (!code.success) return { ...prev, error: "Enter the 6-digit code" };

  try {
    const { token } = await verifyOtp(prev.phone, code.data);
    await setSessionToken(token);
  } catch {
    return { ...prev, error: "That code is incorrect or has expired." };
  }
  redirect(safeNext(formData.get("next")));
}

export async function signOutAction() {
  await clearSessionToken();
  redirect(routes.home());
}
