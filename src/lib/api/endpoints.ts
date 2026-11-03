/**
 * Storefront endpoints on the internal API (SOW §6.1: /v1/store guard).
 * Paths are a proposal until the backend publishes its OpenAPI spec;
 * adjust here only, services read from this map.
 */
export const endpoints = {
  products: "/v1/store/products",
  product: (slug: string) => `/v1/store/products/${slug}`,
  relatedProducts: (slug: string) => `/v1/store/products/${slug}/related`,
  facets: "/v1/store/products/facets",
  collections: "/v1/store/collections",
  categories: "/v1/store/categories",
  collection: (slug: string) => `/v1/store/collections/${slug}`,
  brands: "/v1/store/brands",
  brand: (slug: string) => `/v1/store/brands/${slug}`,
  brandShowcases: "/v1/store/brands/showcases",
  brandCollections: (slug: string) => `/v1/store/brands/${slug}/collections`,
  auth: {
    requestOtp: "/v1/store/auth/otp",
    verifyOtp: "/v1/store/auth/otp/verify",
    me: "/v1/store/me",
  },
  checkout: "/v1/store/checkout",
  orders: "/v1/store/orders",
  order: (orderNumber: string) => `/v1/store/orders/${orderNumber}`,
  returns: (orderNumber: string) => `/v1/store/orders/${orderNumber}/returns`,
  supportTickets: "/v1/store/support/tickets",
} as const;
