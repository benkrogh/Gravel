"use client";

import {
  CaretLeft,
  CaretRight,
  ClipboardText,
  Invoice as InvoiceIcon,
  MagnifyingGlass,
  Minus,
  Plus,
  Trash,
  X,
} from "@phosphor-icons/react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  TODAY,
  addDays,
  formatCurrency,
  nextDocumentNumber,
  type Invoice,
  type LineItem,
} from "./billing-data";
import { searchCatalog, type CatalogItem } from "./catalog-data";
import { clients, type Client, type ClientJob } from "./clients-data";

type DocKind = "estimate" | "invoice";
type Step = "type" | "client" | "job" | "items" | "catalog";

interface DraftLineItem {
  id: string;
  label: string;
  unit: string;
  rate: number;
  qty: number;
}

interface CreateDocumentSheetProps {
  existingInvoices: Invoice[];
  onClose: () => void;
  onCreate: (invoice: Invoice) => void;
}

const SHEET_EASING = "cubic-bezier(0.32, 0.72, 0, 1)";
const ANIMATION_MS = 420;

const stepTitles: Record<Step, string> = {
  type: "New",
  client: "Select client",
  job: "Select job",
  items: "Line items",
  catalog: "Add line item",
};

export function CreateDocumentSheet({
  existingInvoices,
  onClose,
  onCreate,
}: CreateDocumentSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [stepStack, setStepStack] = useState<Step[]>(["type"]);
  const [kind, setKind] = useState<DocKind | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [items, setItems] = useState<DraftLineItem[]>([]);
  const [search, setSearch] = useState("");
  const idCounterRef = useRef(0);

  function nextId(prefix: string): string {
    idCounterRef.current += 1;
    return `${prefix}-${idCounterRef.current}`;
  }

  const step = stepStack[stepStack.length - 1];
  const selectedClient: Client | null =
    clients.find((c) => c.id === clientId) ?? null;
  const selectedJob: ClientJob | null =
    selectedClient?.jobs.find((j) => j.id === jobId) ?? null;
  const total = items.reduce((sum, item) => sum + item.rate * item.qty, 0);

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

  function push(next: Step) {
    setStepStack((prev) => [...prev, next]);
  }

  function pop() {
    setStepStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }

  function handleChooseKind(next: DocKind) {
    setKind(next);
    push("client");
  }

  function handleChooseClient(client: Client) {
    setClientId(client.id);
    if (client.jobs.length === 1) {
      setJobId(client.jobs[0].id);
      push("items");
    } else {
      push("job");
    }
  }

  function handleChooseJob(job: ClientJob) {
    setJobId(job.id);
    push("items");
  }

  function handleAddCatalogItem(catalogItem: CatalogItem) {
    setItems((prev) => [
      ...prev,
      {
        id: nextId(catalogItem.id),
        label: catalogItem.name,
        unit: catalogItem.unit,
        rate: catalogItem.rate,
        qty: 1,
      },
    ]);
    setSearch("");
    pop();
  }

  function updateQty(id: string, delta: number) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: Math.max(item.qty + delta, 1) }
          : item,
      ),
    );
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function handleCreate() {
    if (!kind || !selectedClient || !selectedJob || items.length === 0) return;

    const lineItems: LineItem[] = items.map((item) => ({
      id: item.id,
      label: item.label,
      detail:
        item.unit === "flat"
          ? `${formatCurrency(item.rate)} flat fee`
          : `${item.qty} ${item.unit} @ ${formatCurrency(item.rate)}/${item.unit}`,
      amount: item.rate * item.qty,
    }));

    const newDocument: Invoice = {
      id: nextId("doc"),
      number: nextDocumentNumber(kind, existingInvoices),
      client: selectedClient.name,
      job: selectedJob.name,
      address: selectedJob.address,
      color: selectedJob.color,
      kind,
      sent: false,
      issueDate: TODAY,
      dueDate: addDays(TODAY, 14),
      lineItems,
      payments: [],
    };

    onCreate(newDocument);
    handleClose();
  }

  const filteredLabor = searchCatalog(search).filter(
    (item) => item.category === "labor",
  );
  const filteredMaterials = searchCatalog(search).filter(
    (item) => item.category === "material",
  );

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <button
        type="button"
        aria-label="Close"
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
        aria-labelledby="create-document-title"
      >
        <div className="mx-auto mt-2 h-1 w-10 shrink-0 rounded-full bg-neutral-300" />

        <header className="flex shrink-0 items-center justify-between px-4 pb-2 pt-2">
          {stepStack.length > 1 ? (
            <button
              type="button"
              aria-label="Back"
              onClick={pop}
              className="flex size-8 items-center justify-center rounded-full bg-neutral-200/80 text-neutral-600 transition-transform active:scale-95"
            >
              <CaretLeft size={14} weight="bold" />
            </button>
          ) : (
            <span className="size-8" />
          )}
          <h2
            id="create-document-title"
            className="text-base font-semibold text-text-primary"
          >
            {stepTitles[step]}
          </h2>
          <button
            type="button"
            aria-label="Close"
            onClick={handleClose}
            className="flex size-8 items-center justify-center rounded-full bg-neutral-200/80 text-neutral-600 transition-transform active:scale-95"
          >
            <X size={14} weight="bold" />
          </button>
        </header>

        {step === "type" ? (
          <div className="flex-1 space-y-3 overflow-y-auto px-4 pb-4">
            <TypeOption
              icon={<ClipboardText size={22} weight="duotone" />}
              title="Estimate"
              description="Send a proposal before the work starts — no balance due until it's converted."
              onClick={() => handleChooseKind("estimate")}
            />
            <TypeOption
              icon={<InvoiceIcon size={22} weight="duotone" />}
              title="Invoice"
              description="Bill a client for work — track the balance until it's paid in full."
              onClick={() => handleChooseKind("invoice")}
            />
          </div>
        ) : null}

        {step === "client" ? (
          <div className="flex-1 space-y-2 overflow-y-auto px-4 pb-4">
            {clients.map((client) => (
              <button
                key={client.id}
                type="button"
                onClick={() => handleChooseClient(client)}
                className="flex w-full items-center justify-between gap-3 rounded-2xl border border-neutral-200 bg-bg-elevated px-4 py-3 text-left transition-transform active:scale-[0.98]"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-text-primary">
                    {client.name}
                  </p>
                  <p className="truncate text-xs text-text-tertiary">
                    {client.jobs.length} {client.jobs.length === 1 ? "job" : "jobs"}
                  </p>
                </div>
                <CaretRight
                  size={16}
                  weight="bold"
                  className="shrink-0 text-neutral-300"
                />
              </button>
            ))}
          </div>
        ) : null}

        {step === "job" ? (
          <div className="flex-1 space-y-2 overflow-y-auto px-4 pb-4">
            {selectedClient?.jobs.map((job) => (
              <button
                key={job.id}
                type="button"
                onClick={() => handleChooseJob(job)}
                className="flex w-full items-center gap-3 rounded-2xl border border-neutral-200 bg-bg-elevated px-4 py-3 text-left transition-transform active:scale-[0.98]"
              >
                <span
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: job.color }}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-text-primary">
                    {job.name}
                  </p>
                  <p className="truncate text-xs text-text-tertiary">
                    {job.address}
                  </p>
                </div>
                <CaretRight
                  size={16}
                  weight="bold"
                  className="shrink-0 text-neutral-300"
                />
              </button>
            ))}
          </div>
        ) : null}

        {step === "items" ? (
          <div className="flex-1 space-y-3 overflow-y-auto px-4 pb-4">
            {selectedClient && selectedJob ? (
              <div className="flex items-center gap-3 rounded-2xl bg-neutral-50 px-4 py-3">
                <span
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: selectedJob.color }}
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-text-primary">
                    {selectedJob.name}
                  </p>
                  <p className="truncate text-xs text-text-tertiary">
                    {selectedClient.name}
                  </p>
                </div>
              </div>
            ) : null}

            <div className="rounded-3xl border border-neutral-200 bg-bg-elevated p-4">
              <h3 className="text-sm font-semibold text-text-primary">
                Line items · {items.length}
              </h3>

              {items.length === 0 ? (
                <p className="mt-3 text-sm text-text-secondary">
                  No line items yet — add labor or materials below.
                </p>
              ) : (
                <ul className="mt-3 divide-y divide-neutral-100">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-text-primary">
                          {item.label}
                        </p>
                        <p className="truncate text-xs text-text-tertiary">
                          {item.unit === "flat"
                            ? `${formatCurrency(item.rate)} flat fee`
                            : `${item.qty} ${item.unit} @ ${formatCurrency(item.rate)}/${item.unit}`}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        {item.unit !== "flat" ? (
                          <div className="flex items-center gap-1.5 rounded-full bg-neutral-100 px-1.5 py-1">
                            <button
                              type="button"
                              aria-label={`Decrease ${item.label} quantity`}
                              onClick={() => updateQty(item.id, -1)}
                              className="flex size-6 items-center justify-center rounded-full text-text-secondary transition-transform active:scale-90"
                            >
                              <Minus size={12} weight="bold" />
                            </button>
                            <span className="w-5 text-center text-xs font-semibold tabular-nums text-text-primary">
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              aria-label={`Increase ${item.label} quantity`}
                              onClick={() => updateQty(item.id, 1)}
                              className="flex size-6 items-center justify-center rounded-full text-text-secondary transition-transform active:scale-90"
                            >
                              <Plus size={12} weight="bold" />
                            </button>
                          </div>
                        ) : null}
                        <span className="w-16 shrink-0 text-right text-sm font-semibold tabular-nums text-text-primary">
                          {formatCurrency(item.rate * item.qty)}
                        </span>
                        <button
                          type="button"
                          aria-label={`Remove ${item.label}`}
                          onClick={() => removeItem(item.id)}
                          className="flex size-6 shrink-0 items-center justify-center rounded-full text-neutral-400 transition-transform active:scale-90"
                        >
                          <Trash size={14} weight="bold" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <button
                type="button"
                onClick={() => push("catalog")}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-neutral-300 py-3 text-sm font-semibold text-brand-secondary transition-transform active:scale-[0.98]"
              >
                <Plus size={16} weight="bold" />
                Add line item
              </button>
            </div>

            {items.length > 0 ? (
              <div className="flex items-center justify-between rounded-2xl bg-neutral-50 px-4 py-3">
                <span className="text-sm text-text-secondary">Total</span>
                <span className="text-base font-semibold tabular-nums text-text-primary">
                  {formatCurrency(total)}
                </span>
              </div>
            ) : null}
          </div>
        ) : null}

        {step === "catalog" ? (
          <div className="flex flex-1 flex-col overflow-hidden px-4 pb-4">
            <div className="relative shrink-0">
              <MagnifyingGlass
                size={16}
                weight="bold"
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
              />
              <input
                autoFocus
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search labor & materials"
                className="w-full rounded-2xl bg-neutral-100 py-3 pl-10 pr-4 text-sm text-text-primary placeholder:text-neutral-400 focus:outline-none"
              />
            </div>

            <div className="mt-3 flex-1 space-y-4 overflow-y-auto pb-2">
              <CatalogGroup
                title="Labor"
                items={filteredLabor}
                onSelect={handleAddCatalogItem}
              />
              <CatalogGroup
                title="Materials"
                items={filteredMaterials}
                onSelect={handleAddCatalogItem}
              />
              {filteredLabor.length === 0 && filteredMaterials.length === 0 ? (
                <p className="pt-6 text-center text-sm text-text-secondary">
                  No matches in the catalog.
                </p>
              ) : null}
            </div>
          </div>
        ) : null}

        {step === "items" ? (
          <div className="shrink-0 border-t border-border-default bg-bg-default px-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))] pt-3">
            <button
              type="button"
              disabled={items.length === 0}
              onClick={handleCreate}
              className="w-full rounded-2xl bg-cta py-4 text-base font-semibold text-white transition-colors hover:bg-cta-hover active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Create {kind === "estimate" ? "estimate" : "invoice"}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function TypeOption({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-start gap-3 rounded-3xl border border-neutral-200 bg-bg-elevated p-4 text-left transition-transform active:scale-[0.98]"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand-accent text-brand-primary">
        {icon}
      </span>
      <div>
        <p className="text-base font-semibold text-text-primary">{title}</p>
        <p className="mt-0.5 text-sm leading-relaxed text-text-secondary">
          {description}
        </p>
      </div>
    </button>
  );
}

function CatalogGroup({
  title,
  items,
  onSelect,
}: {
  title: string;
  items: CatalogItem[];
  onSelect: (item: CatalogItem) => void;
}) {
  if (items.length === 0) return null;
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-wide text-text-tertiary">
        {title}
      </p>
      <ul className="mt-2 divide-y divide-neutral-100 rounded-2xl border border-neutral-200 bg-bg-elevated">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => onSelect(item)}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors active:bg-neutral-50"
            >
              <span className="truncate text-sm font-medium text-text-primary">
                {item.name}
              </span>
              <span className="shrink-0 text-xs text-text-tertiary">
                {item.unit === "flat"
                  ? formatCurrency(item.rate)
                  : `${formatCurrency(item.rate)}/${item.unit}`}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}