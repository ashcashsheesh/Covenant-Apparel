import Link from "next/link";

export function BrandStatement() {
  return (
    <section className="border-y border-charcoal/10 bg-white py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="font-serif text-2xl leading-relaxed text-charcoal md:text-3xl">
          We create clothing that speaks quietly but carries deep meaning — for
          those who walk by faith, not by sight.
        </p>
        <Link
          href="/about"
          className="mt-8 inline-block text-sm uppercase tracking-[0.2em] text-stone transition-colors hover:text-charcoal"
        >
          Our Story →
        </Link>
      </div>
    </section>
  );
}
