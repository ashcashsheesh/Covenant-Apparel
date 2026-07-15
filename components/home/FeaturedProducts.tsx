import { getProducts } from "@/lib/products";
import { ProductGrid } from "@/components/shop/ProductGrid";

export async function FeaturedProducts() {
  const products = await getProducts();

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
      <ProductGrid products={products} />
    </section>
  );
}
