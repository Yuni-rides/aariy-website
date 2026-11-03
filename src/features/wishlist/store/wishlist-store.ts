"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { BrandSummary, ProductSummary } from "@/types";

/**
 * Saved products (heart icon). Kept in localStorage for the static phase.
 * Not in the SOW API yet: when a wishlist endpoint exists, sync it for
 * signed-in buyers and keep this interface.
 */
type WishlistState = {
  items: ProductSummary[];
  toggle: (product: ProductSummary) => void;
  remove: (productId: string) => void;
  /** Saved stores (heart on trending store cards). */
  brands: BrandSummary[];
  toggleBrand: (brand: BrandSummary) => void;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set) => ({
      items: [],
      toggle: (product) =>
        set((state) =>
          state.items.some((p) => p.id === product.id)
            ? { items: state.items.filter((p) => p.id !== product.id) }
            : { items: [product, ...state.items] },
        ),
      remove: (productId) => set((state) => ({ items: state.items.filter((p) => p.id !== productId) })),
      brands: [],
      toggleBrand: (brand) =>
        set((state) =>
          state.brands.some((b) => b.id === brand.id)
            ? { brands: state.brands.filter((b) => b.id !== brand.id) }
            : { brands: [brand, ...state.brands] },
        ),
    }),
    { name: "aariy-wishlist", version: 1, storage: createJSONStorage(() => localStorage) },
  ),
);
