import type { BrandSummary } from "./brand";
import type { ImageAsset, Money } from "./common";

export type PaymentMethod = "cod" | "card";

export type OrderStatus =
  | "pending_payment"
  | "confirmed"
  | "accepted"
  | "dispatched"
  | "delivered"
  | "cancelled"
  | "return_requested"
  | "refunded";

export type Address = {
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  province: string;
  postalCode?: string;
};

export type OrderLine = {
  variantId: string;
  productSlug: string;
  name: string;
  size: string;
  image: ImageAsset;
  unitPrice: Money;
  quantity: number;
};

export type TrackingEvent = {
  status: OrderStatus;
  label: string;
  at: string;
};

/** One suborder per brand (SOW §19.1). */
export type SubOrder = {
  id: string;
  brand: BrandSummary;
  status: OrderStatus;
  lines: OrderLine[];
  subtotal: Money;
  dispatchWindow: { from: string; to: string };
  courier?: { name: string; trackingNumber: string };
  timeline: TrackingEvent[];
};

export type Order = {
  orderNumber: string;
  placedAt: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  shippingAddress: Address;
  subOrders: SubOrder[];
  subtotal: Money;
  shipping: Money;
  total: Money;
};

export type OrderSummary = Pick<Order, "orderNumber" | "placedAt" | "status" | "total"> & {
  itemCount: number;
  brandCount: number;
};

export type ReturnReason = "wrong_size" | "damaged" | "not_as_described" | "changed_mind" | "other";
