import { routes } from "./routes";

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export type IconNavKey =
  | "home"
  | "categories"
  | "stores"
  | "cart"
  | "help"
  | "orders"
  | "sale";

export const iconNav: { key: IconNavKey; label: string; href: string }[] = [
  { key: "home", label: "Home", href: routes.home() },
  { key: "categories", label: "Categories", href: routes.collection("all") },
  { key: "stores", label: "Stores", href: routes.brands() },
  { key: "cart", label: "Basket", href: routes.cart() },
  { key: "orders", label: "Orders", href: routes.orders() },
  { key: "sale", label: "Sale", href: routes.collection("sale") },
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
      {
        label: "Prohibited Products",
        href: routes.policy("prohibited-products"),
      },
    ],
  },
];

export const accountNav: NavItem[] = [
  { label: "Overview", href: routes.account() },
  { label: "Orders", href: routes.orders() },
];
