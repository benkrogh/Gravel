export function BudgetCard() {
  return (
    <section className="rounded-3xl bg-brand-primary px-6 py-7">
      <p className="text-sm font-medium text-white/80">Budget</p>
      <p className="mt-2 text-[2.5rem] font-semibold leading-none tracking-tight text-white">
        $12,500
      </p>
      <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-accent px-3 py-1.5">
        <span className="size-2 rounded-full bg-status-success" />
        <span className="text-sm font-medium text-brand-primary">On Track</span>
      </div>
    </section>
  );
}
