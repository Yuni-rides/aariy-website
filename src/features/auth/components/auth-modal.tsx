"use client";

import { m } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { CloseIcon } from "@/components/icons";
import { routes } from "@/config/routes";

export function AuthModal({
  children,
  labelledBy,
}: {
  children: ReactNode;
  labelledBy: string;
}) {
  const open = usePathname() === routes.login();
  return open ? (
    <ModalShell labelledBy={labelledBy}>{children}</ModalShell>
  ) : null;
}

function ModalShell({
  children,
  labelledBy,
}: {
  children: ReactNode;
  labelledBy: string;
}) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.back();
      if (e.key === "Tab" && dialogRef.current) {
        const items = dialogRef.current.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled]), input:not([type=hidden])",
        );
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      previous?.focus?.();
    };
  }, [router]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
      <m.div
        aria-hidden
        className="fixed inset-0 bg-black/45 backdrop-blur-[2px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => router.back()}
      />
      <m.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[52rem] shadow-[0_24px_80px_rgb(0_0_0/0.25)] focus:outline-none"
      >
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Close sign in"
          className="absolute right-5 top-5 z-10 rounded-full p-1.5 text-muted transition-colors hover:bg-subtle hover:text-ink"
        >
          <CloseIcon width={20} height={20} />
        </button>
        {children}
      </m.div>
    </div>
  );
}
