import Link from "next/link";
import { Suspense } from "react";
import { SearchIcon, UserIcon } from "@/components/icons";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { WishlistLink } from "@/features/wishlist/components/wishlist-link";
import { getSessionToken } from "@/lib/session";
import { AccountLink } from "./account-link";
import { IconNav } from "./icon-nav";
import { Logo } from "./logo";

const pillButton =
  "relative inline-flex size-9 items-center justify-center rounded-full text-muted hover:bg-subtle hover:text-ink";

async function SessionAccountLink() {
  const signedIn = Boolean(await getSessionToken());
  return <AccountLink signedIn={signedIn} className={pillButton} />;
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 bg-bg">
      <div className="container-site grid h-18 grid-cols-[1fr_auto] items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
        <Link
          href={routes.home()}
          className="w-fit"
          aria-label={`${siteConfig.name} home`}
        >
          <Logo priority className="h-11 md:h-12" />
        </Link>

        <IconNav />

        <div className="flex items-center justify-end gap-2">
          <div className="flex items-center gap-0.5 rounded-full bg-surface p-1 shadow-pill">
            <Link
              href={routes.search()}
              className={pillButton}
              aria-label="Search"
            >
              <SearchIcon width={18} height={18} />
            </Link>
            <WishlistLink className={pillButton} />
            <Suspense
              fallback={
                <Link
                  href={routes.account()}
                  className={pillButton}
                  aria-label="My account"
                >
                  <UserIcon width={18} height={18} />
                </Link>
              }
            >
              <SessionAccountLink />
            </Suspense>
          </div>
          <Link
            href={routes.sellerRegister()}
            className="inline-flex h-11 shrink-0 items-center rounded-full bg-accent px-4 text-sm font-semibold text-accent-ink shadow-pill transition-colors hover:bg-accent-hover"
          >
            <span className="sm:hidden">Sell</span>
            <span className="hidden sm:inline">Become a seller</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
