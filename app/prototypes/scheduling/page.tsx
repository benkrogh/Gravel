"use client";

import { useState } from "react";
import { BottomNav } from "./bottom-nav";
import { DayJobs } from "./day-jobs";
import { DayStrip } from "./day-strip";
import { JobDetailSheet } from "./job-detail-sheet";
import {
  WEEK_START,
  formatDayNumber,
  formatWeekday,
  getJobDay,
  getStaffingHealth,
  getWeekDates,
  jobs,
  parseDate,
  type StaffingHealth,
} from "./schedule-data";

const dates = getWeekDates(WEEK_START);
const TODAY = "2026-08-03";

function dayCounts(date: string) {
  const counts: Record<StaffingHealth, number> = {
    healthy: 0,
    tight: 0,
    understaffed: 0,
  };
  let total = 0;
  for (const job of jobs) {
    const day = getJobDay(job, date);
    if (!day) continue;
    total += 1;
    counts[getStaffingHealth(day)] += 1;
  }
  return { ...counts, total };
}

export default function SchedulingPrototype() {
  const [selectedDate, setSelectedDate] = useState(TODAY);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const selectedJob = jobs.find((j) => j.id === selectedJobId) ?? null;
  const counts = dayCounts(selectedDate);
  const dateObj = parseDate(selectedDate);
  const headingDate = dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
  const isToday = selectedDate === TODAY;

  function handleSelect(jobId: string, date: string) {
    setSelectedJobId(jobId);
    setSelectedDate(date);
  }

  return (
    <>
      <main className="flex-1 overflow-y-auto pb-28 pt-[max(3.5rem,env(safe-area-inset-top,0px))]">
        <header className="px-4">
          <p className="text-sm font-medium text-brand-secondary">
            {isToday ? "Today" : formatWeekday(selectedDate)}
          </p>
          <h1 className="mt-1 text-[2rem] font-semibold leading-tight tracking-tight text-text-primary">
            Schedule
          </h1>
        </header>

        <div className="mt-5">
          <DayStrip
            dates={dates}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        </div>

        <div className="mt-5 px-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-text-primary">
                {headingDate}
              </h2>
              <p className="mt-0.5 text-sm text-text-secondary">
                {counts.total === 0
                  ? "No active jobsites"
                  : `${counts.total} jobsite${counts.total === 1 ? "" : "s"} active`}
              </p>
            </div>
            {counts.total > 0 ? (
              <div className="flex items-center gap-2 text-xs text-text-tertiary">
                {counts.understaffed > 0 ? (
                  <HealthPill tone="understaffed" count={counts.understaffed} />
                ) : null}
                {counts.tight > 0 ? (
                  <HealthPill tone="tight" count={counts.tight} />
                ) : null}
                {counts.healthy > 0 ? (
                  <HealthPill tone="healthy" count={counts.healthy} />
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        <div
          key={selectedDate}
          className="mt-4"
          style={{
            animation: "schedule-fade-up 320ms cubic-bezier(0.22, 1, 0.36, 1) both",
          }}
        >
          <DayJobs date={selectedDate} jobs={jobs} onSelect={handleSelect} />
        </div>

        <p className="mt-6 px-4 text-center text-xs text-text-tertiary">
          Week of Aug {formatDayNumber(dates[0])}–{formatDayNumber(dates[6])}
        </p>
      </main>

      <BottomNav active="jobs" />

      {selectedJob ? (
        <JobDetailSheet
          key={selectedJob.id}
          job={selectedJob}
          date={selectedDate}
          onClose={() => setSelectedJobId(null)}
          onSelectDate={setSelectedDate}
        />
      ) : null}
    </>
  );
}

function HealthPill({
  tone,
  count,
}: {
  tone: StaffingHealth;
  count: number;
}) {
  const styles =
    tone === "healthy"
      ? "bg-status-success/12 text-status-success"
      : tone === "tight"
        ? "bg-status-warning/12 text-status-warning"
        : "bg-status-error/12 text-status-error";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 font-semibold tabular-nums ${styles}`}
    >
      {count}
    </span>
  );
}
