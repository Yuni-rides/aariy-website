import { CheckoutHeader } from "@/components/layout";

/** Checkout and sign-in: minimal chrome, no nav or footer links to leak conversions. */
export default function CheckoutLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <CheckoutHeader />
      <main id="main" className="flex-1 bg-subtle/40">
        {children}
      </main>
    </>
  );
}
