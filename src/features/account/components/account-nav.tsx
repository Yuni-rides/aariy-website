"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { accountNav } from "@/config/navigation";
import { cn } from "@/lib/utils";

function NavLinks({ pathname }: { pathname: string | null }) {
  return (
    <ul className="flex gap-2 overflow-x-auto lg:flex-col">
      {accountNav.map((item) => {
        const active = pathname !== null && (item.href === "/account" ? pathname === item.href : pathname.startsWith(item.href));
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn("block rounded-md px-4 py-2.5 text-sm", active ? "bg-ink text-bg" : "hover:bg-subtle")}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function ActiveNavLinks() {
  return <NavLinks pathname={usePathname()} />;
}

/** Links render in the static shell; the active state streams in (usePathname is request-time). */
export function AccountNav() {
  return (
    <nav aria-label="Account">
      <Suspense fallback={<NavLinks pathname={null} />}>
        <ActiveNavLinks />
      </Suspense>
    </nav>
  );
}
