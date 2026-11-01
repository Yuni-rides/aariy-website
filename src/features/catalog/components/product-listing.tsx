import { ProductGrid, ProductGridSkeleton } from "@/components/product";
import { ButtonLink, EmptyState, Skeleton } from "@/components/ui";
import { getProductFacets, listProducts } from "@/services";
import type { ProductFilters } from "@/types";
import { parseFilters, type SearchParams } from "../lib/filters";
import { ActiveFilters } from "./active-filters";
import { FilterForm } from "./filter-form";
import { Pagination } from "./pagination";

type ProductListingProps = {
  basePath: string;
  searchParams: Promise<SearchParams>;
  /** Fixed scope of the listing, e.g. a collection or brand. URL filters are applied on top. */
  scope: Pick<ProductFilters, "collection" | "brand">;
};

/**
 * Shared listing used by collection, brand and search pages.
 * Reads searchParams, so the page renders it inside <Suspense>;
 * the header and layout above stay in the static shell.
 */
export async function ProductListing({ basePath, searchParams, scope }: ProductListingProps) {
  const params = await searchParams;
  const filters = { ...parseFilters(params), ...scope };
  const [result, facets] = await Promise.all([listProducts(filters), getProductFacets(filters)]);

  return (
    <div className="container-site grid gap-10 lg:grid-cols-[15rem_1fr]">
      <aside aria-label="Filters" className="lg:sticky lg:top-24 lg:self-start">
        <FilterForm facets={facets} params={params} total={result.total} />
      </aside>
      <div>
        <ActiveFilters basePath={basePath} params={params} />
        {result.items.length === 0 ? (
          <EmptyState
            title="No products found"
            description="Try removing a filter or searching for something else."
            action={<ButtonLink href={basePath} variant="secondary">Clear filters</ButtonLink>}
          />
        ) : (
          <ProductGrid products={result.items} priorityCount={4} />
        )}
        <Pagination basePath={basePath} params={params} page={result.page} totalPages={result.totalPages} />
      </div>
    </div>
  );
}

export function ProductListingSkeleton() {
  return (
    <div className="container-site grid gap-10 lg:grid-cols-[15rem_1fr]">
      <div className="hidden flex-col gap-4 lg:flex">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
      <ProductGridSkeleton />
    </div>
  );
}
