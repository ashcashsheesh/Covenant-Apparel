import { seedProducts } from "@/lib/data/products";
import { getSupabase, getSupabaseAdmin } from "@/lib/supabase";
import type { Product, ProductCategory } from "@/lib/types";

export async function getProducts(options?: {
  category?: ProductCategory;
  featured?: boolean;
}): Promise<Product[]> {
  const supabase = getSupabase();

  if (supabase) {
    let query = supabase
      .from("products")
      .select("*, product_variants(*)")
      .order("created_at", { ascending: false });

    if (options?.category) {
      query = query.eq("category", options.category);
    }
    if (options?.featured !== undefined) {
      query = query.eq("featured", options.featured);
    }

    const { data, error } = await query;
    if (!error && data) {
      return data.map(mapDbProduct);
    }
  }

  let products = [...seedProducts];
  if (options?.category) {
    products = products.filter((p) => p.category === options.category);
  }
  if (options?.featured !== undefined) {
    products = products.filter((p) => p.featured === options.featured);
  }
  return products.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = getSupabase();

  if (supabase) {
    const { data, error } = await supabase
      .from("products")
      .select("*, product_variants(*)")
      .eq("slug", slug)
      .single();

    if (!error && data) {
      return mapDbProduct(data);
    }
  }

  return seedProducts.find((p) => p.slug === slug) ?? null;
}

export async function getAllProductSlugs(): Promise<string[]> {
  const products = await getProducts();
  return products.map((p) => p.slug);
}

function mapDbProduct(row: Record<string, unknown>): Product {
  const variants = row.product_variants as Product["variants"];
  return {
    id: row.id as string,
    name: row.name as string,
    slug: row.slug as string,
    description: row.description as string,
    price: row.price as number,
    category: row.category as ProductCategory,
    images: row.images as string[],
    featured: row.featured as boolean,
    created_at: row.created_at as string,
    variants: variants?.map((v) => ({
      id: v.id,
      product_id: v.product_id,
      size: v.size,
      stock: v.stock,
      sku: v.sku,
    })),
  };
}

export async function upsertProduct(
  product: Omit<Product, "created_at"> & { created_at?: string }
): Promise<Product | null> {
  const admin = getSupabaseAdmin();
  if (!admin) return null;

  const { data, error } = await admin
    .from("products")
    .upsert({
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price,
      category: product.category,
      images: product.images,
      featured: product.featured,
    })
    .select()
    .single();

  if (error || !data) return null;

  if (product.variants) {
    await admin.from("product_variants").delete().eq("product_id", product.id);
    await admin.from("product_variants").insert(
      product.variants.map((v) => ({
        id: v.id,
        product_id: product.id,
        size: v.size,
        stock: v.stock,
        sku: v.sku,
      }))
    );
  }

  return mapDbProduct({ ...data, product_variants: product.variants });
}

export async function deleteProduct(id: string): Promise<boolean> {
  const admin = getSupabaseAdmin();
  if (!admin) return false;
  const { error } = await admin.from("products").delete().eq("id", id);
  return !error;
}
