import { seoPages } from "@/config/seo-pages";
import { siteConfig } from "@/config/site";
import { SellerRegisterForm } from "@/features/sellers";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(seoPages.sellerRegister);

const steps = [
  "Fill in this short form.",
  "Our team calls you to learn about your brand.",
  "We set up your store and you start selling.",
];

export default function BecomeASellerPage() {
  return (
    <div className="container-site grid gap-10 py-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
      <div>
        <h1 className="font-display text-4xl md:text-5xl">Become a seller</h1>
        <p className="mt-4 max-w-md text-muted">
          Sell your brand on {siteConfig.name} and reach shoppers across Pakistan. Tell us about your business and
          we&apos;ll get in touch.
        </p>
        <ol className="mt-8 flex flex-col gap-4">
          {steps.map((step, i) => (
            <li key={step} className="flex items-start gap-3 text-sm">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-ink">
                {i + 1}
              </span>
              <span className="pt-1">{step}</span>
            </li>
          ))}
        </ol>
      </div>
      <SellerRegisterForm />
    </div>
  );
}
