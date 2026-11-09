import { cacheLife } from "next/cache";
import Link from "next/link";
import { footerNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Logo } from "./logo";

export async function SiteFooter() {
  "use cache";
  cacheLife("days");

  return (
    <footer className="mt-24 border-t border-line bg-surface pb-16 md:pb-0">
      <div className="container-site grid gap-10 py-14 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <Logo className="h-14" />
          <p className="mt-3 text-sm text-muted">{siteConfig.tagline}</p>
          <p className="mt-6 text-sm">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="hover:text-accent"
            >
              {siteConfig.contact.email}
            </a>
          </p>
        </div>
        {footerNav.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              {group.title}
            </p>
            <ul className="flex flex-col gap-2.5 text-sm">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-muted md:flex-row md:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights
            reserved.
          </p>
          <ul className="flex gap-4">
            {Object.entries(siteConfig.social).map(([name, href]) => (
              <li key={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="capitalize hover:text-ink"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
