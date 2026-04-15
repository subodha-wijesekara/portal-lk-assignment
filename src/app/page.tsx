import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BadgeCheck, Sparkles, Truck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FashionHub — Find The Best Collections",
  description:
    "Get your dream item easily with FashionHub and get other interesting offers.",
};

export default function SplashPage() {
  return (
    <main className="page-shell home-shell min-h-dvh">
      {/* ── Mobile splash (no card — uses page background) ── */}
      <section className="flex min-h-dvh w-full flex-col lg:hidden">
        {/* Hero photo — 50% of viewport height */}
        <div className="relative h-[50vh] w-full overflow-hidden rounded-[2rem] bg-[#e8e0d5]">
          <Image
            src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80"
            alt="Fashion model in stylish outfit"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
            unoptimized
          />
        </div>

        {/* Text + buttons — remaining 50% */}
        <div className="flex flex-1 flex-col justify-center px-6 py-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
            New Season · 2026
          </p>
          <h1 className="text-[2.4rem] font-extrabold leading-[1.05] tracking-[-0.05em] text-gray-950">
            Find The Best
            <br />
            Collections
          </h1>
          <p className="mt-3 max-w-[18rem] text-sm leading-[1.6] text-gray-500">
            Get your dream item easily with FashionHub and get other interesting offer.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <Link href="/explore" className="btn-outline">
              Sign Up
            </Link>
            <Link href="/explore" className="btn-primary">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* ── Desktop hero (two-column layout) ── */}
      <div className="hidden min-h-dvh items-center lg:flex">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
          <section className="space-y-7">
            <div className="space-y-4">
              <h1 className="max-w-xl text-5xl font-bold leading-[0.95] tracking-[-0.04em] text-gray-950 sm:text-6xl xl:text-7xl">
                Find The Best Collections
              </h1>
              <p className="max-w-lg text-base leading-7 text-gray-600 sm:text-lg">
                Get your dream item easily with FashionHub and explore curated
                looks that feel made for the season, the city, and big-screen
                browsing.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { icon: BadgeCheck, label: "Curated edits", value: "120+" },
                { icon: Truck, label: "Fast delivery", value: "7 days" },
                { icon: Sparkles, label: "Fresh drops", value: "Weekly" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="surface rounded-[1.5rem] p-4">
                  <Icon size={18} className="text-orange-500" />
                  <p className="mt-3 text-sm font-semibold text-gray-950">{value}</p>
                  <p className="mt-1 text-xs text-gray-500">{label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:max-w-lg">
              <Link href="/explore" className="btn-outline sm:flex-1">
                Sign Up
              </Link>
              <Link href="/explore" className="btn-primary sm:flex-1">
                Sign In
              </Link>
            </div>
          </section>

          <section className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
            <div className="surface relative overflow-hidden rounded-[2.25rem] border border-white/80 p-4 sm:p-5">
              <div className="relative aspect-[0.82] overflow-hidden rounded-[1.8rem] bg-[#e6ddcf]">
                <Image
                  src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80"
                  alt="Fashion model in stylish outfit"
                  fill
                  priority
                  sizes="(max-width: 1024px) 92vw, 50vw"
                  className="object-cover object-top"
                  unoptimized
                />
              </div>

              <div className="absolute bottom-6 left-6 right-6 z-10 grid gap-3 rounded-[1.5rem] bg-white/90 p-4 shadow-2xl backdrop-blur sm:grid-cols-[1fr_auto] sm:items-end">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-gray-500">
                    Featured style
                  </p>
                  <h2 className="mt-2 text-lg font-semibold text-gray-950">
                    Premium tailoring for the new season
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Built to look sharp on mobile and cinematic on big screens.
                  </p>
                </div>
                <Link
                  href="/explore"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                  Explore
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
