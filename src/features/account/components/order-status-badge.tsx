import { Badge } from "@/components/ui";
import type { OrderStatus } from "@/types";
import { ORDER_STATUS } from "../lib/order-status";

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const { label, tone } = ORDER_STATUS[status];
  return <Badge tone={tone}>{label}</Badge>;
}
