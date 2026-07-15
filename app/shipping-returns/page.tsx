import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: "Shipping and return policy for Covenant Apparel orders.",
};

export default function ShippingReturnsPage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-20">
        <p className="text-xs uppercase tracking-[0.3em] text-stone">Policies</p>
        <h1 className="mt-2 font-serif text-4xl text-charcoal md:text-5xl">
          Shipping & Returns
        </h1>

        <div className="mt-12 space-y-10 text-sm leading-relaxed text-stone">
          <section>
            <h2 className="font-serif text-xl text-charcoal">Shipping</h2>
            <ul className="mt-4 list-inside list-disc space-y-2">
              <li>Standard shipping: 5-7 business days ($5.99, free over $75)</li>
              <li>Express shipping: 2-3 business days ($12.99)</li>
              <li>Orders processed within 1-2 business days</li>
              <li>Tracking number provided via email once shipped</li>
              <li>Currently shipping to US addresses only</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Returns & Exchanges</h2>
            <p className="mt-4">
              We want you to love your Covenant pieces. If you&apos;re not completely
              satisfied, you may return unworn items with original tags within 30 days
              of delivery for a full refund or exchange.
            </p>
            <ul className="mt-4 list-inside list-disc space-y-2">
              <li>Items must be unworn, unwashed, and in original condition</li>
              <li>Original tags must be attached</li>
              <li>Sale items are final sale unless defective</li>
              <li>Return shipping is the customer&apos;s responsibility</li>
              <li>Refunds processed within 5-7 business days of receiving return</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">Damaged or Defective Items</h2>
            <p className="mt-4">
              If you receive a damaged or defective item, contact us within 7 days
              with photos. We&apos;ll send a replacement or issue a full refund at no
              additional cost.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">How to Start a Return</h2>
            <ol className="mt-4 list-inside list-decimal space-y-2">
              <li>Email hello@covenantapparel.com with your order number</li>
              <li>We&apos;ll provide a return authorization and instructions</li>
              <li>Ship the item back within 14 days of authorization</li>
              <li>Refund issued once we receive and inspect the return</li>
            </ol>
          </section>
        </div>
      </div>
    </SiteLayout>
  );
}
