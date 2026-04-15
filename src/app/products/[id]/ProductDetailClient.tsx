"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, Bookmark } from "lucide-react";
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
    <main className="min-h-dvh bg-white px-6 pb-8 pt-4 sm:px-8">
      <div className="mx-auto flex min-h-[calc(100dvh-3rem)] w-full max-w-[26rem] flex-col bg-white">
        <header className="flex items-center justify-between pb-2">
          <button
            onClick={() => router.back()}
            aria-label="Go back"
            className="flex h-12 w-12 items-center justify-start text-gray-950"
          >
            <ChevronLeft size={28} strokeWidth={2.5} />
          </button>
          <h1 className="text-[1.1rem] font-bold tracking-tight text-gray-950">
            Details
          </h1>
          <button
            aria-label="Save product"
            className="flex h-12 w-12 items-center justify-end text-gray-950"
          >
            <Bookmark size={24} strokeWidth={2.2} />
          </button>
        </header>

        <div className="mt-4 relative overflow-hidden rounded-[2.75rem] bg-[#f0e7d9] shadow-sm">
          <div className="relative aspect-[0.88] w-full">
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              priority
              sizes="(max-width: 640px) 100vw, 420px"
              className="object-cover object-top"
              unoptimized
            />
          </div>
          <div className="pointer-events-none absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/10 px-2.5 py-1.5 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
            <span className="h-1.5 w-8 rounded-full bg-white" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-start justify-between gap-x-4 gap-y-3 px-1">
          <h2 className="flex-1 text-[2rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-gray-950 sm:text-[2.25rem]">
            {product.title}
          </h2>

          <div className="flex shrink-0 items-center gap-2.5 pt-2">
            {product.colors.map((color) => {
              const isSelected = selectedColor.name === color.name;

              return (
                <button
                  key={color.name}
                  type="button"
                  aria-label={`Select color ${color.name}`}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedColor(color)}
                  className={`flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-200 ${
                    isSelected
                      ? "border-gray-950 ring-2 ring-white ring-offset-2 ring-offset-gray-900 shadow-md scale-110"
                      : "border-gray-200 hover:scale-105"
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              );
            })}
          </div>
        </div>

        <section className="mt-10 px-1">
          <p className="text-xl font-extrabold tracking-tight text-gray-950">
            Size
          </p>
          <div className="mt-6 flex items-center justify-between gap-2">
            {product.sizes.map((size) => {
              const isSelected = selectedSize === size;

              return (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex h-14 w-14 items-center justify-center rounded-[1.25rem] text-lg font-bold transition-all duration-300 ${
                    isSelected
                      ? "bg-gray-950 text-white shadow-[0_12px_24px_rgba(0,0,0,0.25)] scale-105"
                      : "bg-white text-gray-400 border border-gray-100/50 hover:text-gray-900"
                  }`}
                  aria-label={`Size ${size}`}
                  aria-pressed={isSelected}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </section>

        <div className="mt-auto flex items-center justify-between gap-6 px-1 pt-12 pb-2">
          <p className="text-[2.1rem] font-extrabold tracking-tighter text-gray-950">
            ${product.price.toFixed(2)}
          </p>
          <button
            onClick={handleAddToCart}
            disabled={adding}
            className="flex flex-1 max-w-[15rem] items-center justify-center rounded-[1.75rem] bg-[#f6890d] py-4.5 text-lg font-bold text-white shadow-[0_15px_30px_rgba(246,137,13,0.3)] transition-all active:scale-[0.96] disabled:opacity-70"
            id="add-to-cart-btn"
          >
            {added ? "Added" : adding ? "Adding..." : "Add To Cart"}
          </button>
        </div>
      </div>
    </main>
  );
}
