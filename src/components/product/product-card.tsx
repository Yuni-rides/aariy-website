import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui";
import { routes } from "@/config/routes";
import { WishlistButton } from "@/features/wishlist/components/wishlist-button";
import type { ProductSummary } from "@/types";
import { Price } from "./price";

type ProductCardProps = {
  product: ProductSummary;
  priority?: boolean;
};

export function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <article className="group relative flex flex-col gap-3">
      <div className="relative aspect-[3/4] overflow-hidden rounded-card bg-subtle">
        <Image
          src={product.image.url}
          alt={product.image.alt}
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 48vw"
          priority={priority}
          className="object-cover object-top transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]"
        />
        {product.hoverImage && (
          <Image
            src={product.hoverImage.url}
            alt=""
            fill
            sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 48vw"
            className="object-cover object-top opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
        <WishlistButton product={product} className="absolute right-2 top-2" />
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {product.isNew && <Badge className="bg-surface">New</Badge>}
          {!product.inStock && <Badge tone="danger">Sold out</Badge>}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-xs uppercase tracking-wider text-muted">{product.brand.name}</p>
        <h3 className="text-sm leading-snug">
          <Link href={routes.product(product.slug)} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>
        <Price price={product.price} compareAt={product.compareAtPrice} />
      </div>
    </article>
  );
}
