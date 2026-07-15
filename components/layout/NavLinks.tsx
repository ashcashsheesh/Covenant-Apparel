"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/lookbook", label: "Lookbook" },
];

export function NavLinks({ onClick }: { onClick?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onClick}
          className={cn(
            "text-sm uppercase tracking-[0.15em] transition-colors hover:text-stone",
            pathname === link.href || pathname.startsWith(link.href + "/")
              ? "text-charcoal"
              : "text-charcoal/60"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
