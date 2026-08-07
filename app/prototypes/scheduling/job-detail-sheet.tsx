"use client";

import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import { useCallback, useEffect, useState } from "react";
import {
  formatCurrency,
  formatDayNumber,
  formatMonthYear,
  formatPercent,
  formatWeekday,
  getDayEconomics,
  getStaffingHealth,
  getWeekDates,
  shiftWeek,
  staffingHeadcount,
  startOfWeek,
  type Job,
  type StaffingHealth,
} from "./schedule-data";

interface JobDetailSheetProps {
  job: Job;
  date: string;
  onClose: () => void;
  onSelectDate: (date: string) => void;
}

const healthCopy: Record<
  StaffingHealth,
  { label: string; detail: string; tone: string; bar: string; chip: string }
> = {
  healthy: {
    label: "Healthy",
    detail: "Crew and subs cover the day’s requirement.",
    tone: "text-status-success",
    bar: "bg-status-success",
    chip: "bg-status-success/12 text-status-success",
  },
  tight: {
    label: "Tight",
    detail: "Close to requirement — one more body would de-risk the day.",
    tone: "text-status-warning",
    bar: "bg-status-warning",
    chip: "bg-status-warning/12 text-status-warning",
  },
  understaffed: {
    label: "Understaffed",
    detail: "Short on heads — schedule risk and likely overtime.",
    tone: "text-status-error",
    bar: "bg-status-error",
    chip: "bg-status-error/12 text-status-error",
  },
};

const SHEET_EASING = "cubic-bezier(0.32, 0.72, 0, 1)";
const ANIMATION_MS = 420;

