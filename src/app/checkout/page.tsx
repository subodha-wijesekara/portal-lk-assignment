"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, MapPin, Clock } from "lucide-react";
import { ICart } from "@/types";

const DELIVERY_FEE = 12;

// Payment method logos as simple styled pills
const PAYMENT_METHODS = [
  { id: "VISA", label: "VISA", style: "bg-[#1A1F71] text-white font-bold italic px-3 py-1.5 text-xs rounded" },
  { id: "AMEX", label: "AMEX", style: "bg-[#2671B2] text-white font-bold px-2 py-1.5 text-xs rounded" },
  { id: "MASTERCARD", label: "MC", style: "bg-[#EB001B] text-white font-bold px-2 py-1.5 text-xs rounded" },
  { id: "PAYPAL", label: "PayPal", style: "bg-[#003087] text-white font-bold px-3 py-1.5 text-xs rounded" },
  { id: "APPLE_PAY", label: "Pay", style: "bg-black text-white font-semibold px-3 py-1.5 text-xs rounded flex items-center gap-0.5" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<ICart | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState("VISA");
  const [voucher, setVoucher] = useState("");
  const [placing, setPlacing] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = useCallback(async () => {
    const res = await fetch("/api/cart");
    const data = await res.json();
    setCart(data.cart);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const totalItems =
    cart?.items.reduce((sum, item) => sum + item.price * item.quantity, 0) ?? 0;
  if (orderId) {
    return (
      <div className="page-shell min-h-dvh flex items-center justify-center">
        <div className="surface w-full max-w-2xl rounded-[2.25rem] px-6 py-10 text-center sm:px-10 sm:py-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 text-4xl">
            🎉
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-[-0.04em] text-gray-950">
            Order Placed!
          </h2>
          <p className="mt-3 text-sm text-gray-600">
            Your order has been confirmed and the payment flow is ready for large
            and small screens.
          </p>
          <p className="mt-4 text-sm font-semibold text-gray-700">
            Order ID: <span className="font-bold text-orange-500">{orderId}</span>
          </p>
          <button
            onClick={() => router.push("/explore")}
            className="btn-primary mx-auto mt-8 max-w-xs"
            id="continue-shopping-btn"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell min-h-dvh lg:pl-32">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
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
              Checkout
            </span>
            <div className="w-11" />
          </header>

          <div className="space-y-6 rounded-[2.25rem] bg-transparent">
            <section className="surface rounded-[2rem] p-5 sm:p-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
                Delivery Address
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50">
                    <MapPin size={20} className="text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-950">
                      25/3 Housing Estate, Sylhet
                    </p>
                    <div className="mt-0.5 flex items-center gap-1">
                      <Clock size={12} className="text-gray-400" />
                      <p className="text-xs text-gray-500">
                        Delivered in next 7 days
                      </p>
                    </div>
                  </div>
                </div>
                <button className="text-xs font-semibold text-orange-500 hover:underline">
                  Change
                </button>
              </div>
            </section>

            <section className="surface rounded-[2rem] p-5 sm:p-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
                Payment Method
              </p>
              <div className="flex flex-wrap gap-2">
                {PAYMENT_METHODS.map((pm) => (
                  <button
                    key={pm.id}
                    onClick={() => setSelectedPayment(pm.id)}
                    aria-pressed={selectedPayment === pm.id}
                    aria-label={`Pay with ${pm.label}`}
                    className={`${pm.style} transition-all ${
                      selectedPayment === pm.id
                        ? "ring-2 ring-orange-500 ring-offset-1"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    {pm.id === "APPLE_PAY" ? (
                      <>
                        <span>🍎</span>
                        <span>{pm.label}</span>
                      </>
                    ) : (
                      pm.label
                    )}
                  </button>
                ))}
              </div>
            </section>

            <section className="surface rounded-[2rem] p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Add Voucher"
                  value={voucher}
                  onChange={(e) => setVoucher(e.target.value)}
                  className="flex-1 rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400"
                  aria-label="Voucher code"
                />
                <button className="rounded-2xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600">
                  Apply
                </button>
              </div>
            </section>

            {!loading && cart && cart.items.length > 0 && (
              <div className="surface rounded-[2rem] border border-red-100 bg-red-50/70 px-4 py-4 text-sm text-red-700">
                <span className="font-bold">Note:</span> Use your order id at the
                payment. It appears after placing the order.
              </div>
            )}
          </div>
        </section>

        <aside className="space-y-4 lg:sticky lg:top-6">
          <div className="surface rounded-[2.25rem] p-5 sm:p-6">
            <p className="text-xs uppercase tracking-[0.22em] text-gray-500">
              Order Summary
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

            {error && (
              <p className="mt-4 text-center text-sm text-red-500">{error}</p>
            )}

            <button
              onClick={handlePayNow}
              disabled={placing || loading || !cart || cart.items.length === 0}
              className="btn-primary mt-6 disabled:opacity-60"
              id="pay-now-btn"
            >
              {placing ? "Processing..." : "Pay Now"}
            </button>
          </div>

          <div className="surface rounded-[2rem] p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-gray-500">
              Secure checkout
            </p>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Payment controls sit beside the order summary on desktop, while mobile
              keeps the pay action pinned close to your thumb.
            </p>
          </div>
        </aside>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/70 bg-white/90 px-5 py-4 shadow-[0_-12px_40px_rgba(24,16,6,0.08)] backdrop-blur lg:hidden">
        <button
          onClick={handlePayNow}
          disabled={placing || loading || !cart || cart.items.length === 0}
          className="btn-primary disabled:opacity-60"
          id="pay-now-btn-mobile"
        >
          {placing ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
          <div className="flex justify-between text-sm text-gray-600">
            <span>Standard Delivery</span>
            <span className="font-medium">${DELIVERY_FEE.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base font-bold text-gray-900 pt-1">
            <span>Total Payment</span>
            <span>${totalPayment.toFixed(2)}</span>
          </div>
        </section>

        {error && (
          <p className="mt-4 text-red-500 text-sm text-center">{error}</p>
        )}
      </div>

      {/* Pay Now button */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-100 px-5 py-4">
        <button
          onClick={handlePayNow}
          disabled={placing || loading || !cart || cart.items.length === 0}
          className="btn-primary disabled:opacity-60"
          id="pay-now-btn"
        >
          {placing ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
}
