"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { HeartIcon, OrdersIcon, UserIcon } from "@/components/icons";
import { routes } from "@/config/routes";
import { signOutAction } from "@/features/auth/actions";
import { cn } from "@/lib/utils";

type Viewer = { name: string; email: string };

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");

/** Signed out: a link to sign in. Signed in: the buyer's initials, opening a profile menu. */
export function AccountLink({ customer, className }: { customer: Viewer | null; className?: string }) {
  const pathname = usePathname();

  if (!customer) {
    const next = pathname === routes.login() ? routes.account() : pathname;
    return (
      <Link href={routes.login(next)} className={className} aria-label="Sign in">
        <UserIcon width={18} height={18} />
      </Link>
    );
  }
  return <AccountMenu customer={customer} className={className} />;
}

function AccountMenu({ customer, className }: { customer: Viewer; className?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const pathname = usePathname();

  // Close on route change, outside click or Escape.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const items = [
    { label: "My Profile", href: routes.profile(), icon: UserIcon },
    { label: "My Orders", href: routes.orders(), icon: OrdersIcon },
    { label: "Wishlist", href: routes.wishlist(), icon: HeartIcon },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={menuId}
        aria-label="My account"
        className={cn(className, "bg-ink text-[11px] font-semibold text-bg hover:bg-ink/85 hover:text-bg")}
      >
        {initials(customer.name || customer.email) || <UserIcon width={18} height={18} />}
      </button>

      {open && (
        <div
          id={menuId}
          className="absolute right-0 top-full z-40 mt-3 w-64 overflow-hidden rounded-card border border-line bg-surface shadow-lg"
        >
          <div className="border-b border-line px-4 py-3.5">
            <p className="truncate text-sm font-semibold">Hi, {customer.name.split(" ")[0] || "there"}</p>
            <p className="truncate text-xs text-muted">{customer.email}</p>
          </div>
          <ul className="py-1.5">
            {items.map(({ label, href, icon: Icon }) => (
              <li key={href}>
                <Link href={href} className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-subtle">
                  <Icon width={16} height={16} className="text-muted" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <form action={signOutAction} className="border-t border-line p-1.5">
            <button
              type="submit"
              className="w-full rounded-md px-2.5 py-2 text-left text-sm text-danger hover:bg-subtle"
            >
              Sign out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