export function JobDetailSheet({
  job,
  date,
  onClose,
  onSelectDate,
}: JobDetailSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const day = job.days.find((d) => d.date === date);

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

  if (!day) return null;

  const filled = staffingHeadcount(day);
  const health = getStaffingHealth(day);
  const economics = getDayEconomics(day);
  const fillRatio = Math.min(filled / day.requiredHeadcount, 1);
  const meta = healthCopy[health];
  const marginTone =
    economics.margin >= 0.28
      ? "text-status-success"
      : economics.margin >= 0.18
        ? "text-status-warning"
        : "text-status-error";

  const weekStart = startOfWeek(date);
  const weekDates = getWeekDates(weekStart);
  const weekDays = job.days.filter((d) => weekDates.includes(d.date));
  const jobWeekStarts = [
    ...new Set(job.days.map((d) => startOfWeek(d.date))),
  ].sort();
  const weekIndex = jobWeekStarts.indexOf(weekStart);
  const canPrevWeek = weekIndex > 0;
  const canNextWeek = weekIndex >= 0 && weekIndex < jobWeekStarts.length - 1;
  const monthLabel = formatMonthYear(date);

  function moveWeek(delta: number) {
    if (delta < 0 && !canPrevWeek) return;
    if (delta > 0 && !canNextWeek) return;
    const nextWeek = shiftWeek(weekStart, delta);
    const nextDates = getWeekDates(nextWeek);
    const nextDay =
      job.days.find((d) => nextDates.includes(d.date)) ??
      job.days.find((d) => startOfWeek(d.date) === nextWeek);
    if (nextDay) onSelectDate(nextDay.date);
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <button
        type="button"
        aria-label="Close job details"
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
        aria-labelledby="job-detail-title"
      >
        <div className="mx-auto mt-2 h-1 w-10 shrink-0 rounded-full bg-neutral-300" />

        <header className="shrink-0 px-5 pb-3 pt-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-xs font-medium uppercase tracking-wide text-text-tertiary">
                {job.client}
              </p>
              <h2
                id="job-detail-title"
                className="mt-1 text-[1.65rem] font-semibold leading-tight tracking-tight text-text-primary"
              >
                {job.name}
              </h2>
              <p className="mt-1 text-sm text-text-secondary">{job.address}</p>
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

          <div className="mt-4">
            <p className="mb-3 text-[15px] font-semibold tracking-tight text-text-primary">
              {monthLabel}
            </p>

            <div className="-mb-1 flex items-center gap-1.5 pb-3">
              <button
                type="button"
                aria-label="Previous week"
                onClick={() => moveWeek(-1)}
                disabled={!canPrevWeek}
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-text-primary transition-transform active:scale-95 disabled:opacity-30"
              >
                <CaretLeft size={16} weight="bold" />
              </button>

              <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto">
                {weekDays.map((d) => {
                  const active = d.date === date;
                  return (
                    <button
                      key={d.date}
                      type="button"
                      onClick={() => onSelectDate(d.date)}
                      className={`shrink-0 rounded-2xl px-3.5 py-2 text-left transition-all duration-200 active:scale-95 ${
                        active
                          ? "bg-cta text-white shadow-[0_4px_12px_rgba(3,4,3,0.22)]"
                          : "bg-neutral-100 text-text-secondary"
                      }`}
                    >
                      <span
                        className={`block text-[11px] font-medium uppercase ${
                          active ? "text-white/70" : "text-text-tertiary"
                        }`}
                      >
                        {formatWeekday(d.date)}
                      </span>
                      <span className="block text-[15px] font-semibold tabular-nums">
                        {formatDayNumber(d.date)}
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                aria-label="Next week"
                onClick={() => moveWeek(1)}
                disabled={!canNextWeek}
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-text-primary transition-transform active:scale-95 disabled:opacity-30"
              >
                <CaretRight size={16} weight="bold" />
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 space-y-3 overflow-y-auto px-4 pb-4">
          <section className="rounded-3xl border border-neutral-200 bg-bg-elevated p-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-text-primary">
                Staffing health
              </h3>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${meta.chip}`}
              >
                {meta.label}
              </span>
            </div>

            <div className="mt-4 flex items-end justify-between">
              <p className="text-[2.5rem] font-semibold leading-none tracking-tight text-text-primary">
                {filled}
                <span className="text-xl font-medium text-text-tertiary">
                  /{day.requiredHeadcount}
                </span>
              </p>
              <p className="pb-1 text-sm text-text-secondary">heads on site</p>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-neutral-100">
              <div
                className={`h-full rounded-full transition-[width] duration-500 ease-out ${meta.bar}`}
                style={{ width: `${fillRatio * 100}%` }}
              />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              {meta.detail}
            </p>

            {day.notes ? (
              <p className="mt-3 rounded-2xl bg-status-warning/10 px-3 py-2.5 text-sm text-text-secondary">
                {day.notes}
              </p>
            ) : null}
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-bg-elevated p-4">
            <h3 className="text-sm font-semibold text-text-primary">
              Your crew · {day.crew.length}
            </h3>
            <ul className="mt-3 divide-y divide-neutral-100">
              {day.crew.map((member) => (
                <li
                  key={member.id}
                  className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span
                      className="flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
                      style={{ backgroundColor: job.color }}
                    >
                      {member.initials}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-text-primary">
                        {member.name}
                      </p>
                      <p className="truncate text-xs text-text-tertiary">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 text-sm tabular-nums text-text-secondary">
                    {formatCurrency(member.dayRate)}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-bg-elevated p-4">
            <h3 className="text-sm font-semibold text-text-primary">
              Subcontractors ·{" "}
              {day.subcontractors.reduce((n, s) => n + s.headcount, 0)} heads
            </h3>
            <ul className="mt-3 divide-y divide-neutral-100">
              {day.subcontractors.map((sub) => (
                <li
                  key={`${sub.id}-${sub.trade}`}
                  className="flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-text-primary">
                      {sub.company}
                    </p>
                    <p className="truncate text-xs text-text-tertiary">
                      {sub.trade} · {sub.headcount}{" "}
                      {sub.headcount === 1 ? "person" : "people"}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm tabular-nums text-text-secondary">
                      {formatCurrency(sub.dayCost)}
                    </p>
                    <p className="text-xs tabular-nums text-text-tertiary">
                      {formatCurrency(sub.billed)} billed
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-bg-elevated p-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-text-primary">
                Day profit margin
              </h3>
              <span className={`text-sm font-semibold ${marginTone}`}>
                {formatPercent(economics.margin)}
              </span>
            </div>

            <p
              className={`mt-3 text-[2.75rem] font-semibold leading-none tracking-tight ${marginTone}`}
              style={{
                animation: isOpen
                  ? "schedule-count-in 500ms cubic-bezier(0.22, 1, 0.36, 1) 80ms both"
                  : undefined,
              }}
            >
              {formatPercent(economics.margin)}
            </p>
            <p className="mt-2 text-sm text-text-secondary">
              Crew + sub cost vs. billed work for {formatWeekday(date)}{" "}
              {formatDayNumber(date)}.
            </p>

            <dl className="mt-5 grid grid-cols-2 gap-3">
              <Stat label="Revenue" value={formatCurrency(economics.revenue)} />
              <Stat label="Total cost" value={formatCurrency(economics.cost)} />
              <Stat label="Crew cost" value={formatCurrency(economics.crewCost)} />
              <Stat label="Sub cost" value={formatCurrency(economics.subCost)} />
            </dl>

            <div className="mt-4 flex items-center justify-between rounded-2xl bg-neutral-50 px-3 py-3">
              <span className="text-sm text-text-secondary">Day profit</span>
              <span className="text-base font-semibold tabular-nums text-text-primary">
                {formatCurrency(economics.profit)}
              </span>
            </div>

            <div className="mt-4">
              <div className="flex h-2.5 overflow-hidden rounded-full bg-neutral-100">
                <div
                  className="bg-brand-secondary transition-[width] duration-500 ease-out"
                  style={{
                    width: `${(economics.crewCost / economics.cost) * 100}%`,
                  }}
                />
                <div
                  className="bg-neutral-400 transition-[width] duration-500 ease-out"
                  style={{
                    width: `${(economics.subCost / economics.cost) * 100}%`,
                  }}
                />
              </div>
              <div className="mt-2 flex justify-between text-[11px] text-text-tertiary">
                <span>Crew cost</span>
                <span>Sub cost</span>
              </div>
            </div>
          </section>
        </div>

        <div className="shrink-0 border-t border-border-default bg-bg-default px-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))] pt-3">
          <button
            type="button"
            className="w-full rounded-2xl bg-cta py-4 text-base font-semibold text-white transition-colors hover:bg-cta-hover active:scale-[0.98]"
          >
            Adjust crew
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-neutral-50 px-3 py-2.5">
      <dt className="text-[11px] font-medium uppercase tracking-wide text-text-tertiary">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm font-semibold tabular-nums text-text-primary">
        {value}
      </dd>
    </div>
  );
}
