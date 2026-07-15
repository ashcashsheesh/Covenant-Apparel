"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { CartItemRow } from "./CartItemRow";

export function CartDrawer() {
  const { items, isOpen, closeCart, subtotal, totalItems } = useCartStore();
  const [checkingOut, setCheckingOut] = useState(false);
  const count = totalItems();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
      }
    } catch {
      setCheckingOut(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/40"
            onClick={closeCart}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-cream shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-charcoal/10 px-6 py-5">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} />
                <h2 className="text-sm uppercase tracking-[0.15em]">
                  Cart ({count})
                </h2>
              </div>
              <button onClick={closeCart} aria-label="Close cart" className="p-1">
                <X size={20} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6">
                <ShoppingBag size={48} className="text-stone/30" />
                <p className="mt-4 text-stone">Your cart is empty</p>
                <Link href="/shop" onClick={closeCart} className="mt-6">
                  <Button variant="outline" size="sm">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-6">
                  <div className="space-y-6">
                    {items.map((item) => (
                      <CartItemRow
                        key={`${item.productId}-${item.size}`}
                        item={item}
                      />
                    ))}
                  </div>
                </div>
                <div className="border-t border-charcoal/10 px-6 py-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-stone">Subtotal</span>
                    <span className="text-charcoal">{formatPrice(subtotal())}</span>
                  </div>
                  <p className="mt-2 text-xs text-stone">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <Button
                    onClick={handleCheckout}
                    disabled={checkingOut}
                    className="mt-4 w-full"
                  >
                    {checkingOut ? "Processing..." : "Checkout"}
                  </Button>
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="mt-3 block text-center text-xs uppercase tracking-[0.15em] text-stone hover:text-charcoal"
                  >
                    View Full Cart
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
