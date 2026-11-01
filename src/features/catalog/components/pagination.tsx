import Link from "next/link";
import { cn } from "@/lib/utils";
import { buildQuery, type SearchParams } from "../lib/filters";

type PaginationProps = { basePath: string; params: SearchParams; page: number; totalPages: number };

export function Pagination({ basePath, params, page, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null;
  const href = (p: number) => basePath + buildQuery(params, { page: p === 1 ? undefined : String(p) });

  return (
    <nav aria-label="Pagination" className="mt-14 flex items-center justify-center gap-2">
      {page > 1 && (
        <Link href={href(page - 1)} rel="prev" className="rounded-md px-3 py-2 text-sm hover:bg-subtle">
          Previous
        </Link>
      )}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <Link
          key={p}
          href={href(p)}
          aria-current={p === page ? "page" : undefined}
          className={cn(
            "inline-flex size-10 items-center justify-center rounded-md text-sm",
            p === page ? "bg-ink text-bg" : "hover:bg-subtle",
          )}
        >
          {p}
        </Link>
      ))}
      {page < totalPages && (
        <Link href={href(page + 1)} rel="next" className="rounded-md px-3 py-2 text-sm hover:bg-subtle">
          Next
        </Link>
      )}
    </nav>
  );
}
