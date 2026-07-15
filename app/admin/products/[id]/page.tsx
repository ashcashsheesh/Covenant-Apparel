"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useAdminAuth } from "@/lib/admin-auth";
import { seedProducts } from "@/lib/data/products";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { Product, ProductCategory } from "@/lib/types";

const categories: ProductCategory[] = ["tees", "hoodies", "hats", "accessories"];

export default function EditProductPage() {
  const { authenticated, loading } = useAdminAuth();
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  const [form, setForm] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !authenticated) router.push("/admin/login");
  }, [authenticated, loading, router]);

  useEffect(() => {
    const product = seedProducts.find((p) => p.id === productId);
    if (product) setForm(product);
  }, [productId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);

    try {
      await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      router.push("/admin");
    } catch {
      setSaving(false);
    }
  }

  if (loading || !authenticated || !form) return null;

  return (
    <div className="min-h-screen bg-cream px-6 py-12">
      <div className="mx-auto max-w-xl">
        <Link href="/admin" className="text-xs text-stone hover:text-charcoal">
          ← Back to dashboard
        </Link>
        <h1 className="mt-4 font-serif text-2xl text-charcoal">Edit Product</h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label className="text-xs uppercase tracking-[0.1em] text-stone">Name</label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="mt-2" />
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
            <label className="text-xs uppercase tracking-[0.1em] text-stone">Price (cents)</label>
            <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) })} required className="mt-2" />
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
          <label className="flex items-center gap-2 text-sm text-charcoal">
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
            Featured product
          </label>
          <Button type="submit" disabled={saving} className="w-full">
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </div>
  );
}
