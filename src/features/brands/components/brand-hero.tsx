import Image from "next/image";
import { Reveal } from "@/components/motion";
import { Badge, Breadcrumbs } from "@/components/ui";
import { ShieldIcon } from "@/components/icons";
import { routes } from "@/config/routes";
import type { Brand } from "@/types";

/** Brand story, verified badge and banner (SOW §3.2). */
export function BrandHero({ brand }: { brand: Brand }) {
  return (
    <header className="pb-10">
      <div className="relative aspect-[16/7] max-h-[420px] w-full bg-subtle md:aspect-[16/5]">
        {brand.banner && (
          <Image src={brand.banner.url} alt={brand.banner.alt} fill priority sizes="100vw" className="object-cover" />
        )}
      </div>
      <div className="container-site -mt-12 flex flex-col gap-6 md:-mt-16 md:flex-row md:items-end">
        {brand.logo && (
          <Image
            src={brand.logo.url}
            alt={brand.logo.alt}
            width={128}
            height={128}
            className="relative size-24 rounded-full border-4 border-bg bg-surface md:size-32"
          />
        )}
        <Reveal className="flex flex-col gap-3">
          <Breadcrumbs
            items={[
              { name: "Home", href: routes.home() },
              { name: "Brands", href: routes.brands() },
              { name: brand.name, href: routes.brand(brand.slug) },
            ]}
          />
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-4xl md:text-5xl">{brand.name}</h1>
            {brand.verified && (
              <Badge tone="success">
                <ShieldIcon width={14} height={14} /> Verified brand
              </Badge>
            )}
          </div>
          <p className="text-muted">{brand.tagline}</p>
        </Reveal>
      </div>
      <div className="container-site mt-6">
        <p className="max-w-3xl text-sm leading-relaxed">{brand.story}</p>
      </div>
    </header>
  );
}
