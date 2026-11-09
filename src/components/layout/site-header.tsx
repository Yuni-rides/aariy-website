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

const pillButton = "relative inline-flex size-9 items-center justify-center rounded-full text-muted hover:bg-subtle hover:text-ink";

/** Reads the session cookie, so it streams in; the rest of the header stays static. */
async function SessionAccountLink() {
  const signedIn = Boolean(await getSessionToken());
  return <AccountLink signedIn={signedIn} className={pillButton} />;
}

/**
 * Figma header: logo left, icon pill centre, wishlist + account pill right.
 * Search sits in the right pill (SOW §3.4 needs it; the Figma has no search yet).
 */
export function SiteHeader() {
  // No backdrop-filter on the header: it would trap the fixed mobile tab bar inside it.
  return (
    <header className="sticky top-0 z-30 bg-bg">
      <div className="container-site grid h-18 grid-cols-[1fr_auto] items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
        <Link href={routes.home()} className="w-fit" aria-label={`${siteConfig.name} home`}>
          <Logo priority className="h-11 md:h-12" />
        </Link>

        <IconNav />

        <div className="flex justify-end">
          <div className="flex items-center gap-0.5 rounded-full bg-surface p-1 shadow-pill">
            <Link href={routes.search()} className={pillButton} aria-label="Search">
              <SearchIcon width={18} height={18} />
            </Link>
            <WishlistLink className={pillButton} />
            {/* Until the session is known, point at /account: it sends signed-out visitors to sign-in anyway. */}
            <Suspense
              fallback={
                <Link href={routes.account()} className={pillButton} aria-label="My account">
                  <UserIcon width={18} height={18} />
                </Link>
              }
            >
              <SessionAccountLink />
            </Suspense>
          </div>
        </div>
      </div>
    </header>
  );
}
