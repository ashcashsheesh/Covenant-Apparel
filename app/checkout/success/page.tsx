import type { Metadata } from "next";
import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Thank you for your order with Covenant Apparel.",
};

export default function CheckoutSuccessPage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-stone">Thank You</p>
        <h1 className="mt-4 font-serif text-4xl text-charcoal">Order Confirmed</h1>
        <p className="mt-6 text-sm leading-relaxed text-stone">
          Your order has been placed successfully. You&apos;ll receive a confirmation
          email shortly with your order details and tracking information once your
          package ships.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link href="/shop">
            <Button>Continue Shopping</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </div>
    </SiteLayout>
  );
}
