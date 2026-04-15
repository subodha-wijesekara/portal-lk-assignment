import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { seedProducts } from "@/lib/seed";

async function ensureSeeded() {
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany(seedProducts);
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    await ensureSeeded();

    const { searchParams } = request.nextUrl;
    const category = searchParams.get("category");

    const query = category && category !== "All" ? { category } : {};
    const products = await Product.find(query).lean();

    // Convert _id to string for serialization
    const serialized = products.map((p) => ({
      ...p,
      _id: p._id.toString(),
    }));

    return NextResponse.json({ products: serialized });
  } catch (error) {
    console.error("[GET /api/products]", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
