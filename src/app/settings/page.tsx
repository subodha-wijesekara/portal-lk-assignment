import BottomNav from "@/components/BottomNav";
import { ChevronRight, UserCircle2, User, Bell, Globe, Shield, HelpCircle, Info } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings — FashionHub",
};

export default function SettingsPage() {
  const settings = [
    { label: "Account", icon: User },
    { label: "Notifications", icon: Bell },
    { label: "Language", icon: Globe },
    { label: "Privacy & Security", icon: Shield },
    { label: "Help & Support", icon: HelpCircle },
    { label: "About FashionHub", icon: Info },
  ];

  return (
    <div className="page-shell min-h-dvh lg:pl-32">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start">
        <aside className="surface rounded-[2.25rem] p-5 sm:p-6 lg:sticky lg:top-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-orange-50 text-orange-500">
              <UserCircle2 size={28} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-gray-500">
                Profile
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-[-0.04em] text-gray-950">
                Settings
              </h1>
              <p className="mt-1 text-sm text-gray-500">FashionHub user</p>
            </div>
          </div>

          <div className="mt-6 rounded-[1.75rem] bg-white/75 p-4 text-sm text-gray-600">
            Keep account, notification, and support actions within easy reach on
            larger screens.
          </div>
        </aside>

        <section className="surface rounded-[2.25rem] p-4 sm:p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-gray-500">
            Preferences
          </p>
          <div className="mt-4 divide-y divide-gray-100 overflow-hidden rounded-[1.75rem] bg-white/70">
            {settings.map(({ label, icon: Icon }) => (
              <button
                key={label}
                className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-white"
                aria-label={label}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-[#f97316]">
                  <Icon size={19} strokeWidth={2} />
                </span>
                <span className="text-sm font-medium text-gray-800">{label}</span>
                <ChevronRight className="ml-auto text-gray-400" size={16} />
              </button>
            ))}
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  );
}
