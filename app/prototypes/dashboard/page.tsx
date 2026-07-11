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
    <>
      <main className="flex-1 overflow-y-auto pb-28 pt-[max(3.5rem,env(safe-area-inset-top,0px))]">
        <div className="px-4">
          <h1 className="text-[2rem] font-semibold leading-tight tracking-tight text-text-primary">
            {getGreeting()}, Jay!
          </h1>

          <div className="mt-8 space-y-8">
            <CrewSection />
            <BudgetCard />
          </div>
        </div>

        <BidsSection />
      </main>

      <BottomNav />
    </>
  );
}
