import { cookies } from "next/headers";

/**
 * Buyer session cookie. The API issues a token after OTP verification
 * (SOW §3.7); the storefront stores it httpOnly and forwards it as a
 * Bearer token. Reading cookies makes a component request-time, so
 * callers must sit inside <Suspense>.
 */
export const SESSION_COOKIE = "aariy_session";

export async function getSessionToken(): Promise<string | undefined> {
  return (await cookies()).get(SESSION_COOKIE)?.value;
}

export async function setSessionToken(token: string) {
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearSessionToken() {
  (await cookies()).delete(SESSION_COOKIE);
}
