import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Covenant Apparel.",
};

export default function PrivacyPage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-20">
        <h1 className="font-serif text-4xl text-charcoal">Privacy Policy</h1>
        <p className="mt-2 text-sm text-stone">Last updated: January 2026</p>

        <div className="mt-12 space-y-8 text-sm leading-relaxed text-stone">
          <section>
            <h2 className="font-serif text-lg text-charcoal">Information We Collect</h2>
            <p className="mt-3">
              When you place an order, subscribe to our newsletter, or contact us, we
              collect information such as your name, email address, shipping address,
              and payment details. Payment information is processed securely by Stripe
              and is never stored on our servers.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-lg text-charcoal">How We Use Your Information</h2>
            <p className="mt-3">
              We use your information to process orders, send order confirmations and
              shipping updates, respond to inquiries, and — with your consent — send
              marketing emails about new products and promotions.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-lg text-charcoal">Third-Party Services</h2>
            <p className="mt-3">
              We use Stripe for payment processing, Supabase for data storage, and
              Resend for email delivery. These services have their own privacy policies
              governing how they handle your data.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-lg text-charcoal">Your Rights</h2>
            <p className="mt-3">
              You may request access to, correction of, or deletion of your personal
              data at any time by contacting hello@covenantapparel.com. You may
              unsubscribe from marketing emails using the link in any email.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-lg text-charcoal">Contact</h2>
            <p className="mt-3">
              For privacy-related questions, contact us at hello@covenantapparel.com.
            </p>
          </section>
        </div>
      </div>
    </SiteLayout>
  );
}
