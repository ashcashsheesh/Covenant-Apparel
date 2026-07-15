import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={className}>
      <span className="text-base font-semibold tracking-tight text-black md:text-lg">
        Covenant Apparel
      </span>
    </Link>
  );
}
