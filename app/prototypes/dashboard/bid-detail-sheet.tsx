"use client";

import { X } from "@phosphor-icons/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Bid } from "./bid-data";

interface BidDetailSheetProps {
  bid: Bid;
  onClose: () => void;
}

const SHEET_EASING = "cubic-bezier(0.32, 0.72, 0, 1)";
const ANIMATION_MS = 420;

export function BidDetailSheet({ bid, onClose }: BidDetailSheetProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    window.setTimeout(onClose, ANIMATION_MS);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => setIsOpen(true));
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <button
        type="button"
        aria-label="Close bid details"
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        style={{
          opacity: isOpen ? 1 : 0,
          transitionDuration: `${ANIMATION_MS}ms`,
          transitionTimingFunction: SHEET_EASING,
        }}
        onClick={handleClose}
      />

      <div
        className="relative flex max-h-[94dvh] flex-col overflow-hidden rounded-t-[1.75rem] bg-bg-default shadow-[0_-8px_40px_rgba(0,0,0,0.15)]"
        style={{
          transform: isOpen ? "translateY(0)" : "translateY(100%)",
          transition: `transform ${ANIMATION_MS}ms ${SHEET_EASING}`,
        }}
      >
        <div className="relative h-52 shrink-0">
          <Image
            src={bid.image}
            alt={bid.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

          <button
            type="button"
            aria-label="Close"
            onClick={handleClose}
            className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md"
          >
            <X size={18} weight="bold" />
          </button>

          <div className="absolute bottom-0 left-0 p-5">
            <h2 className="text-2xl font-semibold text-white">{bid.title}</h2>
            <p className="mt-1 text-sm text-white/80">{bid.range}</p>
          </div>
        </div>

        <div className="mx-auto mb-2 mt-2 h-1 w-10 shrink-0 rounded-full bg-neutral-300" />

        <div className="flex-1 space-y-4 overflow-y-auto px-4 pb-4">
          <section className="rounded-3xl border border-neutral-200 bg-bg-elevated p-4">
            <p className="text-sm leading-relaxed text-text-secondary">{bid.summary}</p>

            <dl className="mt-5 space-y-4">
              <DetailItem label="Address" value={bid.address} />
              <DetailItem label="Budget" value={bid.budget} />
              <DetailItem label="Timeline" value={bid.timeline} />
              <DetailItem label="Proposal due" value={bid.proposalDue} highlight />
            </dl>
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-bg-elevated p-4">
            <h3 className="text-sm font-semibold text-text-primary">Materials & finishes</h3>
            <p className="mt-1 text-xs text-text-tertiary">Estimated material costs</p>

            <ul className="mt-4 space-y-4">
              {bid.materials.map((material) => (
                <li
                  key={material.label}
                  className="border-t border-neutral-100 pt-4 first:border-t-0 first:pt-0"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-medium text-text-primary">{material.label}</p>
                    <p className="shrink-0 text-sm font-medium text-brand-secondary">
                      {material.estimatedCost}
                    </p>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                    {material.description}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="shrink-0 border-t border-border-default bg-bg-default px-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))] pt-4">
          <button
            type="button"
            className="w-full rounded-2xl bg-cta py-4 text-base font-semibold text-white transition-colors hover:bg-cta-hover active:scale-[0.98]"
          >
            Start bid
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailItem({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-text-tertiary">
        {label}
      </dt>
      <dd
        className={`mt-1 font-medium text-text-primary ${highlight ? "text-brand-secondary" : ""}`}
      >
        {value}
      </dd>
    </div>
  );
}
