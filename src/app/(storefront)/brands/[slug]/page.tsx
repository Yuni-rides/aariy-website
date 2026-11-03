import { notFound } from "next/navigation";
import { Suspense } from "react";
import { JsonLd } from "@/components/seo";
import { routes } from "@/config/routes";
import { BrandHero } from "@/features/brands";
import { ProductListing, ProductListingSkeleton, hasActiveFilters } from "@/features/catalog";
import { buildMetadata } from "@/lib/seo";
import { brandJsonLd } from "@/lib/structured-data";
import { getBrandBySlug, listBrands } from "@/services";

export async function generateStaticParams() {
  const brands = await listBrands();
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params, searchParams }: PageProps<"/brands/[slug]">) {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);
  if (!brand) return {};
  return buildMetadata({
    title: `${brand.name} | Shop the collection`,
    description: `${brand.tagline} Shop ${brand.name} ready-to-wear on Aariy. Verified brand, cash on delivery.`,
    path: routes.brand(slug),
    image: brand.banner?.url,
    noIndex: hasActiveFilters(await searchParams),
  });
}

export default async function BrandPage({ params, searchParams }: PageProps<"/brands/[slug]">) {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);
  if (!brand) notFound();

  return (
    <>
      <BrandHero brand={brand} active="products" />
      <Suspense fallback={<ProductListingSkeleton />}>
        <ProductListing basePath={routes.brand(slug)} searchParams={searchParams} scope={{ brand: slug }} />
      </Suspense>
      <JsonLd data={brandJsonLd(brand)} />
    </>
  );
}
