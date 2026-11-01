import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Button, Skeleton } from "@/components/ui";
import { routes } from "@/config/routes";
import { OrderList } from "@/features/account";
import { signOutAction } from "@/features/auth";
import { getCurrentCustomer, listMyOrders } from "@/services";

async function AccountOverview() {
  const customer = await getCurrentCustomer();
  if (!customer) redirect(routes.login(routes.account()));
  const orders = await listMyOrders();

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl">Hello, {customer.name.split(" ")[0]}</h1>
          <p className="mt-1 text-sm text-muted">{customer.phone}</p>
        </div>
        <form action={signOutAction}>
          <Button type="submit" variant="link">
            Sign out
          </Button>
        </form>
      </header>
      <section>
        <h2 className="mb-4 text-lg font-medium">Recent orders</h2>
        <OrderList orders={orders.slice(0, 3)} />
      </section>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={<Skeleton className="h-64 w-full" />}>
      <AccountOverview />
    </Suspense>
  );
}
