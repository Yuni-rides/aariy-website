"use client";

import { AnimatePresence, m } from "framer-motion";
import Form from "next/form";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon, FilterIcon, ImageSearchIcon, SearchIcon } from "@/components/icons";
import { routes } from "@/config/routes";
import { PRICE_RANGES } from "@/features/catalog/lib/filters";
import { toMajor } from "@/lib/money";
import { cn } from "@/lib/utils";
import type { ProductSummary } from "@/types";
import { NewArrivalCard } from "./new-arrival-card";

type FilterKey = "category" | "fabric" | "size" | "brand" | "price" | "color" | "occasion";
type SortKey = "recommended" | "new" | "top-rated" | "budget";
type Option = { value: string; label: string };

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "category", label: "Category" },
  { key: "fabric", label: "Fabric" },
  { key: "size", label: "Size" },
  { key: "brand", label: "Brands" },
  { key: "price", label: "Price" },
  { key: "color", label: "Color" },
  { key: "occasion", label: "Occasions" },
];

const SORTS: { value: SortKey; label: string }[] = [
  { value: "recommended", label: "Recommended" },
  { value: "new", label: "New In" },
  { value: "top-rated", label: "Top rated" },
  { value: "budget", label: "Budget" },
];

const SIZE_ORDER = ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y", "XS", "S", "M", "L", "XL"];
const EASE = [0.22, 1, 0.36, 1] as const;
const EMPTY: Record<FilterKey, string[]> = {
  category: [],
  fabric: [],
  size: [],
  brand: [],
  price: [],
  color: [],
  occasion: [],
};

function priceBucket(product: ProductSummary) {
  const amount = toMajor(product.price);
  return PRICE_RANGES.find((r) => {
    const [min, max] = r.value.split("-");
    return amount >= Number(min) && (!max || amount < Number(max));
  })?.value;
}

function valuesOf(product: ProductSummary, key: FilterKey): string[] {
  switch (key) {
    case "size":
      return product.sizes;
    case "brand":
      return [product.brand.name];
    case "price":
      return [priceBucket(product) ?? ""];
    default:
      return [product[key]];
  }
}

function optionsFor(products: ProductSummary[], key: FilterKey): Option[] {
  if (key === "price") return PRICE_RANGES;
  const values = [...new Set(products.flatMap((p) => valuesOf(p, key)))];
  values.sort(key === "size" ? (a, b) => SIZE_ORDER.indexOf(a) - SIZE_ORDER.indexOf(b) : undefined);
  return values.map((value) => ({ value, label: value }));
}

function sortProducts(products: ProductSummary[], sort: SortKey) {
  const list = [...products];
  switch (sort) {
    case "recommended":
      return list.sort((a, b) => (b.rating?.count ?? 0) - (a.rating?.count ?? 0));
    case "new":
      return list.filter((p) => p.isNew);
    case "top-rated":
      return list.sort((a, b) => (b.rating?.average ?? 0) - (a.rating?.average ?? 0));
    case "budget":
      return list.sort((a, b) => a.price.amount - b.price.amount);
  }
}

/**
 * Figma "Trending products": filter chips (each a dropdown of checkboxes),
 * Recommended / New In / Top rated / Budget tabs, a four-column grid, and a
 * blurred teaser row fading out under a floating search bar.
 * Filtering runs on the products already on the page; no extra requests.
 */
