import type { Brand } from "@/types";

const OWN_ART = new Set(["noor-jahan"]);

const banner = (slug: string, name: string) => ({
  url: `/images/brands/${OWN_ART.has(slug) ? slug : "maria-b"}/banner.webp`,
  alt: `${name} collection`,
  width: 1467,
  height: 700,
});
const cover = (slug: string, name: string, i: number) =>
  OWN_ART.has(slug)
    ? { url: `/images/brands/${slug}/store-cover.png`, alt: `${name} campaign`, width: 377, height: 529 }
    : { url: `/images/brands/maria-b/store-cover-${(i % 2) + 1}.webp`, alt: `${name} campaign`, width: 500, height: 700 };
const ratings = [
  { average: 4.5, count: 591000 },
  { average: 4.7, count: 128000 },
  { average: 4.4, count: 86000 },
  { average: 4.8, count: 240000 },
  { average: 4.3, count: 42000 },
  { average: 4.6, count: 157000 },
];

/** The placeholder brands; products.ts generates four products for each of these. */
export const seededBrands: Brand[] = [
  {
    id: "br_02",
    slug: "mehr-studio",
    name: "Mehr Studio",
    verified: true,
    tagline: "Modern co-ords for the city.",
    story:
      "Mehr Studio designs relaxed co-ord sets that move from office to evening, in breathable cotton and linen blends.",
    city: "Karachi",
    productCount: 0,
    rating: ratings[1],
    cover: cover("mehr-studio", "Mehr Studio", 1),
    banner: banner("mehr-studio", "Mehr Studio"),
  },
  {
    id: "br_03",
    slug: "rang-ghar",
    name: "Rang Ghar",
    verified: true,
    tagline: "Colour, print and heritage craft.",
    story:
      "Rang Ghar revives traditional dyeing techniques from Sindh and Punjab in contemporary silhouettes.",
    city: "Hyderabad",
    productCount: 0,
    rating: ratings[2],
    cover: cover("rang-ghar", "Rang Ghar", 2),
    banner: banner("rang-ghar", "Rang Ghar"),
  },
  {
    id: "br_05",
    slug: "kapra-co",
    name: "Kapra & Co",
    verified: true,
    tagline: "Essentials, cut well.",
    story:
      "Kapra & Co focuses on wardrobe staples: straight trousers, simple kurtas and easy layers.",
    city: "Faisalabad",
    productCount: 0,
    rating: ratings[4],
    cover: cover("kapra-co", "Kapra & Co", 4),
    banner: banner("kapra-co", "Kapra & Co"),
  },
  {
    id: "br_06",
    slug: "noor-jahan",
    name: "Noor Jahan",
    verified: true,
    tagline: "Festive wear with a quiet touch.",
    story:
      "Noor Jahan makes festive pieces with subtle embroidery, designed for comfort through long celebrations.",
    city: "Multan",
    productCount: 0,
    rating: ratings[5],
    cover: cover("noor-jahan", "Noor Jahan", 5),
    banner: banner("noor-jahan", "Noor Jahan"),
  },
];

/** Every store. Brands added below get their products from new-products.ts only. */
export const mockBrands: Brand[] = [
  ...seededBrands,
  {
    id: "br_07",
    slug: "zarveen-couture",
    name: "Zarveen Couture",
    verified: true,
    tagline: "Bridal and festive couture in rich jewel tones.",
    story:
      "Zarveen Couture makes hand-embellished lehengas, anarkalis and sarees for weddings and festive evenings, in deep maroons, plums and emeralds.",
    city: "Lahore",
    productCount: 0,
    rating: { average: 4.7, count: 3200 },
    cover: { url: "/images/A/store-cover.png", alt: "Zarveen Couture campaign", width: 524, height: 734 },
    banner: { url: "/images/A/banner.png", alt: "Zarveen Couture collection", width: 1533, height: 734 },
  },
  {
    id: "br_08",
    slug: "ruhaan-libas",
    name: "Ruhaan Libas",
    verified: true,
    tagline: "Soft pastels, fine embroidery.",
    story:
      "Ruhaan Libas designs formal wear in blush, sage and mauve, with delicate floral embroidery and light net dupattas.",
    city: "Karachi",
    productCount: 0,
    rating: { average: 4.6, count: 2100 },
    cover: { url: "/images/B/store-cover.png", alt: "Ruhaan Libas campaign", width: 524, height: 734 },
    banner: { url: "/images/B/banner.png", alt: "Ruhaan Libas collection", width: 1537, height: 734 },
  },
];
