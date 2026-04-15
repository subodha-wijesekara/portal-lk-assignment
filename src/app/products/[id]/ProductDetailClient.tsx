"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, Bookmark, CheckCircle2, ShieldCheck } from "lucide-react";
import { IProduct, IColor } from "@/types";

interface ProductDetailClientProps {
  product: IProduct;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[2] || product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<IColor>(product.colors[0]);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product._id,
          title: product.title,
          image: product.images[0],
          selectedSize,
          selectedColor,
          quantity: 1,
          price: product.price,
        }),
      });

      if (res.ok) {
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
      }
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="page-shell min-h-dvh lg:pl-32">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="space-y-4 lg:sticky lg:top-6 lg:self-start">
          <header className="surface flex items-center justify-between rounded-[1.75rem] px-4 py-3 sm:px-5">
            <button
              onClick={() => router.back()}
              aria-label="Go back"
              className="w-11 h-11 rounded-full bg-white/85 flex items-center justify-center border border-gray-200 text-gray-800 transition hover:bg-white"
            >
              <ChevronLeft size={20} strokeWidth={2} />
            </button>
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-500">
              Details
            </span>
            <button
              aria-label="Save product"
              className="w-11 h-11 rounded-full bg-white/85 flex items-center justify-center border border-gray-200 text-gray-800 transition hover:bg-white"
            >
              <Bookmark size={18} />
            </button>
          </header>

          <div className="surface overflow-hidden rounded-[2.25rem] p-4 sm:p-5">
            <div className="relative aspect-[0.88] overflow-hidden rounded-[1.75rem] bg-[#f0e6d7] lg:aspect-[0.95]">
              <Image
                src={product.images[0]}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 50vw"
                className="object-cover object-top"
                unoptimized
              />
            </div>
          </div>
        </div>

        <div className="surface flex flex-col gap-6 rounded-[2.25rem] p-5 sm:p-6 lg:p-8 lg:self-start">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.22em] text-gray-500">
                Premium selection
              </p>
              <h1 className="max-w-xl text-3xl font-bold tracking-[-0.04em] text-gray-950 sm:text-4xl">
                {product.title}
              </h1>
            </div>
            <div className="flex gap-2 pt-1">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  aria-label={`Select color ${color.name}`}
                  onClick={() => setSelectedColor(color)}
                  className={`color-swatch ${
                    selectedColor.name === color.name ? "active" : ""
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          </div>

          {product.description && (
            <p className="max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
              {product.description}
            </p>
          )}

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { icon: CheckCircle2, label: "Verified fit", value: "Tailored sizing" },
              { icon: ShieldCheck, label: "Secure delivery", value: "Tracked shipping" },
              { icon: Bookmark, label: "Style saved", value: "Wishlist ready" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-[1.5rem] bg-white/70 px-4 py-4">
                <Icon size={18} className="text-orange-500" />
                <p className="mt-3 text-sm font-semibold text-gray-950">{value}</p>
                <p className="mt-1 text-xs text-gray-500">{label}</p>
              </div>
            ))}
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-gray-950 sm:text-base">Size</p>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                Choose your fit
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`size-pill h-11 w-11 sm:h-12 sm:w-12 sm:text-base ${selectedSize === size ? "active" : ""}`}
                  aria-label={`Size ${size}`}
                  aria-pressed={selectedSize === size}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] bg-white/75 p-4 sm:p-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-gray-500">
                  Price
                </p>
                <p className="mt-2 text-4xl font-bold tracking-[-0.04em] text-gray-950">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="btn-primary min-w-[160px] disabled:opacity-70"
              >
                {added ? "Added" : adding ? "Adding..." : "Add To Cart"}
              </button>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
              <CheckCircle2 size={14} className="text-orange-500" />
              Ready for cart, checkout, and large-screen browsing.
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/70 bg-white/90 px-5 py-4 shadow-[0_-12px_40px_rgba(24,16,6,0.08)] backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-2xl items-center gap-4">
          <div>
            <p className="text-2xl font-bold text-gray-950">
              ${product.price.toFixed(2)}
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={adding}
            className="btn-primary flex-1 disabled:opacity-70"
            id="add-to-cart-btn"
          >
            {added ? "Added" : adding ? "Adding..." : "Add To Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
