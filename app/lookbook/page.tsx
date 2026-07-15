import type { Metadata } from "next";
import Image from "next/image";
import { SiteLayout } from "@/components/layout/SiteLayout";

export const metadata: Metadata = {
  title: "Lookbook",
  description: "Editorial lookbook featuring Covenant Apparel styled shots.",
};

const images = [
  { src: "/lookbook/editorial-1.svg", alt: "Spring collection editorial", span: "md:col-span-2 md:row-span-2" },
  { src: "/lookbook/editorial-2.svg", alt: "Urban faith styling", span: "" },
  { src: "/lookbook/editorial-3.svg", alt: "Minimal aesthetic shot", span: "" },
  { src: "/products/grace-tee-1.svg", alt: "Grace tee styled", span: "" },
  { src: "/products/covenant-hoodie-1.svg", alt: "Covenant hoodie editorial", span: "md:col-span-2" },
  { src: "/products/redeemed-tee-1.svg", alt: "Redeemed tee look", span: "" },
];

export default function LookbookPage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-20">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-stone">Editorial</p>
          <h1 className="mt-2 font-serif text-4xl text-charcoal md:text-5xl">Lookbook</h1>
          <p className="mx-auto mt-4 max-w-md text-sm text-stone">
            Spring 2026 — styled shots from our latest collection.
          </p>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3 md:auto-rows-[300px]">
          {images.map((img) => (
            <div
              key={img.src}
              className={`relative overflow-hidden bg-charcoal/5 ${img.span}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
