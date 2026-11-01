import { seoPages } from "@/config/seo-pages";
import { CategoryRail, HeroCarousel, NewArrivals, StoreCard, TrendingStores, homeContent } from "@/features/home";
import { buildMetadata } from "@/lib/seo";
import { listBrandShowcases, listProducts } from "@/services";

export const metadata = buildMetadata({ ...seoPages.home, absoluteTitle: true });

export default async function HomePage() {
  const [heroSlides, trending, newIn] = await Promise.all([
    listBrandShowcases({ slugs: [...homeContent.heroBrandSlugs], productsPerBrand: 4 }),
    listBrandShowcases({ productsPerBrand: 2, limit: homeContent.trendingStoresLimit }),
    listProducts({ collection: "new-in", pageSize: 8 }),
  ]);

  return (
    <div className="flex flex-col gap-14 pb-8 pt-4 md:gap-20">
      {/* Figma: category rail on the left, featured-brand hero on the right */}
      <div className="container-site grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-8">
        <CategoryRail />
        <HeroCarousel slides={heroSlides} />
      </div>

      <TrendingStores>
        {trending.map((showcase) => (
          <li key={showcase.brand.id} className="snap-start">
            <StoreCard showcase={showcase} />
          </li>
        ))}
      </TrendingStores>

      <NewArrivals products={newIn.items} />
    </div>
  );
}
