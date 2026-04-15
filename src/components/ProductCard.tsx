"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { IProduct } from "@/types";

interface ProductCardProps {
  product: IProduct;
  imageClass?: string;
}

export default function ProductCard({
  product,
  imageClass = "aspect-[0.78]",
}: ProductCardProps) {
  return (
    <Link href={`/products/${product._id}`} className="group block relative mb-2">
      <div className="relative">
        {/* The Image Container */}
        <div className={`relative w-full ${imageClass} overflow-hidden rounded-[24px]`}>
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 48vw, (max-width: 1024px) 33vw, 22vw"
            className="object-cover object-top transition-transform duration-500"
            unoptimized
          />
        </div>
        
        {/* Overlapping Cart Button */}
        <button
          aria-label={`Add ${product.title} to cart`}
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `/products/${product._id}`;
          }}
          className="absolute -bottom-4 right-1 flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#111111] text-white border-[5px] border-white z-10 transition-transform active:scale-95"
        >
          <ShoppingBag size={15} strokeWidth={2.5} className="mt-0.5" />
        </button>
      </div>

      <div className="pt-4 pr-4">
        <p className="text-[15px] font-bold tracking-tight text-gray-900 leading-none">
          ${product.price.toFixed(2)}
        </p>
        <p className="mt-1 text-[13px] text-gray-500 font-normal truncate leading-tight">
          {product.title}
        </p>
      </div>
    </Link>
  );
}
