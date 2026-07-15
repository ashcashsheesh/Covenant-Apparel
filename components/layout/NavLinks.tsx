"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
];

export function NavLinks({ onClick }: { onClick?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onClick}
          className="text-sm font-normal text-black transition-opacity hover:opacity-60"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
