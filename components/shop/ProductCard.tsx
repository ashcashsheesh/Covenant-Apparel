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
      <div className="relative aspect-square overflow-hidden bg-black/5">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className={`object-cover transition-opacity duration-300 ${
            hovered && secondImage ? "opacity-0" : "opacity-100"
          }`}
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {secondImage && (
          <Image
            src={secondImage}
            alt={`${product.name} alternate view`}
            fill
            className={`object-cover transition-opacity duration-300 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        )}
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-semibold text-black">{product.name}</h3>
        <p className="mt-1 text-sm text-black/60">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
