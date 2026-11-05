"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";
import type { CategoryEntry } from "@/types";

/**
 * Figma "Categories": big round photos in two rows, label over a dark fade
 * at the bottom, ← → arrows top-right. Fed by every picture category in
 * the category tree, so Men and Kids entries appear here once they are added.
 */
export function CategoryCircles({ categories }: { categories: CategoryEntry[] }) {
  const listRef = useRef<HTMLUListElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = listRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  if (categories.length === 0) return null;

  return (
    <section aria-labelledby="home-categories" className="container-site">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 id="home-categories" className="text-2xl font-semibold md:text-3xl">
          Categories
        </h2>
        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Scroll categories left"
            className="flex size-9 items-center justify-center rounded-full bg-surface shadow-pill hover:bg-subtle"
          >
            <ArrowLeftIcon width={18} height={18} />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Scroll categories right"
            className="flex size-9 items-center justify-center rounded-full bg-surface shadow-pill hover:bg-subtle"
          >
            <ArrowRightIcon width={18} height={18} />
          </button>
        </div>
      </div>

      <ul
        ref={listRef}
        className="-mx-4 grid snap-x snap-mandatory auto-cols-[8rem] grid-flow-col grid-rows-2 gap-x-4 gap-y-6 overflow-x-auto scroll-px-4 px-4 pb-2 md:-mx-6 md:auto-cols-[calc((100%-6rem)/5)] md:gap-x-6 md:scroll-px-6 md:px-6 xl:-mx-10 xl:scroll-px-10 xl:px-10 [&::-webkit-scrollbar]:hidden"
      >
        {categories.map(({ category, href }) => (
          <li key={category.id} className="snap-start">
            <Link
              href={href}
              className="group relative isolate block aspect-square overflow-hidden rounded-full bg-subtle"
            >
              <Image
                src={category.image!}
                alt=""
                fill
                sizes="(min-width: 1280px) 15rem, (min-width: 768px) 20vw, 8rem"
                className="-z-10 object-cover object-top transition-transform duration-700 ease-out-soft group-hover:scale-105"
              />
              <span
                aria-hidden
                className="absolute inset-0 -z-10 bg-gradient-to-b from-black/0 from-45% to-black/70"
              />
              <span className="absolute inset-x-2 bottom-[20%] truncate text-center text-xs text-white md:text-sm">
                {category.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
