import { useMocks } from "@/config/env";
import { apiClient, endpoints } from "@/lib/api";
import { getSessionToken } from "@/lib/session";
import { mockCustomer } from "@/mocks/orders";
import type { Customer } from "@/types";

/** Buyer sign-in by one-time code over SMS (SOW §3.7). Not cached: per-user. */

export async function requestOtp(phone: string): Promise<{ expiresInSeconds: number }> {
  if (useMocks) return { expiresInSeconds: 60 };
  return apiClient.post(endpoints.auth.requestOtp, { phone });
}

export async function verifyOtp(phone: string, code: string): Promise<{ token: string; customer: Customer }> {
  if (useMocks) {
    if (code !== "123456") throw new Error("Invalid code");
    return { token: "mock-session-token", customer: { ...mockCustomer, phone } };
  }
  return apiClient.post(endpoints.auth.verifyOtp, { phone, code });
}

export async function getCurrentCustomer(): Promise<Customer | null> {
  const token = await getSessionToken();
  if (useMocks) return mockCustomer;
  if (!token) return null;
  return apiClient.get<Customer>(endpoints.auth.me, { token }).catch(() => null);
}
