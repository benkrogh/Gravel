"use client";

import type { InvoiceStatus } from "./billing-data";

export type StatusFilterValue = InvoiceStatus | "all";

const filters: { id: StatusFilterValue; label: string }[] = [
  { id: "all", label: "All" },
  { id: "draft", label: "Draft" },
  { id: "sent", label: "Sent" },
  { id: "overdue", label: "Overdue" },
  { id: "partial", label: "Partial" },
  { id: "paid", label: "Paid" },
];

interface StatusFilterProps {
  value: StatusFilterValue;
  onChange: (value: StatusFilterValue) => void;
}

export function StatusFilter({ value, onChange }: StatusFilterProps) {
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
