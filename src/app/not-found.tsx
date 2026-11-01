import { SiteFooter, SiteHeader } from "@/components/layout";
import { ButtonLink } from "@/components/ui";
import { routes } from "@/config/routes";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="container-site flex flex-1 flex-col items-center justify-center gap-5 py-24 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">404</p>
        <h1 className="font-display text-5xl">Page not found</h1>
        <p className="max-w-md text-muted">The page you&apos;re looking for has moved or is no longer available.</p>
        <div className="mt-4 flex gap-3">
          <ButtonLink href={routes.home()}>Go home</ButtonLink>
          <ButtonLink href={routes.collection("new-in")} variant="secondary">
            Shop New In
          </ButtonLink>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
