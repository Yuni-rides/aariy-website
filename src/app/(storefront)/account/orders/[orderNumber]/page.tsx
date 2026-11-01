import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui";
import { OrderDetail } from "@/features/account";
import { getMyOrder } from "@/services";

async function OrderContent({ params }: { params: PageProps<"/account/orders/[orderNumber]">["params"] }) {
  const { orderNumber } = await params;
  const order = await getMyOrder(orderNumber);
  if (!order) notFound();
  return <OrderDetail order={order} />;
}

export default function OrderPage({ params }: PageProps<"/account/orders/[orderNumber]">) {
  return (
    <Suspense fallback={<Skeleton className="h-96 w-full" />}>
      <OrderContent params={params} />
    </Suspense>
  );
}
