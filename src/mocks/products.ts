import type { Product, SizeChart } from "@/types";
import { mockBrands } from "./brands";

const SIZES = ["XS", "S", "M", "L", "XL"];

const sizeChart: SizeChart = {
  unit: "in",
  columns: ["Size", "Chest", "Length", "Shoulder", "Sleeve"],
  rows: [
    ["XS", "34", "42", "13.5", "21"],
    ["S", "36", "42", "14", "21.5"],
    ["M", "38", "43", "14.5", "22"],
    ["L", "41", "43", "15", "22.5"],
    ["XL", "44", "44", "15.5", "23"],
  ],
};

type Seed = {
  name: string;
  category: "kurtas" | "co-ord-sets" | "formals" | "bottoms";
  price: number;
  compareAt?: number;
  material: string;
};

const seeds: Seed[] = [
  { name: "Block Print Lawn Kurta", category: "kurtas", price: 4990, material: "100% cotton lawn" },
  { name: "Embroidered Neckline Kurta", category: "kurtas", price: 6490, compareAt: 7990, material: "Cotton cambric" },
  { name: "Straight Khaddar Kurta", category: "kurtas", price: 5590, material: "Khaddar" },
  { name: "Linen Co-ord Set", category: "co-ord-sets", price: 8990, material: "Linen blend" },
  { name: "Printed Two Piece", category: "co-ord-sets", price: 7490, compareAt: 9490, material: "Cotton lawn" },
  { name: "Festive Organza Formal", category: "formals", price: 18990, material: "Organza with silk lining" },
  { name: "Hand Embellished Chiffon Formal", category: "formals", price: 24990, material: "Chiffon" },
  { name: "Straight Cotton Trousers", category: "bottoms", price: 2990, material: "Cotton" },
];

/** 6 brands × 4 products = 24 placeholder products. Replaced by /v1/store/products. */
export const mockProducts: Product[] = mockBrands.flatMap((brand, b) =>
  [0, 1, 2, 3].map((i): Product => {
    const seed = seeds[(b * 3 + i) % seeds.length];
    const n = b * 4 + i + 1;
    const imageIndex = (n % 6) + 1;
    const created = new Date(Date.UTC(2026, 9, 30 - n)).toISOString();
    return {
      id: `prd_${String(n).padStart(3, "0")}`,
      slug: `${brand.slug}-${seed.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      name: seed.name,
      sellerId: brand.id,
      brand: { id: brand.id, slug: brand.slug, name: brand.name, logo: brand.logo, verified: brand.verified },
      description: `${seed.name} by ${brand.name}. ${brand.tagline} Cut for an easy fit and finished with care, ready to wear straight out of the bag.`,
      price: { amount: (seed.price + b * 200) * 100, currency: "PKR" },
      compareAtPrice: seed.compareAt ? { amount: (seed.compareAt + b * 200) * 100, currency: "PKR" } : undefined,
      images: [1, 2, 3].map((k) => ({
        url: `/images/placeholders/product-${((imageIndex + k - 2) % 6) + 1}.svg`,
        alt: `${seed.name} by ${brand.name}, view ${k}`,
        width: 600,
        height: 800,
      })),
      categorySlugs: ["ready-to-wear", seed.category],
      variants: SIZES.map((size, s) => ({
        id: `var_${n}_${size}`,
        sku: `${brand.slug.slice(0, 3).toUpperCase()}-${n}-${size}`,
        size,
        stock: (n + s) % 5 === 0 ? 0 : ((n * 3 + s) % 7) + 1,
      })),
      sizeChart: seed.category === "bottoms" ? undefined : sizeChart,
      material: seed.material,
      care: ["Gentle hand wash in cold water", "Do not bleach", "Iron on reverse at medium heat"],
      dispatch: { minDays: 2 + (b % 3), maxDays: 4 + (b % 3) },
      isNew: n % 3 === 0 || i === 0,
      inStock: true,
      createdAt: created,
    };
  }),
);
