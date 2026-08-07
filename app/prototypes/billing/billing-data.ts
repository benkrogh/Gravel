export type InvoiceStatus = "draft" | "sent" | "partial" | "overdue" | "paid";

export interface LineItem {
  id: string;
  label: string;
  detail?: string;
  amount: number;
}

export interface Payment {
  id: string;
  date: string; // YYYY-MM-DD
  amount: number;
  method: string;
}

export interface Invoice {
  id: string;
  number: string;
  client: string;
  job: string;
  address: string;
  color: string;
  /** Estimates behave like draft invoices until sent; defaults to "invoice". */
  kind?: "estimate" | "invoice";
  sent: boolean;
  issueDate: string; // YYYY-MM-DD
  dueDate: string; // YYYY-MM-DD
  lineItems: LineItem[];
  payments: Payment[];
  notes?: string;
}

/** Treated as "today" for status and reporting math. */
export const TODAY = "2026-08-06";

export const invoices: Invoice[] = [
  {
    id: "inv-1042",
    number: "INV-1042",
    client: "Chen Residence",
    job: "Ridgeview Addition",
    address: "214 Ridgeview Ct, Portland, OR",
    color: "#1b3012",
    sent: true,
    issueDate: "2026-07-15",
    dueDate: "2026-07-30",
    lineItems: [
      item("Framing labor", "96 hrs @ $65/hr", 6240),
      item("Lumber & framing materials", undefined, 4180),
      item("Dumpster & permit fees", undefined, 620),
    ],
    payments: [],
    notes: "Client requested an itemized labor breakdown before paying — resent 7/22.",
  },
  {
    id: "inv-1043",
    number: "INV-1043",
    client: "Walsh Homes",
    job: "Harbor St Kitchen",
    address: "88 Harbor St, Portland, OR",
    color: "#5e8d27",
    sent: true,
    issueDate: "2026-07-28",
    dueDate: "2026-08-12",
    lineItems: [
      item("Tile installation", "Tileworks NW subcontract", 1900),
      item("Electrical rough-in", "Lumen Electric subcontract", 1250),
      item("Cabinet install labor", "32 hrs @ $70/hr", 2240),
    ],
    payments: [],
  },
  {
    id: "inv-1044",
    number: "INV-1044",
    client: "Summit Property",
    job: "Oakmont Roof Tear-off",
    address: "1502 Oakmont Ave, Beaverton, OR",
    color: "#404040",
    sent: true,
    issueDate: "2026-07-10",
    dueDate: "2026-07-25",
    lineItems: [
      item("Tear-off & disposal", undefined, 3200),
      item("Underlayment & materials", undefined, 2100),
      item("Roofing subcontract", "Skyline Roofing", 4300),
    ],
    payments: [payment("inv-1044-p1", "2026-08-02", 9600, "ACH transfer")],
  },
  {
    id: "inv-1045",
    number: "INV-1045",
    client: "Aperture Dev",
    job: "Mill District Lobby",
    address: "400 SE Mill St, Portland, OR",
    color: "#737373",
    sent: true,
    issueDate: "2026-07-20",
    dueDate: "2026-08-20",
    lineItems: [
      item("Storefront glazing", "Glasshaus subcontract", 3600),
      item("Concrete polish", "Polish Floors Co. subcontract", 2300),
      item("Lobby carpentry labor", "48 hrs @ $72/hr", 3456),
    ],
    payments: [payment("inv-1045-p1", "2026-08-01", 4000, "Credit card")],
    notes: "Client paid a deposit up front; remainder due at substantial completion.",
  },
  {
    id: "inv-1046",
    number: "INV-1046",
    client: "Chen Residence",
    job: "Ridgeview Addition",
    address: "214 Ridgeview Ct, Portland, OR",
    color: "#1b3012",
    sent: false,
    issueDate: "2026-08-06",
    dueDate: "2026-08-20",
    lineItems: [
      item("Final trim carpentry", "40 hrs @ $68/hr", 2720),
      item("Hardware & finish materials", undefined, 640),
    ],
    payments: [],
  },
  {
    id: "inv-1047",
    number: "INV-1047",
    client: "Walsh Homes",
    job: "Harbor St Kitchen",
    address: "88 Harbor St, Portland, OR",
    color: "#5e8d27",
    sent: true,
    issueDate: "2026-06-20",
    dueDate: "2026-07-05",
    lineItems: [
      item("Demo & prep labor", "24 hrs @ $65/hr", 1560),
      item("Plumbing rough-in", "Subcontract", 1800),
    ],
    payments: [payment("inv-1047-p1", "2026-07-08", 3360, "Check")],
  },
];

