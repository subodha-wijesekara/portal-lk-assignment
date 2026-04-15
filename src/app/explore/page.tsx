"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import { LayoutGrid, Search, Sparkles, User } from "lucide-react";
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
      .then((data) => {
        setProducts(data.products || []);
      })
      .finally(() => setLoading(false));
  }, [activeCategory]);

  return (
    <div className="page-shell min-h-dvh lg:pl-32">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <section className="space-y-6">
          <header className="surface flex items-center justify-between rounded-[2rem] px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-gray-800 shadow-sm">
                <LayoutGrid size={18} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-gray-500">
                  FashionHub
                </p>
                <p className="text-sm text-gray-600">Curated collection browser</p>
              </div>
            </div>
            <button
              aria-label="User profile"
              className="w-11 h-11 rounded-full border border-white/80 bg-white/90 flex items-center justify-center text-gray-700 shadow-sm"
            >
              <User size={18} />
            </button>
          </header>

          <section className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="space-y-2">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/75 px-4 py-2 text-xs font-semibold tracking-[0.2em] text-gray-600 shadow-sm">
                <Sparkles size={14} className="text-orange-500" />
                BEST TRENDY COLLECTION
              </p>
              <h1 className="text-4xl font-bold tracking-[-0.04em] text-gray-950 sm:text-5xl">
                Explore
              </h1>
              <p className="max-w-xl text-base text-gray-600">
                Browse seasonal drops, trend-led tailoring, and everyday pieces that
                scale from pocket-sized screens to wide desktop layouts.
              </p>
            </div>

            <div className="surface rounded-[1.75rem] px-5 py-4 text-sm text-gray-600">
              <p className="text-xs uppercase tracking-[0.22em] text-gray-500">
                Active category
              </p>
              <p className="mt-1 text-lg font-semibold text-gray-950">{activeCategory}</p>
            </div>
          </section>

          <div className="flex gap-2 overflow-x-auto pb-1 pr-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                    : "surface text-gray-600 hover:text-gray-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="scroll-content">
            {loading ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 xl:gap-6">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[0.82] rounded-[1.7rem] bg-white/65 animate-pulse"
                  />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="surface rounded-[2rem] px-6 py-14 text-center text-gray-500">
                No products found.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 xl:gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>

        <aside className="hidden lg:block lg:sticky lg:top-6 space-y-4">
          <div className="surface rounded-[2rem] p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-gray-500">
              Search
            </p>
            <div className="mt-3 flex items-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-3 text-gray-500">
              <Search size={18} />
              <span className="text-sm">Search products...</span>
            </div>
          </div>

          <div className="surface overflow-hidden rounded-[2rem]">
            <div className="relative h-56 bg-[#e8ded1]">
              <Image
                src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&q=80"
                alt="Featured fashion look"
                fill
                className="object-cover object-top"
                unoptimized
              />
            </div>
            <div className="p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-gray-500">
                Featured look
              </p>
              <h2 className="mt-2 text-xl font-semibold text-gray-950">
                Build a premium desktop storefront feel
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Wider screens get a richer split layout, stronger hierarchy, and more
                breathing room around each product.
              </p>
            </div>
          </div>

          <div className="surface rounded-[2rem] p-5 space-y-3">
            <p className="text-xs uppercase tracking-[0.22em] text-gray-500">
              Categories
            </p>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition ${
                  activeCategory === cat
                    ? "bg-orange-50 text-orange-600"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>{cat}</span>
                <span className="text-xs text-gray-400">
                  {activeCategory === cat ? "active" : "view"}
                </span>
              </button>
            ))}
          </div>
        </aside>
      </div>

      <BottomNav />
    </div>
  );
}
