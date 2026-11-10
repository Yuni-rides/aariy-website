"use client";

import Image from "@/components/ui/image";
import Link from "next/link";
import { routes } from "@/config/routes";
import { formatMoney, multiplyMoney } from "@/lib/money";
import type { CartLine } from "@/types";
import { useCartStore } from "../store/cart-store";

export function CartLineItem({ line }: { line: CartLine }) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <li className="flex gap-4 py-5">
      <Link href={routes.product(line.productSlug)} className="relative aspect-[3/4] w-24 shrink-0 overflow-hidden rounded-md bg-subtle">
        <Image src={line.image.url} alt={line.image.alt} fill sizes="96px" className="object-cover" />
      </Link>
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex justify-between gap-4">
          <Link href={routes.product(line.productSlug)} className="text-sm font-medium hover:text-accent">
            {line.name}
          </Link>
          <p className="text-sm font-medium">{formatMoney(multiplyMoney(line.unitPrice, line.quantity))}</p>
        </div>
        <p className="text-xs text-muted">Size {line.size}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-center rounded-md border border-line" role="group" aria-label={`Quantity for ${line.name}`}>
            <button
              type="button"
              className="size-9 text-lg hover:bg-subtle"
              aria-label="Decrease quantity"
              onClick={() => updateQuantity(line.variantId, line.quantity - 1)}
            >
              −
            </button>
            <span className="w-8 text-center text-sm" aria-live="polite">
              {line.quantity}
            </span>
            <button
              type="button"
              className="size-9 text-lg hover:bg-subtle disabled:opacity-40"
              aria-label="Increase quantity"
              disabled={line.quantity >= line.maxQuantity}
              onClick={() => updateQuantity(line.variantId, line.quantity + 1)}
            >
              +
            </button>
          </div>
          <button type="button" onClick={() => removeItem(line.variantId)} className="text-xs underline underline-offset-4 hover:text-danger">
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
