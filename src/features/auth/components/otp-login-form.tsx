"use client";

import { AnimatePresence, m } from "framer-motion";
import { useActionState } from "react";
import { Button, Field, Input } from "@/components/ui";
import { otpAction, type OtpState } from "../actions";

/** Two-step sign-in: phone number, then the 6-digit SMS code (SOW §3.7). */
export function OtpLoginForm({ next }: { next?: string }) {
  const [state, formAction, pending] = useActionState<OtpState, FormData>(otpAction, { step: "phone" });

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      {next && <input type="hidden" name="next" value={next} />}
      <AnimatePresence mode="wait" initial={false}>
        {state.step === "phone" ? (
          <m.div key="phone" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} className="flex flex-col gap-5">
            <Field label="Mobile number" name="phone" error={state.error} hint="We'll send a 6-digit code by SMS">
              <Input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="0300 1234567" error={state.error} autoFocus />
            </Field>
            <Button type="submit" size="lg" fullWidth disabled={pending}>
              {pending ? "Sending…" : "Send code"}
            </Button>
          </m.div>
        ) : (
          <m.div key="code" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} className="flex flex-col gap-5">
            <p className="text-sm text-muted">
              Code sent to <strong className="text-ink">{state.phone}</strong>
            </p>
            <Field label="6-digit code" name="code" error={state.error}>
              <Input
                name="code"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                pattern="\d{6}"
                className="text-center text-lg tracking-[0.5em]"
                error={state.error}
                autoFocus
              />
            </Field>
            <Button type="submit" size="lg" fullWidth disabled={pending}>
              {pending ? "Verifying…" : "Verify and sign in"}
            </Button>
            <div className="flex justify-between text-xs">
              <button type="submit" name="intent" value="change-number" className="underline underline-offset-4" formNoValidate>
                Change number
              </button>
              <button type="submit" name="intent" value="resend" className="underline underline-offset-4" formNoValidate>
                Resend code
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </form>
  );
}
