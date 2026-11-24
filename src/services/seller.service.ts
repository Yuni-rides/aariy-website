import { useMockAuth } from "@/config/env";
import { ApiError, apiClient, endpoints } from "@/lib/api";

/**
 * "Become a seller": the brand verifies its email with a one-time code,
 * then registers. Mock mode sends nothing; the code is always 123456.
 * API replies are wrapped as { status, code, message, data }.
 */
type Envelope<T> = { status: boolean; code: string; message: string; data: T };

export type SellerRegisterInput = {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  password: string;
  code: string;
  acceptTerms: true;
};

export async function requestSellerOtp(
  email: string,
): Promise<{ sentTo: string; expiresInSeconds: number; resendAfterSeconds: number }> {
  if (useMockAuth) return { sentTo: email, expiresInSeconds: 300, resendAfterSeconds: 30 };
  const { data } = await apiClient.post<Envelope<Partial<{ sentTo: string; expiresInSeconds: number; resendAfterSeconds: number }>>>(
    endpoints.sellerAuth.registerOtp,
    { email },
  );
  return {
    sentTo: data?.sentTo ?? email,
    expiresInSeconds: data?.expiresInSeconds ?? 300,
    resendAfterSeconds: data?.resendAfterSeconds ?? 30,
  };
}

export async function registerSeller(input: SellerRegisterInput): Promise<{ message: string }> {
  if (useMockAuth) {
    if (input.code !== "123456") throw new ApiError(400, "Invalid code", { message: "That code is incorrect or has expired." });
    return { message: "Your seller account has been created." };
  }
  const res = await apiClient.post<Envelope<unknown>>(endpoints.sellerAuth.register, input);
  return { message: res.message || "Your seller account has been created." };
}

/** The API's own error message (NestJS may send a string or a list), for showing on the form. */
export function apiErrorMessage(error: unknown): string | undefined {
  if (!(error instanceof ApiError)) return undefined;
  const message = (error.body as { message?: unknown } | undefined)?.message;
  if (typeof message === "string") return message;
  if (Array.isArray(message) && typeof message[0] === "string") return message[0];
  return undefined;
}
