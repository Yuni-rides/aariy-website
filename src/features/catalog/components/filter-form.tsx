"use client";

import Form from "next/form";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { Button } from "@/components/ui";
import { toArray } from "@/lib/utils";
import type { ProductFacets } from "@/types";
import { PRICE_RANGES, SORT_OPTIONS, type SearchParams } from "../lib/filters";

type FilterFormProps = {
  facets: ProductFacets;
  params: SearchParams;
  total: number;
};

/**
 * A plain GET form: filters live in the URL, so every state is shareable,
 * crawlable and works without JavaScript. With JS, next/form navigates
 * client-side and each change submits immediately.
 */
export function FilterForm({ facets, params, total }: FilterFormProps) {
  const pathname = usePathname();
  const formRef = useRef<HTMLFormElement>(null);
  const selectedSizes = toArray(params.size);
  const selectedPrice = typeof params.price === "string" ? params.price : "";
  const submit = () => formRef.current?.requestSubmit();

  return (
    <Form ref={formRef} action={pathname} scroll={false} className="flex flex-col gap-8" onChange={submit}>
      {typeof params.q === "string" && <input type="hidden" name="q" value={params.q} />}

      <div className="flex items-center justify-between gap-4 lg:flex-col lg:items-stretch">
        <p className="text-sm text-muted" aria-live="polite">
          {total} {total === 1 ? "product" : "products"}
        </p>
        <label className="flex items-center gap-2 text-sm">
          <span className="text-muted">Sort</span>
          <select
            name="sort"
            defaultValue={typeof params.sort === "string" ? params.sort : "newest"}
            className="h-10 rounded-md border border-line bg-surface px-2"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <fieldset>
        <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted">Size</legend>
        <div className="flex flex-wrap gap-2">
          {facets.sizes.map((size) => (
            <label key={size.value} className="cursor-pointer">
              <input
                type="checkbox"
                name="size"
                value={size.value}
                defaultChecked={selectedSizes.includes(size.value)}
                className="peer sr-only"
              />
              <span className="inline-flex h-10 min-w-12 items-center justify-center rounded-md border border-line px-3 text-sm peer-checked:border-ink peer-checked:bg-ink peer-checked:text-bg peer-focus-visible:outline-2 peer-focus-visible:outline-accent">
                {size.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted">Price</legend>
        <div className="flex flex-col gap-2.5">
          <label className="flex items-center gap-2.5 text-sm">
            <input type="radio" name="price" value="" defaultChecked={!selectedPrice} className="accent-accent" />
            Any price
          </label>
          {PRICE_RANGES.map((range) => (
            <label key={range.value} className="flex items-center gap-2.5 text-sm">
              <input
                type="radio"
                name="price"
                value={range.value}
                defaultChecked={selectedPrice === range.value}
                className="accent-accent"
              />
              {range.label}
            </label>
          ))}
        </div>
      </fieldset>

      <noscript>
        <Button type="submit" fullWidth>
          Apply filters
        </Button>
      </noscript>
    </Form>
  );
}
