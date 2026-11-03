import Image from "next/image";
import Link from "next/link";
import { ProductTile } from "@/components/product";
import { routes } from "@/config/routes";
import { SaveStoreButton } from "@/features/wishlist/components/save-store-button";
import type { BrandShowcase } from "@/types";

function formatCount(n: number) {
  return n >= 1000 ? `${Math.round(n / 1000)}k` : String(n);
}

/**
 * Tall store card from the Figma: campaign photo under the same #272F39
 * shade as the hero, brand name and rating centred, a heart top-right and
 * two product tiles along the bottom.
 */
export function StoreCard({ showcase }: { showcase: BrandShowcase }) {
  const { brand, products } = showcase;
  return (
    <article className="group relative isolate flex aspect-[5/7] w-56 flex-col overflow-hidden rounded-panel bg-[#272F39] p-3 text-white md:w-60">
      {brand.cover && (
        <Image
          src={brand.cover.url}
          alt={brand.cover.alt}
          fill
          sizes="240px"
          className="-z-10 object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105"
        />
      )}
      {/* Figma shade: linear #272F39, 0% → 100% opacity, top to bottom */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-[#272F39]/0 to-[#272F39]" />

      <Link href={routes.brand(brand.slug)} className="absolute inset-0">
        <span className="sr-only">Visit {brand.name}</span>
      </Link>
      <SaveStoreButton brand={brand} className="absolute right-2.5 top-2.5" />

      <div className="pointer-events-none flex flex-1 flex-col items-center justify-center pt-6 text-center">
        <h3 className="text-[1.75rem] font-semibold leading-tight drop-shadow-sm">{brand.name}</h3>
        {brand.rating && (
          <p className="mt-1.5 flex items-center gap-1 text-xs">
            {brand.rating.average}
            <span className="text-white/90">({formatCount(brand.rating.count)})</span>
            <span className="sr-only">reviews</span>
          </p>
        )}
      </div>

      <ul className="relative grid grid-cols-2 gap-2">
        {products.slice(0, 2).map((product) => (
          <li key={product.id} className="aspect-[10/9]">
            <ProductTile
              product={product}
              size="sm"
              sizes="120px"
              showWishlist={false}
              className="h-full rounded-[0.875rem]"
            />
          </li>
        ))}
      </ul>
    </article>
  );
}
