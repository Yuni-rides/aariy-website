"use client";

import { useActionState } from "react";
import { Button, Field, Input, Textarea } from "@/components/ui";
import { contactAction, type ContactState } from "../actions";

/** Creates a support ticket visible in the admin portal (SOW §3.9). */
export function ContactForm() {
  const [state, formAction, pending] = useActionState<ContactState, FormData>(contactAction, null);
  const errors = state && !state.ok ? (state.fieldErrors ?? {}) : {};
  const values = state && !state.ok ? (state.values ?? {}) : {};

  if (state?.ok) {
    return (
      <div role="status" className="rounded-card border border-line bg-surface p-6">
        <p className="font-display text-2xl">Message sent</p>
        <p className="mt-2 text-sm text-muted">
          Your ticket number is <strong className="text-ink">{state.data.ticketId}</strong>. We reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid gap-4 rounded-card border border-line bg-surface p-6 sm:grid-cols-2" noValidate>
      {state && !state.ok && (
        <p role="alert" className="text-sm text-danger sm:col-span-2">
          {state.error}
        </p>
      )}
      <Field label="Name" name="name" error={errors.name}>
        <Input name="name" defaultValue={values.name} autoComplete="name" required error={errors.name} />
      </Field>
      <Field label="Email" name="email" error={errors.email}>
        <Input name="email" defaultValue={values.email} type="email" autoComplete="email" required error={errors.email} />
      </Field>
      <Field label="Phone (optional)" name="phone">
        <Input name="phone" defaultValue={values.phone} type="tel" autoComplete="tel" />
      </Field>
      <Field label="Order number (optional)" name="orderNumber">
        <Input name="orderNumber" defaultValue={values.orderNumber} placeholder="AR-100000" />
      </Field>
      <div className="sm:col-span-2">
        <Field label="Message" name="message" error={errors.message}>
          <Textarea name="message" defaultValue={values.message} required error={errors.message} />
        </Field>
      </div>
      <Button type="submit" disabled={pending} className="sm:col-span-2 sm:justify-self-start">
        {pending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
