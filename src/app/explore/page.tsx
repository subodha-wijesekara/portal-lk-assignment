"use client";

import { useState, useEffect, use } from "react";
import { LayoutGrid, User } from "lucide-react";
import { IProduct } from "@/types";
import ProductCard from "@/components/ProductCard";
import BottomNav from "@/components/BottomNav";

const CATEGORIES = ["All", "Men", "Women", "Kids", "Other"];

export default function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: initialCategory } = use(searchParams);
  const [activeCategory, setActiveCategory] = useState(initialCategory || "All");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const url =
      activeCategory === "All"
        ? "/api/products"
        : `/api/products?category=${activeCategory}`;

    fetch(url)
      .then((r) => r.json())
      .then((data) => setProducts(data.products || []))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  return (
    <div className="page-shell min-h-dvh pb-28">
      {/* Top bar */}
      <div className="flex items-center justify-between py-2">
        <LayoutGrid size={26} strokeWidth={1.8} className="text-gray-800" />
        <div className="h-7 w-7 rounded-full border-2 border-gray-400" />
      </div>

      {/* Heading */}
      <div className="mt-4">
        <h1 className="text-[2rem] font-bold tracking-[-0.03em] text-gray-950">
          Explore
        </h1>
        <p className="mt-1 text-sm text-gray-500">Best trendy collection!</p>
      </div>

      {/* Category pills */}
      <div className="mt-4 flex gap-3 overflow-x-auto pb-1 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition-all ${
              activeCategory === cat
                ? "bg-orange-500 text-white"
                : "text-gray-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product grid — staggered 2-column masonry */}
      <div className="mt-5 columns-2 gap-4 space-y-0">
        {loading
          ? [...Array(6)].map((_, i) => (
              <div
                key={i}
                className="mb-4 break-inside-avoid rounded-[1.5rem] bg-white/60 animate-pulse"
                style={{ height: i % 2 === 0 ? "240px" : "290px" }}
              />
            ))
          : products.length === 0
          ? (
            <p className="col-span-2 py-16 text-center text-gray-500">
              No products found.
            </p>
          )
          : products.map((product) => (
              <div key={product._id} className="mb-4 break-inside-avoid">
                <ProductCard product={product} />
              </div>
            ))}
      </div>

      <BottomNav />
    </div>
  );
}
