import Link from "next/link";
import { SearchIcon, UserIcon } from "@/components/icons";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { WishlistLink } from "@/features/wishlist/components/wishlist-link";
import { IconNav } from "./icon-nav";

const pillButton = "relative inline-flex size-9 items-center justify-center rounded-full text-muted hover:bg-subtle hover:text-ink";

/**
 * Figma header: logo left, icon pill centre, wishlist + account pill right.
 * Search sits in the right pill (SOW §3.4 needs it; the Figma has no search yet).
 */
export function SiteHeader() {
  // No backdrop-filter on the header: it would trap the fixed mobile tab bar inside it.
  return (
    <header className="sticky top-0 z-30 bg-bg">
      <div className="container-site grid h-18 grid-cols-[1fr_auto] items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
        <Link href={routes.home()} className="text-2xl font-bold tracking-tight" aria-label={`${siteConfig.name} home`}>
          {/* Swap for the Figma logo: <Image src="/images/brand/logo.svg" … /> */}
          {siteConfig.name}
        </Link>

        <IconNav />

        <div className="flex justify-end">
          <div className="flex items-center gap-0.5 rounded-full bg-surface p-1 shadow-pill">
            <Link href={routes.search()} className={pillButton} aria-label="Search">
              <SearchIcon width={18} height={18} />
            </Link>
            <WishlistLink className={pillButton} />
            <Link href={routes.account()} className={pillButton} aria-label="My account">
              <UserIcon width={18} height={18} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
