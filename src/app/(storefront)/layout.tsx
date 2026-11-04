import { SiteFooter, SiteHeader } from "@/components/layout";

/** `modal` is the @modal slot: the sign-in card when a /login link is intercepted, otherwise nothing. */
export default function StorefrontLayout({ children, modal }: LayoutProps<"/">) {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      {modal}
    </>
  );
}
