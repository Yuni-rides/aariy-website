"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui";

/** Route-level error boundary. Report to Sentry here once it's configured (SOW §2.7). */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="container-site flex flex-1 flex-col items-center justify-center gap-5 py-24 text-center">
      <h1 className="font-display text-4xl">Something went wrong</h1>
      <p className="max-w-md text-muted">Please try again. If the problem continues, contact our support team.</p>
      <Button onClick={reset}>Try again</Button>
    </main>
  );
}
