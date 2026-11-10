import type { Audience, Product, SizeChart } from "@/types";
import { findCategoryById, findCategoryByPath } from "@/lib/categories";
import { mockBrands, seededBrands } from "./brands";
import { mockCategories } from "./categories";
import { newProducts, type NewProduct } from "./new-products";
import { mockRating } from "./reviews";

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

const LEAF: Record<string, string> = {
  "Block Print Lawn Kurta":
    "cat_women_clothing_eastern-ready-to-wear_kurta-set",
  "Embroidered Neckline Kurta":
    "cat_women_clothing_eastern-ready-to-wear_kurta-set",
  "Straight Khaddar Kurta": "cat_women_clothing_eastern-ready-to-wear_kaftan",
  "Linen Co-ord Set": "cat_women_clothing_western_co-ords",
  "Printed Two Piece": "cat_women_clothing_eastern-ready-to-wear_sharara",
  "Festive Organza Formal": "cat_women_clothing_eastern-ready-to-wear_pishwas",
  "Hand Embellished Chiffon Formal":
    "cat_women_clothing_eastern-ready-to-wear_lehenga",
  "Straight Cotton Trousers": "cat_women_clothing_fusion",
};

const seeds: Seed[] = [
  {
    name: "Block Print Lawn Kurta",
    category: "kurtas",
    price: 4990,
    material: "100% cotton lawn",
    fabric: "Lawn",
    occasion: "Everyday",
  },
  {
    name: "Embroidered Neckline Kurta",
    category: "kurtas",
    price: 6490,
    compareAt: 7990,
    material: "Cotton cambric",
    fabric: "Cambric",
    occasion: "Everyday",
  },
  {
    name: "Straight Khaddar Kurta",
    category: "kurtas",
    price: 5590,
    material: "Khaddar",
    fabric: "Khaddar",
    occasion: "Everyday",
  },
  {
    name: "Linen Co-ord Set",
    category: "co-ord-sets",
    price: 8990,
    material: "Linen blend",
    fabric: "Linen",
    occasion: "Semi-formal",
  },
  {
    name: "Printed Two Piece",
    category: "co-ord-sets",
    price: 7490,
    compareAt: 9490,
    material: "Cotton lawn",
    fabric: "Lawn",
    occasion: "Everyday",
  },
  {
    name: "Festive Organza Formal",
    category: "formals",
    price: 18990,
    material: "Organza with silk lining",
    fabric: "Organza",
    occasion: "Festive",
  },
  {
    name: "Hand Embellished Chiffon Formal",
    category: "formals",
    price: 24990,
    material: "Chiffon",
    fabric: "Chiffon",
    occasion: "Wedding",
  },
  {
    name: "Straight Cotton Trousers",
    category: "bottoms",
    price: 2990,
    material: "Cotton",
    fabric: "Cotton",
    occasion: "Everyday",
  },
];

type ProductImage = {
  file: string;
  alt: string;
  audience: "women" | "kids";
  color: string;
};
type ImageSet = { folder: string; size: number; images: ProductImage[] };

/** Figma product shots, in hero order; the placeholder brands reuse these. */
const DEFAULT_IMAGES: ImageSet = {
  folder: "maria-b",
  size: 272,
  images: [
    {
      file: "green-embroidered-dress",
      alt: "Green embroidered dress",
      audience: "women",
      color: "Green",
    },
    {
      file: "kids-girl-purple-dress",
      alt: "Girls' purple dress",
      audience: "kids",
      color: "Purple",
    },
    {
      file: "kids-boy-black-kurta",
      alt: "Boys' black kurta",
      audience: "kids",
      color: "Black",
    },
    {
      file: "women-pink-printed-suit",
      alt: "Pink printed suit",
      audience: "women",
      color: "Pink",
    },
  ],
};

