import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { upsertProduct } from "@/lib/products";
import type { Product } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const product = (await request.json()) as Product;
    const result = await upsertProduct(product);

    if (result) {
      return NextResponse.json({ product: result });
    }

    return NextResponse.json({
      product,
      message: "Saved locally. Connect Supabase to persist to database.",
    });
  } catch (error) {
    console.error("Product create error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

export async function GET() {
  const admin = getSupabaseAdmin();
  if (!admin) {
    return NextResponse.json({ products: [] });
  }

  const { data, error } = await admin
    .from("products")
    .select("*, product_variants(*)")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ products: data });
}
