/**
 * Session cookie names and helpers shared by server code and proxy.ts.
 * Nothing here may import next/headers, so the proxy can use it too.
 */
export const SESSION_COOKIE = "aariy_session";
/** Long-lived token used only to get a new access token (the access token lasts ~15 minutes). */
export const REFRESH_COOKIE = "aariy_refresh";
/** The signed-in buyer's name and email, saved at sign-in for the header and profile. */
export const CUSTOMER_COOKIE = "aariy_customer";

const THIRTY_DAYS = 60 * 60 * 24 * 30;

export function cookieOptions(expiresAt?: string) {
  const until = expiresAt ? Math.floor((Date.parse(expiresAt) - Date.now()) / 1000) : NaN;
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: Number.isFinite(until) && until > 0 ? until : THIRTY_DAYS,
  };
}

/** Seconds-since-epoch expiry of a JWT, or undefined if it isn't a readable JWT. Not a signature check. */
export function jwtExpiry(token: string): number | undefined {
  try {
    const payload = token.split(".")[1];
    if (!payload) return undefined;
    const json = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    return typeof json.exp === "number" ? json.exp : undefined;
  } catch {
    return undefined;
  }
}
