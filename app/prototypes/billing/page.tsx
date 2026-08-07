"use client";

import { Plus } from "@phosphor-icons/react";
import { useState } from "react";
import { BillingSummary } from "./billing-summary";
import { BottomNav } from "./bottom-nav";
import { CreateDocumentSheet } from "./create-document-sheet";
import { InvoiceDetailSheet } from "./invoice-detail-sheet";
import { InvoiceList } from "./invoice-list";
import { StatusFilter, type StatusFilterValue } from "./status-filter";
import {
  TODAY,
  addDays,
  getAmountDue,
  getBillingSummary,
  invoices as initialInvoices,
  type Invoice,
} from "./billing-data";

export default function BillingPrototype() {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [statusFilter, setStatusFilter] = useState<StatusFilterValue>("all");
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(
    null,
  );
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const selectedInvoice =
    invoices.find((invoice) => invoice.id === selectedInvoiceId) ?? null;
  const summary = getBillingSummary(invoices);

  function handleSend(invoiceId: string) {
    setInvoices((prev) =>
      prev.map((invoice) =>
        invoice.id === invoiceId
          ? {
              ...invoice,
              sent: true,
              issueDate: TODAY,
              dueDate: addDays(TODAY, 14),
            }
          : invoice,
      ),
    );
  }

  function handleRecordPayment(invoiceId: string) {
    setInvoices((prev) =>
      prev.map((invoice) => {
        if (invoice.id !== invoiceId) return invoice;
        const remaining = getAmountDue(invoice);
        if (remaining <= 0) return invoice;
        return {
          ...invoice,
          payments: [
            ...invoice.payments,
            {
              id: `${invoice.id}-p${invoice.payments.length + 1}`,
              date: TODAY,
              amount: remaining,
              method: "Manual entry",
            },
          ],
        };
      }),
    );
  }

  function handleCreateDocument(newDocument: Invoice) {
    setInvoices((prev) => [newDocument, ...prev]);
    setStatusFilter("all");
    setSelectedInvoiceId(newDocument.id);
  }

  return (
    <>
      <main className="min-h-0 flex-1 overflow-y-auto pb-28 pt-[max(3.5rem,env(safe-area-inset-top,0px))]">
        <header className="flex items-start justify-between gap-3 px-4">
          <div>
            <p className="text-sm font-medium text-brand-secondary">
              This month
            </p>
            <h1 className="mt-1 text-[2rem] font-semibold leading-tight tracking-tight text-text-primary">
              Invoices
            </h1>
          </div>
          <button
            type="button"
            aria-label="New estimate or invoice"
            onClick={() => setIsCreateOpen(true)}
            className="mt-1 flex size-11 shrink-0 items-center justify-center rounded-full bg-cta text-white shadow-[0_4px_12px_rgba(3,4,3,0.22)] transition-transform active:scale-95"
          >
            <Plus size={20} weight="bold" />
          </button>
        </header>

        <div className="mt-5 px-4">
          <BillingSummary summary={summary} />
        </div>

        <div className="mt-6">
          <StatusFilter value={statusFilter} onChange={setStatusFilter} />
        </div>

        <div className="mt-4">
          <InvoiceList
            invoices={invoices}
            filter={statusFilter}
            onSelect={setSelectedInvoiceId}
          />
        </div>
      </main>

      <BottomNav active="billing" />

      {selectedInvoice ? (
        <InvoiceDetailSheet
          key={selectedInvoice.id}
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoiceId(null)}
          onSend={handleSend}
          onRecordPayment={handleRecordPayment}
        />
      ) : null}

      {isCreateOpen ? (
        <CreateDocumentSheet
          existingInvoices={invoices}
          onClose={() => setIsCreateOpen(false)}
          onCreate={handleCreateDocument}
        />
      ) : null}
    </>
  );
}
