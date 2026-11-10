"use client";

import { AnimatePresence, m } from "framer-motion";
import Image from "@/components/ui/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Audience, ProductSummary } from "@/types";
import { NewArrivalCard } from "./new-arrival-card";

const TABS: { value: Audience; label: string; icon: string }[] = [
  { value: "men", label: "Men", icon: "/images/categories/men.webp" },
  { value: "women", label: "Women", icon: "/images/categories/women.webp" },
  { value: "kids", label: "Kids", icon: "/images/categories/kids.webp" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function NewArrivals({
  products,
  limit = 10,
}: {
  products: ProductSummary[];
  limit?: number;
}) {
  const [audience, setAudience] = useState<Audience>("women");
  const visible = products
    .filter((p) => p.isNew && p.audience === audience)
    .slice(0, limit);

  return (
    <section aria-labelledby="new-arrivals" className="container-site">
      <h2 id="new-arrivals" className="text-2xl font-semibold md:text-3xl">
        New Arrivals
      </h2>

      <div
        role="tablist"
        aria-label="Shop new arrivals for"
        className="mt-4 flex gap-3"
      >
        {TABS.map((tab) => {
          const active = tab.value === audience;
          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              id={`new-arrivals-tab-${tab.value}`}
              aria-selected={active}
              aria-controls="new-arrivals-panel"
              onClick={() => setAudience(tab.value)}
              className={cn(
                "inline-flex h-10 items-center gap-2 rounded-full py-1 pl-2 pr-4 text-sm transition-[background-color,box-shadow]",
                active
                  ? "bg-accent-soft shadow-pill"
                  : "bg-[#d9e6fb] hover:bg-[#c9dbf8]",
              )}
            >
              <Image
                src={tab.icon}
                alt=""
                width={28}
                height={28}
                className="size-7 object-contain"
              />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        id="new-arrivals-panel"
        role="tabpanel"
        aria-labelledby={`new-arrivals-tab-${audience}`}
        className="mt-5"
      >
        <AnimatePresence mode="wait" initial={false}>
          <m.ul
            key={audience}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 md:-mx-6 md:scroll-px-6 md:px-6 xl:-mx-10 xl:scroll-px-10 xl:px-10 [&::-webkit-scrollbar]:hidden"
          >
            {visible.map((product) => (
              <li key={product.id} className="w-44 shrink-0 snap-start md:w-52">
                <NewArrivalCard product={product} />
              </li>
            ))}
            {visible.length === 0 && (
              <li className="py-10 text-sm text-muted">
                New pieces for {audience} are on their way.
              </li>
            )}
          </m.ul>
        </AnimatePresence>
      </div>
    </section>
  );
}
