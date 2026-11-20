import { cookies } from "next/headers";
import type { Customer } from "@/types";
import { CUSTOMER_COOKIE, REFRESH_COOKIE, SESSION_COOKIE, cookieOptions } from "./session-cookies";

/**
 * Buyer session cookies. The API issues an access token (short-lived) and a
 * refresh token after OTP verification; both are stored httpOnly, and
 * proxy.ts swaps in a new access token before the old one expires.
 * Reading cookies makes a component request-time, so callers must sit
 * inside <Suspense>.
 */
export { SESSION_COOKIE, REFRESH_COOKIE, CUSTOMER_COOKIE };

export type Session = {
  token: string;
  refreshToken?: string;
  /** When the whole session ends (ISO); cookies expire then. */
  expiresAt?: string;
  customer: Customer;
};

export async function getSessionToken(): Promise<string | undefined> {
  return (await cookies()).get(SESSION_COOKIE)?.value;
}

export async function setSession({ token, refreshToken, expiresAt, customer }: Session) {
  const jar = await cookies();
  const options = cookieOptions(expiresAt);
  jar.set(SESSION_COOKIE, token, options);
  if (refreshToken) jar.set(REFRESH_COOKIE, refreshToken, options);
  else jar.delete(REFRESH_COOKIE);
  jar.set(CUSTOMER_COOKIE, JSON.stringify(customer), options);
}

export async function getSessionCustomer(): Promise<Customer | null> {
  const raw = (await cookies()).get(CUSTOMER_COOKIE)?.value;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<Customer>;
    return parsed.email
      ? { id: parsed.id ?? "", name: parsed.name ?? "", email: parsed.email, phone: parsed.phone }
      : null;
  } catch {
    return null;
  }
}

export async function clearSessionToken() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
  jar.delete(REFRESH_COOKIE);
  jar.delete(CUSTOMER_COOKIE);
}
