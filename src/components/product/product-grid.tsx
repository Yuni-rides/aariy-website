import { Skeleton } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { ProductSummary } from "@/types";
import { ProductCard } from "./product-card";

type ProductGridProps = {
  products: ProductSummary[];
  className?: string;
  priorityCount?: number;
};

const gridClass =
  "grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 xl:grid-cols-4";

export function ProductGrid({
  products,
  className,
  priorityCount = 0,
}: ProductGridProps) {
  return (
    <ul className={cn(gridClass, className)}>
      {products.map((product, i) => (
        <li key={product.id}>
          <ProductCard product={product} priority={i < priorityCount} />
        </li>
      ))}
    </ul>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <ul className={gridClass} aria-label="Loading products">
      {Array.from({ length: count }, (_, i) => (
        <li key={i} className="flex flex-col gap-3">
          <Skeleton className="aspect-[3/4] w-full rounded-card" />
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/4" />
        </li>
      ))}
    </ul>
  );
}
