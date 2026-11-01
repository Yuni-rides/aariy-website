import type { Brand } from "@/types";

const logo = (name: string) => ({ url: "/images/placeholders/brand.svg", alt: `${name} logo`, width: 200, height: 200 });
const banner = (name: string) => ({ url: "/images/placeholders/banner.svg", alt: `${name} collection`, width: 1600, height: 600 });
const cover = (name: string, i: number) => ({
  url: `/images/placeholders/store-${(i % 4) + 1}.svg`,
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

const BRAND_NAMES = ["Zara Noor", "Mehr Studio", "Rang Ghar", "Saba Atelier", "Kapra & Co", "Noor Jahan"];

/** Placeholder brands for the static phase. Replaced by /v1/store/brands. */
export const mockBrands: Brand[] = [
  {
    id: "br_01",
    slug: "zara-noor",
    name: "Zara Noor",
    verified: true,
    tagline: "Everyday lawn, made in Lahore.",
    story:
      "Zara Noor started as a small studio in Lahore making hand-finished lawn kurtas for friends and family. Today the label works with local artisans on block prints and thread work.",
    city: "Lahore",
    productCount: 0,
    rating: ratings[0],
    cover: cover(BRAND_NAMES[0], 0),
    logo: logo("Zara Noor"),
    banner: banner("Zara Noor"),
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
