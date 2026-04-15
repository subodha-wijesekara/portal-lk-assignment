"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { IProduct } from "@/types";

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product._id}`} className="product-card group block">
      <div className="relative w-full aspect-[0.78] overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 48vw, (max-width: 1024px) 33vw, 22vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/30 via-black/0 to-transparent" />
        <button
          aria-label={`Open ${product.title}`}
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `/products/${product._id}`;
          }}
          className="absolute bottom-3 right-3 w-9 h-9 bg-gray-900 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-gray-700 transition-all"
        >
          <ShoppingCart size={16} />
        </button>
      </div>
      <div className="p-3 pb-4">
        <p className="text-base font-semibold text-gray-900">
          ${product.price.toFixed(2)}
        </p>
        <p className="text-sm text-gray-500 truncate">{product.title}</p>
      </div>
    </Link>
  );
}
