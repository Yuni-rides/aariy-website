import Image from "@/components/ui/image";
import { formatMoney, multiplyMoney } from "@/lib/money";
import type { CartSellerGroup } from "@/types";

/** Compact list of items grouped by brand, shown beside the checkout form. */
export function OrderReview({ groups }: { groups: CartSellerGroup[] }) {
  return (
    <div className="flex flex-col gap-5">
      {groups.map((group) => (
        <div key={group.brand.id}>
          <p className="mb-3 text-xs uppercase tracking-wider text-muted">{group.brand.name}</p>
          <ul className="flex flex-col gap-3">
            {group.lines.map((line) => (
              <li key={line.variantId} className="flex items-center gap-3">
                <div className="relative aspect-[3/4] w-12 shrink-0 overflow-hidden rounded bg-subtle">
                  <Image src={line.image.url} alt="" fill sizes="48px" className="object-cover" />
                  <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-ink text-[10px] text-bg">
                    {line.quantity}
                  </span>
                </div>
                <div className="flex-1 text-sm">
                  <p className="leading-tight">{line.name}</p>
                  <p className="text-xs text-muted">Size {line.size}</p>
                </div>
                <p className="text-sm">{formatMoney(multiplyMoney(line.unitPrice, line.quantity))}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
