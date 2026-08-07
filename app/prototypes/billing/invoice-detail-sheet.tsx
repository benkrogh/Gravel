"use client";

import { CheckCircle, X } from "@phosphor-icons/react";
import { useCallback, useEffect, useState } from "react";
import {
  formatCurrency,
  formatDate,
  formatDateShort,
  getAmountDue,
  getAmountPaid,
  getInvoiceStatus,
  getInvoiceTotal,
  statusMeta,
  type Invoice,
} from "./billing-data";

interface InvoiceDetailSheetProps {
  invoice: Invoice;
  onClose: () => void;
  onSend: (invoiceId: string) => void;
  onRecordPayment: (invoiceId: string) => void;
}

const SHEET_EASING = "cubic-bezier(0.32, 0.72, 0, 1)";
const ANIMATION_MS = 420;

export function InvoiceDetailSheet({
  invoice,
  onClose,
  onSend,
  onRecordPayment,
}: InvoiceDetailSheetProps) {
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

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClose]);

  const status = getInvoiceStatus(invoice);
  const meta = statusMeta[status];
  const total = getInvoiceTotal(invoice);
  const paid = getAmountPaid(invoice);
  const due = getAmountDue(invoice);
  const paidRatio = total > 0 ? Math.min(paid / total, 1) : 0;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <button
        type="button"
        aria-label="Close invoice details"
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        style={{
          opacity: isOpen ? 1 : 0,
          transitionDuration: `${ANIMATION_MS}ms`,
          transitionTimingFunction: SHEET_EASING,
        }}
        onClick={handleClose}
      />

      <div
        className="relative flex max-h-[92dvh] flex-col overflow-hidden rounded-t-[1.75rem] bg-bg-default shadow-[0_-8px_40px_rgba(0,0,0,0.15)]"
        style={{
          transform: isOpen ? "translateY(0)" : "translateY(100%)",
          transition: `transform ${ANIMATION_MS}ms ${SHEET_EASING}`,
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="invoice-detail-title"
      >
        <div className="mx-auto mt-2 h-1 w-10 shrink-0 rounded-full bg-neutral-300" />

        <header className="shrink-0 px-5 pb-3 pt-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-xs font-medium uppercase tracking-wide text-text-tertiary">
                {invoice.client}
              </p>
              <h2
                id="invoice-detail-title"
                className="mt-1 text-[1.65rem] font-semibold leading-tight tracking-tight text-text-primary"
              >
                {invoice.job}
              </h2>
              <p className="mt-1 text-sm text-text-secondary">
                {invoice.number} · Issued {formatDateShort(invoice.issueDate)}
              </p>
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={handleClose}
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-neutral-200/80 text-neutral-600 transition-transform active:scale-95"
            >
              <X size={14} weight="bold" />
            </button>
          </div>
        </header>

        <div className="flex-1 space-y-3 overflow-y-auto px-4 pb-4">
          <section className="rounded-3xl border border-neutral-200 bg-bg-elevated p-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-text-primary">Balance</h3>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${meta.chip}`}
              >
                {meta.label}
              </span>
            </div>

            <div className="mt-4 flex items-end justify-between">
              <p
                className="text-[2.5rem] font-semibold leading-none tracking-tight text-text-primary"
                style={{
                  animation: isOpen
                    ? "schedule-count-in 500ms cubic-bezier(0.22, 1, 0.36, 1) 80ms both"
                    : undefined,
                }}
              >
                {formatCurrency(due)}
              </p>
              <p className="pb-1 text-sm text-text-secondary">
                {status === "paid" ? "paid in full" : "due"}
              </p>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-neutral-100">
              <div
                className={`h-full rounded-full transition-[width] duration-500 ease-out ${meta.bar}`}
                style={{ width: `${paidRatio * 100}%` }}
              />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              {meta.detail}
            </p>

            {invoice.notes ? (
              <p className="mt-3 rounded-2xl bg-status-warning/10 px-3 py-2.5 text-sm text-text-secondary">
                {invoice.notes}
              </p>
            ) : null}
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-bg-elevated p-4">
            <h3 className="text-sm font-semibold text-text-primary">
              Line items · {invoice.lineItems.length}
            </h3>
            <ul className="mt-3 divide-y divide-neutral-100">
              {invoice.lineItems.map((lineItem) => (
                <li
                  key={lineItem.id}
                  className="flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-text-primary">
                      {lineItem.label}
                    </p>
                    {lineItem.detail ? (
                      <p className="truncate text-xs text-text-tertiary">
                        {lineItem.detail}
                      </p>
                    ) : null}
                  </div>
                  <span className="shrink-0 text-sm tabular-nums text-text-secondary">
                    {formatCurrency(lineItem.amount)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-3">
              <span className="text-sm font-medium text-text-primary">Total</span>
              <span className="text-sm font-semibold tabular-nums text-text-primary">
                {formatCurrency(total)}
              </span>
            </div>
          </section>

          {invoice.payments.length > 0 ? (
            <section className="rounded-3xl border border-neutral-200 bg-bg-elevated p-4">
              <h3 className="text-sm font-semibold text-text-primary">
                Payment history · {invoice.payments.length}
              </h3>
              <ul className="mt-3 divide-y divide-neutral-100">
                {invoice.payments.map((p) => (
                  <li
                    key={p.id}
                    className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-text-primary">
                        {p.method}
                      </p>
                      <p className="truncate text-xs text-text-tertiary">
                        {formatDate(p.date)}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm font-semibold tabular-nums text-status-success">
                      +{formatCurrency(p.amount)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <div className="shrink-0 border-t border-border-default bg-bg-default px-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))] pt-3">
          {status === "paid" ? (
            <div className="flex w-full items-center justify-center gap-2 rounded-2xl bg-status-success/12 py-4 text-base font-semibold text-status-success">
              <CheckCircle size={20} weight="fill" />
              Paid in full
            </div>
          ) : status === "draft" ? (
            <button
              type="button"
              onClick={() => onSend(invoice.id)}
              className="w-full rounded-2xl bg-cta py-4 text-base font-semibold text-white transition-colors hover:bg-cta-hover active:scale-[0.98]"
            >
              Send {invoice.kind === "estimate" ? "estimate" : "invoice"}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onRecordPayment(invoice.id)}
              className="w-full rounded-2xl bg-cta py-4 text-base font-semibold text-white transition-colors hover:bg-cta-hover active:scale-[0.98]"
            >
              Record payment · {formatCurrency(due)}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
