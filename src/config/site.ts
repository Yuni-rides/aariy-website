import { env } from "./env";

export const siteConfig = {
  name: "Aariy",
  legalName: "Aariy Marketplace",
  tagline: "Verified South Asian fashion brands, one basket.",
  description:
    "Shop women's ready-to-wear from verified Pakistani fashion brands. Multi-brand basket, cash on delivery and card payments, delivered across Pakistan.",
  url: env.siteUrl,
  locale: "en_PK",
  market: {
    country: "PK",
    currency: "PKR",
    language: "en",
  },
  contact: {
    email: "support@aariy.com",
    phone: "+92 300 0000000",
  },
  social: {
    instagram: "https://instagram.com/aariy",
    facebook: "https://facebook.com/aariy",
    tiktok: "https://tiktok.com/@aariy",
  },
  /** Free-shipping threshold in minor units (paisa). Replace with market config from API. */
  freeShippingThreshold: 500000,
  /** Basket reservation window at checkout, in minutes (SOW §3.6). */
  reservationMinutes: 15,
} as const;

export type SiteConfig = typeof siteConfig;
