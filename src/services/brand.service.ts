import { cacheLife, cacheTag } from "next/cache";
import { useMocks } from "@/config/env";
import { apiClient, cacheTags, endpoints, isNotFound } from "@/lib/api";
import * as mock from "@/mocks/handlers";
import type { Brand, BrandShowcase } from "@/types";

export async function listBrands(): Promise<Brand[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(cacheTags.brands);
  if (useMocks) return mock.listBrands();
  return apiClient.get(endpoints.brands);
}

export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  "use cache";
  cacheLife("hours");
  cacheTag(cacheTags.brands, cacheTags.brand(slug));
  if (useMocks) return mock.getBrand(slug);
  try {
    return await apiClient.get<Brand>(endpoints.brand(slug));
  } catch (error) {
    if (isNotFound(error)) return null;
    throw error;
  }
}

/**
 * Brands with a few products each. Pass slugs for an editorial pick
 * (home hero), or omit them for trending order (most-reviewed first).
 */
export async function listBrandShowcases(options: {
  slugs?: string[];
  productsPerBrand: number;
  limit?: number;
}): Promise<BrandShowcase[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag(cacheTags.brands, cacheTags.products);
  if (useMocks) return mock.listBrandShowcases(options);
  return apiClient.get(endpoints.brandShowcases, {
    query: { slugs: options.slugs, productsPerBrand: options.productsPerBrand, limit: options.limit },
  });
}
