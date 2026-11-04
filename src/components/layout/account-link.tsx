"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserIcon } from "@/components/icons";
import { routes } from "@/config/routes";

/**
 * Header user icon. Signed in: My account. Signed out: opens the sign-in
 * modal over the current page, and sign-in returns to that same page.
 */
export function AccountLink({ signedIn, className }: { signedIn: boolean; className?: string }) {
  const pathname = usePathname();
  const href = signedIn ? routes.account() : routes.login(pathname === routes.login() ? routes.account() : pathname);

  return (
    <Link href={href} className={className} aria-label={signedIn ? "My account" : "Sign in"}>
      <UserIcon width={18} height={18} />
    </Link>
  );
}
