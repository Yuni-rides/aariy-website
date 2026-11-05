import { notFound } from "next/navigation";
import { Suspense } from "react";
import { routes } from "@/config/routes";
import {
  CategoryHeader,
  ProductListing,
  ProductListingSkeleton,
  hasActiveFilters,
} from "@/features/catalog";
import {
  categoryCrumbs,
  findCategoryByPath,
  flattenCategories,
} from "@/lib/categories";
import { buildMetadata } from "@/lib/seo";
import { getCategoryTree } from "@/services";

export async function generateStaticParams() {
  const tree = await getCategoryTree();
  return flattenCategories(tree).map((e) => ({
    path: e.path.map((c) => c.slug),
  }));
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps<"/categories/[...path]">) {
  const { path } = await params;
  const entry = findCategoryByPath(await getCategoryTree(), path);
  if (!entry) return {};
  const title =
    entry.path.length > 1
      ? `${entry.path[0].name}'s ${entry.category.name}`
      : entry.category.name;
  return buildMetadata({
    title,
    description: `Shop ${title.toLowerCase()} from Pakistan's verified fashion brands on Aariy. Cash on delivery.`,
    path: entry.href,
    noIndex: hasActiveFilters(await searchParams),
  });
}

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps<"/categories/[...path]">) {
  const { path } = await params;
  const entry = findCategoryByPath(await getCategoryTree(), path);
  if (!entry) notFound();

  return (
    <>
      <CategoryHeader
        entry={entry}
        breadcrumbs={[
          { name: "Home", href: routes.home() },
          ...categoryCrumbs(entry.path),
        ]}
      />
      <Suspense fallback={<ProductListingSkeleton />}>
        <ProductListing
          basePath={entry.href}
          searchParams={searchParams}
          scope={{ category: entry.category.id }}
        />
      </Suspense>
    </>
  );
}
