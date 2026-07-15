"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, subtotal, clearCart } = useCartStore();
  const [checkingOut, setCheckingOut] = useState(false);

  async function handleCheckout() {
    setCheckingOut(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setCheckingOut(false);
      }
    } catch {
      setCheckingOut(false);
    }
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <h1 className="text-2xl font-semibold text-black md:text-3xl">Cart</h1>

        {items.length === 0 ? (
          <div className="mt-16 text-center">
            <p className="text-black/60">Your cart is empty.</p>
            <Link href="/shop" className="mt-6 inline-block">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-10 space-y-8">
              {items.map((item) => (
                <CartItemRow key={`${item.productId}-${item.size}`} item={item} />
              ))}
            </div>
            <div className="mt-12 border-t border-black/10 pt-8">
              <div className="flex justify-between text-lg">
                <span className="text-black/60">Subtotal</span>
                <span className="font-semibold text-black">{formatPrice(subtotal())}</span>
              </div>
              <Button
                onClick={handleCheckout}
                disabled={checkingOut}
                className="mt-6 w-full"
                size="lg"
              >
                {checkingOut ? "Processing..." : "Checkout"}
              </Button>
              <button
                onClick={clearCart}
                className="mt-4 w-full text-center text-sm text-black/60 hover:text-black"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </SiteLayout>
  );
}
