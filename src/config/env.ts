
export const env = {
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  dataSource: (process.env.NEXT_PUBLIC_DATA_SOURCE ?? "mock") as "mock" | "api",
  apiBaseUrl: (process.env.API_BASE_URL ?? "http://localhost:4000").replace(/\/$/, ""),
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
} as const;


export const mailEnv = {
  host: process.env.SMTP_HOST ?? "",
  port: Number(process.env.SMTP_PORT || 587),
  user: process.env.SMTP_USER ?? "",
  pass: process.env.SMTP_PASS ?? "",
  /** Each form has its own inbox, falling back to the shared one (BOOKING_TO_EMAIL is the old name). */
  sellerTo: process.env.SELLER_TO_EMAIL || process.env.MAIL_TO_EMAIL || process.env.BOOKING_TO_EMAIL || "",
  contactTo: process.env.CONTACT_TO_EMAIL || process.env.MAIL_TO_EMAIL || process.env.BOOKING_TO_EMAIL || "",
} as const;

export const useMocks = env.dataSource === "mock";
