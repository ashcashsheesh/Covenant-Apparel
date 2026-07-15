import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="hero-section relative w-full overflow-hidden">
      <Image
        src="/hero/devin-h-UU2R0bKa8Bo-unsplash.jpg"
        alt="Snow-covered mountain range above an evergreen forest"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="hero-slide-overlay absolute inset-0" />

      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="hero-content text-center">
          <p className="hero-eyebrow">new collection</p>
          <h1 className="hero-word">UNASHAMED</h1>
          <Link href="/shop" className="hero-btn">
            SHOP NOW
          </Link>
        </div>
      </div>
    </section>
  );
}
