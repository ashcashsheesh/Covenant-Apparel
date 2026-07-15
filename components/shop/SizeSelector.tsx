"use client";

import { cn } from "@/lib/utils";
import type { ProductSize } from "@/lib/types";

interface SizeSelectorProps {
  sizes: ProductSize[];
  selected: ProductSize | null;
  onSelect: (size: ProductSize) => void;
  stockMap?: Record<ProductSize, number>;
}

export function SizeSelector({
  sizes,
  selected,
  onSelect,
  stockMap,
}: SizeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((size) => {
        const outOfStock = stockMap ? (stockMap[size] ?? 0) <= 0 : false;
        return (
          <button
            key={size}
            onClick={() => !outOfStock && onSelect(size)}
            disabled={outOfStock}
            className={cn(
              "min-w-[3rem] border px-4 py-2.5 text-sm transition-all",
              selected === size
                ? "border-charcoal bg-charcoal text-cream"
                : "border-charcoal/20 text-charcoal hover:border-charcoal",
              outOfStock && "cursor-not-allowed opacity-30 line-through"
            )}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}
