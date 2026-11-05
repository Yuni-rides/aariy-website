"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, type ComponentType, type SVGProps } from "react";
import {
  CartIcon,
  GridIcon,
  HelpIcon,
  HomeIcon,
  OrdersIcon,
  StoreIcon,
  TagIcon,
} from "@/components/icons";
import { iconNav, type IconNavKey } from "@/config/navigation";
import { cartCount, useCartStore } from "@/features/cart/store/cart-store";
import { useHydrated } from "@/hooks/use-hydrated";
import { cn } from "@/lib/utils";

const icons: Record<IconNavKey, ComponentType<SVGProps<SVGSVGElement>>> = {
  home: HomeIcon,
  categories: GridIcon,
  stores: StoreIcon,
  cart: CartIcon,
  help: HelpIcon,
  orders: OrdersIcon,
  sale: TagIcon,
};

function isActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function CartBadge() {
  const stored = useCartStore((s) => cartCount(s.lines));
  const count = useHydrated() ? stored : 0;
  if (count === 0) return null;
  return (
    <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-accent text-[9px] font-semibold text-accent-ink">
      {count}
    </span>
  );
}

function Items({ pathname }: { pathname: string | null }) {
  return (
    <ul className="flex items-center justify-around gap-1 md:justify-center">
      {iconNav.map((item) => {
        const Icon = icons[item.key];
        const active = isActive(pathname, item.href);
        return (
          <li key={item.key} className="group relative">
            <Link
              href={item.href}
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex flex-col items-center gap-0.5 rounded-full p-2 text-muted transition-colors hover:text-ink md:size-10 md:justify-center md:p-0",
                active && "text-accent md:bg-accent-soft md:hover:text-accent",
              )}
            >
              <Icon width={20} height={20} />
              {item.key === "cart" && <CartBadge />}
              <span className="text-[10px] leading-none md:hidden">
                {item.label}
              </span>
            </Link>

            <span
              role="tooltip"
              className="pointer-events-none absolute left-1/2 top-full mt-2 hidden -translate-x-1/2 rounded-md bg-surface px-2 py-1 text-[11px] whitespace-nowrap opacity-0 shadow-pill transition-opacity group-focus-within:opacity-100 group-hover:opacity-100 md:block"
            >
              {item.label}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function ActiveItems() {
  return <Items pathname={usePathname()} />;
}

export function IconNav() {
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 px-2 pb-[env(safe-area-inset-bottom)] pt-1 backdrop-blur md:static md:rounded-full md:border-0 md:bg-surface md:px-2 md:py-1.5 md:shadow-pill"
    >
      <Suspense fallback={<Items pathname={null} />}>
        <ActiveItems />
      </Suspense>
    </nav>
  );
}
