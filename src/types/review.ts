export type ReviewRating = 1 | 2 | 3 | 4 | 5;

export type ProductReview = {
  id: string;
  /** Shown as "Ayesha K."; the API never sends a buyer's full name or phone. */
  authorName: string;
  rating: ReviewRating;
  title?: string;
  body: string;
  /** Size the buyer ordered, when they said. */
  size?: string;
  /** The buyer has a delivered order containing this product. */
  verifiedPurchase: boolean;
  createdAt: string;
};

export type ReviewSummary = {
  average: number;
  count: number;
  /** Reviews per star: index 0 = 1 star … index 4 = 5 stars. */
  distribution: [number, number, number, number, number];
};

export type ReviewSort = "newest" | "highest" | "lowest";

export type ReviewQuery = {
  sort?: ReviewSort;
  /** Only reviews with this many stars. */
  rating?: ReviewRating;
  page?: number;
  pageSize?: number;
};

export type ReviewPage = {
  items: ProductReview[];
  page: number;
  totalPages: number;
  /** Reviews matching the current star filter. */
  total: number;
  summary: ReviewSummary;
};

export type ReviewInput = {
  rating: ReviewRating;
  title?: string;
  body: string;
  size?: string;
};
