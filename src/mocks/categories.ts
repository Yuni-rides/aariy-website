import type { Category } from "@/types";

type Draft = Omit<Category, "id" | "slug" | "children"> & { slug?: string; children?: Draft[] };

const slugify = (name: string) => name.toLowerCase().replace(/&/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function build(drafts: Draft[], parent = "cat"): Category[] {
  return drafts.map(({ children, slug, ...rest }) => {
    const s = slug ?? slugify(rest.name);
    const id = `${parent}_${s}`;
    return { ...rest, id, slug: s, children: children && build(children, id) };
  });
}

const IMG = "/images/categories/women-clothing";
// The Figma only has Eastern Ready to wear art; other sub categories reuse it for now.
const leaves = (items: [name: string, image: string][]): Draft[] =>
  items.map(([name, image]) => ({ name, image: `${IMG}/${image}.webp` }));

/**
 * Marketplace category tree. Brands file each product under a leaf; the
 * menu, category pages and breadcrumbs are all read from here.
 * Replaced by /v1/store/categories.
 */
export const mockCategories: Category[] = build([
  {
    name: "Men",
    icon: "/images/categories/men.webp",
    tint: "#c9dcfa",
    children: [
      {
        name: "Clothing",
        children: [
          {
            name: "Eastern Wear",
            children: [
              { name: "Kurta Shalwar", image: "/images/mens/kurta1.webp" },
              { name: "Waistcoats", image: "/images/mens/coat1.webp" },
              { name: "Prince Coats", image: "/images/mens/princecoat2.webp" },
              { name: "Sherwani", image: "/images/F/product1.webp" },
              { name: "Shalwar & Trousers", image: "/images/F/product5.webp" },
            ],
          },
        ],
      },
      // { name: "Accessories" },
      // { name: "Footwear" },
    ],
  },
  {
    name: "Women",
    icon: "/images/categories/women.webp",
    tint: "#fde8df",
    children: [
      {
        name: "Clothing",
        children: [
          {
            name: "Eastern Ready to wear",
            children: leaves([
              ["Kurta set", "kurta-set"],
              ["Maxi", "maxi"],
              ["Pishwas", "pishwas"],
              ["Sharara", "sharara"],
              ["Kaftan", "kaftan"],
              ["Lehenga", "lehenga"],
              ["Anarkali", "anarkali"],
              ["Saree", "saree"],
            ]),
          },
          // {
          //   name: "Eastern Unstitched",
          //   children: leaves([
          //     ["2 Piece", "kurta-set"],
          //     ["3 Piece", "maxi"],
          //     ["Lawn", "kaftan"],
          //     ["Shawl Suits", "pishwas"],
          //   ]),
          // },
          {
            name: "Western",
            children: [
              { name: "Co-ords", image: "/images/rangGhar/product6.webp" },
              { name: "Jackets & Knitwear", image: "/images/rangGhar/product1.webp" },
              { name: "Skirts", image: "/images/rangGhar/product4.webp" },
            ],
          },
          {
            name: "Modest Wear",
            children: leaves([
              ["Abayas", "abaya"],
              ["Kaftans", "kaftan"],
            ]),
          },
          { name: "Fusion" },
        ],
      },
      // { name: "Accessories" },
      // { name: "Footwear" },
      // { name: "Lingerie & Sleepwear" },
    ],
  },
  {
    name: "Kids",
    icon: "/images/categories/kids.webp",
    tint: "#d6e4fb",
    children: [
      {
        name: "Girls",
        children: [
          { name: "Gharara & Sharara", slug: "gharara-sharara", image: "/images/kids/kids1.webp" },
          { name: "2 Piece", image: "/images/kids/kids3.webp" },
          { name: "3 Piece", image: "/images/kids/kids4.webp" },
          { name: "Co-ord Sets", image: "/images/kapraCo/product6.webp" },
        ],
      },
      {
        name: "Boys",
        children: [
          { name: "Kameez Shalwar", image: "/images/kids/kids5.webp" },
          { name: "Kurta", image: "/images/kids/kids6.webp" },
          { name: "Casual Wear", image: "/images/kapraCo/product11.webp" },
          { name: "Night Suits", image: "/images/kapraCo/product4.webp" },
        ],
      },
      { name: "Footwear", image: "/images/kapraCo/product14.webp" },
    ],
  },
  {
    name: "Beauty",
    icon: "/images/categories/beauty.webp",
    tint: "#fdd9dd",
    children: [{ name: "Fragrances", image: "/images/kapraCo/product9.webp" }],
  },
  {
    name: "Jewelry",
    icon: "/images/categories/jewelry.webp",
    tint: "#fdf2c4",
    children: [
      { name: "Necklaces" },
      { name: "Earrings" },
      { name: "Bangles & Bracelets", slug: "bangles-bracelets" },
      { name: "Rings" },
      { name: "Maang Tikka" },
      { name: "Jewelry Sets" },
    ],
  },
]);
