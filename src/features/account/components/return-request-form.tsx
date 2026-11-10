"use client";

import Image from "@/components/ui/image";
import { useActionState } from "react";
import { Button, ButtonLink, Field, Select, Textarea } from "@/components/ui";
import { routes } from "@/config/routes";
import type { Order } from "@/types";
import { requestReturnAction, type ReturnState } from "../actions";
import { RETURNABLE } from "../lib/order-status";

const REASONS = [
  { value: "wrong_size", label: "Wrong size" },
  { value: "damaged", label: "Damaged or faulty" },
  { value: "not_as_described", label: "Not as described" },
  { value: "changed_mind", label: "Changed my mind" },
  { value: "other", label: "Other" },
];

export function ReturnRequestForm({ order }: { order: Order }) {
  const [state, formAction, pending] = useActionState<ReturnState, FormData>(requestReturnAction, null);
  const lines = order.subOrders.filter((so) => RETURNABLE.includes(so.status)).flatMap((so) => so.lines);
  const errors = state && !state.ok ? (state.fieldErrors ?? {}) : {};

  if (state?.ok) {
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-card border border-line bg-surface p-6">
        <p className="font-display text-2xl">Return requested</p>
        <p className="text-sm text-muted">
          Reference <strong className="text-ink">{state.data.ticketId}</strong>. Our team will review it with the brand and
          contact you within 2 business days.
        </p>
        <ButtonLink href={routes.order(order.orderNumber)} variant="secondary">
          Back to order
        </ButtonLink>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-6 rounded-card border border-line bg-surface p-6" noValidate>
      <input type="hidden" name="orderNumber" value={order.orderNumber} />
      {state && !state.ok && (
        <p role="alert" className="text-sm text-danger">
          {state.error}
        </p>
      )}

      <fieldset>
        <legend className="mb-3 text-sm font-medium">Which items?</legend>
        <ul className="flex flex-col gap-3">
          {lines.map((line) => (
            <li key={line.variantId}>
              <label className="flex cursor-pointer items-center gap-4 rounded-md border border-line p-3 has-[:checked]:border-ink">
                <input type="checkbox" name="variantIds" value={line.variantId} className="accent-accent" />
                <span className="relative aspect-[3/4] w-12 shrink-0 overflow-hidden rounded bg-subtle">
                  <Image src={line.image.url} alt="" fill sizes="48px" className="object-cover" />
                </span>
                <span className="text-sm">
                  {line.name}
                  <span className="block text-xs text-muted">Size {line.size}</span>
                </span>
              </label>
            </li>
          ))}
        </ul>
        {errors.variantIds && (
          <p role="alert" className="mt-2 text-xs text-danger">
            {errors.variantIds}
          </p>
        )}
      </fieldset>

      <Field label="Reason" name="reason" error={errors.reason}>
        <Select name="reason" defaultValue="" error={errors.reason}>
          <option value="" disabled>
            Select a reason
          </option>
          {REASONS.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Details (optional)" name="notes" hint="Tell us what went wrong. Photos can be shared when our team contacts you.">
        <Textarea name="notes" maxLength={1000} />
      </Field>

      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "Submitting…" : "Submit return request"}
      </Button>
    </form>
  );
}
