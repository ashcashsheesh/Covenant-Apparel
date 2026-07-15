import type { Product, ProductVariant } from "@/lib/types";

const sizes = ["S", "M", "L", "XL"] as const;

function makeVariants(productId: string, stocks: number[]): ProductVariant[] {
  return sizes.map((size, i) => ({
    id: `${productId}-${size}`,
    product_id: productId,
    size,
    stock: stocks[i] ?? 10,
    sku: `CA-${productId.toUpperCase()}-${size}`,
  }));
}

/**
 * Copy this template to add a product to seedProducts below.
 *
 * - id / slug: lowercase with hyphens (e.g. "unashamed-tee")
 * - price: amount in cents (e.g. 3800 = $38.00)
 * - category: "tees" | "hoodies" | "hats" | "accessories"
 * - images: paths under /public (e.g. "/products/unashamed-tee-1.jpg")
 * - stocks: inventory per size [S, M, L, XL]
 */
export const productTemplate: Product = {
  id: "your-product-id",
  name: "Product Name",
  slug: "your-product-slug",
  description: "Add your product description here.",
  price: 3800,
  category: "tees",
  images: ["/products/your-product-1.jpg"],
  featured: true,
  created_at: new Date().toISOString(),
  variants: makeVariants("your-product-id", [10, 10, 10, 10]),
};

export const seedProducts: Product[] = [
  // {
  //   ...productTemplate,
  //   id: "unashamed-tee",
  //   name: "Unashamed Tee",
  //   slug: "unashamed-tee",
  //   description: "Your description here.",
  //   price: 3800,
  //   category: "tees",
  //   images: ["/products/unashamed-tee-1.jpg"],
  //   featured: true,
  //   variants: makeVariants("unashamed-tee", [10, 10, 10, 10]),
  // },
];
