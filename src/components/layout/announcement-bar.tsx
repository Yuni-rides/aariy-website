import { siteConfig } from "@/config/site";
import { formatMoney } from "@/lib/money";

export function AnnouncementBar() {
  return (
    <div className="bg-ink py-2 text-center text-xs tracking-wide text-bg">
      Free delivery on orders over {formatMoney({ amount: siteConfig.freeShippingThreshold, currency: "PKR" })} · Cash on
      delivery available nationwide
    </div>
  );
}
