import { routes } from "./routes";

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

/** Centre pill nav in the header (bottom tab bar on mobile). Icons are mapped in site-header. */
export type IconNavKey = "home" | "categories" | "stores" | "cart" | "help" | "orders" | "sale";

export const iconNav: { key: IconNavKey; label: string; href: string }[] = [
  { key: "home", label: "Home", href: routes.home() },
  { key: "categories", label: "Categories", href: routes.collection("all") },
  { key: "stores", label: "Stores", href: routes.brands() },
  { key: "cart", label: "Basket", href: routes.cart() },
  { key: "help", label: "Help", href: routes.contact() },
  { key: "orders", label: "Orders", href: routes.orders() },
  { key: "sale", label: "Sale", href: routes.collection("sale") },
];

/** A round picture link in the category flyout ("Kurta set", "Maxi", …). */
export type CategoryLink = { label: string; href: string; image: string };

/** Accordion row in the flyout ("Eastern Ready to wear"); rows without items are plain links. */
export type CategoryGroup = { label: string; href: string; items?: CategoryLink[] };

/** Second level under Men / Women / Kids ("Clothing"); with groups it opens the flyout. */
export type CategorySubNav = { label: string; href: string; groups?: CategoryGroup[] };

export type CategoryNavItem = Omit<NavItem, "children"> & {
  /** Round illustration in the sidebar (public/images/categories/). */
  icon: string;
  /** Soft background behind the icon. */
  tint: string;
  children?: CategorySubNav[];
};

const CLOTHING_IMAGES = "/images/categories/women-clothing";

/** Builds picture links; the Figma only has Eastern Ready to wear art, so other groups reuse it for now. */
function links(prefix: string, items: [label: string, image: string][]): CategoryLink[] {
  return items.map(([label, image]) => ({
    label,
    href: routes.collection(`${prefix}-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`),
    image: `${CLOTHING_IMAGES}/${image}.png`,
  }));
}

const womenClothing: CategoryGroup[] = [
  {
    label: "Eastern Ready to wear",
    href: routes.collection("ready-to-wear"),
    items: links("ready-to-wear", [
      ["Kurta set", "kurta-set"],
      ["Maxi", "maxi"],
      ["Pishwas", "pishwas"],
      ["Sharara", "sharara"],
      ["Kaftan", "kaftan"],
      ["Lehenga", "lehenga"],
      ["Gharara", "gharara"],
    ]),
  },
  {
    label: "Eastern Unstitched",
    href: routes.collection("unstitched"),
    items: links("unstitched", [
      ["2 Piece", "kurta-set"],
      ["3 Piece", "maxi"],
      ["Lawn", "kaftan"],
      ["Shawl Suits", "gharara"],
    ]),
  },
  {
    label: "Western",
    href: routes.collection("west"),
    items: links("west", [
      ["Tops", "kaftan"],
      ["Dresses", "maxi"],
      ["Co-ords", "kurta-set"],
    ]),
  },
  {
    label: "Modest Wear",
    href: routes.collection("modest-wear"),
    items: links("modest-wear", [
      ["Abayas", "maxi"],
      ["Kaftans", "kaftan"],
    ]),
  },
  { label: "Fusion", href: routes.collection("fusion") },
];

/** Left category rail on the home page (Figma). */
export const categoryNav: CategoryNavItem[] = [
  { label: "View all", href: routes.collection("all"), icon: "/images/categories/view-all.svg", tint: "#eeeeef" },
  {
    label: "Men",
    href: routes.collection("men"),
    icon: "/images/categories/men.png",
    tint: "#c9dcfa",
    children: [
      { label: "Clothing", href: routes.collection("men-clothing") },
      { label: "Accessories", href: routes.collection("men-accessories") },
      { label: "Footwear", href: routes.collection("men-footwear") },
    ],
  },
  {
    label: "Women",
    href: routes.collection("ready-to-wear"),
    icon: "/images/categories/women.png",
    tint: "#fde8df",
    children: [
      { label: "Clothing", href: routes.collection("ready-to-wear"), groups: womenClothing },
      { label: "Accessories", href: routes.collection("women-accessories") },
      { label: "Footwear", href: routes.collection("women-footwear") },
      { label: "Lingerie & Sleepwear", href: routes.collection("lingerie-sleepwear") },
    ],
  },
  {
    label: "Kids",
    href: routes.collection("kids"),
    icon: "/images/categories/kids.png",
    tint: "#d6e4fb",
    children: [
      { label: "Girls", href: routes.collection("kids-girls") },
      { label: "Boys", href: routes.collection("kids-boys") },
      { label: "Footwear", href: routes.collection("kids-footwear") },
    ],
  },
  { label: "Beauty", href: routes.collection("beauty"), icon: "/images/categories/beauty.png", tint: "#fdd9dd" },
  { label: "Jewelry", href: routes.collection("jewelry"), icon: "/images/categories/jewelry.png", tint: "#fdf2c4" },
  { label: "West", href: routes.collection("west"), icon: "/images/categories/west.svg", tint: "#e3e8f3" },
];

/**
 * Every picture category in the menu (Kurta set, Maxi, …) across Men, Women
 * and Kids, for the home "Categories" circles. New menu entries show up
 * there automatically; duplicates by link are dropped.
 */
export const categoryLeaves: CategoryLink[] = [
  ...new Map(
    categoryNav
      .flatMap((item) => item.children ?? [])
      .flatMap((sub) => sub.groups ?? [])
      .flatMap((group) => group.items ?? [])
      .map((link) => [link.href, link] as const),
  ).values(),
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Shop",
    items: [
      { label: "New In", href: routes.collection("new-in") },
      { label: "Ready to Wear", href: routes.collection("ready-to-wear") },
      { label: "All Brands", href: routes.brands() },
      { label: "Sale", href: routes.collection("sale") },
    ],
  },
  {
    title: "Help",
    items: [
      { label: "Contact Us", href: routes.contact() },
      { label: "Track Order", href: routes.orders() },
      { label: "Shipping", href: routes.policy("shipping") },
      { label: "Returns", href: routes.policy("returns") },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Terms of Service", href: routes.policy("terms") },
      { label: "Privacy Policy", href: routes.policy("privacy") },
      { label: "Prohibited Products", href: routes.policy("prohibited-products") },
    ],
  },
];

export const accountNav: NavItem[] = [
  { label: "Overview", href: routes.account() },
  { label: "Orders", href: routes.orders() },
];
