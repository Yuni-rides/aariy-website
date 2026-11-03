import { notFound } from "next/navigation";
import { routes } from "@/config/routes";
import { BrandCollections, BrandHero } from "@/features/brands";
import { buildMetadata } from "@/lib/seo";
import { getBrandBySlug, listBrandCollections, listBrands } from "@/services";

export async function generateStaticParams() {
  const brands = await listBrands();
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/brands/[slug]/collections">) {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);
  if (!brand) return {};
  return buildMetadata({
    title: `${brand.name} collections`,
    description: `Browse every ${brand.name} collection on Aariy. Verified brand, cash on delivery.`,
    path: routes.brandCollections(slug),
    image: brand.banner?.url,
  });
}

export default async function BrandCollectionsPage({ params }: PageProps<"/brands/[slug]/collections">) {
  const { slug } = await params;
  const [brand, collections] = await Promise.all([getBrandBySlug(slug), listBrandCollections(slug)]);
  if (!brand) notFound();

  return (
    <div className="pb-8">
      <BrandHero brand={brand} active="collections" />
      <BrandCollections brandSlug={slug} collections={collections} />
    </div>
  );
}
