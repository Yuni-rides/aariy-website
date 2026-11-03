import type { Brand } from "@/types";

const logo = (name: string) => ({ url: "/images/placeholders/brand.svg", alt: `${name} logo`, width: 200, height: 200 });
// Every brand reuses the Maria B Figma banner until real artwork arrives.
const banner = (name: string) => ({ url: "/images/brands/maria-b/banner.webp", alt: `${name} collection`, width: 1467, height: 700 });
// Portrait crops of the same banner, alternating per brand.
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

const BRAND_NAMES = ["Maria B", "Mehr Studio", "Rang Ghar", "Saba Atelier", "Kapra & Co", "Noor Jahan"];

/** Placeholder brands for the static phase. Replaced by /v1/store/brands. */
export const mockBrands: Brand[] = [
  {
    id: "br_01",
    slug: "maria-b",
    name: "Maria B",
    verified: true,
    tagline: "Luxury pret and festive wear.",
    story:
      "Maria B designs ready-to-wear and festive collections with signature embroidery, for women and kids.",
    city: "Lahore",
    productCount: 0,
    rating: ratings[0],
    cover: cover(BRAND_NAMES[0], 0),
    logo: logo("Maria B"),
    banner: banner("Maria B"),
  },
  {
    id: "br_02",
    slug: "mehr-studio",
    name: "Mehr Studio",
    verified: true,
    tagline: "Modern co-ords for the city.",
    story: "Mehr Studio designs relaxed co-ord sets that move from office to evening, in breathable cotton and linen blends.",
    city: "Karachi",
    productCount: 0,
    rating: ratings[1],
    cover: cover(BRAND_NAMES[1], 1),
    logo: logo("Mehr Studio"),
    banner: banner("Mehr Studio"),
  },
  {
    id: "br_03",
    slug: "rang-ghar",
    name: "Rang Ghar",
    verified: true,
    tagline: "Colour, print and heritage craft.",
    story: "Rang Ghar revives traditional dyeing techniques from Sindh and Punjab in contemporary silhouettes.",
    city: "Hyderabad",
    productCount: 0,
    rating: ratings[2],
    cover: cover(BRAND_NAMES[2], 2),
    logo: logo("Rang Ghar"),
    banner: banner("Rang Ghar"),
  },
  {
    id: "br_04",
    slug: "saba-atelier",
    name: "Saba Atelier",
    verified: true,
    tagline: "Occasion formals, finished by hand.",
    story: "Saba Atelier creates formal wear with hand embellishment for weddings and festive evenings.",
    city: "Islamabad",
    productCount: 0,
    rating: ratings[3],
    cover: cover(BRAND_NAMES[3], 3),
    logo: logo("Saba Atelier"),
    banner: banner("Saba Atelier"),
  },
  {
    id: "br_05",
    slug: "kapra-co",
    name: "Kapra & Co",
    verified: true,
    tagline: "Essentials, cut well.",
    story: "Kapra & Co focuses on wardrobe staples: straight trousers, simple kurtas and easy layers.",
    city: "Faisalabad",
    productCount: 0,
    rating: ratings[4],
    cover: cover(BRAND_NAMES[4], 4),
    logo: logo("Kapra & Co"),
    banner: banner("Kapra & Co"),
  },
  {
    id: "br_06",
    slug: "noor-jahan",
    name: "Noor Jahan",
    verified: true,
    tagline: "Festive wear with a quiet touch.",
    story: "Noor Jahan makes festive pieces with subtle embroidery, designed for comfort through long celebrations.",
    city: "Multan",
    productCount: 0,
    rating: ratings[5],
    cover: cover(BRAND_NAMES[5], 5),
    logo: logo("Noor Jahan"),
    banner: banner("Noor Jahan"),
  },
];
