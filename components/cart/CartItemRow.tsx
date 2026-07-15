"use client";

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import type { CartItem } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/cart-store";

interface CartItemRowProps {
  item: CartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex gap-4">
      <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-charcoal/5">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-charcoal">{item.name}</p>
            <p className="mt-0.5 text-xs text-stone">Size: {item.size}</p>
          </div>
          <button
            onClick={() => removeItem(item.productId, item.size)}
            aria-label="Remove item"
            className="text-stone hover:text-charcoal"
          >
            <X size={16} />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center border border-charcoal/20">
            <button
              onClick={() =>
                updateQuantity(item.productId, item.size, item.quantity - 1)
              }
              className="px-2 py-1 text-charcoal hover:bg-charcoal/5"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="px-3 text-sm">{item.quantity}</span>
            <button
              onClick={() =>
                updateQuantity(item.productId, item.size, item.quantity + 1)
              }
              className="px-2 py-1 text-charcoal hover:bg-charcoal/5"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>
          <p className="text-sm text-charcoal">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>
      </div>
    </div>
  );
}
