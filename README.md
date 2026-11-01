# Aariy Storefront

Buyer website for the Aariy multi-vendor fashion marketplace (SOW Module 3).
Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS 4 · Framer Motion · Zustand · Zod.

```bash
cp .env.example .env.local
npm install
npm run dev
```

The site runs fully on mock data today (`NEXT_PUBLIC_DATA_SOURCE=mock`). When the NestJS API is ready, switch to `api`. No page or component changes.

## Folder structure

```
src/
├── app/                      Routes only: thin pages that fetch via services and compose features
│   ├── (storefront)/         Header + footer layout: home, collections, brands, products, search, cart, account, policies, contact
│   ├── (checkout)/           Minimal layout: checkout, checkout/success, login
│   ├── api/revalidate/       Webhook the backend calls to refresh cached pages
│   ├── sitemap.ts, robots.ts, manifest.ts, opengraph-image.tsx
│   └── layout.tsx            Fonts, motion provider, Organization + WebSite JSON-LD
│
├── features/<page>/          One folder per page or domain
│   ├── components/           That feature's components + index.ts
│   ├── data/                 Static copy for the feature (home banners, policy text)
│   ├── lib/                  Feature-only helpers (filters, schemas, status maps)
│   ├── store/                Client state (cart only)
│   ├── actions.ts            Server actions (forms): validate with zod, then call services
│   └── index.ts              Public API of the feature
│
├── components/               Shared across features
│   ├── ui/                   Button, Field/Input, Badge, Breadcrumbs, Skeleton, EmptyState…
│   ├── layout/               SiteHeader, SiteFooter, CheckoutHeader, MobileMenu, CartButton
│   ├── product/              ProductCard, ProductGrid, Price
│   ├── motion/               MotionProvider (LazyMotion), Reveal, Stagger
│   ├── seo/                  JsonLd
│   └── icons.tsx             Inline SVG icons
│
├── services/                 THE data layer. Mock or API, chosen by env. UI never knows which.
├── lib/
│   ├── api/                  fetch client, endpoint map, cache tags
│   ├── money.ts              Integer minor units + currency (matches the ledger)
│   ├── seo.ts                buildMetadata(): canonical, OG, robots in one place
│   ├── structured-data.ts    Product / Brand / Breadcrumb / Organization schema
│   ├── session.ts            httpOnly session cookie helpers
│   └── validation.ts         Shared zod helpers (PK phone, provinces)
├── config/                   site.ts, routes.ts, navigation.ts, seo-pages.ts, env.ts
├── mocks/                    Placeholder brands, products, collections, orders + query logic
└── types/                    Domain types shared by services and UI (mirror the API DTOs)
```

### Features

| Feature | Route(s) | SOW |
|---|---|---|
| `home` | `/` | – |
| `catalog` | `/collections/[slug]` (+ shared listing for brand & search) | 3.1 |
| `brands` | `/brands`, `/brands/[slug]` | 3.2 |
| `product` | `/products/[slug]` | 3.3 |
| `search` | `/search?q=` | 3.4 |
| `cart` | `/cart` | 3.5 |
| `checkout` | `/checkout`, `/checkout/success` | 3.6 |
| `auth` | `/login` (SMS one-time code) | 3.7 |
| `account` | `/account`, `/account/orders/[orderNumber]`, `…/return` | 3.7, 3.8 |
| `support` | `/contact` | 3.9 |
| `policies` | `/policies/[slug]` | 3.10 |

### Rules

1. **Pages are thin.** A page fetches from `@/services` and composes components from `@/features/*`. No business logic in `app/`.
2. **Data only through `src/services`.** Components never call `fetch` or import from `src/mocks`.
3. **Client components never import `@/services`** (it reads cookies on the server). Client code talks to the server through server actions in `features/*/actions.ts`.
4. **Links come from `config/routes.ts`.** No hard-coded paths.
5. **Colours, fonts and radii are tokens** in `app/globals.css` (`bg-surface`, `text-ink`, `bg-accent`, `font-display`, `rounded-card`). When the Figma design system lands, change the tokens there.
6. **Money is integer minor units** (`{ amount: 499000, currency: "PKR" }` = PKR 4,990). Use `formatMoney()`; never floats.
7. **Animations use `m.*`, not `motion.*`.** `LazyMotion strict` keeps the bundle small and throws if you use `motion.*`.

## Performance and SEO

- **Static by default.** Product, brand, collection and policy pages are prerendered (`generateStaticParams`). Service functions use `'use cache'` + `cacheTag`, so pages are served from cache and refreshed on demand.
- **Partial prerendering.** Anything that reads `searchParams` or cookies (filters, account) sits in `<Suspense>`; the header and page shell are still static.
- **Small client JS.** Only interactive islands hydrate: cart button, mobile menu, gallery, add-to-cart, forms. Nav, filters (GET form), breadcrumbs and accordions work without JS.
- **SEO.** Per-page metadata via `buildMetadata()`; canonical URLs; filtered/sorted listings and search are `noindex`; `sitemap.xml` lists curated pages only; JSON-LD for Product, Brand, BreadcrumbList, Organization and WebSite (with SearchAction).
- **Accessibility.** Skip link, visible focus, labelled form errors, `prefers-reduced-motion` respected.

## API integration (when the backend is ready)

1. Set `NEXT_PUBLIC_DATA_SOURCE=api` and `API_BASE_URL` in `.env.local`.
2. Check `src/lib/api/endpoints.ts` matches the published OpenAPI paths (`/v1/store/*`).
3. Check `src/types/*` against the API DTOs. Ideally, generate types from the OpenAPI spec and re-export them from `src/types`.
4. Optional: replace `apiClient` calls in `src/services/*` with the generated typed client.
5. Basket: keep the `useCartStore` interface, and make its actions call the basket API.
6. Set `REVALIDATE_SECRET`, and have the backend `POST /api/revalidate` with `{ "tags": ["product:<slug>", "products"] }` when a product, brand or collection changes.
7. Add the image CDN hostname to `NEXT_PUBLIC_CDN_HOST`.

Mock sign-in code: `123456`.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
