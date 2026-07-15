import { Suspense } from "react";
import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ProductFilters } from "@/components/shop/ProductFilters";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { getProducts } from "@/lib/products";
import type { ProductCategory } from "@/lib/types";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse our collection of faith-rooted aesthetic apparel.",
};

interface ShopPageProps {
  searchParams: Promise<{ category?: string; sort?: string }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const category = params.category as ProductCategory | undefined;
  const sort = params.sort ?? "newest";

  let products = await getProducts(
    category ? { category } : undefined
  );

  if (sort === "price-asc") {
    products = [...products].sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    products = [...products].sort((a, b) => b.price - a.price);
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-20">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-stone">Collection</p>
          <h1 className="mt-2 font-serif text-4xl text-charcoal md:text-5xl">Shop All</h1>
        </div>
        <div className="mt-12">
          <Suspense fallback={<div className="h-12" />}>
            <ProductFilters />
          </Suspense>
        </div>
        <div className="mt-10">
          <ProductGrid products={products} />
        </div>
      </div>
    </SiteLayout>
  );
}
