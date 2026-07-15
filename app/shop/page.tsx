import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse our collection of faith-rooted aesthetic apparel.",
};

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <ProductGrid products={products} />
      </div>
    </SiteLayout>
  );
}
