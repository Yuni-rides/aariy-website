import Link from "next/link";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { ShieldIcon } from "@/components/icons";
import { Logo } from "./logo";

export function CheckoutHeader() {
  return (
    <header className="border-b border-line bg-surface">
      <div className="container-site flex h-16 items-center justify-between">
        <Link href={routes.home()} aria-label={`${siteConfig.name} home`}>
          <Logo priority className="h-10" />
        </Link>
        <p className="flex items-center gap-2 text-xs text-muted">
          <ShieldIcon /> Secure checkout
        </p>
      </div>
    </header>
  );
}
