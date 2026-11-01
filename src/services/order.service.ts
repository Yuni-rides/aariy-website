import { useMocks } from "@/config/env";
import { apiClient, endpoints, isNotFound } from "@/lib/api";
import { getSessionToken } from "@/lib/session";
import { mockOrders } from "@/mocks/orders";
import type { Address, Order, OrderSummary, PaymentMethod, ReturnReason } from "@/types";

/** Buyer orders. Per-user data: never cached, always called inside <Suspense>. */

function toSummary(order: Order): OrderSummary {
  return {
    orderNumber: order.orderNumber,
    placedAt: order.placedAt,
    status: order.status,
    total: order.total,
    itemCount: order.subOrders.reduce((n, so) => n + so.lines.reduce((m, l) => m + l.quantity, 0), 0),
    brandCount: order.subOrders.length,
  };
}

export async function listMyOrders(): Promise<OrderSummary[]> {
  const token = await getSessionToken();
  if (useMocks) return mockOrders.map(toSummary);
  return apiClient.get(endpoints.orders, { token });
}

export async function getMyOrder(orderNumber: string): Promise<Order | null> {
  const token = await getSessionToken();
  if (useMocks) return mockOrders.find((o) => o.orderNumber === orderNumber) ?? null;
  try {
    return await apiClient.get<Order>(endpoints.order(orderNumber), { token });
  } catch (error) {
    if (isNotFound(error)) return null;
    throw error;
  }
}

export type PlaceOrderInput = {
  lines: { variantId: string; quantity: number }[];
  address: Address;
  email?: string;
  paymentMethod: PaymentMethod;
};

export type PlaceOrderResult = {
  orderNumber: string;
  /** Card payments redirect to the gateway's hosted page; COD returns null. */
  paymentRedirectUrl: string | null;
};

/**
 * Creates the parent order and one suborder per brand, and reserves stock
 * for 15 minutes (SOW §19.1). Totals are always recalculated by the server.
 */
export async function placeOrder(input: PlaceOrderInput, idempotencyKey: string): Promise<PlaceOrderResult> {
  const token = await getSessionToken();
  if (useMocks) {
    return { orderNumber: `AR-${Math.floor(100000 + Math.random() * 900000)}`, paymentRedirectUrl: null };
  }
  return apiClient.post(endpoints.checkout, input, { token, idempotencyKey });
}

export async function requestReturn(
  orderNumber: string,
  input: { variantIds: string[]; reason: ReturnReason; notes?: string },
): Promise<{ ticketId: string }> {
  const token = await getSessionToken();
  if (useMocks) return { ticketId: `RT-${Date.now().toString().slice(-6)}` };
  return apiClient.post(endpoints.returns(orderNumber), input, { token });
}
