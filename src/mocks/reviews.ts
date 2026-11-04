import type { ProductRating, ProductReview, ReviewInput, ReviewPage, ReviewQuery, ReviewRating, ReviewSummary } from "@/types";

const NAMES = ["Ayesha K.", "Fatima R.", "Hira S.", "Mahnoor A.", "Zainab M.", "Sana T.", "Amna B.", "Iqra H.", "Maryam N.", "Rabia J.", "Komal F.", "Noor U."];
const SIZES = ["XS", "S", "M", "L", "XL"];

const TEXTS: Record<ReviewRating, [title: string, body: string][]> = {
  5: [
    ["Exactly like the pictures", "The colour and print are exactly as shown. Fabric is soft and breathable, perfect for daily wear."],
    ["Loved it", "Stitching is neat and the fit is true to size. Got so many compliments at a family dinner."],
    ["Great quality for the price", "Delivered in 3 days and well packed. Fabric feels premium and did not shrink after the first wash."],
    ["Will order again", "Second time ordering from this brand and the quality is consistent. Highly recommended."],
  ],
  4: [
    ["Very nice, slightly long", "Beautiful piece and comfortable fabric. Sleeves were a little long for me but easy to alter."],
    ["Good buy", "Print is lovely and the colour is a shade lighter than the photo, still very pretty."],
    ["Comfortable", "Nice soft fabric, good for summer. Delivery took a day longer than promised."],
  ],
  3: [
    ["Okay", "Design is nice but the fabric is thinner than I expected. Fine for home wear."],
    ["Runs large", "Order one size down if you are between sizes. Otherwise a decent piece."],
  ],
  2: [["Colour faded", "Looked good at first but the colour faded a little after two washes."]],
  1: [["Not as shown", "The shade was quite different from the picture. The return was handled quickly though."]],
};

/** A believable spread around a high average. */
const SPREAD: ReviewRating[] = [5, 5, 5, 4, 5, 5, 3, 5, 4, 5, 5, 4, 5, 2, 5, 4, 5, 5, 1, 4];

function seededReviews(productId: string, n: number): ProductReview[] {
  const count = 6 + ((n * 7) % 19);
  return Array.from({ length: count }, (_, i): ProductReview => {
    const rating = SPREAD[(i * 7 + n) % SPREAD.length];
    const pool = TEXTS[rating];
    const [title, body] = pool[(i + n) % pool.length];
    return {
      id: `rev_${productId}_${i + 1}`,
      authorName: NAMES[(i * 5 + n) % NAMES.length],
      rating,
      title,
      body,
      size: i % 3 === 2 ? undefined : SIZES[(i + n) % SIZES.length],
      verifiedPurchase: i % 4 !== 3,
      createdAt: new Date(Date.UTC(2026, 9, 28) - (i * 4 + (n % 3)) * 86_400_000).toISOString(),
    };
  });
}

/**
 * Seeded reviews per product, plus anything submitted while the dev server
 * runs (kept in memory, gone on restart). Replaced by /v1/store/products/{slug}/reviews.
 */
const store = new Map<string, ProductReview[]>();
/** One review per buyer per product. */
const authors = new Set<string>();

function reviewsFor(productId: string): ProductReview[] {
  let list = store.get(productId);
  if (!list) {
    list = seededReviews(productId, Number(productId.replace(/\D/g, "")) || 1);
    store.set(productId, list);
  }
  return list;
}

function summarise(reviews: ProductReview[]): ReviewSummary {
  const distribution: ReviewSummary["distribution"] = [0, 0, 0, 0, 0];
  for (const r of reviews) distribution[r.rating - 1]++;
  const total = reviews.reduce((s, r) => s + r.rating, 0);
  return {
    count: reviews.length,
    average: reviews.length ? Math.round((total / reviews.length) * 10) / 10 : 0,
    distribution,
  };
}

/** Card and listing rating, read from the same reviews the product page shows. */
export function mockRating(productId: string): ProductRating {
  const { average, count } = summarise(reviewsFor(productId));
  return { average, count };
}

export function listReviews(productId: string, query: ReviewQuery = {}): ReviewPage {
  const all = reviewsFor(productId);
  const { sort = "newest", rating, page = 1, pageSize = 5 } = query;
  const filtered = all.filter((r) => !rating || r.rating === rating);
  const sorted = [...filtered].sort((a, b) => {
    if (sort === "highest" && a.rating !== b.rating) return b.rating - a.rating;
    if (sort === "lowest" && a.rating !== b.rating) return a.rating - b.rating;
    return b.createdAt.localeCompare(a.createdAt);
  });
  const start = (page - 1) * pageSize;
  return {
    items: sorted.slice(start, start + pageSize),
    page,
    total: filtered.length,
    totalPages: Math.max(1, Math.ceil(filtered.length / pageSize)),
    summary: summarise(all),
  };
}

export function hasReviewed(productId: string, customerId: string): boolean {
  return authors.has(`${productId}:${customerId}`);
}

export function addReview(productId: string, customer: { id: string; name: string }, input: ReviewInput): ProductReview {
  const [first, last] = customer.name.trim().split(/\s+/);
  const review: ProductReview = {
    id: `rev_${productId}_${Date.now()}`,
    authorName: last ? `${first} ${last[0]}.` : first,
    ...input,
    verifiedPurchase: false,
    createdAt: new Date().toISOString(),
  };
  reviewsFor(productId).unshift(review);
  authors.add(`${productId}:${customer.id}`);
  return review;
}
