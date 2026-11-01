import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { formatMoney, money } from "@/lib/money";
import type { Money } from "@/types";

type CartSummaryProps = {
  subtotal: Money;
  /** Shown as "Calculated at checkout" until the API returns a real quote. */
  shipping?: Money;
  action?: ReactNode;
};

/** Order totals. Display only; the server recalculates everything at checkout. */
export function CartSummary({ subtotal, shipping, action }: CartSummaryProps) {
  const remaining = siteConfig.freeShippingThreshold - subtotal.amount;
  const total = shipping ? money(subtotal.amount + shipping.amount, subtotal.currency) : subtotal;

  return (
    <div className="flex flex-col gap-4 rounded-card border border-line bg-surface p-6">
      <h2 className="font-display text-2xl">Order summary</h2>
      <dl className="flex flex-col gap-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted">Subtotal</dt>
          <dd>{formatMoney(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">Delivery</dt>
          <dd>{shipping ? (shipping.amount === 0 ? "Free" : formatMoney(shipping)) : "Calculated at checkout"}</dd>
        </div>
        <div className="mt-2 flex justify-between border-t border-line pt-4 text-base font-medium">
          <dt>Total</dt>
          <dd>{formatMoney(total)}</dd>
        </div>
      </dl>
      {remaining > 0 && (
        <p className="rounded-md bg-subtle p-3 text-xs">
          Add {formatMoney(money(remaining, subtotal.currency))} more for free delivery.
        </p>
      )}
      {action}
    </div>
  );
}
