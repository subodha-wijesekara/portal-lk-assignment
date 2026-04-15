"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Clock } from "lucide-react";
import Image from "next/image";
import { ICart } from "@/types";

const DELIVERY_FEE = 12;

const PAYMENT_METHODS = [
  { id: "VISA", name: "Visa", icon: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" },
  { id: "AMEX", name: "Amex", icon: "https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" },
  { id: "MASTERCARD", name: "Mastercard", icon: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" },
  { id: "PAYPAL", name: "PayPal", icon: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" },
  { id: "APPLE_PAY", name: "Apple Pay", icon: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<ICart | null>(null);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = useCallback(async () => {
    try {
      const res = await fetch("/api/cart");
      const data = await res.json();
      setCart(data.cart);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handlePayNow = async () => {
    setPlacing(true);
    setError(null);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deliveryAddress: "25/3 Housing Estate, Sylhet",
          paymentMethod: "VISA", // Defaulting for simple UI
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to place order");
      setOrderId(data.orderId);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setPlacing(false);
    }
  };

  const totalItemsPrice = cart?.items.reduce((sum, item) => sum + item.price * item.quantity, 0) ?? 0;
  const itemCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
  const totalPayment = totalItemsPrice + DELIVERY_FEE;

  if (orderId) {
    return (
      <main className="min-h-dvh bg-white flex items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Order Placed</h2>
          <p className="mt-2 text-gray-500">Your order #{orderId} is confirmed.</p>
          <button
            onClick={() => router.push("/explore")}
            className="mt-8 w-full rounded-full bg-[#f97316] py-4 text-white font-medium"
          >
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-white text-gray-900 mx-auto max-w-md relative pb-10">
      {/* Header */}
      <header className="flex items-center justify-between px-6 pt-10 pb-6 rounded-t-3xl">
        <button
          onClick={() => router.back()}
          aria-label="Go back"
          className="text-gray-900 -ml-2 p-2"
        >
          <ChevronLeft size={24} strokeWidth={1.5} />
        </button>
        <h1 className="text-base font-normal tracking-wide text-gray-900 mr-2">
          Checkout
        </h1>
        <div className="w-6" /> {/* Spacer to align title to true center relative to icons */}
      </header>

      <div className="px-6 flex flex-col space-y-7 mt-2">
        {/* Delivery Address */}
        <section className="space-y-4">
          <h2 className="text-[13px] font-normal text-gray-400">
            Delivery Address
          </h2>
          <div className="flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                <Image 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&q=80" 
                  alt="Map" fill className="object-cover opacity-80" unoptimized
                />
              </div>
              <div className="flex flex-col">
                <p className="text-[15px] font-semibold text-gray-900 leading-snug">
                  25/3 Housing Estate,<br />Sylhet
                </p>
              </div>
            </div>
            <button className="text-[14px] font-normal text-gray-400 -mt-5">
              Change
            </button>
          </div>
          
          <div className="flex items-center gap-2.5 pt-1">
            <Clock size={16} strokeWidth={1.5} className="text-gray-500" />
            <p className="text-[14.5px] font-medium text-gray-700">Delivered in next 7 days</p>
          </div>
        </section>

        {/* Payment Method */}
        <section className="space-y-4 pt-2">
          <h2 className="text-[13px] font-normal text-gray-400">
            Payment Method
          </h2>
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar pt-1 pb-1">
            {PAYMENT_METHODS.map((method) => (
              <div key={method.id} className="shrink-0 flex items-center justify-center">
                <img 
                   src={method.icon} 
                   alt={method.name} 
                   className="h-[18px] w-auto object-contain" 
                   style={method.id === "APPLE_PAY" ? { filter: 'invert(1)', mixBlendMode: 'difference'} : {}}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Add Voucher Button */}
        <section className="pt-2">
          <button className="w-full flex items-center justify-center rounded-[14px] bg-[#f8f9fa] py-4 text-[14px] font-medium text-gray-500 hover:bg-gray-100 transition-colors">
            Add Voucher
          </button>
        </section>

        {/* Note Area */}
        <section className="pt-2">
          <p className="text-[14px] leading-relaxed font-normal text-gray-400">
            <span className="text-[#e12a20] font-medium">Note : </span> 
            Use your order id at the payment. Your Id <span className="font-semibold text-gray-600">#154619</span> if you forget to put your order id we can&apos;t confirm the payment.
          </p>
        </section>

        {/* Summary */}
        <section className="pt-6 space-y-[18px]">
          <div className="flex items-center justify-between text-[15px]">
            <span className="font-normal text-gray-400">Total Items ({itemCount})</span>
            <span className="font-bold text-gray-900">${totalItemsPrice.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-[15px]">
            <span className="font-normal text-gray-400">Standard Delivery</span>
            <span className="font-bold text-gray-900">${DELIVERY_FEE.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-[15px] pt-2">
            <span className="font-normal text-gray-400">Total Payment</span>
            <span className="font-bold text-gray-900">${totalPayment.toFixed(2)}</span>
          </div>
        </section>

        {/* Action Button */}
        <section className="pt-10 pb-10 flex flex-col items-center">
          {error && <p className="mb-4 text-center text-sm font-semibold text-red-500">{error}</p>}
          <button
            onClick={handlePayNow}
            disabled={placing || loading || !cart || cart.items.length === 0}
            className="w-full max-w-[340px] flex items-center justify-center rounded-[2rem] bg-[#f6890d] py-4 text-[1.1rem] font-bold text-white transition-all active:bg-[#e07510] disabled:opacity-50"
          >
            {placing ? "Processing..." : "Pay Now"}
          </button>
        </section>
      </div>
    </main>
  );
}
