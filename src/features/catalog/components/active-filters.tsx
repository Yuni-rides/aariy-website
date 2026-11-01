import Link from "next/link";
import { CloseIcon } from "@/components/icons";
import { toArray } from "@/lib/utils";
import { PRICE_RANGES, buildQuery, hasActiveFilters, type SearchParams } from "../lib/filters";

/** Removable chips for the current filters. Plain links: no client JS. */
export function ActiveFilters({ basePath, params }: { basePath: string; params: SearchParams }) {
  if (!hasActiveFilters(params)) return null;

  const sizes = toArray(params.size);
  const price = typeof params.price === "string" ? params.price : undefined;
  const chips = [
    ...sizes.map((s) => ({
      label: `Size ${s}`,
      href: basePath + buildQuery(params, { size: sizes.filter((x) => x !== s), page: undefined }),
    })),
    ...(price
      ? [{ label: PRICE_RANGES.find((r) => r.value === price)?.label ?? price, href: basePath + buildQuery(params, { price: undefined, page: undefined }) }]
      : []),
  ];

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <Link
          key={chip.label}
          href={chip.href}
          scroll={false}
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-xs hover:border-ink"
        >
          {chip.label}
          <CloseIcon width={12} height={12} />
          <span className="sr-only">Remove filter</span>
        </Link>
      ))}
      <Link
        href={basePath + buildQuery({ q: params.q })}
        scroll={false}
        className="text-xs underline underline-offset-4 hover:text-accent"
      >
        Clear all
      </Link>
    </div>
  );
}
