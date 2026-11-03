import { cacheLife, cacheTag } from "next/cache";
import { useMocks } from "@/config/env";
import { apiClient, cacheTags, endpoints, isNotFound } from "@/lib/api";
import * as mock from "@/mocks/handlers";
import { mockCategories } from "@/mocks/categories";
import { mockCollections } from "@/mocks/collections";
import type { Category, Collection, Paginated, Product, ProductFacets, ProductFilters, ProductSummary } from "@/types";

/**
 * Catalogue reads. Every function is cached with 'use cache' and tagged,
 * so pages are served from the static shell and refreshed by revalidateTag
 * when the backend reports a change.
 *
 * Integration: set NEXT_PUBLIC_DATA_SOURCE=api. Only the `else` branches run.
 */

export async function listProducts(filters: ProductFilters = {}): Promise<Paginated<ProductSummary>> {
  "use cache";
  cacheLife("minutes");
  cacheTag(cacheTags.products);
  if (useMocks) return mock.listProducts(filters);
  return apiClient.get(endpoints.products, {
    query: { ...filters, sizes: filters.sizes },
  });
}

export async function getProductFacets(filters: ProductFilters = {}): Promise<ProductFacets> {
  "use cache";
  cacheLife("minutes");
  cacheTag(cacheTags.products);
  if (useMocks) return mock.getFacets(filters);
  return apiClient.get(endpoints.facets, { query: { collection: filters.collection, brand: filters.brand, q: filters.q } });
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag(cacheTags.products, cacheTags.product(slug));
  if (useMocks) return mock.getProduct(slug);
  try {
    return await apiClient.get<Product>(endpoints.product(slug));
  } catch (error) {
    if (isNotFound(error)) return null;
    throw error;
  }
}

export async function getRelatedProducts(slug: string): Promise<ProductSummary[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(cacheTags.product(slug));
  if (useMocks) return mock.getRelated(slug);
  return apiClient.get(endpoints.relatedProducts(slug));
}

/** Slugs to prerender at build time. Unlisted slugs render on first visit and are then cached. */
export async function getProductSlugsForBuild(): Promise<string[]> {
  "use cache";
  cacheLife("hours");
  if (useMocks) return mock.listProducts({ pageSize: 1000 }).items.map((p) => p.slug);
  const res = await apiClient.get<Paginated<ProductSummary>>(endpoints.products, { query: { pageSize: 200, sort: "newest" } });
  return res.items.map((p) => p.slug);
}

export async function listCollections(): Promise<Collection[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(cacheTags.collections);
  if (useMocks) return mockCollections;
  return apiClient.get(endpoints.collections);
}

export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  "use cache";
  cacheLife("hours");
  cacheTag(cacheTags.collections, cacheTags.collection(slug));
  if (useMocks) return mockCollections.find((c) => c.slug === slug) ?? null;
  try {
    return await apiClient.get<Collection>(endpoints.collection(slug));
  } catch (error) {
    if (isNotFound(error)) return null;
    throw error;
  }
}

/** The whole category tree (menu, category pages, breadcrumbs). Small enough to load in one call. */
export async function getCategoryTree(): Promise<Category[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(cacheTags.categories);
  if (useMocks) return mockCategories;
  return apiClient.get(endpoints.categories);
}
