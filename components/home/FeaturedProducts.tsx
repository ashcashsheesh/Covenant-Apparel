import Link from "next/link";
import { getProducts } from "@/lib/products";
import { ProductGrid } from "@/components/shop/ProductGrid";

export async function FeaturedProducts() {
  const products = await getProducts({ featured: true });

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-stone">Featured</p>
          <h2 className="mt-2 font-serif text-3xl text-charcoal md:text-4xl">
            Latest Drops
          </h2>
        </div>
        <Link
          href="/shop"
          className="hidden text-sm uppercase tracking-[0.15em] text-stone transition-colors hover:text-charcoal md:block"
        >
          View All →
        </Link>
      </div>
      <div className="mt-12">
        <ProductGrid products={products.slice(0, 4)} />
      </div>
      <Link
        href="/shop"
        className="mt-8 block text-center text-sm uppercase tracking-[0.15em] text-stone transition-colors hover:text-charcoal md:hidden"
      >
        View All →
      </Link>
    </section>
  );
}
