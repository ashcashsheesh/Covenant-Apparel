import type { Product, ProductVariant } from "@/lib/types";

const sizes = ["S", "M", "L", "XL"] as const;

function makeVariants(productId: string, name: string, stocks: number[]): ProductVariant[] {
  return sizes.map((size, i) => ({
    id: `${productId}-${size}`,
    product_id: productId,
    size,
    stock: stocks[i] ?? 10,
    sku: `CA-${productId.toUpperCase()}-${size}`,
  }));
}

export const seedProducts: Product[] = [
  {
    id: "grace-tee",
    name: "Grace Tee",
    slug: "grace-tee",
    description:
      "Premium heavyweight cotton tee featuring a minimal typographic design. Soft hand-feel with a relaxed fit. Printed with water-based ink for a lived-in look that gets better with every wear.",
    price: 3800,
    category: "tees",
    images: ["/products/grace-tee-1.svg", "/products/grace-tee-2.svg"],
    featured: true,
    created_at: "2026-01-15T00:00:00Z",
    variants: makeVariants("grace-tee", "Grace Tee", [12, 18, 15, 8]),
  },
  {
    id: "covenant-hoodie",
    name: "Covenant Hoodie",
    slug: "covenant-hoodie",
    description:
      "400gsm French terry hoodie with embroidered chest mark. Oversized fit, kangaroo pocket, and brushed interior for all-day comfort. A staple piece built to last.",
    price: 7200,
    category: "hoodies",
    images: ["/products/covenant-hoodie-1.svg", "/products/covenant-hoodie-2.svg"],
    featured: true,
    created_at: "2026-02-01T00:00:00Z",
    variants: makeVariants("covenant-hoodie", "Covenant Hoodie", [8, 14, 12, 6]),
  },
  {
    id: "faith-cap",
    name: "Faith Cap",
    slug: "faith-cap",
    description:
      "Unstructured six-panel cap in washed cotton twill. Adjustable strap with antique brass buckle. Minimal embroidered logo on front.",
    price: 3200,
    category: "hats",
    images: ["/products/faith-cap-1.svg"],
    featured: true,
    created_at: "2026-02-10T00:00:00Z",
    variants: makeVariants("faith-cap", "Faith Cap", [20, 20, 20, 20]),
  },
  {
    id: "redeemed-tee",
    name: "Redeemed Tee",
    slug: "redeemed-tee",
    description:
      "Boxy-fit graphic tee with a bold front print and subtle back detail. Garment-dyed for a unique, vintage wash on every piece.",
    price: 4200,
    category: "tees",
    images: ["/products/redeemed-tee-1.svg", "/products/redeemed-tee-2.svg"],
    featured: false,
    created_at: "2026-03-01T00:00:00Z",
    variants: makeVariants("redeemed-tee", "Redeemed Tee", [10, 16, 14, 5]),
  },
  {
    id: "mercy-crew",
    name: "Mercy Crew",
    slug: "mercy-crew",
    description:
      "Classic crewneck sweatshirt in heather grey. Ribbed cuffs and hem, dropped shoulders, and a small chest graphic. Perfect layering piece.",
    price: 5800,
    category: "hoodies",
    images: ["/products/mercy-crew-1.svg"],
    featured: false,
    created_at: "2026-03-15T00:00:00Z",
    variants: makeVariants("mercy-crew", "Mercy Crew", [6, 10, 8, 4]),
  },
  {
    id: "scripture-tote",
    name: "Scripture Tote",
    slug: "scripture-tote",
    description:
      "Heavy canvas tote bag with interior pocket. Screen-printed verse on one side, clean brand mark on the other. 15\" x 16\" with 10\" handles.",
    price: 2800,
    category: "accessories",
    images: ["/products/scripture-tote-1.svg"],
    featured: true,
    created_at: "2026-04-01T00:00:00Z",
    variants: makeVariants("scripture-tote", "Scripture Tote", [25, 25, 25, 25]),
  },
];
