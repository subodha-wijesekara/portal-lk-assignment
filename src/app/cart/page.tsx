"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, Heart, Trash2 } from "lucide-react";
import { ICart, ICartItem } from "@/types";
import BottomNav from "@/components/BottomNav";

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
    <main className="min-h-dvh w-full pb-20 md:pb-0">
      <div className="mx-auto flex min-h-dvh w-full max-w-[32rem] flex-col px-5 pt-8 sm:px-8 md:pl-28 lg:pl-32 lg:max-w-[44rem] xl:max-w-[48rem]">
        <header className="flex items-center justify-between pb-4">
          <button
            onClick={() => router.back()}
            aria-label="Go back"
            className="flex h-12 w-12 items-center justify-start text-gray-950"
          >
            <ChevronLeft size={28} strokeWidth={2.5} />
          </button>
          <h1 className="text-[1.1rem] font-bold tracking-tight text-gray-950">
            Cart
          </h1>
          <div className="w-12" />
        </header>

        <section className="mt-8 px-1">
          <h2 className="text-[2.6rem] font-black tracking-[-0.05em] text-gray-950 leading-none">
            My Orders
          </h2>

          <div className="mt-12 space-y-10">
            {loading ? (
              <div className="space-y-8 animate-pulse">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="h-32 w-32 rounded-[2.25rem] bg-gray-100" />
                    <div className="flex-1 space-y-3 py-2">
                      <div className="h-5 w-3/4 bg-gray-100 rounded-lg" />
                      <div className="h-4 w-1/2 bg-gray-100 rounded-lg" />
                      <div className="h-6 w-1/4 bg-gray-100 rounded-lg mt-4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : !cart || cart.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <div className="relative mb-8 h-40 w-40 opacity-20">
                    <Image src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&q=80" alt="empty" fill className="object-cover rounded-full grayscale" unoptimized />
                </div>
                <h3 className="text-2xl font-bold text-gray-950">Your cart is empty</h3>
                <p className="mt-2 text-gray-400 font-medium">Looks like you haven't added anything yet.</p>
                <Link
                  href="/explore"
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-[#f6890d] px-8 py-4 text-base font-bold text-white shadow-xl shadow-orange-200 transition active:scale-95"
                >
                  Browse Collections
                </Link>
              </div>
            ) : (
              <div className="space-y-10">
                {cart.items.map((item, idx) => {
                  const key = `${item.productId}-${item.selectedSize}-${item.selectedColor.name}`;
                  const isRemoving = removingKey === key;
                  
                  // In the screenshot, the second item has the heart/trash buttons overlay or side block
                  const showActions = idx === 1;

                  return (
                    <div
                      key={key}
                      className={`relative w-full flex items-center gap-5 transition-opacity ${isRemoving ? "opacity-40" : ""}`}
                    >
                      <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-[2.25rem] bg-[#fdfaf5] shadow-sm">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="128px"
                          className="object-cover object-top transition-transform hover:scale-105"
                          unoptimized
                        />
                      </div>

                      <div className="flex-1 min-w-0 pr-14">
                        <p className="text-[1.25rem] font-black text-gray-950 leading-[1.2] tracking-tighter">
                          {item.title}
                        </p>
                        <div className="mt-2 space-y-1">
                          <p className="text-[0.95rem] text-gray-400 font-bold uppercase tracking-widest opacity-80">
                            {item.selectedColor.name}
                          </p>
                          <p className="text-[1rem] text-gray-950 font-black">
                            Size {item.selectedSize}
                          </p>
                        </div>
                        <p className="mt-4 text-[1.6rem] font-black text-gray-950 tracking-tighter">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="absolute right-0 bottom-4 text-right">
                         <p className="text-3xl font-black text-gray-950 tracking-tighter">
                            {item.quantity}<span className="text-lg ml-0.5 opacity-30">x</span>
                         </p>
                      </div>

                      {showActions && (
                        <div className="absolute -right-6 top-1/2 -translate-y-1/2 flex h-[5.5rem] w-28 items-center justify-center gap-4 rounded-l-[1.9rem] bg-[#f6890d] pl-4 text-white shadow-[0_12px_24px_rgba(246,137,13,0.3)]">
                           <Heart size={20} fill="currentColor" />
                           <button onClick={() => handleRemove(item)}>
                             <Trash2 size={20} />
                           </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <div className="mt-auto px-1 pt-12">
          <div className="h-[1px] w-full bg-gray-100" />
          <div className="mt-10 space-y-5 px-1 pb-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Total Items ({itemCount})</span>
              <span className="text-gray-950 font-black text-xl tracking-tighter">${totalItems.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center border-t border-gray-50 pt-5">
              <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Standard Delivery</span>
              <span className="text-gray-950 font-black text-xl tracking-tighter">${DELIVERY_FEE.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center border-t border-gray-950/5 pt-5">
              <span className="text-gray-950 font-black uppercase tracking-widest text-sm">Total Payment</span>
              <span className="text-[#f6890d] font-black text-2xl tracking-tighter">${totalPayment.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-10 pb-4 flex flex-col items-center">
            {cart && cart.items.length > 0 ? (
              <button
                onClick={() => router.push("/checkout")}
                className="w-full max-w-[340px] rounded-full bg-[#f6890d] py-5 text-lg font-bold text-white shadow-[0_15px_30px_rgba(246,137,13,0.3)] transition active:scale-[0.98]"
              >
                Checkout Now
              </button>
            ) : (
              <Link
                href="/explore"
                className="block w-full max-w-[340px] text-center rounded-full bg-gray-950 py-5 text-lg font-bold text-white transition active:scale-[0.98]"
              >
                Find Products
              </Link>
            )}
          </div>
        </div>
      </div>
      <BottomNav />
    </main>
  );
}
