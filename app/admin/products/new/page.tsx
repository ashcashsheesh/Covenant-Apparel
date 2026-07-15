"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAdminAuth } from "@/lib/admin-auth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { Product, ProductCategory } from "@/lib/types";

const categories: ProductCategory[] = ["tees", "hoodies", "hats", "accessories"];

export default function NewProductPage() {
  const { authenticated, loading } = useAdminAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    id: "",
    name: "",
    slug: "",
    description: "",
    price: "",
    category: "tees" as ProductCategory,
    images: "",
    featured: false,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !authenticated) router.push("/admin/login");
  }, [authenticated, loading, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const product: Product = {
      id: form.id || form.slug,
      name: form.name,
      slug: form.slug,
      description: form.description,
      price: Math.round(parseFloat(form.price) * 100),
      category: form.category,
      images: form.images.split(",").map((s) => s.trim()).filter(Boolean),
      featured: form.featured,
      created_at: new Date().toISOString(),
      variants: ["S", "M", "L", "XL"].map((size) => ({
        id: `${form.slug || form.id}-${size}`,
        product_id: form.id || form.slug,
        size: size as "S" | "M" | "L" | "XL",
        stock: 10,
        sku: `CA-${(form.slug || form.id).toUpperCase()}-${size}`,
      })),
    };

    try {
      await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      router.push("/admin");
    } catch {
      setSaving(false);
    }
  }

  if (loading || !authenticated) return null;

  return (
    <div className="min-h-screen bg-cream px-6 py-12">
      <div className="mx-auto max-w-xl">
        <Link href="/admin" className="text-xs text-stone hover:text-charcoal">
          ← Back to dashboard
        </Link>
        <h1 className="mt-4 font-serif text-2xl text-charcoal">Add Product</h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label className="text-xs uppercase tracking-[0.1em] text-stone">Name</label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
              required
              className="mt-2"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.1em] text-stone">Slug</label>
            <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required className="mt-2" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.1em] text-stone">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
              rows={4}
              className="mt-2 w-full border border-charcoal/20 bg-transparent px-4 py-3 text-sm focus:border-charcoal focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.1em] text-stone">Price (USD)</label>
            <Input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required className="mt-2" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.1em] text-stone">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as ProductCategory })}
              className="mt-2 w-full border border-charcoal/20 bg-transparent px-4 py-3 text-sm focus:border-charcoal focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.1em] text-stone">Image URLs (comma-separated)</label>
            <Input value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })} placeholder="/products/my-product.svg" className="mt-2" />
          </div>
          <label className="flex items-center gap-2 text-sm text-charcoal">
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
            Featured product
          </label>
          <Button type="submit" disabled={saving} className="w-full">
            {saving ? "Saving..." : "Create Product"}
          </Button>
        </form>
      </div>
    </div>
  );
}
