import { Suspense } from "react";
import { Skeleton } from "@/components/ui";
import { OrderList } from "@/features/account";
import { listMyOrders } from "@/services";

async function Orders() {
  const orders = await listMyOrders();
  return <OrderList orders={orders} />;
}

export default function OrdersPage() {
  return (
    <>
      <h1 className="mb-6 font-display text-4xl">Orders</h1>
      <Suspense fallback={<Skeleton className="h-64 w-full" />}>
        <Orders />
      </Suspense>
    </>
  );
}
