"use client";

import { useState } from "react";
import { ChatIcon, ClipboardIcon, HardHatIcon, HomeIcon } from "./icons";

type Tab = "home" | "jobs" | "crew" | "chat";

const tabs: { id: Tab; label: string; icon: typeof HomeIcon; notify?: boolean }[] = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "jobs", label: "Jobs", icon: ClipboardIcon },
  { id: "crew", label: "Crew", icon: HardHatIcon },
  { id: "chat", label: "Chat", icon: ChatIcon, notify: true },
];

export function BottomNav() {
  const [active, setActive] = useState<Tab>("home");

  return (
    <nav className="absolute inset-x-0 bottom-0 px-5 pb-6">
      <div className="flex items-center justify-around rounded-[1.75rem] bg-bg-nav px-2 py-2 shadow-[var(--shadow-nav)]">
        {tabs.map(({ id, label, icon: Icon, notify }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
              onClick={() => setActive(id)}
              className={`relative flex size-12 items-center justify-center rounded-2xl transition-colors ${
                isActive ? "bg-neutral-200/80 text-text-primary" : "text-neutral-700"
              }`}
            >
              <Icon className="size-6" />
              {notify && (
                <span className="absolute right-2.5 top-2 size-2 rounded-full bg-status-notification" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
