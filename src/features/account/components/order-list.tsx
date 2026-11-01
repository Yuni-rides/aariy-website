import Link from "next/link";
import { ButtonLink, EmptyState } from "@/components/ui";
import { routes } from "@/config/routes";
import { formatDate } from "@/lib/date";
import { formatMoney } from "@/lib/money";
import type { OrderSummary } from "@/types";
import { OrderStatusBadge } from "./order-status-badge";

export function OrderList({ orders }: { orders: OrderSummary[] }) {
  if (orders.length === 0) {
    return (
      <EmptyState
        title="No orders yet"
        description="When you place an order it will appear here."
        action={<ButtonLink href={routes.collection("new-in")}>Start shopping</ButtonLink>}
      />
    );
  }

  return (
    <ul className="divide-y divide-line rounded-card border border-line bg-surface">
      {orders.map((order) => (
        <li key={order.orderNumber}>
          <Link href={routes.order(order.orderNumber)} className="flex flex-wrap items-center gap-x-6 gap-y-2 p-5 hover:bg-subtle">
            <div className="min-w-32">
              <p className="font-medium">{order.orderNumber}</p>
              <p className="text-xs text-muted">{formatDate(order.placedAt)}</p>
            </div>
            <OrderStatusBadge status={order.status} />
            <p className="text-sm text-muted">
              {order.itemCount} {order.itemCount === 1 ? "item" : "items"} from {order.brandCount}{" "}
              {order.brandCount === 1 ? "brand" : "brands"}
            </p>
            <p className="ml-auto font-medium">{formatMoney(order.total)}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
