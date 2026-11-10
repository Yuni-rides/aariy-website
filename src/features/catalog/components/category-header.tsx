import Image from "@/components/ui/image";
import Link from "next/link";
import { Breadcrumbs, type Crumb } from "@/components/ui";
import { categoryHref } from "@/lib/categories";
import type { CategoryEntry } from "@/types";

/** Category page header: trail, name, and the next level down as quick links (Clothing › Eastern Ready to wear, …). */
export function CategoryHeader({ entry, breadcrumbs }: { entry: CategoryEntry; breadcrumbs: Crumb[] }) {
  const children = entry.category.children ?? [];
  return (
    <header className="container-site flex flex-col gap-4 py-8 md:py-12">
      <Breadcrumbs items={breadcrumbs} />
      <h1 className="font-display text-4xl md:text-5xl">{entry.category.name}</h1>
      {children.length > 0 && (
        <ul className="-mx-4 mt-2 flex gap-3 overflow-x-auto px-4 pb-1 md:-mx-6 md:px-6 xl:-mx-10 xl:px-10 [&::-webkit-scrollbar]:hidden">
          {children.map((child) => (
            <li key={child.id} className="shrink-0">
              <Link
                href={categoryHref([...entry.path, child])}
                className="flex h-11 items-center gap-2 rounded-full border border-line bg-surface pl-1.5 pr-4 text-sm transition-colors hover:border-ink"
              >
                {child.image ? (
                  <Image src={child.image} alt="" width={32} height={32} className="size-8 rounded-full object-cover" />
                ) : (
                  <span aria-hidden className="w-1.5" />
                )}
                {child.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
