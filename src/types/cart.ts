import type { BrandSummary } from "./brand";
import type { ImageAsset, Money } from "./common";

export type CartLine = {
  /** variantId is the line key: one line per variant. */
  variantId: string;
  productId: string;
  productSlug: string;
  name: string;
  size: string;
  brand: BrandSummary;
  image: ImageAsset;
  unitPrice: Money;
  quantity: number;
  maxQuantity: number;
};

/** Basket lines grouped by brand, with a subtotal per seller (SOW §3.5). */
export type CartSellerGroup = {
  brand: BrandSummary;
  lines: CartLine[];
  subtotal: Money;
};
