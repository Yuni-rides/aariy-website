import { seoPages } from "@/config/seo-pages";
import { CheckoutForm } from "@/features/checkout";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ ...seoPages.checkout, noIndex: true });

export default function CheckoutPage() {
  return (
    <div className="container-site py-10">
      <h1 className="mb-8 font-display text-4xl">Checkout</h1>
      <CheckoutForm />
    </div>
  );
}
