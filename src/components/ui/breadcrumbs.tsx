import Link from "next/link";
import { ChevronRightIcon } from "@/components/icons";
import { JsonLd } from "@/components/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export type Crumb = { name: string; href: string };

type BreadcrumbsProps = {
  items: Crumb[];
  /** Keep the current page in the structured data but not on screen (product pages end at their category). */
  hideCurrent?: boolean;
};

/** Visible breadcrumb trail + BreadcrumbList structured data in one component. */
export function Breadcrumbs({ items, hideCurrent }: BreadcrumbsProps) {
  const visible = hideCurrent ? items.slice(0, -1) : items;
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {visible.map((item, i) => {
            const current = !hideCurrent && i === visible.length - 1;
            return (
              <li key={item.href + item.name} className="flex items-center gap-2">
                {i > 0 && <ChevronRightIcon aria-hidden width={14} height={14} className="text-muted/70" />}
                {current ? (
                  <span aria-current="page" className="text-ink">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.href} className="transition-colors hover:text-ink">
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(items)} />
    </>
  );
}