function item(label: string, detail: string | undefined, amount: number): LineItem {
  return { id: `${label}-${amount}`, label, detail, amount };
}

function payment(id: string, date: string, amount: number, method: string): Payment {
  return { id, date, amount, method };
}

export function getInvoiceTotal(invoice: Invoice): number {
  return invoice.lineItems.reduce((sum, lineItem) => sum + lineItem.amount, 0);
}

export function getAmountPaid(invoice: Invoice): number {
  return invoice.payments.reduce((sum, p) => sum + p.amount, 0);
}

export function getAmountDue(invoice: Invoice): number {
  return Math.max(getInvoiceTotal(invoice) - getAmountPaid(invoice), 0);
}

export function getInvoiceStatus(invoice: Invoice, today: string = TODAY): InvoiceStatus {
  if (!invoice.sent) return "draft";
  const due = getAmountDue(invoice);
  if (due <= 0) return "paid";
  if (getAmountPaid(invoice) > 0) return "partial";
  if (invoice.dueDate < today) return "overdue";
  return "sent";
}

export interface StatusMeta {
  label: string;
  detail: string;
  chip: string;
  bar: string;
}

export const statusMeta: Record<InvoiceStatus, StatusMeta> = {
  draft: {
    label: "Draft",
    detail: "Not sent yet — review the line items before sending to the client.",
    chip: "bg-neutral-200 text-text-secondary",
    bar: "bg-neutral-300",
  },
  sent: {
    label: "Sent",
    detail: "Waiting on payment from the client.",
    chip: "bg-status-info/12 text-status-info",
    bar: "bg-status-info",
  },
  partial: {
    label: "Partial",
    detail: "Client has paid part of the balance — the rest is still outstanding.",
    chip: "bg-status-warning/12 text-status-warning",
    bar: "bg-status-warning",
  },
  overdue: {
    label: "Overdue",
    detail: "Past the due date — consider sending a payment reminder.",
    chip: "bg-status-error/12 text-status-error",
    bar: "bg-status-error",
  },
  paid: {
    label: "Paid",
    detail: "Paid in full. Nice work.",
    chip: "bg-status-success/12 text-status-success",
    bar: "bg-status-success",
  },
};

export interface BillingSummaryData {
  outstanding: number;
  paidThisMonth: number;
  overdueCount: number;
  draftCount: number;
}

function isSameMonth(iso: string, referenceIso: string): boolean {
  return iso.slice(0, 7) === referenceIso.slice(0, 7);
}

export function getBillingSummary(
  invoiceList: Invoice[],
  today: string = TODAY,
): BillingSummaryData {
  let outstanding = 0;
  let paidThisMonth = 0;
  let overdueCount = 0;
  let draftCount = 0;

  for (const invoice of invoiceList) {
    const status = getInvoiceStatus(invoice, today);
    if (status === "sent" || status === "partial" || status === "overdue") {
      outstanding += getAmountDue(invoice);
    }
    if (status === "overdue") overdueCount += 1;
    if (status === "draft") draftCount += 1;
    for (const p of invoice.payments) {
      if (isSameMonth(p.date, today)) paidThisMonth += p.amount;
    }
  }

  return { outstanding, paidThisMonth, overdueCount, draftCount };
}

export function parseDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(iso: string, days: number): string {
  const date = parseDate(iso);
  date.setDate(date.getDate() + days);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function formatDate(iso: string): string {
  return parseDate(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateShort(iso: string): string {
  return parseDate(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function nextDocumentNumber(
  kind: "estimate" | "invoice",
  existing: Invoice[],
): string {
  const prefix = kind === "estimate" ? "EST" : "INV";
  const base = kind === "estimate" ? 2000 : 1047;
  const highest = existing
    .filter((invoice) => invoice.number.startsWith(prefix))
    .reduce((max, invoice) => {
      const n = Number(invoice.number.split("-")[1]);
      return Number.isFinite(n) ? Math.max(max, n) : max;
    }, base);
  return `${prefix}-${highest + 1}`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
