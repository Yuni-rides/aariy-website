import Image from "next/image";
import { ButtonLink } from "@/components/ui";
import { routes } from "@/config/routes";
import { seoPages } from "@/config/seo-pages";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(seoPages.about);

/** The brand is written in capitals in About copy, e.g. "AARIEE". */
const name = siteConfig.name;

const team = [
  { name: "Joe Taj", role: "Chief Executive Officer" },
  { name: "Faizan Abdul Latif", role: "Chief Operating Officer" },
  { name: "Ifrah Qayyum", role: "Head of Department" },
  { name: "Rida Ismail", role: "Brand Coordinator" },
  { name: "Shazia Taj", role: "Digital Marketing Manager" },
];

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
      {/* About us */}
      <section className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">About us</p>
          <h1 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
            Fashion Has No Borders. Neither Should Discovery.
          </h1>
          <div className="mt-5 flex max-w-xl flex-col gap-4 text-muted">
            <p>
              {name} is a US-based fashion marketplace bringing established names and emerging fashion brands together
              in one destination.
            </p>
            <p>
              We believe great fashion deserves to be discovered, no matter where it comes from. From unique designs
              and timeless traditions to fresh trends and hidden gems, we&apos;re making it easier for fashion lovers
              to explore styles they love.
            </p>
            <p>
              But we&apos;re more than a place to shop. We&apos;re creating opportunities for smaller brands to reach
              international audiences, connect with new customers and take their creativity beyond borders.
            </p>
          </div>
          <p className="mt-6 font-display text-xl text-ink">
            Different brands. Endless styles. One destination — {name}.
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

      {/* Our story */}
      <section className="mx-auto mt-24 max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Our story</p>
        <h2 className="mt-3 font-display text-3xl md:text-4xl">Every Brand Has a Story. Every Style Has a Place.</h2>
        <div className="mt-6 flex flex-col gap-4 text-muted">
          <p>
            We started with a simple thought: Why should discovering fashion be limited to the brands we already know?
          </p>
          <p>
            Behind every label is a dream, behind every design is creativity, and behind every small business is a
            story waiting to be seen.
          </p>
          <p>
            We wanted to create a space where discovering a new brand feels just as exciting as finding an old
            favourite.
          </p>
          <p>
            That&apos;s why {name} was born — to bring brands closer to people, make fashion discovery exciting and
            give emerging talent the opportunity to be seen beyond their local markets.
          </p>
        </div>
        <p className="mt-8 font-display text-xl text-ink">
          Because sometimes, your next favourite brand is one you&apos;ve never heard of.
          <br />
          And we want you to discover it first.
        </p>
      </section>

      {/* Our vision */}
      <section className="mt-24 grid gap-10 rounded-panel border border-line bg-surface p-8 md:p-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Our vision</p>
          <h2 className="mt-3 font-display text-3xl leading-tight md:text-4xl">Taking Creativity Beyond Borders.</h2>
          <p className="mt-6 font-display text-xl text-ink">Small beginnings. Global possibilities.</p>
        </div>
        <div className="flex flex-col gap-4 text-muted">
          <p>We envision a fashion world where location doesn&apos;t limit opportunity.</p>
          <p>
            Our goal is to connect fashion brands with international audiences, helping emerging designers grow,
            established brands expand and customers discover styles from different parts of the world.
          </p>
          <p>
            We want {name} to become a destination where creativity gets recognition, brands get opportunities and
            fashion brings people together.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="mt-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl md:text-4xl">Meet the team</h2>
          <p className="mt-4 text-muted">The people helping great brands get discovered.</p>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
          {team.map((member) => (
            <li
              key={member.name}
              className="flex flex-col items-center rounded-card border border-line bg-surface px-4 py-8 text-center"
            >
              <span
                aria-hidden
                className="flex size-20 items-center justify-center rounded-full bg-subtle font-display text-2xl text-ink"
              >
                {initials(member.name)}
              </span>
              <p className="mt-4 font-semibold">{member.name}</p>
              <p className="mt-1 text-sm text-muted">{member.role}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="mt-24 rounded-panel bg-[#272F39] px-6 py-12 text-center text-white md:px-12">
        <h2 className="font-display text-3xl md:text-4xl">Have a brand of your own?</h2>
        <p className="mx-auto mt-4 max-w-xl text-white/80">
          Join {name} and take your creativity beyond borders. Tell us about your business and we&apos;ll be in touch.
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
