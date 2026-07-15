"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAdminAuth } from "@/lib/admin-auth";
import { seedProducts } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import type { Order, Product } from "@/lib/types";

export default function AdminDashboard() {
  const { authenticated, loading, logout } = useAdminAuth();
  const router = useRouter();
  const [tab, setTab] = useState<"products" | "orders">("products");
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!loading && !authenticated) {
      router.push("/admin/login");
    }
  }, [authenticated, loading, router]);

  useEffect(() => {
    if (authenticated) {
      fetchOrders();
    }
  }, [authenticated]);

  async function fetchOrders() {
    try {
      const res = await fetch("/api/admin/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders ?? []);
      }
    } catch {
      // Orders unavailable without Supabase
    }
  }

  if (loading || !authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <p className="text-stone">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-charcoal/10 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <h1 className="font-serif text-xl text-charcoal">Admin Dashboard</h1>
            <Link href="/" className="text-xs text-stone hover:text-charcoal">
              ← Back to site
            </Link>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/products/new">
              <Button size="sm">Add Product</Button>
            </Link>
            <Button variant="outline" size="sm" onClick={() => { logout(); router.push("/admin/login"); }}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex gap-4 border-b border-charcoal/10 pb-4">
          <button
            onClick={() => setTab("products")}
            className={`text-sm uppercase tracking-[0.1em] ${tab === "products" ? "text-charcoal" : "text-stone"}`}
          >
            Products ({products.length})
          </button>
          <button
            onClick={() => setTab("orders")}
            className={`text-sm uppercase tracking-[0.1em] ${tab === "orders" ? "text-charcoal" : "text-stone"}`}
          >
            Orders ({orders.length})
          </button>
        </div>

        {tab === "products" && (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-charcoal/20 text-left text-xs uppercase tracking-[0.1em] text-stone">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Featured</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-charcoal/10">
                    <td className="px-4 py-3 text-charcoal">{p.name}</td>
                    <td className="px-4 py-3 text-stone capitalize">{p.category}</td>
                    <td className="px-4 py-3 text-stone">{formatPrice(p.price)}</td>
                    <td className="px-4 py-3 text-stone">{p.featured ? "Yes" : "No"}</td>
                    <td className="px-4 py-3">
                      <Link href={`/admin/products/${p.id}`} className="text-xs uppercase tracking-[0.1em] text-charcoal hover:underline">
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "orders" && (
          <div className="mt-6">
            {orders.length === 0 ? (
              <p className="py-12 text-center text-stone">
                No orders yet. Orders will appear here after customers checkout via Stripe.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-charcoal/20 text-left text-xs uppercase tracking-[0.1em] text-stone">
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Total</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id} className="border-b border-charcoal/10">
                        <td className="px-4 py-3 text-stone">
                          {new Date(o.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-charcoal">{o.email}</td>
                        <td className="px-4 py-3 text-stone">{formatPrice(o.total)}</td>
                        <td className="px-4 py-3 capitalize text-stone">{o.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
