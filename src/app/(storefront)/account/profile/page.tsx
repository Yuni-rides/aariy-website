import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { HeartIcon, OrdersIcon } from "@/components/icons";
import { Button, Skeleton } from "@/components/ui";
import { routes } from "@/config/routes";
import { signOutAction } from "@/features/auth";
import { getCurrentCustomer } from "@/services";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");

async function Profile() {
  const customer = await getCurrentCustomer({ fresh: true });
  if (!customer) redirect(routes.login(routes.profile()));

  const details = [
    { label: "Full name", value: customer.name },
    { label: "Email address", value: customer.email },
    { label: "Phone number", value: customer.phone },
  ];

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-wrap items-center gap-5 rounded-card border border-line bg-surface p-6">
        <span
          aria-hidden
          className="flex size-16 shrink-0 items-center justify-center rounded-full bg-ink font-display text-xl text-bg"
        >
          {initials(customer.name || customer.email)}
        </span>
        <div className="min-w-0 flex-1">
          <h1 className="truncate font-display text-3xl">{customer.name}</h1>
          <p className="truncate text-sm text-muted">{customer.email}</p>
        </div>
        <form action={signOutAction}>
          <Button type="submit" variant="secondary">
            Sign out
          </Button>
        </form>
      </header>

      <section className="rounded-card border border-line bg-surface p-6">
        <h2 className="text-lg font-medium">Personal information</h2>
        <dl className="mt-5 grid gap-5 sm:grid-cols-2">
          {details.map((d) => (
            <div key={d.label}>
              <dt className="text-xs uppercase tracking-wide text-muted">{d.label}</dt>
              <dd className="mt-1 text-sm">{d.value || <span className="text-muted">Not added</span>}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-xs text-muted">
          You sign in with a one-time code sent to your email, so there is no password to manage.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {[
          { href: routes.orders(), label: "My Orders", text: "Track, return or reorder", icon: OrdersIcon },
          { href: routes.wishlist(), label: "Wishlist", text: "Pieces and stores you saved", icon: HeartIcon },
        ].map(({ href, label, text, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-4 rounded-card border border-line bg-surface p-5 transition-shadow hover:shadow-md"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-subtle">
              <Icon width={18} height={18} />
            </span>
            <span>
              <span className="block font-medium">{label}</span>
              <span className="block text-sm text-muted">{text}</span>
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<Skeleton className="h-64 w-full" />}>
      <Profile />
    </Suspense>
  );
}