export function TrendingProducts({ products, limit = 8 }: { products: ProductSummary[]; limit?: number }) {
  const [sort, setSort] = useState<SortKey>("recommended");
  const [selected, setSelected] = useState(EMPTY);
  const [open, setOpen] = useState<FilterKey | null>(null);
  const filtersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!filtersRef.current?.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const filtered = products.filter((p) =>
    FILTERS.every(({ key }) => selected[key].length === 0 || valuesOf(p, key).some((v) => selected[key].includes(v))),
  );
  const sorted = sortProducts(filtered, sort);
  const visible = sorted.slice(0, limit);
  const teaser = sorted.slice(limit, limit + 4);
  const activeCount = FILTERS.reduce((n, { key }) => n + selected[key].length, 0);

  const toggle = (key: FilterKey, value: string) =>
    setSelected((s) => {
      const has = s[key].includes(value);
      // Price buckets don't overlap, so only one can be picked.
      const next = has ? s[key].filter((v) => v !== value) : key === "price" ? [value] : [...s[key], value];
      return { ...s, [key]: next };
    });

  return (
    <section aria-labelledby="trending-products" className="container-site">
      <h2 id="trending-products" className="text-2xl font-semibold md:text-3xl">
        Trending products
      </h2>

      <div ref={filtersRef} className="mt-4 flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={() => setSelected(EMPTY)}
          disabled={activeCount === 0}
          aria-label={activeCount ? `Clear ${activeCount} filters` : "Filters"}
          className="relative inline-flex size-10 items-center justify-center rounded-lg border border-line bg-surface shadow-pill transition-colors enabled:hover:border-ink"
        >
          <FilterIcon width={18} height={18} />
          {activeCount > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex size-4.5 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-accent-ink">
              {activeCount}
            </span>
          )}
        </button>

        {FILTERS.map(({ key, label }) => {
          const count = selected[key].length;
          const isOpen = open === key;
          return (
            <div key={key} className="relative">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : key)}
                aria-expanded={isOpen}
                aria-controls={`trending-filter-${key}`}
                className={cn(
                  "inline-flex h-10 items-center gap-2 rounded-lg border bg-surface px-3 text-sm shadow-pill transition-colors",
                  count || isOpen ? "border-ink" : "border-line hover:border-ink",
                )}
              >
                {label}
                {count > 0 && <span className="text-accent">({count})</span>}
                <ChevronDownIcon
                  width={16}
                  height={16}
                  className={cn("transition-transform duration-300", isOpen && "rotate-180")}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <m.fieldset
                    id={`trending-filter-${key}`}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2, ease: EASE }}
                    className="absolute left-0 top-full z-30 mt-2 max-h-72 min-w-52 overflow-y-auto rounded-xl border border-line bg-surface p-2 shadow-pill"
                  >
                    <legend className="sr-only">{label}</legend>
                    {optionsFor(products, key).map((option) => (
                      <label
                        key={option.value}
                        className="flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-sm hover:bg-subtle"
                      >
                        <input
                          type="checkbox"
                          checked={selected[key].includes(option.value)}
                          onChange={() => toggle(key, option.value)}
                          className="size-4 accent-accent"
                        />
                        {option.label}
                      </label>
                    ))}
                  </m.fieldset>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div role="group" aria-label="Sort trending products" className="mt-5 flex gap-6 text-sm">
        {SORTS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setSort(option.value)}
            aria-pressed={sort === option.value}
            className={cn(
              "py-1 transition-colors",
              sort === option.value ? "font-medium text-ink" : "text-muted hover:text-ink",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <m.ul
          key={`${sort}|${JSON.stringify(selected)}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="mt-4 grid grid-cols-2 gap-x-4 gap-y-7 md:grid-cols-4 md:gap-x-6"
        >
          {visible.map((product) => (
            <li key={product.id}>
              <NewArrivalCard product={product} />
            </li>
          ))}
          {visible.length === 0 && (
            <li className="col-span-full py-10 text-center text-sm text-muted">
              No products match these filters.{" "}
              <button type="button" onClick={() => setSelected(EMPTY)} className="text-ink underline">
                Clear filters
              </button>
            </li>
          )}
        </m.ul>
      </AnimatePresence>

      <div className={cn("relative", teaser.length > 0 ? "mt-7" : "mt-10")}>
        {teaser.length > 0 && (
          <>
            <ul
              aria-hidden
              inert
              className="pointer-events-none grid select-none grid-cols-2 gap-x-4 blur-[6px] md:grid-cols-4 md:gap-x-6"
            >
              {teaser.map((product) => (
                <li key={product.id} className="max-h-48 overflow-hidden">
                  <NewArrivalCard product={product} />
                </li>
              ))}
            </ul>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-bg/30 via-bg/60 to-bg" />
          </>
        )}

        <div
          className={cn(
            "flex justify-center px-4",
            teaser.length > 0 && "absolute inset-x-0 top-1/2 -translate-y-1/2",
          )}
        >
          <Form
            action={routes.search()}
            role="search"
            className="relative flex h-12 w-full max-w-md items-center rounded-full bg-surface pl-5 pr-2 shadow-[0_6px_30px_rgb(0_0_0/0.12)]"
          >
            <SearchIcon width={18} height={18} className="shrink-0" />
            <label htmlFor="trending-search" className="sr-only">
              Search products and brands
            </label>
            <input
              id="trending-search"
              name="q"
              type="search"
              placeholder="What are you looking for?"
              className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm placeholder:text-muted focus:outline-none"
            />
            <Link
              href={routes.search()}
              aria-label="Search by photo"
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-ink hover:bg-subtle"
            >
              <ImageSearchIcon width={18} height={18} />
            </Link>
          </Form>
        </div>
      </div>
    </section>
  );
}
