import { Suspense } from "react";
import { ButtonLink, Skeleton } from "@/components/ui";
import { routes } from "@/config/routes";
import { getProductReviews, getReviewEligibility } from "@/services";
import { ReviewForm } from "./review-form";
import { ReviewList } from "./review-list";

/** Reads the session, so it streams in behind its own boundary while the reviews stay in the static shell. */
async function WriteReview({ slug, sizes }: { slug: string; sizes: string[] }) {
  const eligibility = await getReviewEligibility(slug);
  if (eligibility === "already-reviewed") {
    return <p className="text-sm text-muted">You have reviewed this product. Thank you!</p>;
  }
  if (eligibility === "signed-out") {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <ButtonLink variant="secondary" href={routes.login(`${routes.product(slug)}#reviews`)}>
          Sign in to write a review
        </ButtonLink>
        <p className="text-xs text-muted">Only signed-in shoppers can post reviews.</p>
      </div>
    );
  }
  return <ReviewForm slug={slug} sizes={sizes} />;
}

/** LAAM-style reviews block on the product page: summary, star filter, list, and "Write a review". */
export async function ProductReviews({ slug, sizes }: { slug: string; sizes: string[] }) {
  const firstPage = await getProductReviews(slug);
  const { count } = firstPage.summary;

  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="container-site mt-24 scroll-mt-24">
      <div className="mb-8 flex flex-col gap-5 border-b border-line pb-8 sm:flex-row sm:items-start sm:justify-between">
        <h2 id="reviews-heading" className="font-display text-3xl md:text-4xl">
          Customer reviews
        </h2>
        <Suspense fallback={<Skeleton className="h-11 w-48" />}>
          <WriteReview slug={slug} sizes={sizes} />
        </Suspense>
      </div>
      {count === 0 ? (
        <p className="text-sm text-muted">No reviews yet. Be the first to share what you think.</p>
      ) : (
        // Remount when the count changes, so a new review shows without stale client state.
        <ReviewList key={count} slug={slug} initial={firstPage} />
      )}
    </section>
  );
}
