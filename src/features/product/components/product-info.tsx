import Link from "next/link";
import { ShieldIcon } from "@/components/icons";
import { Price } from "@/components/product";
import { routes } from "@/config/routes";
import type { Product } from "@/types";
import { AddToCart } from "./add-to-cart";
import { DeliveryPromise } from "./delivery-promise";
import { ProductDetails } from "./product-details";
import { SizeChart } from "./size-chart";

export function ProductInfo({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
      <div className="flex flex-col gap-2">
        <Link
          href={routes.brand(product.brand.slug)}
          className="flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-muted hover:text-accent"
        >
          {product.brand.name}
          {product.brand.verified && <ShieldIcon width={14} height={14} className="text-success" aria-label="Verified" />}
        </Link>
        <h1 className="font-display text-3xl leading-tight md:text-4xl">{product.name}</h1>
        <Price price={product.price} compareAt={product.compareAtPrice} size="lg" />
        <p className="text-xs text-muted">Inclusive of all taxes</p>
      </div>

      {/* Pass only what the client needs, so the full product isn't serialised into the page. */}
      <AddToCart
        product={{
          id: product.id,
          slug: product.slug,
          name: product.name,
          brand: product.brand,
          price: product.price,
          variants: product.variants,
          images: product.images.slice(0, 1),
        }}
      />
      {product.sizeChart && <SizeChart chart={product.sizeChart} />}
      <DeliveryPromise dispatch={product.dispatch} brandName={product.brand.name} />
      <ProductDetails product={product} />
    </div>
  );
}
