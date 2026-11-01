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

export type CategoryNavItem = NavItem & {
  /** Round illustration in the sidebar. Replace with the Figma export in public/images/categories/. */
  icon: string;
  /** Soft background behind the icon. */
  tint: string;
};

/** Left category rail on the home page (Figma). */
export const categoryNav: CategoryNavItem[] = [
  { label: "View all", href: routes.collection("all"), icon: "/images/categories/view-all.svg", tint: "#eeeeef" },
  {
    label: "Men",
    href: routes.collection("men"),
    icon: "/images/categories/men.svg",
    tint: "#e3ecfb",
    children: [
      { label: "Kurta Shalwar", href: routes.collection("men-kurta-shalwar") },
      { label: "Waistcoats", href: routes.collection("men-waistcoats") },
    ],
  },
  { label: "Beauty", href: routes.collection("beauty"), icon: "/images/categories/beauty.svg", tint: "#fde3e6" },
  { label: "Jewelry", href: routes.collection("jewelry"), icon: "/images/categories/jewelry.svg", tint: "#fdf1d8" },
  {
    label: "Women",
    href: routes.collection("ready-to-wear"),
    icon: "/images/categories/women.svg",
    tint: "#fde8df",
    children: [
      { label: "Kurtas", href: routes.collection("kurtas") },
      { label: "Co-ord Sets", href: routes.collection("co-ord-sets") },
      { label: "Formals", href: routes.collection("formals") },
      { label: "Bottoms", href: routes.collection("bottoms") },
    ],
  },
  {
    label: "Kids",
    href: routes.collection("kids"),
    icon: "/images/categories/kids.svg",
    tint: "#e4e6fb",
    children: [
      { label: "Girls", href: routes.collection("kids-girls") },
      { label: "Boys", href: routes.collection("kids-boys") },
    ],
  },
  { label: "West", href: routes.collection("west"), icon: "/images/categories/west.svg", tint: "#e3e8f3" },
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
