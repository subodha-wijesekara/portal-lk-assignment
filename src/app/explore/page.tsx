"use client";

import { useState, useEffect, use } from "react";
import { LayoutGrid, User } from "lucide-react";
import { IProduct } from "@/types";
import ProductCard from "@/components/ProductCard";
import BottomNav from "@/components/BottomNav";

const CATEGORIES = ["All", "Men", "Women", "Kids", "Other"];

const TALL = "aspect-[0.68]";
const SHORT = "aspect-[0.92]";

function leftClass(i: number) {
  return i % 2 === 0 ? TALL : SHORT;
}
function rightClass(i: number) {
  return i % 2 === 0 ? SHORT : TALL;
}

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

  const leftCol = products.filter((_, i) => i % 2 === 0);
  const rightCol = products.filter((_, i) => i % 2 !== 0);
  const skeletons = [...Array(6)];

  return (
    <div className="explore-page">
      {/* ── Top bar ── */}
      <div className="flex items-center justify-between">
        <LayoutGrid size={24} strokeWidth={1.8} className="text-gray-800" />
        <div className="h-7 w-7 rounded-full border-2 border-gray-400" />
      </div>

      {/* ── Heading ── */}
      <div className="mt-6 lg:mt-8">
        <h1 className="text-[1.9rem] font-bold tracking-[-0.03em] text-gray-950 lg:text-5xl">
          Explore
        </h1>
        <p className="mt-1 text-sm text-gray-500 lg:mt-2 lg:text-base">
          Best trendy collection!
        </p>
      </div>

      {/* ── Category pills ── */}
      <div className="mt-5 flex gap-2 overflow-x-auto pb-1 no-scrollbar lg:gap-3 lg:mt-7">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition-all lg:px-6 lg:py-2.5 lg:text-[0.95rem] ${
              activeCategory === cat
                ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Product grid ── */}
      <div className="mt-6 lg:mt-8">
        {/* Mobile / tablet: staggered 2-col */}
        <div className="flex gap-3 lg:hidden">
          <div className="flex flex-1 flex-col gap-3">
            {loading
              ? skeletons.filter((_, i) => i % 2 === 0).map((_, i) => (
                  <div
                    key={i}
                    className={`${leftClass(i)} w-full rounded-[1.5rem] bg-white/60 animate-pulse`}
                  />
                ))
              : leftCol.map((p, i) => (
                  <ProductCard key={p._id} product={p} imageClass={leftClass(i)} />
                ))}
          </div>

          <div className="flex flex-1 flex-col gap-3 pt-10">
            {loading
              ? skeletons.filter((_, i) => i % 2 !== 0).map((_, i) => (
                  <div
                    key={i}
                    className={`${rightClass(i)} w-full rounded-[1.5rem] bg-white/60 animate-pulse`}
                  />
                ))
              : rightCol.map((p, i) => (
                  <ProductCard key={p._id} product={p} imageClass={rightClass(i)} />
                ))}
          </div>
        </div>

        {/* Desktop: uniform 3-col → 4-col grid */}
        <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:gap-6">
          {loading
            ? skeletons.map((_, i) => (
                <div
                  key={i}
                  className="aspect-[0.82] rounded-[1.5rem] bg-white/60 animate-pulse"
                />
              ))
            : products.length === 0
            ? (
              <p className="col-span-4 py-16 text-center text-gray-500">
                No products found.
              </p>
            )
            : products.map((p) => (
                <ProductCard key={p._id} product={p} imageClass="aspect-[0.82]" />
              ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
