import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui";
import { routes } from "@/config/routes";
import { ReturnRequestForm } from "@/features/account";
import { getMyOrder } from "@/services";

async function ReturnContent({ params }: { params: PageProps<"/account/orders/[orderNumber]/return">["params"] }) {
  const { orderNumber } = await params;
  const order = await getMyOrder(orderNumber);
  if (!order) notFound();
  return (
    <>
      <Link href={routes.order(orderNumber)} className="text-sm text-muted hover:text-ink">
        ← Order {orderNumber}
      </Link>
      <h1 className="mb-6 mt-3 font-display text-4xl">Request a return</h1>
      <ReturnRequestForm order={order} />
    </>
  );
}

export default function ReturnPage({ params }: PageProps<"/account/orders/[orderNumber]/return">) {
  return (
    <Suspense fallback={<Skeleton className="h-96 w-full" />}>
      <ReturnContent params={params} />
    </Suspense>
  );
}
