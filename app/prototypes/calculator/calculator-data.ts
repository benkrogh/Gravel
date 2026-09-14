export type CostCategory = "labor" | "material" | "sub";
export type JobVerdict = "take" | "tight" | "pass";

export interface CostLine {
  id: string;
  category: CostCategory;
  label: string;
  unit: string;
  qty: number;
  unitCost: number;
}

export interface CalcJob {
  id: string;
  title: string;
  client: string;
  address: string;
  summary: string;
  image: string;
  color: string;
  timeline: string;
  proposalDue: string;
  budgetMin: number;
  budgetMax: number;
  overheadPct: number;
  targetMarginPct: number;
  lines: CostLine[];
}

export interface JobEconomics {
  labor: number;
  materials: number;
  subs: number;
  directCost: number;
  overheadAmount: number;
  loadedCost: number;
  askPrice: number;
  profitAtAsk: number;
  marginAtAsk: number;
  profitAtCeiling: number;
  marginAtCeiling: number;
}

const DEFAULT_OVERHEAD = 0.12;
const DEFAULT_MARGIN = 0.25;
const SQUEEZE_MIN_MARGIN = 0.1;

function line(
  id: string,
  category: CostCategory,
  label: string,
  unit: string,
  qty: number,
  unitCost: number,
): CostLine {
  return { id, category, label, unit, qty, unitCost };
}

/**
 * Seeded from the dashboard bid opportunities (Bathroom, Deck, Kitchen).
 * Costs are contractor cost — not client-facing prices.
 */
export const seedJobs: CalcJob[] = [
  {
    id: "1",
    title: "Bathroom Remodel",
    client: "Oakridge Residence",
    address: "1842 Oakridge Lane, Portland, OR 97209",
    summary:
      "Full gut remodel of primary bath including new walk-in shower, floating vanity, heated floors, and updated plumbing. Client prefers a minimal, spa-like finish.",
    image:
      "https://images.unsplash.com/photo-1761673271363-6efe71f08d18?auto=format&fit=crop&w=1200&q=80",
    color: "#1b3012",
    timeline: "6 – 8 weeks",
    proposalDue: "March 28, 2026",
    budgetMin: 12000,
    budgetMax: 17000,
    overheadPct: DEFAULT_OVERHEAD,
    targetMarginPct: DEFAULT_MARGIN,
    lines: [
      line("bath-demo", "labor", "Demo & haul-off", "hr", 24, 45),
      line("bath-tile", "labor", "Tile setter", "hr", 48, 68),
      line("bath-carp", "labor", "Carpenter — vanity & trim", "hr", 20, 65),
      line("bath-plumb", "labor", "Plumber", "hr", 16, 80),
      line("bath-porcelain", "material", "Porcelain tile", "sq ft", 180, 12),
      line("bath-vanity", "material", "Floating oak vanity", "flat", 1, 2200),
      line("bath-fixtures", "material", "Shower system & faucet", "flat", 1, 1500),
      line("bath-heat", "material", "Heated floor kit", "flat", 1, 750),
      line("bath-membrane", "material", "Waterproofing materials", "flat", 1, 420),
      line("bath-sub", "sub", "Waterproofing specialist", "flat", 1, 800),
    ],
  },
  {
    id: "2",
    title: "Deck & Porch",
    client: "Cedar Hollow",
    address: "320 Cedar Hollow Dr, Bend, OR 97701",
    summary:
      "Replace the wraparound deck and front porch with composite decking, new railing, and integrated lighting. Needs to match the existing craftsman home.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    color: "#5e8d27",
    timeline: "3 – 4 weeks",
    proposalDue: "April 5, 2026",
    budgetMin: 8000,
    budgetMax: 12000,
    overheadPct: DEFAULT_OVERHEAD,
    targetMarginPct: DEFAULT_MARGIN,
    lines: [
      line("deck-carp", "labor", "Carpenter", "hr", 32, 65),
      line("deck-gen", "labor", "General labor", "hr", 16, 45),
      line("deck-boards", "material", "Composite decking", "sq ft", 280, 8),
      line("deck-rail", "material", "Aluminum railing", "ft", 40, 18),
      line("deck-light", "material", "Stair & post lighting kit", "flat", 1, 450),
      line("deck-sub", "sub", "Low-voltage electrician", "flat", 1, 800),
    ],
  },
  {
    id: "3",
    title: "Kitchen Refresh",
    client: "Willamette Blvd",
    address: "905 Willamette Blvd, Eugene, OR 97401",
    summary:
      "Kitchen update including cabinet replacement, new quartz, backsplash, and a sink relocate. Open to layout improvements if the numbers still work.",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
    color: "#404040",
    timeline: "8 – 10 weeks",
    proposalDue: "April 12, 2026",
    budgetMin: 15000,
    budgetMax: 22000,
    overheadPct: DEFAULT_OVERHEAD,
    targetMarginPct: DEFAULT_MARGIN,
    lines: [
      line("kit-carp", "labor", "Carpenter", "hr", 56, 65),
      line("kit-cab", "labor", "Cabinet install", "hr", 32, 70),
      line("kit-paint", "labor", "Painter", "hr", 16, 50),
      line("kit-plumb", "labor", "Plumber — sink relocate", "hr", 4, 80),
      line("kit-cabinets", "material", "Shaker cabinets", "flat", 1, 5200),
      line("kit-quartz", "material", "Quartz countertop", "sq ft", 40, 70),
      line("kit-tile", "material", "Subway tile", "sq ft", 40, 8),
      line("kit-hw", "material", "Brass hardware", "flat", 1, 480),
    ],
  },
];

