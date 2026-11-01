import { notFound } from "next/navigation";
import { Suspense } from "react";
import { routes } from "@/config/routes";
import { CollectionHeader, ProductListing, ProductListingSkeleton, hasActiveFilters } from "@/features/catalog";
import { buildMetadata } from "@/lib/seo";
import { getCollectionBySlug, listCollections } from "@/services";

export async function generateStaticParams() {
  const collections = await listCollections();
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params, searchParams }: PageProps<"/collections/[slug]">) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  if (!collection) return {};
  // Filtered/sorted variants are not curated: noindex, canonical to the clean URL (SOW §3.11).
  const filtered = hasActiveFilters(await searchParams);
  return buildMetadata({
    title: collection.title,
    description: collection.description,
    path: routes.collection(slug),
    noIndex: filtered || !collection.indexable,
  });
}

export default async function CollectionPage({ params, searchParams }: PageProps<"/collections/[slug]">) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  if (!collection) notFound();

  return (
    <>
      <CollectionHeader
        title={collection.title}
        description={collection.description}
        breadcrumbs={[
          { name: "Home", href: routes.home() },
          { name: collection.title, href: routes.collection(slug) },
        ]}
      />
      {/* Header above is static; filtered results stream in per request. */}
      <Suspense fallback={<ProductListingSkeleton />}>
        <ProductListing basePath={routes.collection(slug)} searchParams={searchParams} scope={{ collection: slug }} />
      </Suspense>
    </>
  );
}
