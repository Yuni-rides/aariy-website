import type { Brand } from "@/types";

const banner = (name: string) => ({
  url: "/images/brands/maria-b/banner.webp",
  alt: `${name} collection`,
  width: 1467,
  height: 700,
});
const cover = (name: string, i: number) => ({
  url: `/images/brands/maria-b/store-cover-${(i % 2) + 1}.webp`,
  alt: `${name} campaign`,
  width: 500,
  height: 700,
});
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
    cover: cover("Mehr Studio", 1),
    banner: banner("Mehr Studio"),
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
    cover: cover("Rang Ghar", 2),
    banner: banner("Rang Ghar"),
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
    cover: cover("Kapra & Co", 4),
    banner: banner("Kapra & Co"),
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
  {
    id: "br_09",
    slug: "mahpara-couture",
    name: "Mahpara Couture",
    verified: true,
    tagline: "Heritage embroidery in deep, rich colour.",
    story:
      "Mahpara Couture makes formal wear with gold and floral handwork, from angrakha anarkalis to embellished sarees, in wine, olive and bottle green.",
    city: "Islamabad",
    productCount: 0,
    rating: { average: 4.8, count: 2700 },
    cover: { url: "/images/C/store-cover.png", alt: "Mahpara Couture campaign", width: 800, height: 1120 },
    banner: { url: "/images/C/banner.png", alt: "Mahpara Couture collection", width: 6144, height: 2936 },
  },
  {
    id: "br_10",
    slug: "naqsh-e-gul",
    name: "Naqsh-e-Gul",
    verified: true,
    tagline: "Floral handwork for every celebration.",
    story:
      "Naqsh-e-Gul makes formal and festive wear covered in floral embroidery, from velvet lehengas to light lavender anarkalis.",
    city: "Lahore",
    productCount: 0,
    rating: { average: 4.7, count: 1900 },
    cover: { url: "/images/D/store-cover.jpg", alt: "Naqsh-e-Gul campaign", width: 600, height: 840 },
    banner: { url: "/images/D/banner.png", alt: "Naqsh-e-Gul collection", width: 6144, height: 2936 },

  },
];
