import { WishlistView } from "@/features/wishlist";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Wishlist", path: "/wishlist", noIndex: true });

export default function WishlistPage() {
  return (
    <div className="container-site py-10">
      <h1 className="mb-8 text-4xl font-semibold">Wishlist</h1>
      <WishlistView />
    </div>
  );
}
