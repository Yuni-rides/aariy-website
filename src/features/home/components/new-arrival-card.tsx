import Image from "next/image";
import Link from "next/link";
import { CartIcon, StarIcon } from "@/components/icons";
import { routes } from "@/config/routes";
import { toMajor } from "@/lib/money";
import type { ProductSummary } from "@/types";

function formatRs(product: ProductSummary) {
  return `RS ${toMajor(product.price).toLocaleString("en-PK")}`;
}

export function NewArrivalCard({ product }: { product: ProductSummary }) {
  const href = routes.product(product.slug);
  return (
    <article className="group relative">
      <div className="relative aspect-square overflow-hidden rounded-[0.3125rem] bg-subtle">
        <Image
          src={product.image.url}
          alt={product.image.alt}
          fill
          sizes="(min-width: 768px) 13rem, 11rem"
          className="object-cover object-top transition-transform duration-700 ease-out-soft group-hover:scale-105"
        />
      </div>

      <div className="mt-2.5 flex items-center gap-2">
        <p className="text-[0.9375rem] font-medium">{formatRs(product)}</p>
        {product.rating && (
          <p className="flex items-center gap-1 text-xs text-muted">
            <StarIcon width={14} height={14} className="text-accent" />
            {product.rating.average}
            <span>({product.rating.count})</span>
            <span className="sr-only">reviews</span>
          </p>
        )}
        <Link
          href={href}
          aria-label={`Choose a size for ${product.name}`}
          className="relative z-10 ml-auto inline-flex size-7 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-ink hover:text-ink"
        >
          <CartIcon width={14} height={14} />
        </Link>
      </div>

      <h3 className="mt-1.5 truncate text-xs">
        <Link href={href} className="after:absolute after:inset-0">
          {product.brand.name} {product.name}
        </Link>
      </h3>
    </article>
  );
}
