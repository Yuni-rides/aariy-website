import { Reveal } from "@/components/motion";
import { ProductGrid } from "@/components/product";
import { SectionHeading } from "@/components/ui";
import { routes } from "@/config/routes";
import type { ProductSummary } from "@/types";

export function NewArrivals({ products }: { products: ProductSummary[] }) {
  return (
    <section className="container-site">
      <SectionHeading
        eyebrow="Just landed"
        title="New arrivals"
        action={{ label: "View all", href: routes.collection("new-in") }}
      />
      <Reveal>
        <ProductGrid products={products} />
      </Reveal>
    </section>
  );
}
