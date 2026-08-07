"use client";

import { CaretRight } from "@phosphor-icons/react";
import {
  formatCurrency,
  formatDateShort,
  getAmountDue,
  getInvoiceStatus,
  getInvoiceTotal,
  statusMeta,
  type Invoice,
} from "./billing-data";
import type { StatusFilterValue } from "./status-filter";

interface InvoiceListProps {
  invoices: Invoice[];
  filter: StatusFilterValue;
  onSelect: (invoiceId: string) => void;
}

export function InvoiceList({ invoices, filter, onSelect }: InvoiceListProps) {
  const filtered = invoices.filter(
    (invoice) => filter === "all" || getInvoiceStatus(invoice) === filter,
  );

  if (filtered.length === 0) {
    return (
      <div className="mx-4 rounded-3xl border border-dashed border-neutral-200 bg-bg-elevated/60 px-5 py-10 text-center">
        <p className="text-base font-semibold text-text-primary">No invoices</p>
        <p className="mt-1 text-sm text-text-secondary">
          Nothing matches this filter yet.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-3 px-4">
      {filtered.map((invoice, index) => {
        const status = getInvoiceStatus(invoice);
        const meta = statusMeta[status];
        const due = getAmountDue(invoice);
        const total = getInvoiceTotal(invoice);

        return (
          <li
            key={invoice.id}
            style={{
              animation: `schedule-fade-up 420ms cubic-bezier(0.22, 1, 0.36, 1) ${index * 60}ms both`,
            }}
          >
            <button
              type="button"
              onClick={() => onSelect(invoice.id)}
              className="group w-full rounded-3xl border border-neutral-200/80 bg-bg-elevated px-4 py-4 text-left shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-transform duration-150 active:scale-[0.98]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-[17px] font-semibold tracking-tight text-text-primary">
                    {invoice.job}
                  </p>
                  <p className="mt-0.5 truncate text-sm text-text-secondary">
                    {invoice.client}
                  </p>
                </div>
                <CaretRight
                  size={16}
                  weight="bold"
                  className="mt-1 shrink-0 text-neutral-300 transition-colors group-active:text-neutral-400"
                />
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${meta.chip}`}
                >
                  {meta.label}
                </span>
                <span className="text-xs text-text-tertiary">
                  {invoice.number} ·{" "}
                  {status === "draft"
                    ? "Not yet sent"
                    : `Due ${formatDateShort(invoice.dueDate)}`}
                </span>
              </div>

              <div className="mt-3 flex items-end justify-between gap-3 border-t border-neutral-100 pt-3">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wide text-text-tertiary">
                    {status === "paid" ? "Total billed" : "Amount due"}
                  </p>
                  <p className="mt-0.5 text-lg font-semibold tabular-nums text-text-primary">
                    {formatCurrency(status === "paid" ? total : due)}
                  </p>
                </div>
                {status === "partial" ? (
                  <p className="text-sm tabular-nums text-text-secondary">
                    {formatCurrency(total - due)} of {formatCurrency(total)} paid
                  </p>
                ) : null}
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
