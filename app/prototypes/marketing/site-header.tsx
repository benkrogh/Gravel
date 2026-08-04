"use client";

import Link from "next/link";
import { useState } from "react";
import { List, X } from "@phosphor-icons/react";

const navLinks = [
  { label: "Product", href: "#product" },
  { label: "Pricing", href: "#pricing" },
  { label: "Customers", href: "#customers" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[16px] border border-white/30 bg-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-md backdrop-saturate-125">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/25 via-white/10 to-white/5" />

          <div className="relative flex items-center justify-between gap-6 px-5 py-3.5 sm:px-7">
            <Link href="/prototypes/marketing" className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-xl bg-cta text-sm font-bold text-white">
                G
              </span>
              <span className="text-lg font-semibold tracking-tight text-text-primary">
                Gravel
              </span>
            </Link>

            <nav className="hidden items-center gap-8 lg:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-neutral-700 transition-colors hover:text-text-primary"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden items-center gap-2 lg:flex">
              <a
                href="#login"
                className="rounded-full px-4 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:text-text-primary"
              >
                Log in
              </a>
              <a
                href="#get-started"
                className="rounded-full bg-cta px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-cta-hover"
              >
                Get started
              </a>
            </div>

            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
              className="flex size-9 items-center justify-center rounded-full text-text-primary transition-colors hover:bg-white/50 lg:hidden"
            >
              {menuOpen ? <X size={20} /> : <List size={20} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="relative mt-2 overflow-hidden rounded-[16px] border border-white/30 bg-white/25 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-md backdrop-saturate-125 lg:hidden">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/25 via-white/10 to-white/5" />
            <nav className="relative flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-white/60 hover:text-text-primary"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-1 flex flex-col gap-2 border-t border-neutral-900/10 pt-3">
                <a
                  href="#login"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-neutral-700"
                >
                  Log in
                </a>
                <a
                  href="#get-started"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full bg-cta px-4 py-3 text-center text-sm font-medium text-white"
                >
                  Get started free
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
