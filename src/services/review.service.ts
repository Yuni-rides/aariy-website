import { cacheLife, cacheTag } from "next/cache";
import { useMocks } from "@/config/env";
import { ApiError, apiClient, cacheTags, endpoints } from "@/lib/api";
import { getSessionToken } from "@/lib/session";
import * as mock from "@/mocks/handlers";
import type { ProductReview, ReviewInput, ReviewPage, ReviewQuery } from "@/types";
import { getCurrentCustomer } from "./auth.service";

/**
 * Product reviews. Reading is public and cached per product; writing needs
 * a signed-in buyer, and the server action expires the product's tag so
 * the new review shows straight away.
 */

const EMPTY: ReviewPage = {
  items: [],
  page: 1,
  total: 0,
  totalPages: 1,
  summary: { average: 0, count: 0, distribution: [0, 0, 0, 0, 0] },
};

export async function getProductReviews(slug: string, query: ReviewQuery = {}): Promise<ReviewPage> {
  "use cache";
  cacheLife("minutes");
  cacheTag(cacheTags.reviews(slug));
  if (useMocks) return mock.listProductReviews(slug, query) ?? EMPTY;
  return apiClient.get(endpoints.productReviews(slug), { query: { ...query } });
}

/** What the "Write a review" block shows. Per-user: call inside <Suspense>. */
export type ReviewEligibility = "signed-out" | "can-review" | "already-reviewed";

export async function getReviewEligibility(slug: string): Promise<ReviewEligibility> {
  const customer = await getCurrentCustomer();
  if (!customer) return "signed-out";
  if (useMocks) return mock.hasReviewedProduct(slug, customer.id) ? "already-reviewed" : "can-review";
  const token = await getSessionToken();
  const { reviewed } = await apiClient
    .get<{ reviewed: boolean }>(endpoints.myProductReview(slug), { token })
    .catch(() => ({ reviewed: false }));
  return reviewed ? "already-reviewed" : "can-review";
}

export class ReviewError extends Error {
  constructor(public code: "signed-out" | "already-reviewed" | "failed") {
    super(code);
    this.name = "ReviewError";
  }
}

export async function createProductReview(slug: string, input: ReviewInput): Promise<ProductReview> {
  const customer = await getCurrentCustomer();
  if (!customer) throw new ReviewError("signed-out");
  if (useMocks) {
    if (mock.hasReviewedProduct(slug, customer.id)) throw new ReviewError("already-reviewed");
    return mock.createProductReview(slug, customer, input);
  }
  try {
    return await apiClient.post(endpoints.productReviews(slug), input, { token: await getSessionToken() });
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) throw new ReviewError("signed-out");
    if (error instanceof ApiError && error.status === 409) throw new ReviewError("already-reviewed");
    throw new ReviewError("failed");
  }
}
