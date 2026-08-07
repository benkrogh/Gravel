"use client";

import {
  ChatCircle,
  House,
  Invoice,
  ClipboardText,
  type Icon,
} from "@phosphor-icons/react";

type Tab = "home" | "jobs" | "billing" | "chat";

const tabs: {
  id: Tab;
  label: string;
  icon: Icon;
  notify?: boolean;
}[] = [
  { id: "home", label: "Home", icon: House },
  { id: "jobs", label: "Jobs", icon: ClipboardText },
  { id: "billing", label: "Billing", icon: Invoice },
  { id: "chat", label: "Chat", icon: ChatCircle, notify: true },
];

export function BottomNav({ active = "billing" }: { active?: Tab }) {
  return (
    <nav className="absolute inset-x-0 bottom-0 z-40 px-4 pb-[max(1.5rem,env(safe-area-inset-bottom,0px))]">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/50 bg-white/45 p-2 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-2xl backdrop-saturate-150">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/60 via-white/20 to-white/10" />
        <div className="relative flex items-center justify-around">
          {tabs.map(({ id, label, icon: IconComponent, notify }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                type="button"
                aria-label={label}
                aria-current={isActive ? "page" : undefined}
                className={`relative flex size-12 items-center justify-center rounded-2xl transition-all duration-200 active:scale-95 ${
                  isActive
                    ? "bg-white/70 text-text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_2px_8px_rgba(0,0,0,0.06)] ring-1 ring-white/60 backdrop-blur-md"
                    : "text-neutral-600"
                }`}
              >
                <IconComponent
                  size={24}
                  weight={isActive ? "fill" : "regular"}
                />
                {notify && (
                  <span className="absolute right-2.5 top-2 size-2 rounded-full bg-status-notification ring-2 ring-white/80" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
