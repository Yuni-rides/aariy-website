"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { StarIcon } from "@/components/icons";
import { ProductTile } from "@/components/product";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";
import type { BrandShowcase } from "@/types";

const AUTOPLAY_MS = 5000;
const EASE = [0.22, 1, 0.36, 1] as const;

function formatCount(n: number) {
  return n >= 1000 ? `${Math.round(n / 1000)}k` : String(n);
}

export function HeroCarousel({ slides }: { slides: BrandShowcase[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (paused || reduceMotion || slides.length < 2) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      AUTOPLAY_MS,
    );
    return () => clearInterval(id);
  }, [paused, reduceMotion, slides.length]);

  if (slides.length === 0) return null;
  const { brand, products } = slides[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured brands"
      className="relative isolate grid overflow-hidden rounded-panel bg-[#272F39] text-white md:aspect-[2.1/1]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <AnimatePresence initial={false}>
        <m.div
          key={brand.id}
          aria-roledescription="slide"
          aria-label={`${index + 1} of ${slides.length}: ${brand.name}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative col-start-1 row-start-1 grid gap-4 p-5 md:grid-cols-[minmax(0,1fr)_38%] md:p-[3%] md:pl-[4.5%]"
        >
          {brand.banner && (
            <m.div
              className="absolute inset-0 -z-10"
              initial={{ scale: 1.06 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6, ease: "easeOut" }}
            >
              <Image
                src={brand.banner.url}
                alt={brand.banner.alt}
                fill
                priority={index === 0}
                sizes="(min-width: 1024px) 70vw, 100vw"
                className="object-cover object-left"
              />
            </m.div>
          )}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-gradient-to-b from-[#272F39]/0 to-[#272F39]"
          />

          <div className="flex min-h-56 flex-col justify-between gap-8 md:min-h-0 md:py-[3%]">
            <div>
              <h2 className="text-2xl font-semibold leading-tight md:text-[1.75rem]">
                {brand.name}
              </h2>
              {brand.rating && (
                <p className="mt-2 flex items-center gap-1.5 text-sm">
                  <StarIcon width={16} height={16} />
                  {brand.rating.average}
                  <span className="text-white/90">
                    ({formatCount(brand.rating.count)})
                  </span>
                  <span className="sr-only">reviews</span>
                </p>
              )}
              <Link
                href={routes.brand(brand.slug)}
                className="mt-7 inline-flex h-10 items-center rounded-lg border border-white/60 bg-white/15 px-5 text-sm backdrop-blur-sm transition-colors hover:bg-white/30"
              >
                Shop all
              </Link>
            </div>

            <div>
              <m.div
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.7, ease: EASE }}
              >
                {brand.wordmark ? (
                  <Image
                    src={brand.wordmark.url}
                    alt={brand.name}
                    width={brand.wordmark.width}
                    height={brand.wordmark.height}
                    className="h-10 w-auto md:h-12"
                  />
                ) : (
                  <p
                    aria-hidden
                    className="text-4xl font-light uppercase leading-none tracking-[0.12em] lg:text-5xl"
                  >
                    {brand.name.replace(/\s+/g, ".")}.
                  </p>
                )}
              </m.div>
              {/* Spacer keeps room for the dots, which sit outside the slides */}
              {slides.length > 1 && <div className="h-6" />}
            </div>
          </div>

          {/* 2×2 product tiles */}
          <ul className="grid grid-cols-2 content-center gap-3 md:gap-[5%]">
            {products.slice(0, 4).map((product, i) => (
              <m.li
                key={product.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 + 0.07 * i,
                  duration: 0.5,
                  ease: EASE,
                }}
                className="aspect-square"
              >
                <ProductTile
                  product={product}
                  sizes="(min-width: 1024px) 14rem, (min-width: 768px) 18vw, 45vw"
                  priority={index === 0}
                  className="h-full rounded-[1.25rem]"
                />
              </m.li>
            ))}
          </ul>
        </m.div>
      </AnimatePresence>

      {/* Dots (Figma: three circles, active one white) */}
      {slides.length > 1 && (
        <div
          className="absolute right-5 top-6 z-10 flex gap-1.5 md:right-auto md:top-auto md:bottom-[7%] md:left-[4.5%]"
          role="group"
          aria-label="Choose slide"
        >
          {slides.map((s, i) => (
            <button
              key={s.brand.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show ${s.brand.name}`}
              aria-current={i === index}
              className={cn(
                "size-2.5 rounded-full border border-white/70 transition-colors",
                i === index ? "bg-white" : "bg-white/35 hover:bg-white/60",
              )}
            />
          ))}
        </div>
      )}
    </section>
  );
}
