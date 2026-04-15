"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
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
    <Link href={`/products/${product._id}`} className="product-card group block">
      {/*
        Wrap image + button in a relative container WITHOUT overflow-hidden.
        The card itself (.product-card) has overflow:hidden which clips top image corners.
        Removing overflow-hidden here prevents the rounded card from clipping the cart button.
      */}
      <div className={`relative w-full ${imageClass}`}>
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 48vw, (max-width: 1024px) 33vw, 22vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />
        <button
          aria-label={`Add ${product.title} to cart`}
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `/products/${product._id}`;
          }}
          className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white shadow-lg transition hover:bg-gray-700"
        >
          <ShoppingCart size={15} />
        </button>
      </div>

      <div className="px-3 pb-4 pt-2">
        <p className="text-[0.95rem] font-semibold text-gray-900">
          ${product.price.toFixed(2)}
        </p>
        <p className="mt-0.5 text-[0.82rem] text-gray-500 truncate">{product.title}</p>
      </div>
    </Link>
  );
}
