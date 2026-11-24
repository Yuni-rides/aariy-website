import { useMockAuth } from "@/config/env";
import { ApiError, apiClient, endpoints } from "@/lib/api";
import { getSessionCustomer, getSessionToken, type Session } from "@/lib/session";
import { mockCustomer } from "@/mocks/orders";
import type { Customer } from "@/types";

/**
 * Buyer sign-in by a one-time code sent to their email. The same flow signs
 * in returning buyers and registers new ones. Not cached: per-user.
 * Mock mode sends nothing; the code is always 123456.
 *
 * Every API reply is wrapped as { status, code, message, data }.
 */
type Envelope<T> = { status: boolean; code: string; message: string; data: T };

type ApiUser = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  fullName: string;
  phone: string | null;
};

type OtpRequestData = { sentTo: string; expiresInSeconds: number; resendAfterSeconds: number };

type OtpVerifyData = {
  accessToken: string;
  refreshToken: string;
  sessionExpiresAt: string;
  isNewAccount: boolean;
  user: ApiUser;
};

function toCustomer(user: ApiUser): Customer {
  const name =
    user.fullName?.trim() || [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email.split("@")[0];
  return { id: user.id, name, email: user.email, phone: user.phone ?? undefined };
}

export async function requestOtp(email: string): Promise<{ expiresInSeconds: number }> {
  if (useMockAuth) return { expiresInSeconds: 60 };
  const { data } = await apiClient.post<Envelope<OtpRequestData>>(endpoints.auth.requestOtp, { email });
  return { expiresInSeconds: data.expiresInSeconds };
}

export async function verifyOtp(email: string, code: string): Promise<Session> {
  if (useMockAuth) {
    if (code !== "123456") throw new Error("Invalid code");
    return { token: "mock-session-token", customer: { ...mockCustomer, email } };
  }
  const { data } = await apiClient.post<Envelope<OtpVerifyData>>(endpoints.auth.verifyOtp, { email, code });
  return {
    token: data.accessToken,
    refreshToken: data.refreshToken,
    expiresAt: data.sessionExpiresAt,
    customer: toCustomer(data.user),
  };
}

/**
 * The signed-in buyer. By default read from the cookie saved at sign-in
 * (fast, used by the header). `fresh: true` asks GET /store/me, for pages
 * that show the full profile; falls back to the cookie if the call fails.
 */
export async function getCurrentCustomer({ fresh = false } = {}): Promise<Customer | null> {
  const token = await getSessionToken();
  if (!token) return null;
  const saved = await getSessionCustomer();
  if (useMockAuth) return saved ?? mockCustomer;
  if (fresh || !saved) {
    try {
      const { data } = await apiClient.get<Envelope<ApiUser>>(endpoints.auth.me, { token });
      return toCustomer(data);
    } catch (error) {
      // A rejected token means the session is over; anything else (API down) keeps the saved profile.
      return error instanceof ApiError && error.status === 401 ? null : saved;
    }
  }
  return saved;
}
