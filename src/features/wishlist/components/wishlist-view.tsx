"use client";

import { ProductGrid } from "@/components/product";
import { ButtonLink, EmptyState, Skeleton } from "@/components/ui";
import { routes } from "@/config/routes";
import { useHydrated } from "@/hooks/use-hydrated";
import { useWishlistStore } from "../store/wishlist-store";

export function WishlistView() {
  const items = useWishlistStore((s) => s.items);
  if (!useHydrated()) return <Skeleton className="h-80 w-full rounded-card" />;
  if (items.length === 0) {
    return (
      <EmptyState
        title="Your wishlist is empty"
        description="Tap the heart on any product to save it here."
        action={<ButtonLink href={routes.home()}>Start browsing</ButtonLink>}
      />
    );
  }
  return <ProductGrid products={items} />;
}
