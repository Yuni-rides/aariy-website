import { env } from "./env";

export const siteConfig = {
  name: "Aariee",
  legalName: "Aariee Marketplace",
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
    email: "info@aariee.com",
    phone: "+92 300 0000000",
  },
  social: {
    instagram: "https://instagram.com/aariy",
    facebook: "https://www.facebook.com/Aarieofficial/",
    tiktok: "https://www.tiktok.com/@aariy71?lang=en",
  },
  freeShippingThreshold: 500000,
  reservationMinutes: 15,
} as const;

export type SiteConfig = typeof siteConfig;
