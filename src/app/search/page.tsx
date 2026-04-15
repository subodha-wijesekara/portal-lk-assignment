import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { Search, Sparkles } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search — FashionHub",
};

export default function SearchPage() {
  return (
    <div className="page-shell min-h-dvh lg:pl-32">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <section className="space-y-6">
          <header className="surface flex items-center justify-between rounded-[1.75rem] px-4 py-3 sm:px-5">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-gray-500">
                Search
              </p>
              <h1 className="text-xl font-semibold text-gray-950">Find products fast</h1>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700">
              <Search size={18} />
            </div>
          </header>

          <div className="surface rounded-[2rem] p-5 sm:p-6">
            <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-3 text-gray-500">
              <Search size={18} />
              <input
                type="search"
                placeholder="Search products..."
                className="w-full bg-transparent text-sm outline-none"
                aria-label="Search products"
                id="search-input"
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Premium shirts",
                "Tailored coats",
                "Summer drops",
                "Accessories",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-gray-600 shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="surface flex min-h-[26rem] flex-col items-center justify-center rounded-[2rem] px-8 py-12 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 text-4xl">
              🔍
            </div>
            <p className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-gray-950">
              Search for your favourite items
            </p>
            <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
              Use the search bar or jump straight into the curated explore view.
            </p>
            <Link
              href="/explore"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              <Sparkles size={16} />
              Browse all collections
            </Link>
          </div>
        </section>

        <aside className="hidden lg:block lg:sticky lg:top-6">
          <div className="surface rounded-[2.25rem] p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-gray-500">
              Suggestions
            </p>
            <div className="mt-4 space-y-3">
              {[
                "Premium Tagerine Shirt",
                "Leather Tagerine Coat",
                "Trending menwear",
                "Minimal tailoring",
              ].map((item) => (
                <div key={item} className="rounded-[1.25rem] bg-white px-4 py-3 text-sm text-gray-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
      <BottomNav />
    </div>
  );
}
