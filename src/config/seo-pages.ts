/**
 * Static SEO copy for fixed pages. Dynamic pages (product, brand, collection)
 * build their metadata from data in generateMetadata.
 */
export const seoPages = {
  home: {
    title: "Aariy | Women's Ready-to-Wear from Verified Pakistani Brands",
    description:
      "Discover kurtas, co-ord sets and formals from verified Pakistani fashion brands. One basket, cash on delivery, nationwide delivery.",
    path: "/",
  },
  brands: {
    title: "All Brands",
    description: "Browse every verified fashion brand on Aariy and shop their latest ready-to-wear collections.",
    path: "/brands",
  },
  search: {
    title: "Search",
    description: "Search products and brands on Aariy.",
    path: "/search",
  },
  cart: {
    title: "Your Basket",
    description: "Review the items in your basket.",
    path: "/cart",
  },
  checkout: {
    title: "Checkout",
    description: "Complete your order.",
    path: "/checkout",
  },
  login: {
    title: "Sign In",
    description: "Sign in with a one-time code sent to your phone.",
    path: "/login",
  },
  account: {
    title: "My Account",
    description: "Your orders and account details.",
    path: "/account",
  },
  contact: {
    title: "Contact Us",
    description: "Questions about an order or a brand? Send us a message and our support team will reply.",
    path: "/contact",
  },
} as const;

/** Routes that must never be indexed. Mirrored in robots.ts. */
export const noIndexPaths = ["/cart", "/wishlist", "/checkout", "/login", "/account", "/search"];
