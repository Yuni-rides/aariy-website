import { seoPages } from "@/config/seo-pages";
import { BrandDirectory } from "@/features/brands";
import { CollectionHeader } from "@/features/catalog";
import { routes } from "@/config/routes";
import { buildMetadata } from "@/lib/seo";
import { listBrands } from "@/services";

export const metadata = buildMetadata(seoPages.brands);

export default async function BrandsPage() {
  const brands = await listBrands();
  return (
    <>
      <CollectionHeader
        title="All brands"
        description="Every brand on Aariy is verified before it can sell. Discover their stories and latest collections."
        breadcrumbs={[
          { name: "Home", href: routes.home() },
          { name: "Brands", href: routes.brands() },
        ]}
      />
      <BrandDirectory brands={brands} />
    </>
  );
}
