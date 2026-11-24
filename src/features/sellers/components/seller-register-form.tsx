"use client";

import Link from "next/link";
import { useActionState, useEffect, useState, useTransition } from "react";
import { EyeIcon, EyeOffIcon } from "@/components/icons";
import { Button, ButtonLink, Field, Input, PhoneInput } from "@/components/ui";
import { routes } from "@/config/routes";
import { requestSellerOtpAction, sellerRegisterAction, type SellerState } from "../actions";

type OtpSent = { email: string; sentTo: string; resendAt: number };

/** Seconds left until `until` (ms), ticking once a second. */
function useCountdown(until: number | undefined) {
  // The clock is only read in effects: reading it during render breaks prerendering.
  const [left, setLeft] = useState(0);
  useEffect(() => {
    if (!until) return;
    const tick = () => setLeft(Math.max(0, Math.ceil((until - Date.now()) / 1000)));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [until]);
  return until ? left : 0;
}

/** Password field with an eye button to show or hide what was typed. */
function PasswordInput({ name, error }: { name: string; error?: string }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <Input
        name={name}
        type={visible ? "text" : "password"}
        autoComplete="new-password"
        required
        error={error}
        className="pr-12"
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted hover:text-ink"
      >
        {visible ? <EyeOffIcon width={18} height={18} /> : <EyeIcon width={18} height={18} />}
      </button>
    </div>
  );
}

export function SellerRegisterForm() {
  const [state, formAction, pending] = useActionState<SellerState, FormData>(sellerRegisterAction, null);
  const errors = state && !state.ok ? (state.fieldErrors ?? {}) : {};
  const values = state && !state.ok ? (state.values ?? {}) : {};

  // Email is controlled so it survives the form reset after each submit.
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<OtpSent | null>(null);
  const [otpError, setOtpError] = useState<string>();
  const [sending, startSending] = useTransition();
  const resendIn = useCountdown(otp?.resendAt);

  // Editing the email after a code was sent means a new code is needed.
  const codeSentForThisEmail = otp !== null && otp.email === email.trim().toLowerCase();

  function sendCode() {
    setOtpError(undefined);
    startSending(async () => {
      const res = await requestSellerOtpAction(email);
      if (!res.ok) {
        setOtpError(res.error);
        return;
      }
      setOtp({
        email: email.trim().toLowerCase(),
        sentTo: res.sentTo,
        resendAt: Date.now() + res.resendAfterSeconds * 1000,
      });
    });
  }

  if (state?.ok) {
    return (
      <div role="status" className="rounded-card border border-line bg-surface p-6 md:p-8">
        <p className="font-display text-2xl">Welcome aboard!</p>
        <p className="mt-2 text-sm text-muted">{state.data.message}</p>
        <p className="mt-2 text-sm text-muted">
          Your seller account is registered with <strong className="text-ink">{state.data.email}</strong>. Our team
          will review your store and contact you within two business days.
        </p>
        <ButtonLink href={routes.home()} variant="secondary" className="mt-6">
          Back to shopping
        </ButtonLink>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid gap-4 rounded-card border border-line bg-surface p-6 md:p-8" noValidate>
      {state && !state.ok && (
        <p role="alert" className="text-sm text-danger">
          {state.error}
        </p>
      )}

      <Field label="Full name" name="fullName" error={errors.fullName}>
        <Input name="fullName" defaultValue={values.fullName} autoComplete="name" required error={errors.fullName} />
      </Field>

      <Field label="Name of business" name="businessName" error={errors.businessName}>
        <Input
          name="businessName"
          defaultValue={values.businessName}
          autoComplete="organization"
          required
          error={errors.businessName}
        />
      </Field>

      <Field label="Email address" name="email" error={errors.email ?? otpError}>
        <div className="relative">
          <Input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            error={errors.email ?? otpError}
            className="pr-32"
          />
          <button
            type="button"
            onClick={sendCode}
            disabled={sending || !email.trim() || (codeSentForThisEmail && resendIn > 0)}
            className="absolute inset-y-1.5 right-1.5 rounded-md bg-ink px-3 text-xs font-semibold text-bg transition-opacity disabled:opacity-40"
          >
            {sending ? "Sending…" : codeSentForThisEmail ? (resendIn > 0 ? `Resend in ${resendIn}s` : "Resend code") : "Send code"}
          </button>
        </div>
      </Field>

      {codeSentForThisEmail && (
        <Field
          label="Verification code"
          name="code"
          error={errors.code}
          hint={`We sent a 6-digit code to ${otp.sentTo}. It expires in 5 minutes.`}
        >
          <Input
            name="code"
            defaultValue={values.code}
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            placeholder="••••••"
            required
            error={errors.code}
            className="tracking-[0.5em]"
          />
        </Field>
      )}

      <Field label="Phone number" name="phone" error={errors.phone}>
        <PhoneInput
          name="phone"
          defaultValue={values.phone}
          defaultCountry={values.phoneCountry}
          required
          error={errors.phone}
        />
      </Field>

      <Field
        label="Password"
        name="password"
        error={errors.password}
        hint="At least 8 characters, with a letter and a number."
      >
        <PasswordInput name="password" error={errors.password} />
      </Field>

      <Field label="Confirm password" name="confirmPassword" error={errors.confirmPassword}>
        <PasswordInput name="confirmPassword" error={errors.confirmPassword} />
      </Field>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm">
          <input
            type="checkbox"
            name="acceptTerms"
            defaultChecked={values.acceptTerms === "on"}
            className="mt-0.5 size-4 accent-accent"
          />
          <span>
            I agree to the{" "}
            <Link href={routes.policy("terms")} className="underline" target="_blank">
              Terms of Service
            </Link>
            ,{" "}
            <Link href={routes.policy("privacy")} className="underline" target="_blank">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href={routes.policy("prohibited-products")} className="underline" target="_blank">
              Prohibited Products
            </Link>{" "}
            policy.
          </span>
        </label>
        {errors.acceptTerms && (
          <p role="alert" className="mt-1.5 text-xs text-danger">
            {errors.acceptTerms}
          </p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={pending || !codeSentForThisEmail}
        className="mt-2 w-full sm:w-auto sm:justify-self-start"
      >
        {pending ? "Creating account…" : "Register"}
      </Button>
      {!codeSentForThisEmail && (
        <p className="-mt-2 text-xs text-muted">Verify your email with a code first, then register.</p>
      )}
    </form>
  );
}
