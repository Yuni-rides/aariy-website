import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductGridSkeleton } from "@/components/product";
import { JsonLd } from "@/components/seo";
import { Breadcrumbs } from "@/components/ui";
import { routes } from "@/config/routes";
import { ProductGallery, ProductInfo, RelatedProducts } from "@/features/product";
import { buildMetadata } from "@/lib/seo";
import { productJsonLd } from "@/lib/structured-data";
import { getProductBySlug, getProductSlugsForBuild } from "@/services";

/** Prerender known products at build. New products render on first visit, then serve from cache. */
export async function generateStaticParams() {
  const slugs = await getProductSlugsForBuild();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return buildMetadata({
    title: `${product.name} by ${product.brand.name}`,
    description: product.description.slice(0, 155),
    path: routes.product(slug),
    image: product.images[0]?.url,
  });
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <div className="container-site py-6">
        <Breadcrumbs
          items={[
            { name: "Home", href: routes.home() },
            { name: product.brand.name, href: routes.brand(product.brand.slug) },
            { name: product.name, href: routes.product(product.slug) },
          ]}
        />
      </div>
      <div className="container-site grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <ProductGallery images={product.images} />
        <ProductInfo product={product} />
      </div>
      <Suspense
        fallback={
          <div className="container-site mt-24">
            <ProductGridSkeleton count={4} />
          </div>
        }
      >
        <RelatedProducts slug={product.slug} />
      </Suspense>
      <JsonLd data={productJsonLd(product)} />
    </>
  );
}
