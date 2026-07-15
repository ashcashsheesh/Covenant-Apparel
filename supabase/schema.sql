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

-- Seed products
INSERT INTO products (id, name, slug, description, price, category, images, featured) VALUES
  ('grace-tee', 'Grace Tee', 'grace-tee', 'Premium heavyweight cotton tee featuring a minimal typographic design.', 3800, 'tees', ARRAY['/products/grace-tee-1.svg', '/products/grace-tee-2.svg'], true),
  ('covenant-hoodie', 'Covenant Hoodie', 'covenant-hoodie', '400gsm French terry hoodie with embroidered chest mark.', 7200, 'hoodies', ARRAY['/products/covenant-hoodie-1.svg', '/products/covenant-hoodie-2.svg'], true),
  ('faith-cap', 'Faith Cap', 'faith-cap', 'Unstructured six-panel cap in washed cotton twill.', 3200, 'hats', ARRAY['/products/faith-cap-1.svg'], true),
  ('redeemed-tee', 'Redeemed Tee', 'redeemed-tee', 'Boxy-fit graphic tee with a bold front print.', 4200, 'tees', ARRAY['/products/redeemed-tee-1.svg', '/products/redeemed-tee-2.svg'], false),
  ('mercy-crew', 'Mercy Crew', 'mercy-crew', 'Classic crewneck sweatshirt in heather grey.', 5800, 'hoodies', ARRAY['/products/mercy-crew-1.svg'], false),
  ('scripture-tote', 'Scripture Tote', 'scripture-tote', 'Heavy canvas tote bag with interior pocket.', 2800, 'accessories', ARRAY['/products/scripture-tote-1.svg'], true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO product_variants (id, product_id, size, stock, sku) VALUES
  ('grace-tee-S', 'grace-tee', 'S', 12, 'CA-GRACE-TEE-S'),
  ('grace-tee-M', 'grace-tee', 'M', 18, 'CA-GRACE-TEE-M'),
  ('grace-tee-L', 'grace-tee', 'L', 15, 'CA-GRACE-TEE-L'),
  ('grace-tee-XL', 'grace-tee', 'XL', 8, 'CA-GRACE-TEE-XL'),
  ('covenant-hoodie-S', 'covenant-hoodie', 'S', 8, 'CA-COVENANT-HOODIE-S'),
  ('covenant-hoodie-M', 'covenant-hoodie', 'M', 14, 'CA-COVENANT-HOODIE-M'),
  ('covenant-hoodie-L', 'covenant-hoodie', 'L', 12, 'CA-COVENANT-HOODIE-L'),
  ('covenant-hoodie-XL', 'covenant-hoodie', 'XL', 6, 'CA-COVENANT-HOODIE-XL'),
  ('faith-cap-S', 'faith-cap', 'S', 20, 'CA-FAITH-CAP-S'),
  ('faith-cap-M', 'faith-cap', 'M', 20, 'CA-FAITH-CAP-M'),
  ('faith-cap-L', 'faith-cap', 'L', 20, 'CA-FAITH-CAP-L'),
  ('faith-cap-XL', 'faith-cap', 'XL', 20, 'CA-FAITH-CAP-XL'),
  ('redeemed-tee-S', 'redeemed-tee', 'S', 10, 'CA-REDEEMED-TEE-S'),
  ('redeemed-tee-M', 'redeemed-tee', 'M', 16, 'CA-REDEEMED-TEE-M'),
  ('redeemed-tee-L', 'redeemed-tee', 'L', 14, 'CA-REDEEMED-TEE-L'),
  ('redeemed-tee-XL', 'redeemed-tee', 'XL', 5, 'CA-REDEEMED-TEE-XL'),
  ('mercy-crew-S', 'mercy-crew', 'S', 6, 'CA-MERCY-CREW-S'),
  ('mercy-crew-M', 'mercy-crew', 'M', 10, 'CA-MERCY-CREW-M'),
  ('mercy-crew-L', 'mercy-crew', 'L', 8, 'CA-MERCY-CREW-L'),
  ('mercy-crew-XL', 'mercy-crew', 'XL', 4, 'CA-MERCY-CREW-XL'),
  ('scripture-tote-S', 'scripture-tote', 'S', 25, 'CA-SCRIPTURE-TOTE-S'),
  ('scripture-tote-M', 'scripture-tote', 'M', 25, 'CA-SCRIPTURE-TOTE-M'),
  ('scripture-tote-L', 'scripture-tote', 'L', 25, 'CA-SCRIPTURE-TOTE-L'),
  ('scripture-tote-XL', 'scripture-tote', 'XL', 25, 'CA-SCRIPTURE-TOTE-XL')
ON CONFLICT (id) DO NOTHING;
