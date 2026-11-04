"use client";

import { useState, useTransition } from "react";
import { ShieldIcon } from "@/components/icons";
import { Button } from "@/components/ui";
import { formatDate } from "@/lib/date";
import { cn } from "@/lib/utils";
import type { ProductReview, ReviewPage, ReviewRating, ReviewSort } from "@/types";
import { loadReviewsAction } from "../actions";
import { RatingStars } from "./rating-stars";

const SORTS: { value: ReviewSort; label: string }[] = [
  { value: "newest", label: "Most recent" },
  { value: "highest", label: "Highest rated" },
  { value: "lowest", label: "Lowest rated" },
];

function ReviewItem({ review }: { review: ProductReview }) {
  return (
    <li className="flex flex-col gap-2 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <RatingStars value={review.rating} size={15} />
        <time dateTime={review.createdAt} className="text-xs text-muted">
          {formatDate(review.createdAt)}
        </time>
      </div>
      {review.title && <p className="font-medium">{review.title}</p>}
      <p className="text-sm leading-relaxed text-ink/80">{review.body}</p>
      <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
        <span className="font-medium text-ink">{review.authorName}</span>
        {review.verifiedPurchase && (
          <span className="inline-flex items-center gap-1 text-success">
            <ShieldIcon width={13} height={13} aria-hidden />
            Verified purchase
          </span>
        )}
        {review.size && <span>Size bought: {review.size}</span>}
      </p>
    </li>
  );
}

/**
 * Star breakdown (each bar filters the list), sort, and "Show more".
 * The first page arrives with the cached product page; later pages and
 * filters are fetched on demand.
 */
export function ReviewList({ slug, initial }: { slug: string; initial: ReviewPage }) {
  const [sort, setSort] = useState<ReviewSort>("newest");
  const [rating, setRating] = useState<ReviewRating | undefined>();
  const [data, setData] = useState(initial);
  const [items, setItems] = useState(initial.items);
  const [pending, startTransition] = useTransition();
  const { summary } = initial;

  function load(next: { sort: ReviewSort; rating?: ReviewRating; page: number }) {
    startTransition(async () => {
      const page = await loadReviewsAction(slug, next);
      setData(page);
      setItems((prev) => (next.page === 1 ? page.items : [...prev, ...page.items]));
    });
  }

  function changeFilter(next: { sort?: ReviewSort; rating?: ReviewRating }) {
    const s = next.sort ?? sort;
    const r = "rating" in next ? next.rating : rating;
    setSort(s);
    setRating(r);
    load({ sort: s, rating: r, page: 1 });
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[18rem_1fr] lg:gap-16">
      <div className="flex flex-col gap-5">
        <div className="flex items-end gap-3">
          <p className="font-display text-5xl leading-none">{summary.average.toFixed(1)}</p>
          <div className="flex flex-col gap-1 pb-0.5">
            <RatingStars value={summary.average} size={18} />
            <p className="text-xs text-muted">
              Based on {summary.count} {summary.count === 1 ? "review" : "reviews"}
            </p>
          </div>
        </div>
        <ul className="flex flex-col gap-1.5" aria-label="Filter reviews by stars">
          {([5, 4, 3, 2, 1] as ReviewRating[]).map((star) => {
            const count = summary.distribution[star - 1];
            const share = summary.count ? (count / summary.count) * 100 : 0;
            const active = rating === star;
            return (
              <li key={star}>
                <button
                  type="button"
                  disabled={count === 0}
                  aria-pressed={active}
                  onClick={() => changeFilter({ rating: active ? undefined : star })}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-md px-2 py-1 text-xs transition-colors hover:bg-subtle disabled:pointer-events-none disabled:opacity-50",
                    active && "bg-subtle font-medium",
                  )}
                >
                  <span className="w-8 shrink-0 text-left">{star} ★</span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
                    <span className="block h-full rounded-full bg-accent" style={{ width: `${share}%` }} />
                  </span>
                  <span className="w-6 shrink-0 text-right tabular-nums text-muted">{count}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div aria-busy={pending}>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
          <p className="text-sm text-muted">
            {rating ? `${data.total} ${rating}-star ${data.total === 1 ? "review" : "reviews"}` : `${summary.count} reviews`}
            {rating && (
              <button type="button" onClick={() => changeFilter({ rating: undefined })} className="ml-2 underline underline-offset-4 hover:text-ink">
                Show all
              </button>
            )}
          </p>
          <label className="flex items-center gap-2 text-sm">
            <span className="text-muted">Sort by</span>
            <select
              value={sort}
              onChange={(e) => changeFilter({ sort: e.target.value as ReviewSort })}
              className="h-9 rounded-md border border-line bg-surface px-2 text-sm focus:border-ink focus:outline-none"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <ul className={cn("divide-y divide-line transition-opacity", pending && "opacity-60")}>
          {items.map((r) => (
            <ReviewItem key={r.id} review={r} />
          ))}
        </ul>

        {data.page < data.totalPages && (
          <Button variant="secondary" disabled={pending} onClick={() => load({ sort, rating, page: data.page + 1 })} className="mt-2">
            {pending ? "Loading…" : "Show more reviews"}
          </Button>
        )}
      </div>
    </div>
  );
}
