import {
  formatCurrency,
  formatPercent,
  type PortfolioSummary,
} from "./calculator-data";

export function SummaryCard({ summary }: { summary: PortfolioSummary }) {
  const fitLabel =
    summary.takeCount === 1 ? "job fits" : "jobs fit";

  return (
    <section className="rounded-3xl bg-brand-accent px-6 py-7">
      <p className="text-sm font-medium text-text-secondary">Open opportunities</p>
      <p className="mt-2 text-[2.5rem] font-semibold leading-none tracking-tight text-text-primary">
        {summary.takeCount} of {summary.jobCount}
      </p>
      <p className="mt-2 text-sm text-text-secondary">
        {fitLabel} at your target margin
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-white/60 px-4 py-3">
          <p className="text-[11px] font-medium uppercase tracking-wide text-text-tertiary">
            Ask to hit {formatPercent(summary.targetMarginPct)}
          </p>
          <p className="mt-1 text-lg font-semibold tabular-nums text-text-primary">
            {formatCurrency(summary.askTotal)}
          </p>
        </div>
        <div className="rounded-2xl bg-white/60 px-4 py-3">
          <p className="text-[11px] font-medium uppercase tracking-wide text-text-tertiary">
            Needs a look
          </p>
          <p className="mt-1 text-lg font-semibold tabular-nums text-text-primary">
            {summary.tightCount + summary.passCount === 0
              ? "None"
              : `${summary.tightCount + summary.passCount} job${
                  summary.tightCount + summary.passCount === 1 ? "" : "s"
                }`}
          </p>
        </div>
      </div>
    </section>
  );
}
