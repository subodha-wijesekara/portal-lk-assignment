"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, Package } from "lucide-react";
import { IOrder } from "@/types";

const DELIVERY_FEE = 12;

export default function MyOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (data.orders) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <main className="min-h-dvh bg-white px-6 pb-20 pt-4 sm:px-8">
      <div className="mx-auto flex min-h-[calc(100dvh-3rem)] w-full max-w-[26rem] flex-col bg-white">
        <header className="flex items-center justify-between pb-4">
          <button
            onClick={() => router.back()}
            aria-label="Go back"
            className="flex h-12 w-12 items-center justify-start text-gray-950"
          >
            <ChevronLeft size={28} strokeWidth={2.5} />
          </button>
          <h1 className="text-[1.1rem] font-bold tracking-tight text-gray-950">
            Orders
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
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex flex-col gap-4 rounded-[2.25rem] bg-gray-50/50 p-6">
                    <div className="h-6 w-1/3 bg-gray-200 rounded-lg" />
                    <div className="flex gap-4">
                      <div className="h-16 w-16 rounded-2xl bg-gray-200" />
                      <div className="flex-1 space-y-2">
                         <div className="h-4 w-3/4 bg-gray-200 rounded" />
                         <div className="h-4 w-1/2 bg-gray-200 rounded" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : orders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="relative mb-8 h-40 w-40 opacity-20">
                    <Image 
                      src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&q=80" 
                      alt="empty" 
                      fill 
                      className="object-cover rounded-full grayscale" 
                      unoptimized 
                    />
                </div>
                <h3 className="text-2xl font-bold text-gray-950">Your order list is empty</h3>
                <p className="mt-2 text-gray-400 font-medium px-4">Looks like you haven&apos;t placed any orders yet.</p>
                <Link
                  href="/explore"
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-[#f6890d] px-8 py-4 text-base font-bold text-white shadow-xl shadow-orange-200 transition active:scale-95"
                >
                  Browse Collections
                </Link>
              </div>
            ) : (
              <div className="space-y-8">
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="relative overflow-hidden rounded-[2.25rem] bg-[#fdfaf5] p-6 shadow-sm border border-gray-100/50"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Package size={18} className="text-[#f6890d]" />
                        <span className="font-black text-gray-950 tracking-tight uppercase">
                          {order.orderId}
                        </span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[0.65rem] font-black uppercase tracking-widest ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-[#f6890d]'
                      }`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="space-y-4">
                      {order.items.slice(0, 2).map((item, idx) => (
                        <div key={`${order._id}-${idx}`} className="flex gap-4">
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-white">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-950 truncate">{item.title}</p>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                              Size {item.selectedSize}  •  {item.selectedColor.name}
                            </p>
                          </div>
                          <div className="text-right">
                             <p className="text-sm font-black text-gray-950">${item.price.toFixed(2)}</p>
                             <p className="text-xs text-gray-400 font-bold">x{item.quantity}</p>
                          </div>
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <p className="text-xs text-gray-400 font-bold">+ {order.items.length - 2} more items</p>
                      )}
                    </div>

                    <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                      <p className="text-lg font-black text-[#f6890d] tracking-tighter">
                        ${order.totalPayment.toFixed(2)}
                      </p>
                    </div>
                    
                    <Link 
                      href={`/myorders/${order._id}`} 
                      className="absolute inset-0 z-10"
                      aria-label="View order details"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* This section matches the screenshot's bottom summary, shown even when empty */}
        <div className="mt-auto px-1 pt-12">
          <div className="h-[1px] w-full bg-gray-100" />
          <div className="mt-10 space-y-5 px-1 pb-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Total Items ({orders.length})</span>
              <span className="text-gray-950 font-black text-xl tracking-tighter">$0.00</span>
            </div>
            <div className="flex justify-between items-center border-t border-gray-50 pt-5">
              <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Standard Delivery</span>
              <span className="text-gray-950 font-black text-xl tracking-tighter">${DELIVERY_FEE.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center border-t border-gray-950/5 pt-5">
              <span className="text-gray-950 font-black uppercase tracking-widest text-sm">Total Payment</span>
              <span className="text-[#f6890d] font-black text-2xl tracking-tighter">${DELIVERY_FEE.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-10 pb-4">
             <Link
                href="/explore"
                className="block w-full text-center rounded-full bg-gray-950 py-5 text-lg font-bold text-white transition active:scale-[0.98]"
              >
                Find Products
              </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
