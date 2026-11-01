/**
 * Cache tags for 'use cache' entries. When the API is live, a webhook
 * route handler calls revalidateTag(tag) on product/brand updates so
 * pages refresh without a redeploy.
 */
export const cacheTags = {
  products: "products",
  product: (slug: string) => `product:${slug}`,
  collections: "collections",
  collection: (slug: string) => `collection:${slug}`,
  brands: "brands",
  brand: (slug: string) => `brand:${slug}`,
} as const;
