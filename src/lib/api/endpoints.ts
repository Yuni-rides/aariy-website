/**
 * Storefront endpoints on the internal API (SOW §6.1: /v1/store guard).
 * Paths are a proposal until the backend publishes its OpenAPI spec;
 * adjust here only, services read from this map.
 */
export const endpoints = {
  products: "/v1/store/products",
  product: (slug: string) => `/v1/store/products/${slug}`,
  /** GET is public and paged; POST needs a signed-in buyer. */
  productReviews: (slug: string) => `/v1/store/products/${slug}/reviews`,
  /** { reviewed: boolean } for the signed-in buyer. */
  myProductReview: (slug: string) => `/v1/store/products/${slug}/reviews/mine`,
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
    /** POST { email, newsletter } → emails a 6-digit code. */
    requestOtp: "/v1/store/auth/email-otp",
    /** POST { email, code } → { token, customer }; creates the buyer on first sign-in. */
    verifyOtp: "/v1/store/auth/email-otp/verify",
    me: "/v1/store/me",
  },
  checkout: "/v1/store/checkout",
  orders: "/v1/store/orders",
  order: (orderNumber: string) => `/v1/store/orders/${orderNumber}`,
  returns: (orderNumber: string) => `/v1/store/orders/${orderNumber}/returns`,
  supportTickets: "/v1/store/support/tickets",
} as const;
