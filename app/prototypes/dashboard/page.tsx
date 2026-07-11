import Link from "next/link";
import { BottomNav } from "./bottom-nav";
import { BudgetCard } from "./budget-card";
import { BidsSection } from "./bids-section";
import { CrewSection } from "./crew-section";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Morning";
  if (hour < 17) return "Afternoon";
  return "Evening";
}

export default function DashboardPrototype() {
  return (
    <div className="flex min-h-screen items-start justify-center bg-neutral-200 py-8">
      <div className="relative flex h-[844px] w-[390px] flex-col overflow-hidden rounded-[3rem] bg-bg-default shadow-lg ring-1 ring-black/5">
        <Link
          href="/"
          className="absolute left-5 top-4 z-20 text-xs text-text-tertiary hover:text-text-secondary"
        >
          ← Prototypes
        </Link>

        <main className="flex-1 overflow-y-auto px-6 pb-28 pt-14">
          <h1 className="text-[2rem] font-semibold leading-tight tracking-tight text-text-primary">
            {getGreeting()}, Jay!
          </h1>

          <div className="mt-8 space-y-8">
            <CrewSection />
            <BudgetCard />
            <BidsSection />
          </div>
        </main>

        <BottomNav />
      </div>
    </div>
  );
}
