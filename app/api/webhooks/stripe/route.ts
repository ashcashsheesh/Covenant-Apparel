import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase";
import type { CartItem } from "@/lib/types";
import { Resend } from "resend";

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const items: CartItem[] = session.metadata?.items
      ? JSON.parse(session.metadata.items)
      : [];

    const total = session.amount_total ?? 0;
    const email = session.customer_details?.email ?? session.customer_email ?? "";

    const admin = getSupabaseAdmin();
    if (admin) {
      await admin.from("orders").insert({
        stripe_session_id: session.id,
        email,
        items,
        total,
        status: "paid",
        shipping_address:
          (session as Stripe.Checkout.Session & {
            shipping_details?: { address?: Stripe.Address | null };
          }).shipping_details?.address ??
          session.customer_details?.address ??
          null,
      });

      for (const item of items) {
        const { data: variant } = await admin
          .from("product_variants")
          .select("stock")
          .eq("product_id", item.productId)
          .eq("size", item.size)
          .single();

        if (variant) {
          await admin
            .from("product_variants")
            .update({ stock: Math.max(0, variant.stock - item.quantity) })
            .eq("product_id", item.productId)
            .eq("size", item.size);
        }
      }
    }

    if (process.env.RESEND_API_KEY && email) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const itemList = items
        .map(
          (i) =>
            `${i.name} (${i.size}) x${i.quantity} — $${((i.price * i.quantity) / 100).toFixed(2)}`
        )
        .join("\n");

      try {
        await resend.emails.send({
          from: "Covenant Apparel <orders@covenantapparel.com>",
          to: email,
          subject: "Order Confirmed — Covenant Apparel",
          text: `Thank you for your order!\n\nOrder Summary:\n${itemList}\n\nTotal: $${(total / 100).toFixed(2)}\n\nWe'll send tracking info once your order ships.\n\n— Covenant Apparel`,
        });
      } catch (emailErr) {
        console.error("Failed to send confirmation email:", emailErr);
      }
    }
  }

  return NextResponse.json({ received: true });
}
