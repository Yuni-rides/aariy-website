"use client";

import { useActionState } from "react";
import { Button, ButtonLink, Field, Input, PhoneInput } from "@/components/ui";
import { routes } from "@/config/routes";
import { sellerRegisterAction, type SellerState } from "../actions";

export function SellerRegisterForm() {
  const [state, formAction, pending] = useActionState<SellerState, FormData>(
    sellerRegisterAction,
    null,
  );
  const errors = state && !state.ok ? (state.fieldErrors ?? {}) : {};
  const values = state && !state.ok ? (state.values ?? {}) : {};

  if (state?.ok) {
    return (
      <div
        role="status"
        className="rounded-card border border-line bg-surface p-6 md:p-8"
      >
        <p className="font-display text-2xl">
          Thanks, we&apos;ve got your details
        </p>
        <p className="mt-2 text-sm text-muted">
          Your application number is{" "}
          <strong className="text-ink">{state.data.applicationId}</strong>. Our
          team will contact you within two business days.
        </p>
        <ButtonLink href={routes.home()} variant="secondary" className="mt-6">
          Back to shopping
        </ButtonLink>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="grid gap-4 rounded-card border border-line bg-surface p-6 md:p-8"
      noValidate
    >
      {state && !state.ok && (
        <p role="alert" className="text-sm text-danger">
          {state.error}
        </p>
      )}
      <Field label="Full name" name="fullName" error={errors.fullName}>
        <Input
          name="fullName"
          defaultValue={values.fullName}
          autoComplete="name"
          required
          error={errors.fullName}
        />
      </Field>
      <Field
        label="Name of business"
        name="businessName"
        error={errors.businessName}
      >
        <Input
          name="businessName"
          defaultValue={values.businessName}
          autoComplete="organization"
          required
          error={errors.businessName}
        />
      </Field>
      <Field label="Email address" name="email" error={errors.email}>
        <Input
          name="email"
          defaultValue={values.email}
          type="email"
          autoComplete="email"
          required
          error={errors.email}
        />
      </Field>
      <Field label="Phone number" name="phone" error={errors.phone}>
        <PhoneInput
          name="phone"
          defaultValue={values.phone}
          defaultCountry={values.phoneCountry}
          required
          error={errors.phone}
        />
      </Field>
      <Button
        type="submit"
        size="lg"
        disabled={pending}
        className="mt-2 w-full sm:w-auto sm:justify-self-start"
      >
        {pending ? "Sending…" : "Register"}
      </Button>
    </form>
  );
}
