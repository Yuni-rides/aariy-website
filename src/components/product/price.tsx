import { discountPercent, formatMoney } from "@/lib/money";
import { cn } from "@/lib/utils";
import type { Money } from "@/types";

type PriceProps = { price: Money; compareAt?: Money; className?: string; size?: "sm" | "lg" };

export function Price({ price, compareAt, className, size = "sm" }: PriceProps) {
  const off = discountPercent(price, compareAt);
  return (
    <p className={cn("flex flex-wrap items-baseline gap-x-2", size === "lg" ? "text-xl" : "text-sm", className)}>
      <span className={cn("font-medium", off && "text-accent")}>
        <span className="sr-only">{off ? "Sale price " : "Price "}</span>
        {formatMoney(price)}
      </span>
      {off && compareAt && (
        <>
          <s className="text-muted">
            <span className="sr-only">Original price </span>
            {formatMoney(compareAt)}
          </s>
          <span className="text-xs font-medium text-accent">-{off}%</span>
        </>
      )}
    </p>
  );
}
