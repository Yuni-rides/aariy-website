import { CheckoutHeader } from "@/components/layout";

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
