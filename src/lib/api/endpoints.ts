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
  /** Live on the backend; API_BASE_URL is the Postman {{baseUrl}}. */
  auth: {
    /** POST { email } → emails a one-time code. */
    requestOtp: "/store/auth/otp/request",
    /** POST { email, code } → access token and buyer; creates the buyer on first sign-in. */
    verifyOtp: "/store/auth/otp/verify",
    me: "/store/me",
    /**
     * POST { refreshToken } → new accessToken (and refreshToken).
     * The route exists (401 "Session ended" for a bad token); the success shape
     * is assumed to match verify ({ data: { accessToken, refreshToken, sessionExpiresAt } }).
     */
    refresh: "/store/auth/refresh",
  },
  checkout: "/v1/store/checkout",
  orders: "/v1/store/orders",
  order: (orderNumber: string) => `/v1/store/orders/${orderNumber}`,
  returns: (orderNumber: string) => `/v1/store/orders/${orderNumber}/returns`,
  supportTickets: "/v1/store/support/tickets",
  sellerApplications: "/v1/store/seller-applications",
  /** Live on the backend; Become a seller signs the brand up straight away. */
  sellerAuth: {
    /** POST { email } → emails a 6-digit code. */
    registerOtp: "/seller/auth/register/otp",
    /** POST { fullName, email, phone, password, code, businessName, acceptTerms } → creates the seller. */
    register: "/seller/auth/register",
  },
} as const;
