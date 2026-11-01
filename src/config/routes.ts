/**
 * Every internal URL is built here. Pages and components never hard-code paths,
 * so a URL change is a one-line edit and links can't drift.
 */
export const routes = {
  home: () => "/",
  collection: (slug: string) => `/collections/${slug}`,
  brands: () => "/brands",
  brand: (slug: string) => `/brands/${slug}`,
  product: (slug: string) => `/products/${slug}`,
  search: (q?: string) => (q ? `/search?q=${encodeURIComponent(q)}` : "/search"),
  cart: () => "/cart",
  wishlist: () => "/wishlist",
  checkout: () => "/checkout",
  checkoutSuccess: (orderNumber: string) => `/checkout/success?order=${encodeURIComponent(orderNumber)}`,
  login: (next?: string) => (next ? `/login?next=${encodeURIComponent(next)}` : "/login"),
  account: () => "/account",
  orders: () => "/account/orders",
  order: (orderNumber: string) => `/account/orders/${orderNumber}`,
  orderReturn: (orderNumber: string) => `/account/orders/${orderNumber}/return`,
  contact: () => "/contact",
  policy: (slug: string) => `/policies/${slug}`,
} as const;
