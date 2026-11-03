import { seoPages } from "@/config/seo-pages";
import {
  CategoryCircles,
  CategoryRail,
  HeroCarousel,
  NewArrivals,
  StoreCard,
  TrendingProducts,
  TrendingStores,
  homeContent,
} from "@/features/home";
import { pictureLeaves } from "@/lib/categories";
import { buildMetadata } from "@/lib/seo";
import { getCategoryTree, listBrandShowcases, listProducts } from "@/services";

export const metadata = buildMetadata({
  ...seoPages.home,
  absoluteTitle: true,
});

export default async function HomePage() {
  const [categories, heroSlides, trending, newIn] = await Promise.all([
    getCategoryTree(),
    listBrandShowcases({
      slugs: [...homeContent.heroBrandSlugs],
      productsPerBrand: 4,
    }),
    listBrandShowcases({
      productsPerBrand: 2,
      limit: homeContent.trendingStoresLimit,
    }),
    listProducts({ sort: "newest", pageSize: 48 }),
  ]);

  return (
    <div className="flex flex-col gap-14 pb-8 pt-4 md:gap-20">
      <div className="container-site grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-8">
        <CategoryRail categories={categories} />
        <HeroCarousel slides={heroSlides} />
      </div>

      <TrendingStores>
        {trending.map((showcase) => (
          <li key={showcase.brand.id} className="snap-start">
            <StoreCard showcase={showcase} />
          </li>
        ))}
      </TrendingStores>

      <CategoryCircles categories={pictureLeaves(categories)} />

      <NewArrivals products={newIn.items} />

      <TrendingProducts products={newIn.items} />
    </div>
  );
}
