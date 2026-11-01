import type { ReactNode } from "react";

export function CheckoutSection({ step, title, children }: { step: number; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`checkout-step-${step}`} className="rounded-card border border-line bg-surface p-6">
      <h2 id={`checkout-step-${step}`} className="mb-5 flex items-center gap-3 font-display text-2xl">
        <span className="flex size-7 items-center justify-center rounded-full bg-ink font-sans text-xs text-bg">{step}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}
