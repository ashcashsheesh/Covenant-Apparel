"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const secondImage = product.images[1];

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-charcoal/5">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className={`object-cover transition-all duration-500 ${
            hovered && secondImage ? "opacity-0 scale-105" : "opacity-100"
          }`}
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {secondImage && (
          <Image
            src={secondImage}
            alt={`${product.name} alternate view`}
            fill
            className={`object-cover transition-all duration-500 ${
              hovered ? "opacity-100 scale-105" : "opacity-0"
            }`}
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-sm text-charcoal">{product.name}</h3>
        <p className="mt-1 text-sm text-stone">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
