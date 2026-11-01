import Image from "next/image";
import Link from "next/link";
import { ProductTile } from "@/components/product";
import { routes } from "@/config/routes";
import type { BrandShowcase } from "@/types";

/** Tall store card from the Figma: brand campaign photo with two product tiles at the bottom. */
export function StoreCard({ showcase }: { showcase: BrandShowcase }) {
  const { brand, products } = showcase;
  return (
    <article className="group relative flex aspect-[5/7] w-56 flex-col justify-end overflow-hidden rounded-panel bg-subtle p-2.5 md:w-60">
      {brand.cover && (
        <Image
          src={brand.cover.url}
          alt={brand.cover.alt}
          fill
          sizes="240px"
          className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105"
        />
      )}
      <Link href={routes.brand(brand.slug)} className="absolute inset-0">
        <span className="sr-only">Visit {brand.name}</span>
      </Link>
      <ul className="relative grid grid-cols-2 gap-2">
        {products.slice(0, 2).map((product) => (
          <li key={product.id} className="aspect-[4/5] rounded-card bg-surface">
            <ProductTile product={product} size="sm" sizes="110px" className="h-full" />
          </li>
        ))}
      </ul>
    </article>
  );
}
