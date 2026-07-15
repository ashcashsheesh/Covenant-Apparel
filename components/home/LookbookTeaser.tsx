import Link from "next/link";
import Image from "next/image";

const lookbookImages = [
  { src: "/lookbook/editorial-1.svg", alt: "Editorial shot 1" },
  { src: "/lookbook/editorial-2.svg", alt: "Editorial shot 2" },
  { src: "/lookbook/editorial-3.svg", alt: "Editorial shot 3" },
];

export function LookbookTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-stone">Editorial</p>
        <h2 className="mt-2 font-serif text-3xl text-charcoal md:text-4xl">
          The Lookbook
        </h2>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {lookbookImages.map((img, i) => (
          <div
            key={img.src}
            className={`relative aspect-[3/4] overflow-hidden bg-charcoal/5 ${
              i === 1 ? "md:mt-8" : ""
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link
          href="/lookbook"
          className="text-sm uppercase tracking-[0.2em] text-stone transition-colors hover:text-charcoal"
        >
          Full Lookbook →
        </Link>
      </div>
    </section>
  );
}
