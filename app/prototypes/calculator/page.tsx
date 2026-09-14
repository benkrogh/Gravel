"use client";

import { useState } from "react";
import { BottomNav } from "./bottom-nav";
import {
  cloneJobs,
  getPortfolioSummary,
  type CalcJob,
} from "./calculator-data";
import { JobCalculatorSheet } from "./job-calculator-sheet";
import { JobList } from "./job-list";
import { SummaryCard } from "./summary-card";
import { VerdictFilter, type VerdictFilterValue } from "./verdict-filter";

export default function CalculatorPrototype() {
  const [jobs, setJobs] = useState<CalcJob[]>(cloneJobs);
  const [filter, setFilter] = useState<VerdictFilterValue>("all");
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const selectedJob = jobs.find((job) => job.id === selectedJobId) ?? null;
  const summary = getPortfolioSummary(jobs);

  function handleChange(next: CalcJob) {
    setJobs((prev) => prev.map((job) => (job.id === next.id ? next : job)));
  }

  return (
    <>
      <main className="min-h-0 flex-1 overflow-y-auto pb-28 pt-[max(3.5rem,env(safe-area-inset-top,0px))]">
        <header className="px-4">
          <p className="text-sm font-medium text-brand-secondary">Internal</p>
          <h1 className="mt-1 text-[2rem] font-semibold leading-tight tracking-tight text-text-primary">
            Profitability
          </h1>
        </header>

        <div className="mt-5 px-4">
          <SummaryCard summary={summary} />
        </div>

        <div className="mt-6">
          <VerdictFilter value={filter} onChange={setFilter} />
        </div>

        <div className="mt-4">
          <JobList jobs={jobs} filter={filter} onSelect={setSelectedJobId} />
        </div>
      </main>

      <BottomNav active="calculator" />

      {selectedJob ? (
        <JobCalculatorSheet
          key={selectedJob.id}
          job={selectedJob}
          onClose={() => setSelectedJobId(null)}
          onChange={handleChange}
        />
      ) : null}
    </>
  );
}
