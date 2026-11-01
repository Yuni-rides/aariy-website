"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useMemo, useRef } from "react";
import { Button, ButtonLink, EmptyState, Skeleton } from "@/components/ui";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { CartSummary } from "@/features/cart/components/cart-summary";
import { cartSubtotal, groupLinesByBrand, useCartStore, useHydrated } from "@/features/cart/store/cart-store";
import { placeOrderAction, type PlaceOrderState } from "../actions";
import { AddressFields } from "./address-fields";
import { CheckoutSection } from "./checkout-section";
import { OrderReview } from "./order-review";
import { PaymentMethods } from "./payment-methods";

/**
 * Single-page checkout in three sections (SOW §3.6: three steps or fewer
 * on mobile). Submits to a server action; on success the basket clears
 * and the buyer is sent to the gateway (card) or the confirmation page (COD).
 */
export function CheckoutForm() {
  const router = useRouter();
  const lines = useCartStore((s) => s.lines);
  const clear = useCartStore((s) => s.clear);
  const groups = useMemo(() => groupLinesByBrand(lines), [lines]);
  const subtotal = useMemo(() => cartSubtotal(lines), [lines]);
  // One key per checkout attempt, so a double submit doesn't create two orders.
  // Created on first submit (not during render) so prerendering stays deterministic.
  const idempotencyKey = useRef<string | null>(null);
  const [state, formAction, pending] = useActionState<PlaceOrderState, FormData>(placeOrderAction, null);
  const hydrated = useHydrated();

  useEffect(() => {
    if (!state?.ok) return;
    clear();
    if (state.data.paymentRedirectUrl) window.location.assign(state.data.paymentRedirectUrl);
    else router.replace(routes.checkoutSuccess(state.data.orderNumber));
  }, [state, clear, router]);

  if (!hydrated) return <Skeleton className="h-[32rem] w-full rounded-card" />;

  if (lines.length === 0 && !state?.ok) {
    return (
      <EmptyState
        title="Your basket is empty"
        description="Add something you love before checking out."
        action={<ButtonLink href={routes.collection("new-in")}>Continue shopping</ButtonLink>}
      />
    );
  }

  const fieldErrors = state && !state.ok ? (state.fieldErrors ?? {}) : {};
  const values = state && !state.ok ? (state.values ?? {}) : {};
  const shipping = { amount: subtotal.amount >= siteConfig.freeShippingThreshold ? 0 : 25000, currency: subtotal.currency };

  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        idempotencyKey.current ??= crypto.randomUUID();
        (e.currentTarget.elements.namedItem("idempotencyKey") as HTMLInputElement).value = idempotencyKey.current;
      }}
      className="grid gap-8 lg:grid-cols-[1fr_26rem]"
      noValidate
    >
      <input type="hidden" name="lines" value={JSON.stringify(lines.map((l) => ({ variantId: l.variantId, quantity: l.quantity })))} />
      <input type="hidden" name="idempotencyKey" defaultValue="" />

      <div className="flex flex-col gap-6">
        {state && !state.ok && (
          <p role="alert" className="rounded-md border border-danger/30 bg-danger/5 p-4 text-sm text-danger">
            {state.error}
          </p>
        )}
        <CheckoutSection step={1} title="Delivery details">
          <AddressFields errors={fieldErrors} values={values} />
        </CheckoutSection>
        <CheckoutSection step={2} title="Payment">
          <PaymentMethods error={fieldErrors.paymentMethod} selected={values.paymentMethod} />
        </CheckoutSection>
      </div>

      <div className="flex flex-col gap-6 lg:sticky lg:top-8 lg:self-start">
        <CheckoutSection step={3} title="Review">
          <OrderReview groups={groups} />
        </CheckoutSection>
        <CartSummary
          subtotal={subtotal}
          shipping={shipping}
          action={
            <>
              <Button type="submit" size="lg" fullWidth disabled={pending}>
                {pending ? "Placing order…" : "Place order"}
              </Button>
              <p className="text-center text-xs text-muted">
                Items are reserved for {siteConfig.reservationMinutes} minutes while you pay.
              </p>
            </>
          }
        />
      </div>
    </form>
  );
}
