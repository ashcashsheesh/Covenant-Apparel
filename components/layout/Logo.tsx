import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group ${className}`}>
      <span className="font-serif text-xl tracking-tight text-charcoal md:text-2xl">
        Covenant
      </span>
      <span className="block text-[10px] uppercase tracking-[0.3em] text-stone md:text-xs">
        Apparel
      </span>
    </Link>
  );
}
