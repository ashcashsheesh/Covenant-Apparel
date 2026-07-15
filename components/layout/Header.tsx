"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ShoppingBag } from "lucide-react";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";
import { MobileMenu } from "./MobileMenu";
import { useCartStore } from "@/lib/cart-store";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, openCart } = useCartStore();
  const count = totalItems();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-charcoal/10 bg-cream/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20">
          <button
            onClick={() => setMenuOpen(true)}
            className="p-2 text-charcoal md:hidden"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          <div className="md:flex-1">
            <Logo className="mx-auto md:mx-0" />
          </div>

          <div className="hidden flex-1 justify-center md:flex">
            <NavLinks />
          </div>

          <div className="flex flex-1 items-center justify-end gap-2">
            <Link
              href="/cart"
              className="relative p-2 text-charcoal transition-colors hover:text-stone md:hidden"
              aria-label="Cart"
            >
              <ShoppingBag size={22} />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center bg-charcoal text-[10px] text-cream">
                  {count}
                </span>
              )}
            </Link>
            <button
              onClick={openCart}
              className="relative hidden p-2 text-charcoal transition-colors hover:text-stone md:block"
              aria-label="Open cart"
            >
              <ShoppingBag size={22} />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center bg-charcoal text-[10px] text-cream">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
