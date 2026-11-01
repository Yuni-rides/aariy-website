"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { multiplyMoney, sumMoney } from "@/lib/money";
import type { CartLine, CartSellerGroup } from "@/types";

/**
 * Client basket, persisted to localStorage for the static phase.
 * Integration: when the basket API exists, keep this interface and make
 * each action call the API (optimistic update + server reconciliation).
 * Totals shown here are estimates; the server recalculates at checkout.
 */
type CartState = {
  lines: CartLine[];
  addItem: (line: Omit<CartLine, "quantity">, quantity?: number) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      addItem: (line, quantity = 1) =>
        set((state) => {
          const existing = state.lines.find((l) => l.variantId === line.variantId);
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l.variantId === line.variantId ? { ...l, quantity: Math.min(l.quantity + quantity, l.maxQuantity) } : l,
              ),
            };
          }
          return { lines: [...state.lines, { ...line, quantity: Math.min(quantity, line.maxQuantity) }] };
        }),
      updateQuantity: (variantId, quantity) =>
        set((state) => ({
          lines:
            quantity <= 0
              ? state.lines.filter((l) => l.variantId !== variantId)
              : state.lines.map((l) => (l.variantId === variantId ? { ...l, quantity: Math.min(quantity, l.maxQuantity) } : l)),
        })),
      removeItem: (variantId) => set((state) => ({ lines: state.lines.filter((l) => l.variantId !== variantId) })),
      clear: () => set({ lines: [] }),
    }),
    {
      name: "aariy-cart",
      version: 1,
      // Hydrates synchronously on the client when the store is created, so an
      // early "Add to basket" can never overwrite the saved basket.
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export { useHydrated } from "@/hooks/use-hydrated";

export function groupLinesByBrand(lines: CartLine[]): CartSellerGroup[] {
  const groups = new Map<string, CartSellerGroup>();
  for (const line of lines) {
    const group = groups.get(line.brand.id) ?? { brand: line.brand, lines: [], subtotal: { amount: 0, currency: line.unitPrice.currency } };
    group.lines.push(line);
    groups.set(line.brand.id, group);
  }
  return [...groups.values()].map((g) => ({
    ...g,
    subtotal: sumMoney(g.lines.map((l) => multiplyMoney(l.unitPrice, l.quantity)), g.subtotal.currency),
  }));
}

export function cartSubtotal(lines: CartLine[]) {
  return sumMoney(lines.map((l) => multiplyMoney(l.unitPrice, l.quantity)));
}

export function cartCount(lines: CartLine[]) {
  return lines.reduce((n, l) => n + l.quantity, 0);
}
