# Images

Placeholders until the Figma exports are added. Replace the file, or point the data at a new file.

| Slot | Where it's set | Size |
|---|---|---|
| Logo | `src/components/layout/site-header.tsx` (currently text) → put `brand/logo.svg` | SVG |
| Category icons (left rail) | `src/config/navigation.ts` → `categoryNav[].icon` → `categories/*.png` | 192×192 PNG/WebP, transparent |
| Hero brand photo | brand `banner` (mock: `src/mocks/brands.ts`, later from API) | 1600×900 WebP |
| Hero brand wordmark | brand `wordmark` (optional; falls back to the brand name) | SVG/PNG |
| Trending store photo | brand `cover` | 500×700 WebP |
| Product images | product `images[]` (mock: `src/mocks/products.ts`) | 600×800 WebP |

Tips: export at 2× from Figma, prefer WebP/AVIF, keep the same aspect ratios so nothing shifts.
