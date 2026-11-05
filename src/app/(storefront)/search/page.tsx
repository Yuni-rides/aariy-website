import { Suspense } from "react";
import { Skeleton } from "@/components/ui";
import { routes } from "@/config/routes";
import { seoPages } from "@/config/seo-pages";
import { ProductListing, ProductListingSkeleton } from "@/features/catalog";
import { SearchHeader } from "@/features/search";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ ...seoPages.search, noIndex: true });

export default function SearchPage({ searchParams }: PageProps<"/search">) {
  return (
    <>
      <Suspense
        fallback={
          <div className="container-site py-12">
            <Skeleton className="h-14 max-w-2xl rounded-full" />
          </div>
        }
      >
        <SearchHeader searchParams={searchParams} />
      </Suspense>
      <Suspense fallback={<ProductListingSkeleton />}>
        <ProductListing
          basePath={routes.search()}
          searchParams={searchParams}
          scope={{}}
        />
      </Suspense>
    </>
  );
}
