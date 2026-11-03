import type { Product, SizeChart } from "@/types";
import { findCategoryById } from "@/lib/categories";
import { mockBrands } from "./brands";
import { mockCategories } from "./categories";

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
  fabric: string;
  occasion: string;
};

/** Leaf each seed is filed under in the category tree (mocks/categories.ts). */
const LEAF: Record<string, string> = {
  "Block Print Lawn Kurta": "cat_women_clothing_eastern-ready-to-wear_kurta-set",
  "Embroidered Neckline Kurta": "cat_women_clothing_eastern-ready-to-wear_kurta-set",
  "Straight Khaddar Kurta": "cat_women_clothing_eastern-ready-to-wear_kaftan",
  "Linen Co-ord Set": "cat_women_clothing_western_co-ords",
  "Printed Two Piece": "cat_women_clothing_eastern-ready-to-wear_sharara",
  "Festive Organza Formal": "cat_women_clothing_eastern-ready-to-wear_pishwas",
  "Hand Embellished Chiffon Formal": "cat_women_clothing_eastern-ready-to-wear_lehenga",
  "Straight Cotton Trousers": "cat_women_clothing_fusion",
};

const seeds: Seed[] = [
  { name: "Block Print Lawn Kurta", category: "kurtas", price: 4990, material: "100% cotton lawn", fabric: "Lawn", occasion: "Everyday" },
  { name: "Embroidered Neckline Kurta", category: "kurtas", price: 6490, compareAt: 7990, material: "Cotton cambric", fabric: "Cambric", occasion: "Everyday" },
  { name: "Straight Khaddar Kurta", category: "kurtas", price: 5590, material: "Khaddar", fabric: "Khaddar", occasion: "Everyday" },
  { name: "Linen Co-ord Set", category: "co-ord-sets", price: 8990, material: "Linen blend", fabric: "Linen", occasion: "Semi-formal" },
  { name: "Printed Two Piece", category: "co-ord-sets", price: 7490, compareAt: 9490, material: "Cotton lawn", fabric: "Lawn", occasion: "Everyday" },
  { name: "Festive Organza Formal", category: "formals", price: 18990, material: "Organza with silk lining", fabric: "Organza", occasion: "Festive" },
  { name: "Hand Embellished Chiffon Formal", category: "formals", price: 24990, material: "Chiffon", fabric: "Chiffon", occasion: "Wedding" },
  { name: "Straight Cotton Trousers", category: "bottoms", price: 2990, material: "Cotton", fabric: "Cotton", occasion: "Everyday" },
];

/** Figma product shots, in hero order; every brand reuses them for now. */
const IMAGES = [
  { file: "green-embroidered-dress", alt: "Green embroidered dress", audience: "women", color: "Green" },
  { file: "kids-girl-purple-dress", alt: "Girls' purple dress", audience: "kids", color: "Purple" },
  { file: "kids-boy-black-kurta", alt: "Boys' black kurta", audience: "kids", color: "Black" },
  { file: "women-pink-printed-suit", alt: "Pink printed suit", audience: "women", color: "Pink" },
] as const;

/** Prices shown on the Figma hero tiles (first brand). */
const FIGMA_PRICES = [11000, 3000, 4000, 7000];

/** 6 brands × 4 products = 24 placeholder products. Replaced by /v1/store/products. */
export const mockProducts: Product[] = mockBrands.flatMap((brand, b) =>
  [0, 1, 2, 3].map((i): Product => {
    const seed = seeds[(b * 3 + i) % seeds.length];
    const n = b * 4 + i + 1;
    const { audience, color, file } = IMAGES[(i + b) % IMAGES.length];
    const categoryId = audience === "kids" ? (file.includes("girl") ? "cat_kids_girls" : "cat_kids_boys") : LEAF[seed.name];
    const created = new Date(Date.UTC(2026, 9, 30 - n)).toISOString();
    return {
      id: `prd_${String(n).padStart(3, "0")}`,
      slug: `${brand.slug}-${seed.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      name: seed.name,
      sellerId: brand.id,
      brand: { id: brand.id, slug: brand.slug, name: brand.name, logo: brand.logo, verified: brand.verified },
      description: `${seed.name} by ${brand.name}. ${brand.tagline} Cut for an easy fit and finished with care, ready to wear straight out of the bag.`,
      price: { amount: (b === 0 ? FIGMA_PRICES[i] : seed.price + b * 200) * 100, currency: "PKR" },
      compareAtPrice: seed.compareAt && b !== 0 ? { amount: (seed.compareAt + b * 200) * 100, currency: "PKR" } : undefined,
      images: [0, 1, 2].map((k) => {
        const image = IMAGES[(i + k + b) % IMAGES.length];
        return {
          url: `/images/brands/maria-b/${image.file}.png`,
          alt: `${image.alt} by ${brand.name}`,
          width: 272,
          height: 272,
        };
      }),
      categoryId,
      categorySlugs: audience === "kids" ? ["kids", seed.category] : ["ready-to-wear", seed.category],
      audience,
      category: findCategoryById(mockCategories, categoryId)?.category.name ?? "",
      fabric: seed.fabric,
      color,
      occasion: seed.occasion,
      rating: { average: [4.5, 4.3, 4.8, 4.6, 4.4][n % 5], count: 20 + ((n * 17) % 90) },
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
