import { formatCurrency, type BillingSummaryData } from "./billing-data";

export function BillingSummary({ summary }: { summary: BillingSummaryData }) {
  return (
    <section className="rounded-3xl bg-brand-accent px-6 py-7">
      <p className="text-sm font-medium text-text-secondary">Outstanding</p>
      <p className="mt-2 text-[2.5rem] font-semibold leading-none tracking-tight text-text-primary">
        {formatCurrency(summary.outstanding)}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-white/60 px-4 py-3">
          <p className="text-[11px] font-medium uppercase tracking-wide text-text-tertiary">
            Paid this month
          </p>
          <p className="mt-1 text-lg font-semibold tabular-nums text-text-primary">
            {formatCurrency(summary.paidThisMonth)}
          </p>
        </div>
        <div className="rounded-2xl bg-white/60 px-4 py-3">
          <p className="text-[11px] font-medium uppercase tracking-wide text-text-tertiary">
            Overdue
          </p>
          <p className="mt-1 text-lg font-semibold tabular-nums text-text-primary">
            {summary.overdueCount === 0
              ? "None"
              : `${summary.overdueCount} invoice${summary.overdueCount === 1 ? "" : "s"}`}
          </p>
        </div>
      </div>
    </section>
  );
}
