"use client";

import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui";
import { routes } from "@/config/routes";
import { useCartStore } from "@/features/cart/store/cart-store";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

type AddToCartProps = {
  product: Pick<Product, "id" | "slug" | "name" | "brand" | "price" | "variants" | "images">;
};

/** Most of one size per order; a size with less stock caps the stepper lower. */
const MAX_PER_ORDER = 10;

/** Size, quantity and add to basket. Only this block of the product page hydrates. */
export function AddToCart({ product }: AddToCartProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [variantId, setVariantId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const variant = product.variants.find((v) => v.id === variantId);
  const maxQuantity = Math.max(1, Math.min(variant?.stock ?? MAX_PER_ORDER, MAX_PER_ORDER));

  function handleAdd() {
    if (!variant) {
      setError("Please choose a size");
      return;
    }
    addItem({
      variantId: variant.id,
      productId: product.id,
      productSlug: product.slug,
      name: product.name,
      size: variant.size,
      brand: product.brand,
      image: product.images[0],
      unitPrice: product.price,
      maxQuantity: variant.stock,
    }, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  return (
    <div className="flex flex-col gap-4">
      <fieldset>
        <legend className="mb-3 flex w-full items-center justify-between text-sm">
          <span className="font-medium">Size{variant ? `: ${variant.size}` : ""}</span>
          {variant && variant.stock <= 3 && <span className="text-xs text-warning">Only {variant.stock} left</span>}
        </legend>
        <div className="flex flex-wrap gap-2" role="radiogroup">
          {product.variants.map((v) => {
            const soldOut = v.stock === 0;
            return (
              <label key={v.id} className={cn(soldOut ? "cursor-not-allowed" : "cursor-pointer")}>
                <input
                  type="radio"
                  name="size"
                  value={v.id}
                  disabled={soldOut}
                  checked={variantId === v.id}
                  onChange={() => {
                    setVariantId(v.id);
                    setError(null);
                    setQuantity((q) => Math.min(q, Math.max(1, v.stock)));
                  }}
                  className="peer sr-only"
                />
                <span
                  className={cn(
                    "inline-flex h-11 min-w-14 items-center justify-center rounded-md border px-3 text-sm transition-colors",
                    "peer-checked:border-ink peer-checked:bg-ink peer-checked:text-bg peer-focus-visible:outline-2 peer-focus-visible:outline-accent",
                    soldOut ? "border-line text-muted line-through" : "border-line hover:border-ink",
                  )}
                >
                  {v.size}
                  {soldOut && <span className="sr-only"> (sold out)</span>}
                </span>
              </label>
            );
          })}
        </div>
        {error && (
          <p role="alert" className="mt-2 text-xs text-danger">
            {error}
          </p>
        )}
      </fieldset>

      <div>
        <p id="quantity-label" className="mb-3 text-sm font-medium">
          Quantity
        </p>
        <div className="inline-flex items-center rounded-md border border-line" role="group" aria-labelledby="quantity-label">
          <button
            type="button"
            className="size-11 text-lg hover:bg-subtle disabled:opacity-40"
            aria-label="Decrease quantity"
            disabled={quantity <= 1}
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            −
          </button>
          <span className="w-10 text-center text-sm tabular-nums" aria-live="polite">
            {quantity}
          </span>
          <button
            type="button"
            className="size-11 text-lg hover:bg-subtle disabled:opacity-40"
            aria-label="Increase quantity"
            disabled={quantity >= maxQuantity}
            onClick={() => setQuantity((q) => Math.min(maxQuantity, q + 1))}
          >
            +
          </button>
        </div>
      </div>

      <Button size="lg" fullWidth onClick={handleAdd}>
        Add to basket
      </Button>

      <AnimatePresence>
        {added && (
          <m.p
            role="status"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center text-sm text-success"
          >
            Added to basket ·{" "}
            <Link href={routes.cart()} className="underline underline-offset-4">
              View basket
            </Link>
          </m.p>
        )}
      </AnimatePresence>
    </div>
  );
}
