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

const AUTOPLAY_MS = 6000;
const EASE = [0.22, 1, 0.36, 1] as const;

function formatCount(n: number) {
  return n >= 1000 ? `${Math.round(n / 1000)}k` : String(n);
}

/**
 * Figma hero: one featured brand per slide (photo, name, rating, "Shop all",
 * wordmark) with four of its products in a 2×2 grid. Autoplays, pauses on
 * hover/focus, and stays still for users who prefer reduced motion.
 */
export function HeroCarousel({ slides }: { slides: BrandShowcase[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (paused || reduceMotion || slides.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, reduceMotion, slides.length]);

  if (slides.length === 0) return null;
  const { brand, products } = slides[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured brands"
      className="relative overflow-hidden rounded-panel bg-gradient-to-br from-[#eef0c9] to-[#d9dc9b]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={brand.id}
          aria-roledescription="slide"
          aria-label={`${index + 1} of ${slides.length}: ${brand.name}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="grid min-h-[22rem] md:grid-cols-[1fr_minmax(0,22rem)] lg:min-h-[24rem]"
        >
          {/* Brand side: photo bleeds to the panel edge, as in the Figma */}
          <div className="relative isolate flex min-h-72 flex-col justify-between overflow-hidden p-6 pb-10">
            {brand.banner && (
              <Image
                src={brand.banner.url}
                alt={brand.banner.alt}
                fill
                priority={index === 0}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="-z-10 object-cover"
              />
            )}
            <div>
              <h2 className="text-2xl font-semibold">{brand.name}</h2>
              {brand.rating && (
                <p className="mt-1 flex items-center gap-1 text-xs">
                  <StarIcon width={12} height={12} />
                  {brand.rating.average} <span className="text-muted">({formatCount(brand.rating.count)})</span>
                  <span className="sr-only">reviews</span>
                </p>
              )}
              <Link
                href={routes.brand(brand.slug)}
                className="mt-4 inline-flex h-8 items-center rounded-md border border-ink/30 bg-white/40 px-4 text-xs backdrop-blur hover:bg-white/70"
              >
                Shop all
              </Link>
            </div>
            <m.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15, duration: 0.6, ease: EASE }}>
              {brand.wordmark ? (
                <Image src={brand.wordmark.url} alt={brand.name} width={brand.wordmark.width} height={brand.wordmark.height} className="h-10 w-auto" />
              ) : (
                <p aria-hidden className="text-3xl font-medium uppercase tracking-[0.2em] md:text-4xl">
                  {brand.name}
                </p>
              )}
            </m.div>
          </div>

          {/* 2×2 product tiles */}
          <ul className="grid grid-cols-2 gap-3 p-4 md:py-5 md:pl-0 md:pr-5">
            {products.slice(0, 4).map((product, i) => (
              <m.li
                key={product.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i, duration: 0.45, ease: EASE }}
                className="aspect-square"
              >
                <ProductTile product={product} sizes="(min-width: 768px) 11rem, 45vw" priority={index === 0 && i < 2} className="h-full" />
              </m.li>
            ))}
          </ul>
        </m.div>
      </AnimatePresence>

      {/* Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-3 left-9 flex gap-1.5 md:bottom-4" role="group" aria-label="Choose slide">
          {slides.map((s, i) => (
            <button
              key={s.brand.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show ${s.brand.name}`}
              aria-current={i === index}
              className={cn("h-1.5 rounded-full transition-all", i === index ? "w-4 bg-ink" : "w-1.5 bg-ink/30 hover:bg-ink/50")}
            />
          ))}
        </div>
      )}
    </section>
  );
}
