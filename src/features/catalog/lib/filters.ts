import type { ProductFilters, SortOption } from "@/types";
import { toArray, toNumber } from "@/lib/utils";

export type SearchParams = Record<string, string | string[] | undefined>;

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

/** Price buckets in PKR (major units). Stored in the URL as "min-max". */
export const PRICE_RANGES = [
  { value: "0-5000", label: "Under PKR 5,000" },
  { value: "5000-10000", label: "PKR 5,000 – 10,000" },
  { value: "10000-20000", label: "PKR 10,000 – 20,000" },
  { value: "20000-", label: "Over PKR 20,000" },
];

export const PAGE_SIZE = 12;

/** URL params that narrow a listing. Any of these makes the page noindex (SOW §3.11). */
const FILTER_KEYS = ["size", "price", "sort"] as const;

export function parseFilters(params: SearchParams): ProductFilters {
  const sort = (Array.isArray(params.sort) ? params.sort[0] : params.sort) as SortOption | undefined;
  const price = Array.isArray(params.price) ? params.price[0] : params.price;
  const [min, max] = (price ?? "").split("-");
  return {
    sizes: toArray(params.size),
    minPrice: min ? Number(min) * 100 : undefined,
    maxPrice: max ? Number(max) * 100 : undefined,
    sort: SORT_OPTIONS.some((o) => o.value === sort) ? sort : "newest",
    page: toNumber(params.page) ?? 1,
    pageSize: PAGE_SIZE,
    q: typeof params.q === "string" ? params.q.trim() || undefined : undefined,
  };
}

export function hasActiveFilters(params: SearchParams): boolean {
  return FILTER_KEYS.some((key) => toArray(params[key]).length > 0);
}

/** Rebuilds a query string from params, applying overrides (undefined removes a key). */
export function buildQuery(params: SearchParams, overrides: Record<string, string | string[] | undefined> = {}): string {
  const merged = { ...params, ...overrides };
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(merged)) {
    for (const v of toArray(value)) query.append(key, v);
  }
  const str = query.toString();
  return str ? `?${str}` : "";
}
