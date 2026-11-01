/**
 * Single place that reads environment variables.
 * Everything else imports from here, never from process.env directly.
 */
export const env = {
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  dataSource: (process.env.NEXT_PUBLIC_DATA_SOURCE ?? "mock") as "mock" | "api",
  apiBaseUrl: (process.env.API_BASE_URL ?? "http://localhost:4000").replace(/\/$/, ""),
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
} as const;

export const useMocks = env.dataSource === "mock";
