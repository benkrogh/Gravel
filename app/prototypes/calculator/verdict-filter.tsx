"use client";

import type { JobVerdict } from "./calculator-data";

export type VerdictFilterValue = JobVerdict | "all";

const filters: { id: VerdictFilterValue; label: string }[] = [
  { id: "all", label: "All" },
  { id: "take", label: "Fits" },
  { id: "tight", label: "Squeeze" },
  { id: "pass", label: "Pass" },
];

interface VerdictFilterProps {
  value: VerdictFilterValue;
  onChange: (value: VerdictFilterValue) => void;
}

export function VerdictFilter({ value, onChange }: VerdictFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto px-4 pb-1">
      {filters.map((filter) => {
        const active = filter.id === value;
        return (
          <button
            key={filter.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(filter.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-95 ${
              active
                ? "bg-cta text-white shadow-[0_4px_12px_rgba(3,4,3,0.22)]"
                : "bg-neutral-100 text-text-secondary"
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