const seededProducts: Product[] = seededBrands.flatMap((brand, b) =>
  [0, 1, 2, 3].map((i): Product => {
    const seed = seeds[(b * 3 + i) % seeds.length];
    const n = b * 4 + i + 1;
    const set = DEFAULT_IMAGES;
    const shots = set.images;
    const { audience, color, file } = shots[(i + b) % shots.length];
    const categoryId =
      audience === "kids"
        ? file.includes("girl")
          ? "cat_kids_girls"
          : "cat_kids_boys"
        : LEAF[seed.name];
    const created = new Date(Date.UTC(2026, 9, 30 - n)).toISOString();
    return {
      id: `prd_${String(n).padStart(3, "0")}`,
      slug: `${brand.slug}-${seed.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      name: seed.name,
      sellerId: brand.id,
      brand: {
        id: brand.id,
        slug: brand.slug,
        name: brand.name,
        logo: brand.logo,
        verified: brand.verified,
      },
      description: `${seed.name} by ${brand.name}. ${brand.tagline} Cut for an easy fit and finished with care, ready to wear straight out of the bag.`,
      price: {
        amount: (seed.price + b * 200) * 100,
        currency: "PKR",
      },
      compareAtPrice:
        seed.compareAt
          ? { amount: (seed.compareAt + b * 200) * 100, currency: "PKR" }
          : undefined,
      // Up to three gallery shots, never the same photo twice.
      images: Array.from({ length: Math.min(3, shots.length) }, (_, k) => {
        const image = shots[(i + k + b) % shots.length];
        return {
          url: `/images/brands/${set.folder}/${image.file}.png`,
          alt: `${image.alt} by ${brand.name}`,
          width: set.size,
          height: set.size,
        };
      }),
      categoryId,
      categorySlugs:
        audience === "kids"
          ? ["kids", seed.category]
          : ["ready-to-wear", seed.category],
      audience,
      category:
        findCategoryById(mockCategories, categoryId)?.category.name ?? "",
      fabric: seed.fabric,
      color,
      occasion: seed.occasion,
      rating: mockRating(`prd_${String(n).padStart(3, "0")}`),
      variants: SIZES.map((size, s) => ({
        id: `var_${n}_${size}`,
        sku: `${brand.slug.slice(0, 3).toUpperCase()}-${n}-${size}`,
        size,
        stock: (n + s) % 5 === 0 ? 0 : ((n * 3 + s) % 7) + 1,
      })),
      sizeChart: seed.category === "bottoms" ? undefined : sizeChart,
      material: seed.material,
      care: [
        "Gentle hand wash in cold water",
        "Do not bleach",
        "Iron on reverse at medium heat",
      ],
      dispatch: { minDays: 2 + (b % 3), maxDays: 4 + (b % 3) },
      isNew: n % 3 === 0 || i === 0,
      inStock: true,
      createdAt: created,
    };
  }),
);

const DEFAULT_SIZES: Record<Audience, string[]> = {
  women: SIZES,
  men: ["S", "M", "L", "XL"],
  kids: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"],
};

/** Hand-added products are numbered from the bottom, so adding one on top leaves the others' ids alone. */
function toProduct(entry: NewProduct, index: number): Product {
  function fail(problem: string): never {
    throw new Error(`mocks/new-products.ts, "${entry.name}": ${problem}`);
  }
  const brand = mockBrands.find((b) => b.slug === entry.brand) ?? fail(`no brand "${entry.brand}"`);
  const found = findCategoryByPath(mockCategories, entry.category.split("/")) ?? fail(`no category "${entry.category}"`);

  const audience: Audience = entry.category.startsWith("men/") ? "men" : entry.category.startsWith("kids/") ? "kids" : "women";
  const n = seededProducts.length + newProducts.length - index;
  const id = `prd_${String(n).padStart(3, "0")}`;
  const slug = `${brand.slug}-${entry.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return {
    id,
    slug,
    name: entry.name,
    sellerId: brand.id,
    brand: { id: brand.id, slug: brand.slug, name: brand.name, logo: brand.logo, verified: brand.verified },
    description: entry.description ?? `${entry.name} by ${brand.name}. ${brand.tagline}`,
    price: { amount: entry.price * 100, currency: "PKR" },
    compareAtPrice: entry.oldPrice ? { amount: entry.oldPrice * 100, currency: "PKR" } : undefined,
    // Only alt text is read from these; the card and gallery crop every photo to their own shape.
    images: entry.images.map((url) => ({ url, alt: `${entry.name} by ${brand.name}`, width: 800, height: 1000 })),
    categoryId: found.category.id,
    categorySlugs: audience === "women" ? ["ready-to-wear"] : [audience],
    audience,
    category: found.category.name,
    fabric: entry.fabric,
    color: entry.color,
    occasion: entry.occasion,
    rating: mockRating(id),
    variants: (entry.sizes ?? DEFAULT_SIZES[audience]).map((size) => ({
      id: `var_${n}_${size}`,
      sku: `${brand.slug.slice(0, 3).toUpperCase()}-${n}-${size}`,
      size,
      stock: 6,
    })),
    material: entry.fabric,
    care: entry.category.startsWith("jewelry/")
      ? ["Keep away from water, perfume and lotions", "Wipe with a soft dry cloth after wearing", "Store in the box it came in"]
      : entry.category.startsWith("beauty/")
        ? ["Store in a cool, dry place away from sunlight", "Keep the cap closed when not in use", "For external use only"]
        : entry.category.endsWith("/footwear")
          ? ["Wipe clean with a damp cloth", "Air dry away from direct heat", "Do not machine wash"]
          : ["Gentle wash in cold water", "Do not bleach", "Iron on reverse at medium heat"],
    dispatch: { minDays: 2, maxDays: 4 },
    isNew: entry.isNew ?? false,
    inStock: true,
    // The top of the list is the newest; everything here is newer than the seeded products.
    createdAt: new Date(Date.UTC(2026, 10, 5) - index * 3_600_000).toISOString(),
  };
}

/** Everything the storefront sells in mock mode. Replaced by /v1/store/products. */
// Seeded first: mocks/orders.ts picks products by position. Listings sort by createdAt, so new ones still lead.
export const mockProducts: Product[] = [...seededProducts, ...newProducts.map(toProduct)];

const slugs = new Set<string>();
for (const { slug, name } of mockProducts) {
  if (slugs.has(slug)) throw new Error(`Two products from one brand are both named "${name}"; each needs its own name.`);
  slugs.add(slug);
}
