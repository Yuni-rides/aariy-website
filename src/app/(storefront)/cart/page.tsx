import { seoPages } from "@/config/seo-pages";
import { CartView } from "@/features/cart";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ ...seoPages.cart, noIndex: true });

export default function CartPage() {
  return (
    <div className="container-site py-10">
      <h1 className="mb-8 font-display text-4xl">Your basket</h1>
      <CartView />
    </div>
  );
}
