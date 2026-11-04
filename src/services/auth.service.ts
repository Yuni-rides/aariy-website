import { useMocks } from "@/config/env";
import { apiClient, endpoints } from "@/lib/api";
import { getSessionToken } from "@/lib/session";
import { mockCustomer } from "@/mocks/orders";
import type { Customer } from "@/types";

/**
 * Buyer sign-in by a one-time code sent to their email. The same flow signs
 * in returning buyers and registers new ones. Not cached: per-user.
 * Mock mode sends nothing; the code is always 123456.
 */

export async function requestOtp(email: string, options: { newsletter: boolean }): Promise<{ expiresInSeconds: number }> {
  if (useMocks) return { expiresInSeconds: 60 };
  return apiClient.post(endpoints.auth.requestOtp, { email, newsletter: options.newsletter });
}

export async function verifyOtp(email: string, code: string): Promise<{ token: string; customer: Customer }> {
  if (useMocks) {
    if (code !== "123456") throw new Error("Invalid code");
    return { token: "mock-session-token", customer: { ...mockCustomer, email } };
  }
  return apiClient.post(endpoints.auth.verifyOtp, { email, code });
}

export async function getCurrentCustomer(): Promise<Customer | null> {
  const token = await getSessionToken();
  if (!token) return null;
  if (useMocks) return mockCustomer;
  return apiClient.get<Customer>(endpoints.auth.me, { token }).catch(() => null);
}
