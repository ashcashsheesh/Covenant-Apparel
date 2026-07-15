"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";
import { MobileMenu } from "./MobileMenu";
import { useCartStore } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

function CartLink({
  count,
  onClick,
  className,
}: {
  count: number;
  onClick?: () => void;
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const label = mounted && count > 0 ? `Cart (${count})` : "Cart";

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={cn(
          "text-sm font-normal text-black transition-opacity hover:opacity-60",
          className
        )}
      >
        {label}
      </button>
    );
  }

  return (
    <Link
      href="/cart"
      onClick={onClick}
      className={cn(
        "text-sm font-normal text-black transition-opacity hover:opacity-60",
        className
      )}
    >
      {label}
    </Link>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, openCart } = useCartStore();
  const count = totalItems();

  return (
    <>
      <header className="border-b border-black bg-white">
        <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-[72px]">
          <button
            onClick={() => setMenuOpen(true)}
            className="relative z-10 p-2 text-black md:hidden"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          <div className="hidden md:flex md:flex-1 md:items-center">
            <NavLinks />
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <Logo />
          </div>

          <div className="relative z-10 flex items-center justify-end md:flex-1">
            <CartLink count={count} onClick={openCart} className="hidden md:block" />
            <CartLink count={count} className="md:hidden" />
          </div>
        </div>
      </header>
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
