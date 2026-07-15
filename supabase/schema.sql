-- Covenant Apparel Database Schema
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  price INTEGER NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('tees', 'hoodies', 'hats', 'accessories')),
  images TEXT[] NOT NULL DEFAULT '{}',
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS product_variants (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  size TEXT NOT NULL CHECK (size IN ('S', 'M', 'L', 'XL')),
  stock INTEGER NOT NULL DEFAULT 0,
  sku TEXT NOT NULL,
  UNIQUE(product_id, size)
);

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]',
  total INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'shipped', 'cancelled')),
  shipping_address JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read variants" ON product_variants FOR SELECT USING (true);

CREATE POLICY "Service role full access products" ON products FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access variants" ON product_variants FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access orders" ON orders FOR ALL USING (auth.role() = 'service_role');

-- Add products via admin or uncomment and fill in the template below:
--
-- INSERT INTO products (id, name, slug, description, price, category, images, featured) VALUES
--   ('your-product-id', 'Product Name', 'your-product-slug', 'Your description.', 3800, 'tees', ARRAY['/products/your-product-1.jpg'], true);
--
-- INSERT INTO product_variants (id, product_id, size, stock, sku) VALUES
--   ('your-product-id-S', 'your-product-id', 'S', 10, 'CA-YOUR-PRODUCT-ID-S'),
--   ('your-product-id-M', 'your-product-id', 'M', 10, 'CA-YOUR-PRODUCT-ID-M'),
--   ('your-product-id-L', 'your-product-id', 'L', 10, 'CA-YOUR-PRODUCT-ID-L'),
--   ('your-product-id-XL', 'your-product-id', 'XL', 10, 'CA-YOUR-PRODUCT-ID-XL');
