import Form from "next/form";
import { SearchIcon } from "@/components/icons";
import { routes } from "@/config/routes";

/** Search box + result heading. Reads the query, so it renders inside <Suspense>. */
export async function SearchHeader({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q : "";

  return (
    <header className="container-site flex flex-col gap-6 py-8 md:py-12">
      <Form action={routes.search()} role="search" className="relative max-w-2xl">
        <label htmlFor="search-page-input" className="sr-only">
          Search products and brands
        </label>
        <input
          id="search-page-input"
          name="q"
          type="search"
          defaultValue={query}
          placeholder="Search kurtas, brands, fabrics…"
          className="h-14 w-full rounded-full border border-line bg-surface pl-14 pr-6 text-base focus:border-ink focus:outline-none"
        />
        <SearchIcon className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-muted" />
      </Form>
      {query && (
        <h1 className="font-display text-3xl md:text-4xl">
          Results for <span className="text-accent">&ldquo;{query}&rdquo;</span>
        </h1>
      )}
    </header>
  );
}
