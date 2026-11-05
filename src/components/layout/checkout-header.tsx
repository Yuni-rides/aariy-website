import Link from "next/link";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { ShieldIcon } from "@/components/icons";

export function CheckoutHeader() {
  return (
    <header className="border-b border-line bg-surface">
      <div className="container-site flex h-16 items-center justify-between">
        <Link
          href={routes.home()}
          className="font-display text-2xl tracking-wide"
        >
          {siteConfig.name}
        </Link>
        <p className="flex items-center gap-2 text-xs text-muted">
          <ShieldIcon /> Secure checkout
        </p>
      </div>
    </header>
  );
}
