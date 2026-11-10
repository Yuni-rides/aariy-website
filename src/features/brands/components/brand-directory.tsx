import Image from "@/components/ui/image";
import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/motion";
import { ShieldIcon } from "@/components/icons";
import { routes } from "@/config/routes";
import type { Brand } from "@/types";

export function BrandDirectory({ brands }: { brands: Brand[] }) {
  return (
    <Stagger className="container-site grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {brands.map((brand) => (
        <StaggerItem key={brand.id}>
          <Link
            href={routes.brand(brand.slug)}
            className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface transition-shadow hover:shadow-md"
          >
            <div className="relative aspect-[8/3] bg-subtle">
              {brand.banner && <Image src={brand.banner.url} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />}
            </div>
            <div className="flex flex-1 flex-col gap-2 p-5">
              <p className="flex items-center gap-2 font-display text-2xl group-hover:text-accent">
                {brand.name}
                {brand.verified && <ShieldIcon className="text-success" aria-label="Verified brand" />}
              </p>
              <p className="text-sm text-muted">{brand.tagline}</p>
              <p className="mt-auto pt-3 text-xs text-muted">
                {brand.city} · {brand.productCount} products
              </p>
            </div>
          </Link>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
