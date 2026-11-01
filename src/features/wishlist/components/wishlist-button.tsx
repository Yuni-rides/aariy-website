"use client";

import { m } from "framer-motion";
import { HeartIcon } from "@/components/icons";
import { useHydrated } from "@/hooks/use-hydrated";
import { cn } from "@/lib/utils";
import type { ProductSummary } from "@/types";
import { useWishlistStore } from "../store/wishlist-store";

type WishlistButtonProps = {
  product: ProductSummary;
  className?: string;
};

/** Heart toggle in the top-right of product tiles (Figma). */
export function WishlistButton({ product, className }: WishlistButtonProps) {
  const hydrated = useHydrated();
  const saved = useWishlistStore((s) => s.items.some((p) => p.id === product.id)) && hydrated;
  const toggle = useWishlistStore((s) => s.toggle);

  return (
    <m.button
      type="button"
      whileTap={{ scale: 0.85 }}
      onClick={(e) => {
        // Tiles are links; the heart must not navigate.
        e.preventDefault();
        e.stopPropagation();
        toggle(product);
      }}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
      className={cn(
        "relative z-10 inline-flex size-8 items-center justify-center rounded-full text-white transition-colors",
        saved && "text-accent",
        className,
      )}
    >
      <HeartIcon filled={saved} width={18} height={18} className="drop-shadow" />
    </m.button>
  );
}
