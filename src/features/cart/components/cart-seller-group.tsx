"use client";

import Link from "next/link";
import { routes } from "@/config/routes";
import { formatMoney } from "@/lib/money";
import type { CartSellerGroup as Group } from "@/types";
import { CartLineItem } from "./cart-line-item";

/** One block per brand: each brand ships its own suborder (SOW §19.1). */
export function CartSellerGroup({ group }: { group: Group }) {
  return (
    <section className="rounded-card border border-line bg-surface px-5">
      <header className="flex items-center justify-between border-b border-line py-4">
        <h2 className="text-sm">
          Shipped by{" "}
          <Link href={routes.brand(group.brand.slug)} className="font-medium hover:text-accent">
            {group.brand.name}
          </Link>
        </h2>
        <p className="text-xs text-muted">Subtotal {formatMoney(group.subtotal)}</p>
      </header>
      <ul className="divide-y divide-line">
        {group.lines.map((line) => (
          <CartLineItem key={line.variantId} line={line} />
        ))}
      </ul>
    </section>
  );
}
