import { seoPages } from "@/config/seo-pages";
import { siteConfig } from "@/config/site";
import { ContactForm } from "@/features/support";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(seoPages.contact);

export default function ContactPage() {
  return (
    <div className="container-site grid gap-10 py-12 lg:grid-cols-[1fr_1.4fr]">
      <div>
        <h1 className="font-display text-4xl md:text-5xl">Contact us</h1>
        <p className="mt-4 max-w-md text-muted">
          Questions about an order, a return or a brand? Send us a message and
          our support team will reply within one business day.
        </p>
        <dl className="mt-8 flex flex-col gap-4 text-sm">
          <div>
            <dt className="text-muted">Email</dt>
            <dd>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="hover:text-accent"
              >
                {siteConfig.contact.email}
              </a>
            </dd>
          </div>
        </dl>
      </div>
      <ContactForm />
    </div>
  );
}
