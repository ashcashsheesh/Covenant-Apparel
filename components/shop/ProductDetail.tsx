"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product, ProductSize } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/cart-store";
import { SizeSelector } from "@/components/shop/SizeSelector";
import { Button } from "@/components/ui/Button";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const sizes = (product.variants?.map((v) => v.size) ?? [
    "S",
    "M",
    "L",
    "XL",
  ]) as ProductSize[];

  const stockMap = product.variants?.reduce(
    (acc, v) => {
      acc[v.size] = v.stock;
      return acc;
    },
    {} as Record<ProductSize, number>
  );

  const selectedStock = selectedSize && stockMap ? stockMap[selectedSize] : null;

  function handleAddToCart() {
    if (!selectedSize) return;
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      size: selectedSize,
      image: product.images[0],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <div className="relative aspect-square overflow-hidden bg-black/5">
            <Image
              src={product.images[activeImage]}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          {product.images.length > 1 && (
            <div className="mt-4 flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(i)}
                  className={`relative h-20 w-20 overflow-hidden border-2 transition-colors ${
                    activeImage === i ? "border-black" : "border-transparent"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-semibold text-black md:text-3xl">
            {product.name}
          </h1>
          <p className="mt-2 text-lg text-black/70">{formatPrice(product.price)}</p>
          <p className="mt-6 text-sm leading-relaxed text-black/70">
            {product.description}
          </p>

          <div className="mt-8">
            <p className="text-sm font-semibold text-black">Size</p>
            <div className="mt-3">
              <SizeSelector
                sizes={sizes}
                selected={selectedSize}
                onSelect={setSelectedSize}
                stockMap={stockMap}
              />
            </div>
            {selectedSize && selectedStock !== null && selectedStock <= 5 && selectedStock > 0 && (
              <p className="mt-2 text-xs text-black/60">
                Only {selectedStock} left in size {selectedSize}
              </p>
            )}
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={!selectedSize || (selectedStock !== null && selectedStock <= 0)}
            className="mt-8 w-full"
            size="lg"
          >
            {added ? "Added to Cart" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
}
