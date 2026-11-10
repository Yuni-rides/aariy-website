"use client";

import { AnimatePresence, m } from "framer-motion";
import Image from "@/components/ui/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types";

export function ProductGallery({ images }: { images: ImageAsset[] }) {
  const [active, setActive] = useState(0);
  const current = images[active];

  return (
    <div className="flex flex-col-reverse gap-3 md:flex-row">
      <ul className="flex gap-3 md:flex-col" aria-label="Product images">
        {images.map((img, i) => (
          <li key={img.url + i}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === active}
              className={cn(
                "relative block aspect-[3/4] w-16 overflow-hidden rounded-md border-2 md:w-20",
                i === active ? "border-ink" : "border-transparent opacity-70 hover:opacity-100",
              )}
            >
              <Image src={img.url} alt="" fill sizes="80px" className="object-cover object-top" />
            </button>
          </li>
        ))}
      </ul>
      <div className="relative aspect-[3/4] flex-1 overflow-hidden rounded-card bg-subtle">
        <AnimatePresence mode="popLayout" initial={false}>
          <m.div
            key={current.url + active}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Image
              src={current.url}
              alt={current.alt}
              fill
              priority={active === 0}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover object-top"
            />
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
