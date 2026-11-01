import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui";
import { routes } from "@/config/routes";
import { formatDate, formatShortDate } from "@/lib/date";
import { formatMoney, multiplyMoney } from "@/lib/money";
import type { Order } from "@/types";
import { RETURNABLE } from "../lib/order-status";
import { OrderStatusBadge } from "./order-status-badge";
import { OrderTimeline } from "./order-timeline";

export function OrderDetail({ order }: { order: Order }) {
  const canReturn = order.subOrders.some((so) => RETURNABLE.includes(so.status));

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">Order {order.orderNumber}</h1>
          <p className="text-sm text-muted">
            Placed {formatDate(order.placedAt)} · {order.paymentMethod === "cod" ? "Cash on delivery" : "Paid by card"}
          </p>
        </div>
        {canReturn && (
          <ButtonLink href={routes.orderReturn(order.orderNumber)} variant="secondary" size="sm">
            Request a return
          </ButtonLink>
        )}
      </header>

      {order.subOrders.map((so) => (
        <section key={so.id} className="grid gap-6 rounded-card border border-line bg-surface p-5 md:grid-cols-[1fr_16rem]">
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <h2 className="text-sm">
                Shipped by{" "}
                <Link href={routes.brand(so.brand.slug)} className="font-medium hover:text-accent">
                  {so.brand.name}
                </Link>
              </h2>
              <OrderStatusBadge status={so.status} />
            </div>
            <ul className="flex flex-col gap-4">
              {so.lines.map((line) => (
                <li key={line.variantId} className="flex gap-4">
                  <div className="relative aspect-[3/4] w-16 shrink-0 overflow-hidden rounded bg-subtle">
                    <Image src={line.image.url} alt={line.image.alt} fill sizes="64px" className="object-cover" />
                  </div>
                  <div className="flex-1 text-sm">
                    <Link href={routes.product(line.productSlug)} className="hover:text-accent">
                      {line.name}
                    </Link>
                    <p className="text-xs text-muted">
                      Size {line.size} · Qty {line.quantity}
                    </p>
                  </div>
                  <p className="text-sm">{formatMoney(multiplyMoney(line.unitPrice, line.quantity))}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted">
              Dispatch window: {formatShortDate(so.dispatchWindow.from)} – {formatShortDate(so.dispatchWindow.to)}
              {so.courier && ` · ${so.courier.name} tracking ${so.courier.trackingNumber}`}
            </p>
          </div>
          <OrderTimeline events={so.timeline} />
        </section>
      ))}

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-card border border-line bg-surface p-5 text-sm">
          <h2 className="mb-3 font-medium">Delivery address</h2>
          <address className="not-italic leading-relaxed text-muted">
            {order.shippingAddress.fullName}
            <br />
            {order.shippingAddress.line1}
            {order.shippingAddress.line2 && (
              <>
                <br />
                {order.shippingAddress.line2}
              </>
            )}
            <br />
            {order.shippingAddress.city}, {order.shippingAddress.province}
            <br />
            {order.shippingAddress.phone}
          </address>
        </section>
        <section className="rounded-card border border-line bg-surface p-5 text-sm">
          <h2 className="mb-3 font-medium">Payment summary</h2>
          <dl className="flex flex-col gap-2">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd>{formatMoney(order.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Delivery</dt>
              <dd>{order.shipping.amount === 0 ? "Free" : formatMoney(order.shipping)}</dd>
            </div>
            <div className="flex justify-between border-t border-line pt-2 font-medium">
              <dt>Total</dt>
              <dd>{formatMoney(order.total)}</dd>
            </div>
          </dl>
        </section>
      </div>
    </div>
  );
}
