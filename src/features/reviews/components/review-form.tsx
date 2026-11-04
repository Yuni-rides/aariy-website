"use client";

import { AnimatePresence, m } from "framer-motion";
import { useActionState, useState } from "react";
import { StarIcon } from "@/components/icons";
import { Button, Field, Input, Select, Textarea } from "@/components/ui";
import { cn } from "@/lib/utils";
import { submitReviewAction, type ReviewFormState } from "../actions";

const LABELS = ["Poor", "Fair", "Good", "Very good", "Excellent"];

function StarPicker({ defaultValue, error }: { defaultValue?: number; error?: string }) {
  const [value, setValue] = useState(defaultValue ?? 0);
  const [hover, setHover] = useState(0);
  const shown = hover || value;

  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium">Your rating</legend>
      <div className="flex items-center gap-3">
        <div className="flex" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((star) => (
            <label key={star} className="cursor-pointer p-0.5" onMouseEnter={() => setHover(star)}>
              <input
                type="radio"
                name="rating"
                value={star}
                checked={value === star}
                onChange={() => setValue(star)}
                aria-describedby={error ? "rating-error" : undefined}
                className="peer sr-only"
              />
              <span className="sr-only">
                {star} {star === 1 ? "star" : "stars"}
              </span>
              <StarIcon
                width={30}
                height={30}
                aria-hidden
                className={cn(
                  "rounded-sm transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-accent",
                  star <= shown ? "text-accent" : "text-line",
                )}
              />
            </label>
          ))}
        </div>
        <span className="text-sm text-muted">{shown ? LABELS[shown - 1] : ""}</span>
      </div>
      {error && (
        <p id="rating-error" role="alert" className="mt-1.5 text-xs text-danger">
          {error}
        </p>
      )}
    </fieldset>
  );
}

/** "Write a review" for a signed-in buyer: opens in place, posts through a server action. */
export function ReviewForm({ slug, sizes }: { slug: string; sizes: string[] }) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState<ReviewFormState, FormData>(submitReviewAction.bind(null, slug), null);
  const errors = state && !state.ok ? (state.fieldErrors ?? {}) : {};
  const values = state && !state.ok ? (state.values ?? {}) : {};

  if (state?.ok) {
    return (
      <p role="status" className="rounded-card bg-success/10 p-4 text-sm text-success">
        {state.message}
      </p>
    );
  }

  return (
    <div>
      {!open && (
        <Button variant="secondary" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="review-form">
          Write a review
        </Button>
      )}
      <AnimatePresence initial={false}>
        {open && (
          <m.form
            id="review-form"
            action={formAction}
            noValidate
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-5 rounded-card border border-line bg-surface p-5 md:p-6">
              <p className="font-display text-2xl">Write a review</p>
              {state && !state.ok && !state.fieldErrors && (
                <p role="alert" className="text-sm text-danger">
                  {state.error}
                </p>
              )}
              <StarPicker key={values.rating} defaultValue={Number(values.rating) || undefined} error={errors.rating} />
              <div className="grid gap-4 sm:grid-cols-[1fr_10rem]">
                <Field label="Title (optional)" name="title" error={errors.title}>
                  <Input name="title" defaultValue={values.title} maxLength={80} placeholder="Sum it up in a few words" error={errors.title} />
                </Field>
                <Field label="Size you bought" name="size">
                  <Select name="size" defaultValue={values.size ?? ""}>
                    <option value="">Not sure</option>
                    {sizes.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </Select>
                </Field>
              </div>
              <Field label="Your review" name="body" error={errors.body} hint="How was the fabric, fit and colour?">
                <Textarea name="body" defaultValue={values.body} maxLength={1000} required error={errors.body} />
              </Field>
              <div className="flex flex-wrap items-center gap-3">
                <Button type="submit" disabled={pending}>
                  {pending ? "Posting…" : "Post review"}
                </Button>
                <Button variant="ghost" onClick={() => setOpen(false)} disabled={pending}>
                  Cancel
                </Button>
              </div>
            </div>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}
