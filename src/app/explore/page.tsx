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
    <main className="min-h-dvh bg-white mx-auto max-w-md relative pb-20">
      <div className="px-5 pt-8">
        
        {/* ── Top bar ── */}
        <div className="flex items-center justify-between pb-6 border-b-0">
          <button className="flex items-center justify-center p-1 -ml-1 text-gray-900">
            <LayoutGrid size={22} strokeWidth={1.5} />
          </button>
          <button className="flex items-center text-gray-900 justify-center h-[34px] w-[34px] rounded-full border-[1.5px] border-gray-900">
            <User size={16} strokeWidth={1.5} />
          </button>
        </div>

        {/* ── Heading ── */}
        <div className="mt-1">
          <h1 className="text-[34px] tracking-tight font-medium text-gray-900 leading-none">
            Explore
          </h1>
          <p className="mt-1.5 text-[15px] font-normal text-gray-400">
            Best trendy collection!
          </p>
        </div>

        {/* ── Category pills ── */}
        <div className="mt-7 flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 rounded-full px-5 py-[6px] text-[15px] font-normal transition-all ${
                activeCategory === cat
                  ? "bg-[#ef7e00] text-white"
                  : "text-gray-800 bg-transparent hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Product grid ── */}
        <div className="mt-8">
          {loading ? (
            // Loading skeleton
            <div className="flex gap-4">
              <div className="flex flex-1 flex-col gap-6">
                {skeletons
                  .filter((_, i) => i % 2 === 0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className={`w-full rounded-[24px] bg-gray-100 animate-pulse ${
                        getLeftColAspect(i)
                      }`}
                    />
                  ))}
              </div>
              <div className="flex flex-1 flex-col gap-6 pt-12">
                {skeletons
                  .filter((_, i) => i % 2 !== 0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className={`w-full rounded-[24px] bg-gray-100 animate-pulse ${
                        getRightColAspect(i)
                      }`}
                    />
                  ))}
              </div>
            </div>
          ) : products.length === 0 ? (
            <p className="py-16 text-center text-gray-500">
              No products found.
            </p>
          ) : (
            // Staggered 2-column masonry layout
            <div className="flex gap-4">
              {/* Left column */}
              <div className="flex flex-1 flex-col gap-5">
                {leftCol.map((p, i) => (
                  <ProductCard
                    key={p._id}
                    product={p}
                    imageClass={getLeftColAspect(i)}
                  />
                ))}
              </div>

              {/* Right column - offset by padding */}
              <div className="flex flex-1 flex-col gap-5 pt-8">
                {rightCol.map((p, i) => (
                  <ProductCard
                    key={p._id}
                    product={p}
                    imageClass={getRightColAspect(i)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
