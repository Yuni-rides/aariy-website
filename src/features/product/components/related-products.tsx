import { Reveal } from "@/components/motion";
import { ProductGrid } from "@/components/product";
import { SectionHeading } from "@/components/ui";
import { getRelatedProducts } from "@/services";

/** Async + cached: streams in after the main product content. */
export async function RelatedProducts({ slug }: { slug: string }) {
  const products = await getRelatedProducts(slug);
  if (products.length === 0) return null;
  return (
    <section className="container-site mt-24">
      <SectionHeading title="You may also like" />
      <Reveal>
        <ProductGrid products={products} />
      </Reveal>
    </section>
  );
}
