/**
 * ADD PRODUCTS HERE (mock data, until brands upload through the API).
 *
 * 1. Put the photo in public/images/<folder>/ (e.g. public/images/mens/).
 * 2. Copy one block below to the TOP of the list and change its values.
 *    The top of the list counts as the newest product.
 * 3. Restart the dev server if a home page section still shows the old list.
 *
 * brand:    the brand's slug, as in /brands/<slug> (see mocks/brands.ts).
 * category: the page's address after /categories/, as in
 *           /categories/men/clothing/eastern-wear/waistcoats (see mocks/categories.ts).
 *           It also decides the Men / Women / Kids tab.
 * price:    selling price in rupees. oldPrice (optional) shows it as on sale.
 * images:   first photo is the main one; add more for the product gallery.
 * isNew:    true puts it in New Arrivals and New In, with the "New" badge.
 * sizes:    optional; defaults depend on Men / Women / Kids (see products.ts).
 */
export type NewProduct = {
  name: string;
  brand: string;
  category: string;
  price: number;
  oldPrice?: number;
  images: string[];
  color: string;
  fabric: string;
  occasion: string;
  isNew?: boolean;
  description?: string;
  sizes?: string[];
};

export const newProducts: NewProduct[] = [
  /* Men */
  {
    name: "Black Embroidered Waistcoat Set",
    brand: "mehr-studio",
    category: "men/clothing/eastern-wear/waistcoats",
    price: 16500,
    images: ["/images/mens/coat1.jpg"],
    color: "Black",
    fabric: "Jacquard",
    occasion: "Festive",
    isNew: true,
    description: "Tone-on-tone embroidered waistcoat over a cream kurta and shalwar, for weddings and festive evenings.",
  },
  {
    name: "Brown Textured Waistcoat",
    brand: "kapra-co",
    category: "men/clothing/eastern-wear/waistcoats",
    price: 8990,
    oldPrice: 10990,
    images: ["/images/mens/coat2.jpg"],
    color: "Brown",
    fabric: "Wool Blend",
    occasion: "Semi-formal",
    isNew: true,
    description: "A textured brown waistcoat with patch pockets and metal buttons. Wear it over any plain kurta.",
  },
  {
    name: "White Classic Kurta Pajama",
    brand: "kapra-co",
    category: "men/clothing/eastern-wear/kurta-shalwar",
    price: 5490,
    images: ["/images/mens/kurta1.jpg"],
    color: "White",
    fabric: "Cotton",
    occasion: "Everyday",
    isNew: true,
    description: "A clean white kurta with a chest pocket and matching straight pajama, cut for everyday comfort.",
  },
  {
    name: "Taupe Chikankari Kurta Shalwar",
    brand: "rang-ghar",
    category: "men/clothing/eastern-wear/kurta-shalwar",
    price: 12500,
    images: ["/images/mens/kurta2.jpg"],
    color: "Taupe",
    fabric: "Cotton",
    occasion: "Festive",
    isNew: true,
    description: "All-over chikankari with a hand-worked placket, paired with a white shalwar.",
  },
  {
    name: "Cream Textured Prince Coat",
    brand: "saba-atelier",
    category: "men/clothing/eastern-wear/prince-coats",
    price: 28500,
    images: ["/images/mens/princecoat.jpg"],
    color: "Cream",
    fabric: "Jacquard",
    occasion: "Wedding",
    isNew: true,
    description: "A textured cream prince coat with antique gold buttons, worn open over a matching kurta.",
  },
  {
    name: "Brown Tweed Prince Coat",
    brand: "mehr-studio",
    category: "men/clothing/eastern-wear/prince-coats",
    price: 24500,
    oldPrice: 27500,
    images: ["/images/mens/princecoat2.jpg"],
    color: "Brown",
    fabric: "Tweed",
    occasion: "Semi-formal",
    isNew: true,
    description: "A warm brown tweed prince coat with a contrast velvet collar and copper buttons.",
  },

  /* Kids */
  {
    name: "Mustard Mirror Work Gharara Set",
    brand: "noor-jahan",
    category: "kids/girls/gharara-sharara",
    price: 6990,
    images: ["/images/kids/kids1.jpg"],
    color: "Mustard",
    fabric: "Raw Silk",
    occasion: "Festive",
    isNew: true,
    description: "A mustard shirt with puff sleeves and mirror work, over a gold textured gharara.",
  },
  {
    name: "Teal Organza Sharara Set",
    brand: "saba-atelier",
    category: "kids/girls/gharara-sharara",
    price: 11500,
    images: ["/images/kids/kids2.jpg"],
    color: "Teal",
    fabric: "Organza",
    occasion: "Wedding",
    isNew: true,
    description: "A hand-finished organza shirt with an embellished border, sharara and dupatta.",
  },
  {
    name: "Maroon Embroidered 2 Piece",
    brand: "maria-b",
    category: "kids/girls/2-piece",
    price: 5490,
    images: ["/images/kids/kids3.jpg"],
    color: "Maroon",
    fabric: "Cotton",
    occasion: "Everyday",
    isNew: true,
    description: "A soft maroon shirt and trousers with golden embroidery on the sleeves and hem.",
  },
  {
    name: "Aqua Printed 3 Piece",
    brand: "rang-ghar",
    category: "kids/girls/3-piece",
    price: 4790,
    oldPrice: 5690,
    images: ["/images/kids/kids4.jpg"],
    color: "Aqua",
    fabric: "Lawn",
    occasion: "Everyday",
    isNew: true,
    description: "A printed lawn shirt and trousers with a matching dupatta, light enough for summer.",
  },
  {
    name: "Brown Boys Kameez Shalwar",
    brand: "kapra-co",
    category: "kids/boys/kameez-shalwar",
    price: 3990,
    images: ["/images/kids/kids5.jpg"],
    color: "Brown",
    fabric: "Wash & Wear",
    occasion: "Everyday",
    isNew: true,
    description: "A classic brown kameez shalwar with fine contrast stitching on the placket and cuffs.",
  },
  {
    name: "Blue Block Print Boys Kurta",
    brand: "mehr-studio",
    category: "kids/boys/kurta",
    price: 2990,
    images: ["/images/kids/kids6.jpg"],
    color: "Blue",
    fabric: "Cotton",
    occasion: "Everyday",
    isNew: true,
    description: "A block print cotton kurta with a band collar, paired with white pajama.",
  },
];
