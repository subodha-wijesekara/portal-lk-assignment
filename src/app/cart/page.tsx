"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, Heart, Trash2 } from "lucide-react";
import { ICart, ICartItem } from "@/types";

const DELIVERY_FEE = 12;

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<ICart | null>(null);
  const [loading, setLoading] = useState(true);
  const [removingKey, setRemovingKey] = useState<string | null>(null);

  const fetchCart = useCallback(async () => {
    const res = await fetch("/api/cart");
    const data = await res.json();
    setCart(data.cart);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleRemove = async (item: ICartItem) => {
    const key = `${item.productId}-${item.selectedSize}-${item.selectedColor.name}`;
    setRemovingKey(key);
    await fetch(
      `/api/cart?productId=${item.productId}&selectedSize=${item.selectedSize}&colorName=${item.selectedColor.name}`,
      { method: "DELETE" }
    );
    await fetchCart();
    setRemovingKey(null);
  };

  const totalItems =
    cart?.items.reduce((sum, item) => sum + item.price * item.quantity, 0) ?? 0;
  const totalPayment = totalItems + DELIVERY_FEE;
  const itemCount =
    cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  return (
    <div className="page-shell min-h-dvh lg:pl-32">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <section className="space-y-6">
          <header className="surface flex items-center justify-between rounded-[1.75rem] px-4 py-3 sm:px-5">
            <button
              onClick={() => router.back()}
              aria-label="Go back"
              className="w-11 h-11 rounded-full bg-white/85 flex items-center justify-center border border-gray-200 text-gray-800 transition hover:bg-white"
            >
              <ChevronLeft size={20} strokeWidth={2} />
            </button>
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-500">
              Cart
            </span>
            <div className="w-11" />
          </header>

          <div className="surface rounded-[2.25rem] p-5 sm:p-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-gray-500">
                  Checkout preview
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-gray-950">
                  My Orders
                </h2>
              </div>
              <div className="hidden text-right sm:block">
                <p className="text-xs uppercase tracking-[0.22em] text-gray-500">
                  Items
                </p>
                <p className="text-lg font-semibold text-gray-950">{itemCount}</p>
              </div>
            </div>

            <div className="mt-6">
              {loading ? (
                <div className="space-y-4 animate-pulse">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="h-28 rounded-[1.5rem] bg-white/70" />
                  ))}
                </div>
              ) : !cart || cart.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <p className="text-4xl mb-4">🛒</p>
                  <p className="text-gray-500 text-base">Your cart is empty</p>
                  <Link
                    href="/explore"
                    className="mt-6 inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div>
                  {cart.items.map((item) => {
                    const key = `${item.productId}-${item.selectedSize}-${item.selectedColor.name}`;
                    const isRemoving = removingKey === key;
                    return (
                      <div
                        key={key}
                        className={`cart-item transition-opacity ${isRemoving ? "opacity-40" : ""}`}
                      >
                        <div className="relative h-[5.5rem] w-[5.5rem] shrink-0 overflow-hidden rounded-[1.5rem] bg-[#f0ece6]">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="88px"
                            className="object-cover object-top"
                            unoptimized
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-950 leading-tight sm:text-base">
                            {item.title}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            {item.selectedColor.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Size {item.selectedSize}
                          </p>
                          <p className="mt-2 text-sm font-semibold text-gray-950">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>

                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <p className="text-sm font-medium text-gray-700">
                            {item.quantity}x
                          </p>
                          <div className="flex gap-1.5">
                            <button
                              aria-label="Wishlist"
                              className="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 hover:bg-orange-100 transition"
                            >
                              <Heart size={14} />
                            </button>
                            <button
                              aria-label="Remove from cart"
                              onClick={() => handleRemove(item)}
                              disabled={isRemoving}
                              className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white hover:bg-orange-600 transition disabled:opacity-50"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>

        <aside className="space-y-4 lg:sticky lg:top-6">
          <div className="surface rounded-[2.25rem] p-5 sm:p-6">
            <p className="text-xs uppercase tracking-[0.22em] text-gray-500">
              Summary
            </p>
            <div className="mt-5 space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Total Items ({itemCount})</span>
                <span className="font-medium">${totalItems.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Standard Delivery</span>
                <span className="font-medium">${DELIVERY_FEE.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-gray-950 pt-2">
                <span>Total Payment</span>
                <span>${totalPayment.toFixed(2)}</span>
              </div>
            </div>

            {cart && cart.items.length > 0 && (
              <Link href="/checkout" className="btn-primary mt-6 block text-center" id="checkout-btn">
                Checkout Now
              </Link>
            )}
          </div>

          <div className="surface rounded-[2.25rem] p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-gray-500">
              Fast actions
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Keep the cart visible and the checkout action within reach on large
              displays.
            </p>
          </div>
        </aside>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/70 bg-white/90 px-5 py-4 shadow-[0_-12px_40px_rgba(24,16,6,0.08)] backdrop-blur lg:hidden">
        {cart && cart.items.length > 0 ? (
          <Link href="/checkout" className="btn-primary block text-center" id="checkout-btn-mobile">
            Checkout Now
          </Link>
        ) : (
          <div className="h-4" />
        )}
      </div>
    </div>
  );
}
