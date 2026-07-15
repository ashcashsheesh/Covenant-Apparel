"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { ProductCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

const categories: { value: ProductCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "tees", label: "Tees" },
  { value: "hoodies", label: "Hoodies" },
  { value: "hats", label: "Hats" },
  { value: "accessories", label: "Accessories" },
];

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") ?? "all";
  const currentSort = searchParams.get("sort") ?? "newest";

  function updateParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || (key === "sort" && value === "newest")) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/shop?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-6 border-b border-charcoal/10 pb-8 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => updateParams("category", cat.value)}
            className={cn(
              "px-4 py-2 text-xs uppercase tracking-[0.15em] transition-colors",
              currentCategory === cat.value
                ? "bg-charcoal text-cream"
                : "text-stone hover:text-charcoal"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <select
        value={currentSort}
        onChange={(e) => updateParams("sort", e.target.value)}
        className="border border-charcoal/20 bg-transparent px-4 py-2 text-xs uppercase tracking-[0.1em] text-charcoal focus:border-charcoal focus:outline-none"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
