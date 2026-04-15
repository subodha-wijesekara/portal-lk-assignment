"use client";

import { useState, useEffect, use } from "react";
import { LayoutGrid, User } from "lucide-react";
import { IProduct } from "@/types";
import ProductCard from "@/components/ProductCard";
import BottomNav from "@/components/BottomNav";

const CATEGORIES = ["All", "Men", "Women", "Kids", "Other"];

// Aspect ratios for staggered masonry layout
const TALL = "aspect-[0.8]";
const SHORT = "aspect-[1]";

function getLeftColAspect(i: number) {
  return i % 2 === 0 ? TALL : SHORT;
}

function getRightColAspect(i: number) {
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
    <main className="min-h-dvh w-full pb-20 md:pb-0">
      <div className="mx-auto w-full max-w-7xl px-5 pt-8 sm:px-8 md:pl-28 lg:pl-32">
        
        {/* ── Top bar ── */}
        <div className="flex items-center justify-between pb-6 border-b-0 max-w-md">
          <button className="flex items-center justify-center p-1 -ml-1 text-gray-900">
            <LayoutGrid size={22} strokeWidth={1.5} />
          </button>
        </div>

        {/* ── Heading ── */}
        <div className="mt-1">
          <h1 className="text-[34px] tracking-tight font-medium text-gray-900 leading-none lg:text-5xl">
            Explore
          </h1>
          <p className="mt-1.5 text-[15px] font-normal text-gray-400 lg:text-lg lg:mt-3">
            Best trendy collection!
          </p>
        </div>

        {/* ── Category pills ── */}
        <div className="mt-7 flex items-center gap-1 overflow-x-auto pb-2 no-scrollbar lg:mt-10 lg:gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 rounded-full px-5 py-[6px] text-[15px] font-normal transition-all lg:px-6 lg:py-2 ${
                activeCategory === cat
                  ? "bg-[#ef7e00] text-white"
                  : "text-gray-800 bg-transparent hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Product grid ── */}
        <div className="mt-8 lg:mt-10">
          {loading ? (
            <div className="columns-2 md:columns-3 xl:columns-4 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
              {skeletons.map((_, i) => (
                <div
                  key={i}
                  className={`w-full rounded-[24px] bg-gray-100 animate-pulse break-inside-avoid ${
                    getLeftColAspect(i)
                  }`}
                />
              ))}
            </div>
          ) : products.length === 0 ? (
            <p className="py-16 text-center text-gray-500">
              No products found.
            </p>
          ) : (
            <div className="columns-2 md:columns-3 xl:columns-4 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
              {products.map((p, i) => (
                <div key={p._id} className="break-inside-avoid">
                  <ProductCard
                    product={p}
                    imageClass={getLeftColAspect(i)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
