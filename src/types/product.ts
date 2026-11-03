import type { BrandSummary } from "./brand";
import type { ImageAsset, Money } from "./common";

export type ProductVariant = {
  id: string;
  sku: string;
  size: string;
  color?: string;
  /** Units available to sell. 0 = out of stock. */
  stock: number;
};

export type SizeChart = {
  unit: "in" | "cm";
  /** e.g. ["Size", "Chest", "Length", "Shoulder"] */
  columns: string[];
  rows: string[][];
};

/** Dispatch promise shown on the product page (SOW §3.3). */
export type DispatchPromise = {
  minDays: number;
  maxDays: number;
};

/** Who a product is for; drives the Men / Women / Kids tabs on the home page. */
export type Audience = "women" | "men" | "kids";

export type ProductRating = { average: number; count: number };

/** Lightweight shape used in grids and cards. */
export type ProductSummary = {
  id: string;
  slug: string;
  name: string;
  brand: BrandSummary;
  price: Money;
  compareAtPrice?: Money;
  image: ImageAsset;
  hoverImage?: ImageAsset;
  isNew: boolean;
  inStock: boolean;
  audience: Audience;
  rating?: ProductRating;
  /** Facets for the home "Trending products" filter chips. */
  category: string;
  fabric: string;
  color: string;
  occasion: string;
  /** Sizes currently in stock. */
  sizes: string[];
};

export type Product = Omit<ProductSummary, "image" | "hoverImage" | "sizes"> & {
  sellerId: string;
  description: string;
  images: ImageAsset[];
  categorySlugs: string[];
  variants: ProductVariant[];
  sizeChart?: SizeChart;
  material: string;
  care: string[];
  dispatch: DispatchPromise;
  createdAt: string;
};

export type SortOption = "newest" | "price-asc" | "price-desc";

export type ProductFilters = {
  collection?: string;
  brand?: string;
  q?: string;
  sizes?: string[];
  minPrice?: number;
  maxPrice?: number;
  sort?: SortOption;
  page?: number;
  pageSize?: number;
};

export type FacetOption = { value: string; label: string; count: number };

export type ProductFacets = {
  sizes: FacetOption[];
  price: { min: number; max: number };
};
