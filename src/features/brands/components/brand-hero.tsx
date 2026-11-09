import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "@/components/icons";
import { Breadcrumbs } from "@/components/ui";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";
import type { Brand } from "@/types";

export type BrandTab = "products" | "collections";

export function BrandHero({
  brand,
  active,
}: {
  brand: Brand;
  active: BrandTab;
}) {
  const tabs = [
    { key: "products", label: "All products", href: routes.brand(brand.slug) },
    {
      key: "collections",
      label: "Collections",
      href: routes.brandCollections(brand.slug),
    },
  ] as const;

  return (
    <header className="container-site pb-8 pt-4 md:pb-10">
      <Breadcrumbs
        items={[
          { name: "Home", href: routes.home() },
          { name: "Brands", href: routes.brands() },
          { name: brand.name, href: routes.brand(brand.slug) },
        ]}
      />
      <div className="relative isolate mt-4 overflow-hidden rounded-panel bg-[#272F39] px-5 pb-6 pt-24 text-white md:px-10 md:pb-9 md:pt-40">
        {brand.banner && (
          <Image
            src={brand.banner.url}
            alt={brand.banner.alt}
            fill
            priority
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="-z-10 object-cover"
          />
        )}

        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-b from-[#272F39]/10 via-[#272F39]/50 to-[#272F39]/95"
        />

        <div className="flex items-center gap-4 md:gap-5">
          <span className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white text-ink md:size-24">
            {brand.logo ? (
              <Image
                src={brand.logo.url}
                alt={brand.logo.alt}
                width={96}
                height={96}
                sizes="96px"
                className="size-full object-contain p-1.5"
              />
            ) : (
              <span
                aria-hidden
                className="px-2 text-center font-display text-[13px] leading-tight md:text-[15px]"
              >
                {/* The zero-width space lets a long name wrap after its dot. */}
                {brand.name.replace(/\s+/g, ".​")}
              </span>
            )}
          </span>
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-semibold leading-tight md:text-4xl">
              {brand.name}
            </h1>
            <p className="mt-1.5 flex items-center gap-1.5 text-sm md:text-base">
              {brand.rating && (
                <>
                  <StarIcon width={16} height={16} aria-hidden />
                  <span>
                    {brand.rating.average}
                    <span className="sr-only"> out of 5</span>
                  </span>
                  <span aria-hidden>•</span>
                </>
              )}
              <span>
                {brand.productCount}{" "}
                {brand.productCount === 1 ? "item" : "items"}
              </span>
            </p>
          </div>
        </div>

        <nav
          aria-label={`${brand.name} store`}
          className="mt-6 flex gap-3 md:mt-8"
        >
          {tabs.map((tab) => {
            const isActive = tab.key === active;
            return (
              <Link
                key={tab.key}
                href={tab.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "inline-flex h-11 items-center rounded-full px-5 text-sm font-semibold backdrop-blur-sm transition-colors md:h-12 md:px-7 md:text-base",
                  isActive
                    ? "border border-white/80 bg-white/10 hover:bg-white/20"
                    : "bg-white/25 hover:bg-white/35",
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
