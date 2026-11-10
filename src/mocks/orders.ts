import type { Customer, Order } from "@/types";
import { mockProducts } from "./products";

export const mockCustomer: Customer = {
  id: "cus_001",
  name: "Ayesha Khan",
  phone: "+92 300 1234567",
  email: "ayesha@example.com",
};

// Sample orders use women's pieces so the S/M/L sizes below always exist.
const womens = mockProducts.filter((p) => p.audience === "women" && p.variants.some((v) => v.size === "M"));
const p1 = womens[0];
const p2 = womens[5];
const p3 = womens[10];

const line = (p: typeof p1, size: string, quantity = 1) => ({
  variantId: p.variants.find((v) => v.size === size)!.id,
  productSlug: p.slug,
  name: p.name,
  size,
  image: p.images[0],
  unitPrice: p.price,
  quantity,
});

const address = {
  fullName: mockCustomer.name,
  phone: "+92 300 1234567",
  line1: "House 12, Street 4, DHA Phase 5",
  city: "Lahore",
  province: "Punjab",
  postalCode: "54000",
};

export const mockOrders: Order[] = [
  {
    orderNumber: "AR-100245",
    placedAt: "2026-10-24T10:15:00.000Z",
    status: "dispatched",
    paymentMethod: "cod",
    shippingAddress: address,
    subOrders: [
      {
        id: "so_1",
        brand: p1.brand,
        status: "dispatched",
        lines: [line(p1, "M")],
        subtotal: p1.price,
        dispatchWindow: { from: "2026-10-26", to: "2026-10-28" },
        courier: { name: "Courier Partner", trackingNumber: "CP123456789PK" },
        timeline: [
          { status: "confirmed", label: "Order confirmed", at: "2026-10-24T10:15:00.000Z" },
          { status: "accepted", label: "Accepted by brand", at: "2026-10-24T15:40:00.000Z" },
          { status: "dispatched", label: "Dispatched", at: "2026-10-27T09:00:00.000Z" },
        ],
      },
      {
        id: "so_2",
        brand: p2.brand,
        status: "accepted",
        lines: [line(p2, "S")],
        subtotal: p2.price,
        dispatchWindow: { from: "2026-10-27", to: "2026-10-30" },
        timeline: [
          { status: "confirmed", label: "Order confirmed", at: "2026-10-24T10:15:00.000Z" },
          { status: "accepted", label: "Accepted by brand", at: "2026-10-25T11:20:00.000Z" },
        ],
      },
    ],
    subtotal: { amount: p1.price.amount + p2.price.amount, currency: "PKR" },
    shipping: { amount: 0, currency: "PKR" },
    total: { amount: p1.price.amount + p2.price.amount, currency: "PKR" },
  },
  {
    orderNumber: "AR-100198",
    placedAt: "2026-10-05T18:30:00.000Z",
    status: "delivered",
    paymentMethod: "card",
    shippingAddress: address,
    subOrders: [
      {
        id: "so_3",
        brand: p3.brand,
        status: "delivered",
        lines: [line(p3, "L", 2)],
        subtotal: { amount: p3.price.amount * 2, currency: "PKR" },
        dispatchWindow: { from: "2026-10-07", to: "2026-10-09" },
        courier: { name: "Courier Partner", trackingNumber: "CP987654321PK" },
        timeline: [
          { status: "confirmed", label: "Order confirmed", at: "2026-10-05T18:30:00.000Z" },
          { status: "accepted", label: "Accepted by brand", at: "2026-10-06T09:10:00.000Z" },
          { status: "dispatched", label: "Dispatched", at: "2026-10-08T12:00:00.000Z" },
          { status: "delivered", label: "Delivered", at: "2026-10-10T16:45:00.000Z" },
        ],
      },
    ],
    subtotal: { amount: p3.price.amount * 2, currency: "PKR" },
    shipping: { amount: 25000, currency: "PKR" },
    total: { amount: p3.price.amount * 2 + 25000, currency: "PKR" },
  },
];
