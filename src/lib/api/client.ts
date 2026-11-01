import { env } from "@/config/env";

/**
 * Thin fetch wrapper for the NestJS API (/v1/*).
 * When the OpenAPI spec is published (SOW §6.2), replace the hand-written
 * calls in src/services with the generated typed client; this file keeps
 * the base URL, headers and error handling in one place.
 */

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public body?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type Query = Record<string, string | number | boolean | string[] | undefined>;

type RequestOptions = Omit<RequestInit, "body"> & {
  query?: Query;
  body?: unknown;
  /** Sent as Idempotency-Key on writes so a retried request is not duplicated (SOW §6.7). */
  idempotencyKey?: string;
  token?: string;
};

function buildUrl(path: string, query?: Query): string {
  const url = new URL(`${env.apiBaseUrl}${path}`);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === "") continue;
      url.searchParams.set(key, Array.isArray(value) ? value.join(",") : String(value));
    }
  }
  return url.toString();
}

async function request<T>(path: string, { query, body, idempotencyKey, token, headers, ...init }: RequestOptions = {}): Promise<T> {
  const res = await fetch(buildUrl(path, query), {
    ...init,
    headers: {
      Accept: "application/json",
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (res.status === 404) throw new ApiError(404, "Not found");
  if (!res.ok) {
    const errorBody = await res.json().catch(() => undefined);
    throw new ApiError(res.status, `API ${res.status} on ${path}`, errorBody);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export const apiClient = {
  get: <T>(path: string, options?: RequestOptions) => request<T>(path, { ...options, method: "GET" }),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "POST", body }),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "PATCH", body }),
  delete: <T>(path: string, options?: RequestOptions) => request<T>(path, { ...options, method: "DELETE" }),
};

export function isNotFound(error: unknown): boolean {
  return error instanceof ApiError && error.status === 404;
}
