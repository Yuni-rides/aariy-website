import { CheckIcon } from "@/components/icons";
import { Reveal } from "@/components/motion";
import { ButtonLink } from "@/components/ui";
import { routes } from "@/config/routes";

export function OrderConfirmation({ orderNumber }: { orderNumber?: string }) {
  return (
    <Reveal className="mx-auto flex max-w-lg flex-col items-center gap-5 py-16 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-success/10 text-success">
        <CheckIcon width={32} height={32} />
      </span>
      <h1 className="font-display text-4xl">Thank you for your order</h1>
      {orderNumber && (
        <p className="text-sm">
          Order number <strong className="font-medium">{orderNumber}</strong>
        </p>
      )}
      <p className="text-sm text-muted">
        Each brand will confirm its part of your order and send it to our hub for a quality check. We&apos;ll message you
        with tracking once it&apos;s dispatched.
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        {orderNumber && <ButtonLink href={routes.order(orderNumber)}>Track order</ButtonLink>}
        <ButtonLink href={routes.home()} variant="secondary">
          Continue shopping
        </ButtonLink>
      </div>
    </Reveal>
  );
}
