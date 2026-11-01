import { CashIcon, ReturnIcon, TruckIcon } from "@/components/icons";
import { formatDispatchWindow } from "@/lib/date";
import type { DispatchPromise } from "@/types";

/** Delivery promise with dispatch range (SOW §3.3). */
export function DeliveryPromise({ dispatch, brandName }: { dispatch: DispatchPromise; brandName: string }) {
  return (
    <ul className="flex flex-col gap-3 rounded-card bg-subtle p-4 text-sm">
      <li className="flex gap-3">
        <TruckIcon className="mt-0.5 shrink-0" />
        <span>
          <strong className="font-medium">{formatDispatchWindow(dispatch.minDays, dispatch.maxDays)}</strong> by {brandName},
          then 2–4 days for delivery.
        </span>
      </li>
      <li className="flex gap-3">
        <CashIcon className="mt-0.5 shrink-0" />
        <span>Cash on delivery or card payment.</span>
      </li>
      <li className="flex gap-3">
        <ReturnIcon className="mt-0.5 shrink-0" />
        <span>Returns can be requested from your order page.</span>
      </li>
    </ul>
  );
}
