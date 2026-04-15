import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetailClient from "./ProductDetailClient";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { seedProducts } from "@/lib/seed";
import { IProduct } from "@/types";

// Fetch product on the server
async function getProduct(id: string): Promise<IProduct | null> {
  try {
    await connectDB();

    // Ensure seeded
    const count = await Product.countDocuments();
    if (count === 0) await Product.insertMany(seedProducts);

    const product = await Product.findById(id).lean();
    if (!product) return null;

    return JSON.parse(JSON.stringify({ ...product, _id: product._id.toString() }));
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.title} — FashionHub`,
    description: product.description || `Buy ${product.title} at FashionHub`,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) notFound();

  return <ProductDetailClient product={product} />;
}
