"use client";

import { m } from "framer-motion";
import { HeartIcon } from "@/components/icons";
import { useHydrated } from "@/hooks/use-hydrated";
import { cn } from "@/lib/utils";
import type { BrandSummary } from "@/types";
import { useWishlistStore } from "../store/wishlist-store";

/** Heart in the top-right of trending store cards (Figma). */
export function SaveStoreButton({ brand, className }: { brand: BrandSummary; className?: string }) {
  const hydrated = useHydrated();
  const saved = useWishlistStore((s) => s.brands.some((b) => b.id === brand.id)) && hydrated;
  const toggleBrand = useWishlistStore((s) => s.toggleBrand);

  return (
    <m.button
      type="button"
      whileTap={{ scale: 0.85 }}
      onClick={() => toggleBrand({ id: brand.id, slug: brand.slug, name: brand.name, logo: brand.logo, verified: brand.verified })}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${brand.name} from saved stores` : `Save ${brand.name}`}
      className={cn(
        "relative z-10 inline-flex size-8 items-center justify-center rounded-full text-white transition-colors",
        saved && "text-accent",
        className,
      )}
    >
      <HeartIcon filled={saved} width={20} height={20} className="drop-shadow" />
    </m.button>
  );
}
