"use client";

import {
  Cube,
  HardHat,
  Minus,
  Plus,
  UsersThree,
  X,
} from "@phosphor-icons/react";
import { useCallback, useEffect, useState } from "react";
import {
  formatBudgetRange,
  formatCurrency,
  formatLineDetail,
  formatPercent,
  getEconomics,
  getLineTotal,
  getVerdict,
  updateLineQty,
  verdictMeta,
  type CalcJob,
  type CostCategory,
  type CostLine,
} from "./calculator-data";

interface JobCalculatorSheetProps {
  job: CalcJob;
  onClose: () => void;
  onChange: (job: CalcJob) => void;
}

const SHEET_EASING = "cubic-bezier(0.32, 0.72, 0, 1)";
const ANIMATION_MS = 420;

const categoryCopy: Record<
  CostCategory,
  { title: string; icon: typeof HardHat }
> = {
  labor: {
    title: "Labor",
    icon: HardHat,
  },
  material: {
    title: "Materials",
    icon: Cube,
  },
  sub: {
    title: "Subcontractors",
    icon: UsersThree,
  },
};

export function JobCalculatorSheet({
  job,
  onClose,
  onChange,
}: JobCalculatorSheetProps) {
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

  const economics = getEconomics(job);
  const verdict = getVerdict(job);
  const meta = verdictMeta[verdict];
  const costBase = Math.max(economics.directCost, 1);

  function bumpQty(lineId: string, delta: number) {
    onChange(updateLineQty(job, lineId, delta));
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <button
        type="button"
        aria-label="Close calculator"
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
        aria-labelledby="job-calculator-title"
      >
        <div className="mx-auto mt-2 h-1 w-10 shrink-0 rounded-full bg-neutral-300" />

        <header className="shrink-0 px-5 pb-3 pt-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-xs font-medium uppercase tracking-wide text-text-tertiary">
                {job.client}
              </p>
              <h2
                id="job-calculator-title"
                className="mt-1 text-[1.65rem] font-semibold leading-tight tracking-tight text-text-primary"
              >
                {job.title}
              </h2>
              <p className="mt-1 truncate text-sm text-text-secondary">
                {job.address}
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

        <div className="flex-1 space-y-3 overflow-y-auto px-4 pb-8">
          <section className="rounded-3xl border border-neutral-200 bg-bg-elevated p-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-text-primary">
                Ask to hit {formatPercent(job.targetMarginPct)}
              </h3>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${meta.chip}`}
              >
                {meta.label}
              </span>
            </div>

            <p
              className={`mt-3 text-[2.75rem] font-semibold leading-none tracking-tight ${meta.tone}`}
              style={{
                animation: isOpen
                  ? "schedule-count-in 500ms cubic-bezier(0.22, 1, 0.36, 1) 80ms both"
                  : undefined,
              }}
            >
              {formatCurrency(economics.askPrice)}
            </p>
            <p className="mt-2 text-sm text-text-secondary">{meta.detail}</p>

            <dl className="mt-5 grid grid-cols-2 gap-3">
              <Stat
                label="Client budget"
                value={formatBudgetRange(job.budgetMin, job.budgetMax)}
              />
              <Stat label="Timeline" value={job.timeline} />
              <Stat
                label="Loaded cost"
                value={formatCurrency(economics.loadedCost)}
              />
              <Stat
                label="Profit at ask"
                value={formatCurrency(economics.profitAtAsk)}
              />
            </dl>

            <div className="mt-4 rounded-2xl bg-neutral-50 px-3 py-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-text-secondary">
                  If you bid at {formatCurrency(job.budgetMax)}
                </span>
                <span
                  className={`text-sm font-semibold tabular-nums ${
                    economics.marginAtCeiling >= job.targetMarginPct
                      ? "text-status-success"
                      : economics.marginAtCeiling >= 0.1
                        ? "text-status-warning"
                        : "text-status-error"
                  }`}
                >
                  {formatPercent(economics.marginAtCeiling)} margin
                </span>
              </div>
              <p className="mt-1 text-xs text-text-tertiary">
                {formatCurrency(economics.profitAtCeiling)} profit at their
                ceiling · due {job.proposalDue}
              </p>
            </div>
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-bg-elevated p-4">
            <h3 className="text-sm font-semibold text-text-primary">
              Cost-plus levers
            </h3>
            <p className="mt-1 text-xs text-text-tertiary">
              Overhead on direct cost, then margin on the sell price.
            </p>

            <PercentStepper
              label="Overhead"
              value={job.overheadPct}
              min={0}
              max={0.3}
              amount={economics.overheadAmount}
              onChange={(overheadPct) => onChange({ ...job, overheadPct })}
            />
            <PercentStepper
              label="Target margin"
              value={job.targetMarginPct}
              min={0.05}
              max={0.45}
              amount={economics.profitAtAsk}
              onChange={(targetMarginPct) =>
                onChange({ ...job, targetMarginPct })
              }
            />
          </section>

          <CostGroup
            category="labor"
            lines={job.lines.filter((item) => item.category === "labor")}
            total={economics.labor}
            onBump={bumpQty}
          />
          <CostGroup
            category="material"
            lines={job.lines.filter((item) => item.category === "material")}
            total={economics.materials}
            onBump={bumpQty}
          />
          <CostGroup
            category="sub"
            lines={job.lines.filter((item) => item.category === "sub")}
            total={economics.subs}
            onBump={bumpQty}
          />

          <section className="rounded-3xl border border-neutral-200 bg-bg-elevated p-4">
            <h3 className="text-sm font-semibold text-text-primary">
              Cost stack
            </h3>
            <p className="mt-1 text-xs text-text-tertiary">
              Direct cost plus overhead, before margin.
            </p>

            <dl className="mt-4 space-y-3">
              <Row label="Labor" value={formatCurrency(economics.labor)} />
              <Row
                label="Materials"
                value={formatCurrency(economics.materials)}
              />
              <Row label="Subs" value={formatCurrency(economics.subs)} />
              <Row
                label="Overhead"
                value={formatCurrency(economics.overheadAmount)}
              />
            </dl>

            <div className="mt-4 flex h-2.5 overflow-hidden rounded-full bg-neutral-100">
              <div
                className="bg-brand-secondary transition-[width] duration-500 ease-out"
                style={{ width: `${(economics.labor / costBase) * 100}%` }}
              />
              <div
                className="bg-neutral-500 transition-[width] duration-500 ease-out"
                style={{ width: `${(economics.materials / costBase) * 100}%` }}
              />
              <div
                className="bg-neutral-300 transition-[width] duration-500 ease-out"
                style={{ width: `${(economics.subs / costBase) * 100}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-[11px] text-text-tertiary">
              <span>Labor</span>
              <span>Materials</span>
              <span>Subs</span>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-2xl bg-neutral-50 px-3 py-3">
              <span className="text-sm text-text-secondary">Loaded cost</span>
              <span className="text-base font-semibold tabular-nums text-text-primary">
                {formatCurrency(economics.loadedCost)}
              </span>
            </div>
          </section>

          <p className="px-1 pb-2 text-xs leading-relaxed text-text-tertiary">
            Internal only — this is not a client estimate. {job.summary}
          </p>
        </div>

        <div className="shrink-0 border-t border-border-default bg-bg-default px-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))] pt-3">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wide text-text-tertiary">
                Ask vs {formatBudgetRange(job.budgetMin, job.budgetMax)}
              </p>
              <p className="mt-0.5 text-xl font-semibold tabular-nums text-text-primary">
                {formatCurrency(economics.askPrice)}
              </p>
            </div>
            <span
              className={`mb-0.5 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${meta.chip}`}
            >
              {meta.label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CostGroup({
  category,
  lines,
  total,
  onBump,
}: {
  category: CostCategory;
  lines: CostLine[];
  total: number;
  onBump: (lineId: string, delta: number) => void;
}) {
  const copy = categoryCopy[category];
  const Icon = copy.icon;

  if (lines.length === 0) return null;

  return (
    <section className="rounded-3xl border border-neutral-200 bg-bg-elevated p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-full bg-brand-accent text-brand-primary">
            <Icon size={16} weight="duotone" />
          </span>
          <h3 className="text-sm font-semibold text-text-primary">
            {copy.title} · {lines.length}
          </h3>
        </div>
        <span className="text-sm font-semibold tabular-nums text-text-primary">
          {formatCurrency(total)}
        </span>
      </div>

      <ul className="mt-3 divide-y divide-neutral-100">
        {lines.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-text-primary">
                {item.label}
              </p>
              <p className="truncate text-xs text-text-tertiary">
                {formatLineDetail(item)}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <div className="flex items-center gap-1.5 rounded-full bg-neutral-100 px-1.5 py-1">
                <button
                  type="button"
                  aria-label={`Decrease ${item.label}`}
                  onClick={() => onBump(item.id, -1)}
                  className="flex size-6 items-center justify-center rounded-full text-text-secondary transition-transform active:scale-90"
                >
                  <Minus size={12} weight="bold" />
                </button>
                <span className="w-7 text-center text-xs font-semibold tabular-nums text-text-primary">
                  {item.qty}
                </span>
                <button
                  type="button"
                  aria-label={`Increase ${item.label}`}
                  onClick={() => onBump(item.id, 1)}
                  className="flex size-6 items-center justify-center rounded-full text-text-secondary transition-transform active:scale-90"
                >
                  <Plus size={12} weight="bold" />
                </button>
              </div>
              <span className="w-16 shrink-0 text-right text-sm font-semibold tabular-nums text-text-primary">
                {formatCurrency(getLineTotal(item))}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function PercentStepper({
  label,
  value,
  min,
  max,
  amount,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  amount: number;
  onChange: (value: number) => void;
}) {
  const pct = Math.round(value * 100);
  const minPct = Math.round(min * 100);
  const maxPct = Math.round(max * 100);

  function bump(delta: number) {
    const next = Math.min(Math.max(pct + delta, minPct), maxPct);
    onChange(next / 100);
  }

  return (
    <div className="mt-4 flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-sm font-medium text-text-primary">{label}</p>
        <p className="mt-0.5 text-xs tabular-nums text-text-tertiary">
          {formatCurrency(amount)}
        </p>
      </div>
      <div className="flex items-center gap-1.5 rounded-full bg-neutral-100 px-1.5 py-1">
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          disabled={pct <= minPct}
          onClick={() => bump(-1)}
          className="flex size-7 items-center justify-center rounded-full text-text-secondary transition-transform active:scale-90 disabled:opacity-30"
        >
          <Minus size={12} weight="bold" />
        </button>
        <span className="w-10 text-center text-sm font-semibold tabular-nums text-text-primary">
          {formatPercent(value)}
        </span>
        <button
          type="button"
          aria-label={`Increase ${label}`}
          disabled={pct >= maxPct}
          onClick={() => bump(1)}
          className="flex size-7 items-center justify-center rounded-full text-text-secondary transition-transform active:scale-90 disabled:opacity-30"
        >
          <Plus size={12} weight="bold" />
        </button>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-neutral-50 px-3 py-3">
      <dt className="text-[11px] font-medium uppercase tracking-wide text-text-tertiary">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-semibold tabular-nums text-text-primary">
        {value}
      </dd>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-sm text-text-secondary">{label}</dt>
      <dd className="text-sm font-medium tabular-nums text-text-primary">
        {value}
      </dd>
    </div>
  );
}
