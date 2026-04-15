"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, ShoppingCart, Settings, User } from "lucide-react";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Search", href: "/search", icon: Search },
  { label: "Cart", href: "/cart", icon: ShoppingCart },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      <div className="nav-brand" aria-hidden="true">
        FH
      </div>
      {navItems.map(({ label, href, icon: Icon }) => {
        const isActive =
          href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`nav-item ${isActive ? "active" : ""}`}
            aria-label={label}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
            <span>{label}</span>
          </Link>
        );
      })}
      
      {/* Profile Icon for Desktop Sidebar */}
      <div className="hidden md:flex mt-auto w-full items-center justify-center pt-4 pb-8">
        <button className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-gray-900 border-[1.5px] border-gray-900 text-white transition-colors hover:bg-gray-800">
          <span className="text-sm font-semibold tracking-wider">U</span>
        </button>
      </div>
    </nav>
  );
}
