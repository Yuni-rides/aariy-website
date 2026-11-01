import { CashIcon, ShieldIcon } from "@/components/icons";

const methods = [
  {
    value: "cod",
    title: "Cash on delivery",
    description: "Pay in cash when your order arrives. We'll call to confirm before dispatch.",
    icon: CashIcon,
  },
  {
    value: "card",
    title: "Debit / credit card",
    description: "Pay securely on our payment partner's page. Card details never touch Aariy.",
    icon: ShieldIcon,
  },
] as const;

export function PaymentMethods({ error, selected = "cod" }: { error?: string; selected?: string }) {
  return (
    <fieldset aria-describedby={error ? "paymentMethod-error" : undefined}>
      <legend className="sr-only">Payment method</legend>
      <div className="flex flex-col gap-3">
        {methods.map((m) => (
          <label
            key={m.value}
            className="flex cursor-pointer gap-4 rounded-md border border-line p-4 has-[:checked]:border-ink has-[:checked]:bg-subtle"
          >
            <input type="radio" name="paymentMethod" value={m.value} defaultChecked={m.value === selected} className="mt-1 accent-accent" />
            <m.icon className="mt-0.5 shrink-0" />
            <span>
              <span className="block text-sm font-medium">{m.title}</span>
              <span className="mt-1 block text-xs text-muted">{m.description}</span>
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id="paymentMethod-error" role="alert" className="mt-2 text-xs text-danger">
          {error}
        </p>
      )}
    </fieldset>
  );
}
