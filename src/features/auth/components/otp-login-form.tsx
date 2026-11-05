"use client";

import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import { useActionState } from "react";
import { MailIcon } from "@/components/icons";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";
import { otpAction, type OtpState } from "../actions";

const submit =
  "flex h-12 w-full items-center justify-center rounded-xl bg-accent text-[15px] font-medium text-accent-ink transition-colors hover:bg-accent-hover disabled:pointer-events-none disabled:opacity-60";
const slide = {
  initial: { opacity: 0, x: -16 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 16 },
};

export function OtpLoginForm({ next }: { next?: string }) {
  const [state, formAction, pending] = useActionState<OtpState, FormData>(
    otpAction,
    { step: "email" },
  );

  return (
    <form action={formAction} className="flex flex-col" noValidate>
      {next && <input type="hidden" name="next" value={next} />}
      <AnimatePresence mode="wait" initial={false}>
        {state.step === "email" ? (
          <m.div key="email" {...slide} className="flex flex-col">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <div
              className={cn(
                "flex h-12 items-center rounded-xl border bg-subtle transition-colors focus-within:border-ink",
                state.error ? "border-danger" : "border-transparent",
              )}
            >
              <span className="flex h-6 items-center border-r border-line px-3.5 text-muted">
                <MailIcon width={18} height={18} />
              </span>
              <input
                id="email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="Email address"
                defaultValue={state.email}
                aria-invalid={Boolean(state.error)}
                aria-describedby={state.error ? "email-error" : undefined}
                autoFocus
                className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm placeholder:text-muted focus:outline-none"
              />
            </div>
            {state.error && (
              <p
                id="email-error"
                role="alert"
                className="mt-1.5 text-xs text-danger"
              >
                {state.error}
              </p>
            )}

            <p className="mt-3 text-[11px] leading-relaxed text-muted">
              By tapping &ldquo;Request OTP&rdquo; you agree to receive a
              one-time passcode from Aariy by email at the address provided, and
              order-status updates if you place an order. See our{" "}
              <Link
                href={routes.policy("privacy")}
                className="text-[#2563eb] hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>

            <label className="mt-5 flex w-fit cursor-pointer items-center gap-3 text-xs">
              <input
                type="checkbox"
                name="newsletter"
                className="peer sr-only"
              />
              <span
                aria-hidden
                className="flex size-5 items-center justify-center rounded-md bg-subtle text-transparent transition-colors peer-checked:bg-accent peer-checked:text-accent-ink peer-focus-visible:outline-2 peer-focus-visible:outline-accent"
              >
                <svg
                  viewBox="0 0 24 24"
                  width={13}
                  height={13}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path d="m5 12 5 5 9-10" />
                </svg>
              </span>
              Subscribe to our newsletter
            </label>

            <button
              type="submit"
              disabled={pending}
              className={cn(submit, "mt-5")}
            >
              {pending ? "Sending code…" : "Request OTP"}
            </button>
          </m.div>
        ) : (
          <m.div key="code" {...slide} className="flex flex-col">
            <p className="text-center text-sm text-muted">
              Enter the 6-digit code we sent to
              <br />
              <strong className="font-medium text-ink">{state.email}</strong>
            </p>
            <label htmlFor="code" className="sr-only">
              6-digit code
            </label>
            <input
              id="code"
              name="code"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              placeholder="••••••"
              aria-invalid={Boolean(state.error)}
              aria-describedby={state.error ? "code-error" : undefined}
              autoFocus
              className={cn(
                "mt-5 h-12 rounded-xl border bg-subtle text-center text-lg tracking-[0.5em] placeholder:text-muted focus:border-ink focus:outline-none",
                state.error ? "border-danger" : "border-transparent",
              )}
            />
            {state.error && (
              <p
                id="code-error"
                role="alert"
                className="mt-1.5 text-xs text-danger"
              >
                {state.error}
              </p>
            )}
            {state.resent && !state.error && (
              <p role="status" className="mt-1.5 text-xs text-success">
                A new code is on its way.
              </p>
            )}
            <button
              type="submit"
              disabled={pending}
              className={cn(submit, "mt-5")}
            >
              {pending ? "Verifying…" : "Verify and sign in"}
            </button>
            <div className="mt-4 flex justify-between text-xs">
              <button
                type="submit"
                name="intent"
                value="change-email"
                formNoValidate
                className="underline underline-offset-4 hover:text-accent"
              >
                Change email
              </button>
              <button
                type="submit"
                name="intent"
                value="resend"
                formNoValidate
                className="underline underline-offset-4 hover:text-accent"
              >
                Resend code
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </form>
  );
}
