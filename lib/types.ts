export type ProductCategory = "tees" | "hoodies" | "hats" | "accessories";

export type ProductSize = "S" | "M" | "L" | "XL";

export interface ProductVariant {
  id: string;
  product_id: string;
  size: ProductSize;
  stock: number;
  sku: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: ProductCategory;
  images: string[];
  featured: boolean;
  created_at: string;
  variants?: ProductVariant[];
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  size: ProductSize;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  stripe_session_id: string;
  email: string;
  items: CartItem[];
  total: number;
  status: "pending" | "paid" | "shipped" | "cancelled";
  shipping_address: Record<string, string> | null;
  created_at: string;
}
