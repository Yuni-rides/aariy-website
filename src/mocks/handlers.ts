import type { Brand, BrandShowcase, Paginated, Product, ProductFacets, ProductFilters, ProductSummary } from "@/types";
import { mockBrands } from "./brands";
import { mockProducts } from "./products";

/**
 * In-memory versions of the API's query logic. They return exactly the
 * shapes the real endpoints will, so swapping DATA_SOURCE to "api" needs
 * no UI change.
 */

export function toSummary(p: Product): ProductSummary {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    price: p.price,
    compareAtPrice: p.compareAtPrice,
    image: p.images[0],
    hoverImage: p.images[1],
    isNew: p.isNew,
    inStock: p.variants.some((v) => v.stock > 0),
    audience: p.audience,
    rating: p.rating,
    category: p.category,
    fabric: p.fabric,
    color: p.color,
    occasion: p.occasion,
    sizes: p.variants.filter((v) => v.stock > 0).map((v) => v.size),
  };
}

function matchesCollection(p: Product, slug?: string): boolean {
  if (!slug) return true;
  if (slug === "all") return true;
  if (slug === "new-in") return p.isNew;
  if (slug === "sale") return Boolean(p.compareAtPrice);
  return p.categorySlugs.includes(slug);
}

function matchesQuery(p: Product, q?: string): boolean {
  if (!q) return true;
  const haystack = `${p.name} ${p.brand.name} ${p.material} ${p.categorySlugs.join(" ")}`.toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

function baseFilter(filters: ProductFilters): Product[] {
  return mockProducts.filter(
    (p) =>
      matchesCollection(p, filters.collection) &&
      (!filters.brand || p.brand.slug === filters.brand) &&
      matchesQuery(p, filters.q),
  );
}

export function listProducts(filters: ProductFilters): Paginated<ProductSummary> {
  const page = Math.max(1, filters.page ?? 1);
  const pageSize = filters.pageSize ?? 12;

  let items = baseFilter(filters).filter(
    (p) =>
      (!filters.sizes?.length || p.variants.some((v) => v.stock > 0 && filters.sizes!.includes(v.size))) &&
      (filters.minPrice === undefined || p.price.amount >= filters.minPrice) &&
      (filters.maxPrice === undefined || p.price.amount <= filters.maxPrice),
  );

  items = [...items].sort((a, b) => {
    switch (filters.sort) {
      case "price-asc":
        return a.price.amount - b.price.amount;
      case "price-desc":
        return b.price.amount - a.price.amount;
      default:
        return b.createdAt.localeCompare(a.createdAt);
    }
  });

  const total = items.length;
  return {
    items: items.slice((page - 1) * pageSize, page * pageSize).map(toSummary),
    page,
    pageSize,
    total,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

export function getFacets(filters: ProductFilters): ProductFacets {
  const products = baseFilter(filters);
  const sizeCounts = new Map<string, number>();
  for (const p of products) {
    for (const v of p.variants) {
      if (v.stock > 0) sizeCounts.set(v.size, (sizeCounts.get(v.size) ?? 0) + 1);
    }
  }
  const prices = products.map((p) => p.price.amount);
  return {
    sizes: ["XS", "S", "M", "L", "XL"]
      .filter((s) => sizeCounts.has(s))
      .map((s) => ({ value: s, label: s, count: sizeCounts.get(s)! })),
    price: { min: prices.length ? Math.min(...prices) : 0, max: prices.length ? Math.max(...prices) : 0 },
  };
}

export function getProduct(slug: string): Product | null {
  return mockProducts.find((p) => p.slug === slug) ?? null;
}

export function getRelated(slug: string, limit = 4): ProductSummary[] {
  const product = getProduct(slug);
  if (!product) return [];
  return mockProducts
    .filter((p) => p.slug !== slug && p.categorySlugs.some((c) => c !== "ready-to-wear" && product.categorySlugs.includes(c)))
    .slice(0, limit)
    .map(toSummary);
}

export function listBrands(): Brand[] {
  return mockBrands.map((b) => ({
    ...b,
    productCount: mockProducts.filter((p) => p.brand.id === b.id).length,
  }));
}

export function getBrand(slug: string): Brand | null {
  return listBrands().find((b) => b.slug === slug) ?? null;
}

export function listBrandShowcases({
  slugs,
  productsPerBrand,
  limit,
}: {
  slugs?: string[];
  productsPerBrand: number;
  limit?: number;
}): BrandShowcase[] {
  let brands = listBrands();
  brands = slugs
    ? slugs.map((slug) => brands.find((b) => b.slug === slug)).filter((b) => b !== undefined)
    : [...brands].sort((a, b) => (b.rating?.count ?? 0) - (a.rating?.count ?? 0));
  return brands.slice(0, limit).map((brand) => ({
    brand,
    products: listProducts({ brand: brand.slug, pageSize: productsPerBrand }).items,
  }));
}
