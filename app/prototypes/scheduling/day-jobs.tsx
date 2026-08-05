"use client";

import { CaretRight } from "@phosphor-icons/react";
import {
  formatCurrency,
  formatPercent,
  getDayEconomics,
  getJobDay,
  getStaffingHealth,
  staffingHeadcount,
  type Job,
  type StaffingHealth,
} from "./schedule-data";

interface DayJobsProps {
  date: string;
  jobs: Job[];
  onSelect: (jobId: string, date: string) => void;
}

const healthStyles: Record<
  StaffingHealth,
  { label: string; className: string }
> = {
  healthy: {
    label: "Healthy",
    className: "bg-status-success/12 text-status-success",
  },
  tight: {
    label: "Tight",
    className: "bg-status-warning/12 text-status-warning",
  },
  understaffed: {
    label: "Understaffed",
    className: "bg-status-error/12 text-status-error",
  },
};

export function DayJobs({ date, jobs, onSelect }: DayJobsProps) {
  const dayJobs = jobs
    .map((job) => {
      const day = getJobDay(job, date);
      return day ? { job, day } : null;
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  if (dayJobs.length === 0) {
    return (
      <div className="mx-4 rounded-3xl border border-dashed border-neutral-200 bg-bg-elevated/60 px-5 py-10 text-center">
        <p className="text-base font-semibold text-text-primary">No crews scheduled</p>
        <p className="mt-1 text-sm text-text-secondary">
          Nothing on jobsites for this day.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-3 px-4">
      {dayJobs.map(({ job, day }, index) => {
        const health = getStaffingHealth(day);
        const filled = staffingHeadcount(day);
        const economics = getDayEconomics(day);
        const meta = healthStyles[health];

        return (
          <li
            key={job.id}
            style={{
              animation: `schedule-fade-up 420ms cubic-bezier(0.22, 1, 0.36, 1) ${index * 60}ms both`,
            }}
          >
            <button
              type="button"
              onClick={() => onSelect(job.id, date)}
              className="group flex w-full items-stretch overflow-hidden rounded-3xl border border-neutral-200/80 bg-bg-elevated text-left shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-transform duration-150 active:scale-[0.98]"
            >
              <span
                className="w-1.5 shrink-0"
                style={{ backgroundColor: job.color }}
                aria-hidden
              />
              <div className="min-w-0 flex-1 px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-[17px] font-semibold tracking-tight text-text-primary">
                      {job.name}
                    </p>
                    <p className="mt-0.5 truncate text-sm text-text-secondary">
                      {job.client}
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
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${meta.className}`}
                  >
                    {meta.label}
                  </span>
                  <span className="text-xs text-text-tertiary">
                    {filled}/{day.requiredHeadcount} on site
                  </span>
                </div>

                <div className="mt-3 flex items-end justify-between gap-3 border-t border-neutral-100 pt-3">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wide text-text-tertiary">
                      Day margin
                    </p>
                    <p className="mt-0.5 text-lg font-semibold tabular-nums text-text-primary">
                      {formatPercent(economics.margin)}
                    </p>
                  </div>
                  <p className="text-sm tabular-nums text-text-secondary">
                    {formatCurrency(economics.profit)} profit
                  </p>
                </div>
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
