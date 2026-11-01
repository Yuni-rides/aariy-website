import { Suspense } from "react";
import { OrderConfirmation } from "@/features/checkout";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Order confirmed", path: "/checkout/success", noIndex: true });

async function Confirmation({ searchParams }: { searchParams: PageProps<"/checkout/success">["searchParams"] }) {
  const { order } = await searchParams;
  return <OrderConfirmation orderNumber={typeof order === "string" ? order : undefined} />;
}

export default function CheckoutSuccessPage({ searchParams }: PageProps<"/checkout/success">) {
  return (
    <div className="container-site">
      <Suspense fallback={<OrderConfirmation />}>
        <Confirmation searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
