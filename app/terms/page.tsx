import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for Covenant Apparel.",
};

export default function TermsPage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-20">
        <h1 className="font-serif text-4xl text-charcoal">Terms of Service</h1>
        <p className="mt-2 text-sm text-stone">Last updated: January 2026</p>

        <div className="mt-12 space-y-8 text-sm leading-relaxed text-stone">
          <section>
            <h2 className="font-serif text-lg text-charcoal">Agreement</h2>
            <p className="mt-3">
              By accessing and using the Covenant Apparel website, you agree to these
              Terms of Service. If you do not agree, please do not use our site.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-lg text-charcoal">Products & Pricing</h2>
            <p className="mt-3">
              All products are subject to availability. We reserve the right to limit
              quantities, discontinue products, and correct pricing errors. Prices are
              listed in USD and are subject to change without notice.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-lg text-charcoal">Orders & Payment</h2>
            <p className="mt-3">
              Placing an order constitutes an offer to purchase. We reserve the right
              to refuse or cancel any order. Payment is processed securely through
              Stripe at the time of checkout.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-lg text-charcoal">Intellectual Property</h2>
            <p className="mt-3">
              All content on this site — including designs, logos, text, and images —
              is the property of Covenant Apparel and protected by copyright law.
              Unauthorized use is prohibited.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-lg text-charcoal">Limitation of Liability</h2>
            <p className="mt-3">
              Covenant Apparel is not liable for any indirect, incidental, or
              consequential damages arising from your use of our website or products.
              Our total liability is limited to the amount you paid for the product in
              question.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-lg text-charcoal">Contact</h2>
            <p className="mt-3">
              Questions about these terms? Contact hello@covenantapparel.com.
            </p>
          </section>
        </div>
      </div>
    </SiteLayout>
  );
}
