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
      <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-black/5">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-semibold text-black">{item.name}</p>
            <p className="mt-0.5 text-xs text-black/60">Size: {item.size}</p>
          </div>
          <button
            onClick={() => removeItem(item.productId, item.size)}
            aria-label="Remove item"
            className="text-black/40 hover:text-black"
          >
            <X size={16} />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center border border-black/20">
            <button
              onClick={() =>
                updateQuantity(item.productId, item.size, item.quantity - 1)
              }
              className="px-2 py-1 text-black hover:bg-black/5"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="px-3 text-sm">{item.quantity}</span>
            <button
              onClick={() =>
                updateQuantity(item.productId, item.size, item.quantity + 1)
              }
              className="px-2 py-1 text-black hover:bg-black/5"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>
          <p className="text-sm font-semibold text-black">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>
      </div>
    </div>
  );
}
