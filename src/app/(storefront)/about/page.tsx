import Image from "next/image";
import { ButtonLink } from "@/components/ui";
import { routes } from "@/config/routes";
import { seoPages } from "@/config/seo-pages";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(seoPages.about);

const name = siteConfig.name;

const pillars = [
  {
    title: "Verified brands only",
    body: "Every store is checked by our team before it goes live, so you know who made what you're buying.",
  },
  {
    title: "One basket, many brands",
    body: "Pick a kurta from one label and jhumkas from another, then check out once.",
  },
  {
    title: "Cash on delivery",
    body: "Pay when your order arrives, or pay by card. We deliver across Pakistan.",
  },
  {
    title: "A home for local labels",
    body: "Small studios get a real storefront and reach shoppers they couldn't reach on their own.",
  },
];

const team = ["Joe Taj", "Ifrah Qayyum", "Faizan Abdul Latif", "Rida Ismail"];

const initials = (full: string) =>
  full
    .split(" ")
    .filter((w) => w !== "Sir")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

const collage = [
  { src: "/images/A/store-cover.png", alt: "Zarveen Couture campaign" },
  { src: "/images/F/store-cover.png", alt: "Mehar Studio campaign" },
  { src: "/images/E/store-cover.png", alt: "Sitara Zewar campaign" },
];

export default function AboutPage() {
  return (
    <div className="container-site py-12 md:py-16">
      {/* Intro */}
      <section className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">About us</p>
          <h1 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
            Pakistani fashion, from the people who make it
          </h1>
          <p className="mt-5 max-w-xl text-muted">
            {name} is an online marketplace for verified Pakistani fashion brands. We bring clothing, jewelry and
            accessories from independent labels into one place, so you can discover new designers and shop them all
            in a single basket.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={routes.brands()}>Explore brands</ButtonLink>
            <ButtonLink href={routes.sellerRegister()} variant="secondary">
              Become a seller
            </ButtonLink>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {collage.map((img, i) => (
            <div
              key={img.src}
              className={`relative aspect-[5/7] overflow-hidden rounded-card bg-subtle ${i === 1 ? "translate-y-6" : ""}`}
            >
              <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 240px, 33vw" className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto mt-24 max-w-3xl text-center">
        <h2 className="font-display text-3xl md:text-4xl">Our story</h2>
        <div className="mt-6 flex flex-col gap-4 text-muted">
          <p>
            It started with a simple problem. Some of the most beautiful clothes in Pakistan were being made in small
            studios in Lahore, Karachi and Hyderabad, but finding them meant scrolling through dozens of Instagram
            pages, sending DMs and hoping the order would arrive.
          </p>
          <p>
            We wanted shopping local to feel as easy as shopping anywhere else. So we built {name}: one place where
            trusted brands open their own store, and shoppers can browse, compare and order with confidence.
          </p>
          <p>
            Today {name} is home to bridal couture, everyday kurtas, menswear and handmade jewelry, and we&apos;re
            adding new labels every month.
          </p>
        </div>
      </section>

      {/* What we do */}
      <section className="mt-24">
        <h2 className="text-center font-display text-3xl md:text-4xl">What we do</h2>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <li key={p.title} className="rounded-card border border-line bg-surface p-6">
              <span className="flex size-9 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-ink">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted">{p.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Team */}
      <section className="mt-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl md:text-4xl">Meet the team</h2>
          <p className="mt-4 text-muted">
            A small team that loves fashion and wants to see Pakistani brands grow.
          </p>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {team.map((member) => (
            <li
              key={member}
              className="flex flex-col items-center rounded-card border border-line bg-surface px-4 py-8 text-center"
            >
              <span
                aria-hidden
                className="flex size-20 items-center justify-center rounded-full bg-subtle font-display text-2xl text-ink"
              >
                {initials(member)}
              </span>
              <p className="mt-4 font-semibold">{member}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="mt-24 rounded-panel bg-[#272F39] px-6 py-12 text-center text-white md:px-12">
        <h2 className="font-display text-3xl md:text-4xl">Have a brand of your own?</h2>
        <p className="mx-auto mt-4 max-w-xl text-white/80">
          Join {name} and sell to shoppers across Pakistan. Tell us about your business and we&apos;ll be in touch.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href={routes.sellerRegister()}>Become a seller</ButtonLink>
          <ButtonLink href={routes.contact()} variant="tertiary">
            Contact us
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
