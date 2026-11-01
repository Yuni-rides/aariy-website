import type { ImageAsset } from "./common";
import type { ProductSummary } from "./product";

export type BrandSummary = {
  id: string;
  slug: string;
  name: string;
  logo?: ImageAsset;
  verified: boolean;
};

export type Brand = BrandSummary & {
  tagline: string;
  story: string;
  /** Wide image behind the home hero and brand page header. */
  banner?: ImageAsset;
  /** Portrait image for "Trending stores" cards. */
  cover?: ImageAsset;
  /** Brand wordmark shown large on the home hero (falls back to the name). */
  wordmark?: ImageAsset;
  city: string;
  productCount: number;
  rating?: { average: number; count: number };
};

/** A brand with a few of its products, for hero slides and store cards. */
export type BrandShowcase = {
  brand: Brand;
  products: ProductSummary[];
};
