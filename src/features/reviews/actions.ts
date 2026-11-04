"use server";

import { updateTag } from "next/cache";
import { z } from "zod";
import { cacheTags } from "@/lib/api";
import { formValues, toFieldErrors } from "@/lib/validation";
import { ReviewError, createProductReview, getProductReviews } from "@/services";
import type { ActionResult, ReviewPage, ReviewQuery } from "@/types";

const reviewSchema = z.object({
  rating: z.coerce.number().int().min(1, "Choose a star rating").max(5, "Choose a star rating"),
  title: z.string().trim().max(80, "Keep the title under 80 characters").optional(),
  body: z
    .string()
    .trim()
    .min(10, "Tell other shoppers a little more (at least 10 characters)")
    .max(1000, "Keep your review under 1000 characters"),
  size: z.string().trim().max(10).optional(),
});

export type ReviewFormState = ActionResult | null;

const ERRORS: Record<ReviewError["code"], string> = {
  "signed-out": "Please sign in to write a review.",
  "already-reviewed": "You have already reviewed this product.",
  failed: "We couldn't post your review. Please try again.",
};

/** Bound to the product slug in the form. Signed-in buyers only; the service checks the session. */
export async function submitReviewAction(slug: string, _prev: ReviewFormState, formData: FormData): Promise<ReviewFormState> {
  const parsed = reviewSchema.safeParse({
    rating: formData.get("rating") ?? 0,
    title: formData.get("title") || undefined,
    body: formData.get("body") ?? "",
    size: formData.get("size") || undefined,
  });
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please check the highlighted fields.",
      fieldErrors: toFieldErrors(parsed.error),
      values: formValues(formData),
    };
  }

  try {
    await createProductReview(slug, { ...parsed.data, rating: parsed.data.rating as 1 | 2 | 3 | 4 | 5 });
  } catch (error) {
    const code = error instanceof ReviewError ? error.code : "failed";
    return { ok: false, error: ERRORS[code], values: formValues(formData) };
  }

  // The writer sees their review (and the new average) on the next render, not a cached page.
  updateTag(cacheTags.reviews(slug));
  updateTag(cacheTags.product(slug));
  updateTag(cacheTags.products);
  return { ok: true, data: undefined, message: "Thanks! Your review is now live." };
}

/** Sort, star filter and "Show more" in the review list. Public data, read from the cache. */
export async function loadReviewsAction(slug: string, query: ReviewQuery): Promise<ReviewPage> {
  const safe: ReviewQuery = {
    sort: query.sort && ["newest", "highest", "lowest"].includes(query.sort) ? query.sort : "newest",
    rating: query.rating && query.rating >= 1 && query.rating <= 5 ? query.rating : undefined,
    page: Math.max(1, Math.floor(query.page ?? 1)),
  };
  return getProductReviews(slug, safe);
}
