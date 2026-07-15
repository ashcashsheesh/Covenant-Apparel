import type { Metadata } from "next";
import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Covenant Apparel orders, shipping, and returns.",
};

const faqs = [
  {
    q: "How long does shipping take?",
    a: "Standard shipping takes 5-7 business days within the US. Express shipping (2-3 business days) is available at checkout. You'll receive a tracking number once your order ships.",
  },
  {
    q: "Do you offer free shipping?",
    a: "Yes! All orders over $75 qualify for free standard shipping within the United States.",
  },
  {
    q: "What is your return policy?",
    a: "We offer 30-day hassle-free returns on unworn items with original tags attached. Visit our Shipping & Returns page for full details.",
  },
  {
    q: "How do your sizes run?",
    a: "Our tees run true to size with a relaxed fit. Hoodies are intentionally oversized — we recommend sizing down if you prefer a regular fit. Check our Size Guide for detailed measurements.",
  },
  {
    q: "How should I care for my garments?",
    a: "Machine wash cold, inside out. Tumble dry low or hang dry. Do not bleach. Iron on low if needed, avoiding printed areas.",
  },
  {
    q: "Do you ship internationally?",
    a: "International shipping is coming soon. Sign up for our newsletter to be notified when we expand to your country.",
  },
  {
    q: "Can I change or cancel my order?",
    a: "Orders can be modified or cancelled within 1 hour of placement. After that, please contact us and we'll do our best to help.",
  },
  {
    q: "Are your products ethically made?",
    a: "Absolutely. We partner with manufacturers who meet our standards for fair labor practices and quality production.",
  },
];

export default function FAQPage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-20">
        <p className="text-xs uppercase tracking-[0.3em] text-stone">Help</p>
        <h1 className="mt-2 font-serif text-4xl text-charcoal md:text-5xl">
          Frequently Asked Questions
        </h1>

        <div className="mt-12 space-y-8">
          {faqs.map((faq) => (
            <div key={faq.q} className="border-b border-charcoal/10 pb-8">
              <h2 className="text-base font-medium text-charcoal">{faq.q}</h2>
              <p className="mt-3 text-sm leading-relaxed text-stone">{faq.a}</p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-sm text-stone">
          Still have questions?{" "}
          <Link href="/contact" className="text-charcoal underline hover:no-underline">
            Get in touch
          </Link>
          .
        </p>
      </div>
    </SiteLayout>
  );
}
