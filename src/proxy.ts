import { NextResponse, type NextRequest } from "next/server";
import { env } from "@/config/env";
import { endpoints } from "@/lib/api/endpoints";
import {
  CUSTOMER_COOKIE,
  REFRESH_COOKIE,
  SESSION_COOKIE,
  cookieOptions,
  jwtExpiry,
} from "@/lib/session-cookies";

/** Refresh this many seconds before the access token runs out. */
const EARLY_SECONDS = 60;

type RefreshData = { accessToken?: string; refreshToken?: string; sessionExpiresAt?: string };

/**
 * The API's access token lasts ~15 minutes. Before a page renders, swap an
 * expiring one for a new token using the refresh cookie, so the buyer stays
 * signed in for the whole session (~30 days). If the refresh is rejected the
 * session has ended, so the cookies are cleared.
 */
export async function proxy(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_COOKIE)?.value;
  if (!refreshToken) return NextResponse.next();

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const exp = token ? jwtExpiry(token) : undefined;
  if (token && exp && exp - Date.now() / 1000 > EARLY_SECONDS) return NextResponse.next();

  let data: RefreshData | undefined;
  let rejected = false;
  try {
    const res = await fetch(`${env.apiBaseUrl}${endpoints.auth.refresh}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    });
    if (res.ok) data = ((await res.json()) as { data?: RefreshData }).data;
    else rejected = res.status === 400 || res.status === 401 || res.status === 403;
  } catch {
    // API unreachable: leave the session alone and try again on the next request.
  }

  if (data?.accessToken) {
    // Update the request too, so this very render already sees the new token.
    request.cookies.set(SESSION_COOKIE, data.accessToken);
    const response = NextResponse.next({ request: { headers: request.headers } });
    const options = cookieOptions(data.sessionExpiresAt);
    response.cookies.set(SESSION_COOKIE, data.accessToken, options);
    if (data.refreshToken) response.cookies.set(REFRESH_COOKIE, data.refreshToken, options);
    return response;
  }

  if (rejected) {
    request.cookies.delete(SESSION_COOKIE);
    const response = NextResponse.next({ request: { headers: request.headers } });
    for (const name of [SESSION_COOKIE, REFRESH_COOKIE, CUSTOMER_COOKIE]) response.cookies.delete(name);
    return response;
  }
  return NextResponse.next();
}

export const config = {
  // Pages only (not static files or images), and only for signed-in buyers.
  matcher: [
    {
      source: "/((?!_next/static|_next/image|images/|favicon.ico|.*\\.(?:webp|png|jpg|jpeg|svg|ico)$).*)",
      has: [{ type: "cookie", key: "aariy_refresh" }],
    },
  ],
};
