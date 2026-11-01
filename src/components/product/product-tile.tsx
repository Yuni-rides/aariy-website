import Image from "next/image";
import Link from "next/link";
import { routes } from "@/config/routes";
import { WishlistButton } from "@/features/wishlist/components/wishlist-button";
import { formatMoney } from "@/lib/money";
import { cn } from "@/lib/utils";
import type { ProductSummary } from "@/types";

type ProductTileProps = {
  product: ProductSummary;
  sizes: string;
  priority?: boolean;
  size?: "md" | "sm";
  className?: string;
};

/**
 * Image-only product tile from the Figma: heart top-right, orange price
 * pill bottom-left. Used in the home hero and trending store cards.
 * The link covers the tile; the heart sits above it (no button inside <a>).
 */
export function ProductTile({ product, sizes, priority, size = "md", className }: ProductTileProps) {
  return (
    <article className={cn("group relative overflow-hidden rounded-card bg-surface", className)}>
      <Image
        src={product.image.url}
        alt={product.image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105"
      />
      <Link href={routes.product(product.slug)} className="absolute inset-0">
        <span className="sr-only">
          {product.name} by {product.brand.name}, {formatMoney(product.price)}
        </span>
      </Link>
      <WishlistButton product={product} className={cn("absolute right-1.5 top-1.5", size === "sm" && "size-6")} />
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute bottom-2 left-2 rounded-full bg-accent font-medium text-accent-ink",
          size === "md" ? "px-3 py-1 text-[11px]" : "px-2 py-0.5 text-[9px]",
        )}
      >
        {formatMoney(product.price)}
      </span>
    </article>
  );
}
