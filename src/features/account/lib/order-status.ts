import type { OrderStatus } from "@/types";

type Tone = "neutral" | "accent" | "success" | "warning" | "danger";

export const ORDER_STATUS: Record<OrderStatus, { label: string; tone: Tone }> =
  {
    pending_payment: { label: "Awaiting payment", tone: "warning" },
    confirmed: { label: "Confirmed", tone: "neutral" },
    accepted: { label: "Preparing", tone: "neutral" },
    dispatched: { label: "Dispatched", tone: "accent" },
    delivered: { label: "Delivered", tone: "success" },
    cancelled: { label: "Cancelled", tone: "danger" },
    return_requested: { label: "Return requested", tone: "warning" },
    refunded: { label: "Refunded", tone: "neutral" },
  };

export const RETURNABLE: OrderStatus[] = ["delivered"];
