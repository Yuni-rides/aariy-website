"use client";

import Link from "next/link";
import { HeartIcon } from "@/components/icons";
import { routes } from "@/config/routes";
import { useHydrated } from "@/hooks/use-hydrated";
import { useWishlistStore } from "../store/wishlist-store";

/** Header heart with saved-item count. */
export function WishlistLink({ className }: { className?: string }) {
  const stored = useWishlistStore((s) => s.items.length);
  const count = useHydrated() ? stored : 0;
  return (
    <Link href={routes.wishlist()} className={className} aria-label={`Wishlist, ${count} saved`}>
      <HeartIcon filled />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-accent text-[9px] font-semibold text-accent-ink">
          {count}
        </span>
      )}
    </Link>
  );
}
