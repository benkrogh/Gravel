"use client";

import {
  formatDayNumber,
  formatWeekday,
  getJobDay,
  getStaffingHealth,
  jobSpansDate,
  jobs,
  type StaffingHealth,
} from "./schedule-data";

interface DayStripProps {
  dates: string[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

const worstHealthRank: Record<StaffingHealth, number> = {
  healthy: 0,
  tight: 1,
  understaffed: 2,
};

function dayHealth(date: string): StaffingHealth | null {
  let worst: StaffingHealth | null = null;
  for (const job of jobs) {
    if (!jobSpansDate(job, date)) continue;
    const day = getJobDay(job, date);
    if (!day) continue;
    const health = getStaffingHealth(day);
    if (!worst || worstHealthRank[health] > worstHealthRank[worst]) {
      worst = health;
    }
  }
  return worst;
}

const healthDot: Record<StaffingHealth, string> = {
  healthy: "bg-status-success",
  tight: "bg-status-warning",
  understaffed: "bg-status-error",
};

export function DayStrip({ dates, selectedDate, onSelectDate }: DayStripProps) {
  return (
    <div className="flex gap-1.5 overflow-x-auto px-4 pb-1">
      {dates.map((date) => {
        const selected = date === selectedDate;
        const isToday = date === "2026-08-03";
        const health = dayHealth(date);

        return (
          <button
            key={date}
            type="button"
            onClick={() => onSelectDate(date)}
            className={`relative flex w-[3.15rem] shrink-0 flex-col items-center rounded-2xl px-1 py-2.5 transition-all duration-200 active:scale-95 ${
              selected
                ? "bg-cta text-white shadow-[0_6px_16px_rgba(3,4,3,0.28)]"
                : "bg-transparent text-text-secondary"
            }`}
            aria-pressed={selected}
            aria-label={`${formatWeekday(date)} ${formatDayNumber(date)}`}
          >
            <span
              className={`text-[11px] font-medium uppercase tracking-wide ${
                selected ? "text-white/70" : "text-text-tertiary"
              }`}
            >
              {formatWeekday(date).slice(0, 1)}
            </span>
            <span
              className={`mt-1 flex size-8 items-center justify-center text-[15px] font-semibold tabular-nums ${
                selected
                  ? "text-white"
                  : isToday
                    ? "text-brand-secondary"
                    : "text-text-primary"
              }`}
            >
              {formatDayNumber(date)}
            </span>
            {health ? (
              <span
                className={`mt-1 size-1.5 rounded-full ${
                  selected ? "bg-white/80" : healthDot[health]
                }`}
                aria-hidden
              />
            ) : (
              <span className="mt-1 size-1.5" aria-hidden />
            )}
          </button>
        );
      })}
    </div>
  );
}
