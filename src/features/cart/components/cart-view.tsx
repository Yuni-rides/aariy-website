"use client";

import { useMemo } from "react";
import { ButtonLink, EmptyState, Skeleton } from "@/components/ui";
import { routes } from "@/config/routes";
import { cartSubtotal, groupLinesByBrand, useCartStore, useHydrated } from "../store/cart-store";
import { CartSellerGroup } from "./cart-seller-group";
import { CartSummary } from "./cart-summary";

export function CartView() {
  const lines = useCartStore((s) => s.lines);
  const groups = useMemo(() => groupLinesByBrand(lines), [lines]);
  const subtotal = useMemo(() => cartSubtotal(lines), [lines]);

  if (!useHydrated()) return <Skeleton className="h-80 w-full rounded-card" />;

  if (lines.length === 0) {
    return (
      <EmptyState
        title="Your basket is empty"
        description="Browse new arrivals from our verified brands."
        action={<ButtonLink href={routes.collection("new-in")}>Shop New In</ButtonLink>}
      />
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_24rem]">
      <div className="flex flex-col gap-6">
        {groups.map((group) => (
          <CartSellerGroup key={group.brand.id} group={group} />
        ))}
      </div>
      <div className="lg:sticky lg:top-24 lg:self-start">
        <CartSummary
          subtotal={subtotal}
          action={
            <ButtonLink href={routes.checkout()} size="lg" fullWidth>
              Checkout
            </ButtonLink>
          }
        />
      </div>
    </div>
  );
}
