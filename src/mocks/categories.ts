import type { Category } from "@/types";

type Draft = Omit<Category, "id" | "slug" | "children"> & { slug?: string; children?: Draft[] };

const slugify = (name: string) => name.toLowerCase().replace(/&/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Ids follow the path ("cat_women_clothing_eastern-ready-to-wear_pishwas") so products can refer to a leaf by name. */
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
  items.map(([name, image]) => ({ name, image: `${IMG}/${image}.png` }));

/**
 * Marketplace category tree. Brands file each product under a leaf; the
 * menu, category pages and breadcrumbs are all read from here.
 * Replaced by /v1/store/categories.
 */
export const mockCategories: Category[] = build([
  {
    name: "Men",
    icon: "/images/categories/men.png",
    tint: "#c9dcfa",
    children: [
      {
        name: "Clothing",
        children: [
          {
            name: "Eastern Wear",
            children: [
              { name: "Kurta Shalwar", image: "/images/mens/kurta1.jpg" },
              { name: "Waistcoats", image: "/images/mens/coat1.jpg" },
              { name: "Prince Coats", image: "/images/mens/princecoat2.jpg" },
            ],
          },
        ],
      },
      { name: "Accessories" },
      { name: "Footwear" },
    ],
  },
  {
    name: "Women",
    icon: "/images/categories/women.png",
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
              ["Gharara", "gharara"],
            ]),
          },
          {
            name: "Eastern Unstitched",
            children: leaves([
              ["2 Piece", "kurta-set"],
              ["3 Piece", "maxi"],
              ["Lawn", "kaftan"],
              ["Shawl Suits", "gharara"],
            ]),
          },
          {
            name: "Western",
            children: leaves([
              ["Tops", "kaftan"],
              ["Dresses", "maxi"],
              ["Co-ords", "kurta-set"],
            ]),
          },
          {
            name: "Modest Wear",
            children: leaves([
              ["Abayas", "maxi"],
              ["Kaftans", "kaftan"],
            ]),
          },
          { name: "Fusion" },
        ],
      },
      { name: "Accessories" },
      { name: "Footwear" },
      { name: "Lingerie & Sleepwear" },
    ],
  },
  {
    name: "Kids",
    icon: "/images/categories/kids.png",
    tint: "#d6e4fb",
    children: [
      {
        name: "Girls",
        children: [
          { name: "Gharara & Sharara", slug: "gharara-sharara", image: "/images/kids/kids1.jpg" },
          { name: "2 Piece", image: "/images/kids/kids3.jpg" },
          { name: "3 Piece", image: "/images/kids/kids4.jpg" },
        ],
      },
      {
        name: "Boys",
        children: [
          { name: "Kameez Shalwar", image: "/images/kids/kids5.jpg" },
          { name: "Kurta", image: "/images/kids/kids6.jpg" },
        ],
      },
      { name: "Footwear" },
    ],
  },
  { name: "Beauty", icon: "/images/categories/beauty.png", tint: "#fdd9dd" },
  { name: "Jewelry", icon: "/images/categories/jewelry.png", tint: "#fdf2c4" },
]);