export function cloneJobs(): CalcJob[] {
  return structuredClone(seedJobs);
}

export function getLineTotal(item: CostLine): number {
  return item.qty * item.unitCost;
}

export function getCategoryTotal(
  job: CalcJob,
  category: CostCategory,
): number {
  return job.lines
    .filter((item) => item.category === category)
    .reduce((sum, item) => sum + getLineTotal(item), 0);
}

export function getEconomics(job: CalcJob): JobEconomics {
  const labor = getCategoryTotal(job, "labor");
  const materials = getCategoryTotal(job, "material");
  const subs = getCategoryTotal(job, "sub");
  const directCost = labor + materials + subs;
  const overheadAmount = directCost * job.overheadPct;
  const loadedCost = directCost + overheadAmount;
  const marginCap = Math.min(Math.max(job.targetMarginPct, 0), 0.9);
  const askPrice = marginCap >= 0.9 ? loadedCost * 10 : loadedCost / (1 - marginCap);
  const profitAtAsk = askPrice - loadedCost;
  const marginAtAsk = askPrice > 0 ? profitAtAsk / askPrice : 0;
  const profitAtCeiling = job.budgetMax - loadedCost;
  const marginAtCeiling =
    job.budgetMax > 0 ? profitAtCeiling / job.budgetMax : 0;

  return {
    labor,
    materials,
    subs,
    directCost,
    overheadAmount,
    loadedCost,
    askPrice,
    profitAtAsk,
    marginAtAsk,
    profitAtCeiling,
    marginAtCeiling,
  };
}

export function getVerdict(job: CalcJob): JobVerdict {
  const economics = getEconomics(job);
  if (economics.askPrice <= job.budgetMax) return "take";
  if (economics.marginAtCeiling >= SQUEEZE_MIN_MARGIN) return "tight";
  return "pass";
}

export const verdictMeta: Record<
  JobVerdict,
  { label: string; detail: string; chip: string; tone: string }
> = {
  take: {
    label: "Fits",
    detail: "You can hit your target margin inside their budget.",
    chip: "bg-status-success/12 text-status-success",
    tone: "text-status-success",
  },
  tight: {
    label: "Squeeze",
    detail: "It pencils, but only below your target margin.",
    chip: "bg-status-warning/12 text-status-warning",
    tone: "text-status-warning",
  },
  pass: {
    label: "Pass",
    detail: "Even at their ceiling, this job doesn’t pay.",
    chip: "bg-status-error/12 text-status-error",
    tone: "text-status-error",
  },
};

export function formatCurrency(amount: number): string {
  const abs = Math.abs(Math.round(amount));
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(abs);
  return amount < 0 ? `−${formatted}` : formatted;
}

export function formatPercent(ratio: number): string {
  return `${Math.round(ratio * 100)}%`;
}

export function formatBudgetRange(min: number, max: number): string {
  return `$${Math.round(min / 1000)} – ${Math.round(max / 1000)}k`;
}

export function formatLineDetail(item: CostLine): string {
  if (item.unit === "flat") {
    return `${formatCurrency(item.unitCost)} flat`;
  }
  return `${item.qty} ${item.unit} @ ${formatCurrency(item.unitCost)}/${item.unit}`;
}

export function updateLineQty(
  job: CalcJob,
  lineId: string,
  delta: number,
): CalcJob {
  return {
    ...job,
    lines: job.lines.map((item) =>
      item.id === lineId
        ? { ...item, qty: Math.max(item.qty + delta, 0) }
        : item,
    ),
  };
}

export interface PortfolioSummary {
  jobCount: number;
  takeCount: number;
  tightCount: number;
  passCount: number;
  askTotal: number;
  targetMarginPct: number;
}

export function getPortfolioSummary(jobs: CalcJob[]): PortfolioSummary {
  let takeCount = 0;
  let tightCount = 0;
  let passCount = 0;
  let askTotal = 0;

  for (const job of jobs) {
    const verdict = getVerdict(job);
    if (verdict === "take") takeCount += 1;
    else if (verdict === "tight") tightCount += 1;
    else passCount += 1;
    askTotal += getEconomics(job).askPrice;
  }

  const targetMarginPct =
    jobs.reduce((sum, job) => sum + job.targetMarginPct, 0) /
    Math.max(jobs.length, 1);

  return {
    jobCount: jobs.length,
    takeCount,
    tightCount,
    passCount,
    askTotal,
    targetMarginPct,
  };
}
