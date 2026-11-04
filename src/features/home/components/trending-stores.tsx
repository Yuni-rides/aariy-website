"use client";

import { useRef, type ReactNode } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui";
import { routes } from "@/config/routes";

export function TrendingStores({ children }: { children: ReactNode }) {
  const listRef = useRef<HTMLUListElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = listRef.current;
    if (el)
      el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section aria-labelledby="trending-stores" className="container-site">
      <div className="mb-5 flex items-center gap-4">
        <h2 id="trending-stores" className="text-2xl font-semibold md:text-3xl">
          Trending stores
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Scroll stores left"
            className="flex size-8 items-center justify-center rounded-full bg-surface shadow-pill hover:bg-subtle"
          >
            <ArrowLeftIcon width={16} height={16} />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Scroll stores right"
            className="flex size-8 items-center justify-center rounded-full bg-surface shadow-pill hover:bg-subtle"
          >
            <ArrowRightIcon width={16} height={16} />
          </button>
        </div>
        <ButtonLink
          href={routes.brands()}
          size="sm"
          className="ml-auto bg-sand text-sand-ink hover:bg-sand/80"
        >
          More stores
        </ButtonLink>
      </div>
      <ul
        ref={listRef}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 md:-mx-6 md:scroll-px-6 md:px-6 xl:-mx-10 xl:scroll-px-10 xl:px-10 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>
    </section>
  );
}
