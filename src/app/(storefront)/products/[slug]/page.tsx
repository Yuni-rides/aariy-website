import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductGridSkeleton } from "@/components/product";
import { JsonLd } from "@/components/seo";
import { Breadcrumbs } from "@/components/ui";
import { routes } from "@/config/routes";
import {
  ProductGallery,
  ProductInfo,
  RelatedProducts,
} from "@/features/product";
import { ProductReviews } from "@/features/reviews";
import { categoryCrumbs, findCategoryById } from "@/lib/categories";
import { buildMetadata } from "@/lib/seo";
import { productJsonLd } from "@/lib/structured-data";
import {
  getCategoryTree,
  getProductBySlug,
  getProductReviews,
  getProductSlugsForBuild,
} from "@/services";

export async function generateStaticParams() {
  const slugs = await getProductSlugsForBuild();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">) {
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

export default async function ProductPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const [product, tree, reviews] = await Promise.all([
    getProductBySlug(slug),
    getCategoryTree(),
    getProductReviews(slug),
  ]);
  if (!product) notFound();
  const entry = findCategoryById(tree, product.categoryId);
  const trail = entry ? categoryCrumbs(entry.path) : [];

  return (
    <>
      <div className="container-site py-6">
        <Breadcrumbs
          hideCurrent
          items={[
            ...(trail.length ? trail : [{ name: "Home", href: routes.home() }]),
            { name: product.name, href: routes.product(product.slug) },
          ]}
        />
      </div>
      <div className="container-site grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <ProductGallery images={product.images} />
        <ProductInfo product={product} />
      </div>
      <ProductReviews
        slug={product.slug}
        sizes={product.variants.map((v) => v.size)}
      />
      <Suspense
        fallback={
          <div className="container-site mt-24">
            <ProductGridSkeleton count={4} />
          </div>
        }
      >
        <RelatedProducts slug={product.slug} />
      </Suspense>
      <JsonLd data={productJsonLd(product, reviews)} />
    </>
  );
}
