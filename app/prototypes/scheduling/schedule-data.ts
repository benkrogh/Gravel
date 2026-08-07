export type StaffingHealth = "healthy" | "tight" | "understaffed";

export interface CrewMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  dayRate: number;
}

export interface Subcontractor {
  id: string;
  company: string;
  trade: string;
  headcount: number;
  dayCost: number;
  billed: number;
}

export interface DayAssignment {
  date: string; // YYYY-MM-DD
  requiredHeadcount: number;
  crew: CrewMember[];
  subcontractors: Subcontractor[];
  notes?: string;
}

export interface Job {
  id: string;
  name: string;
  client: string;
  address: string;
  color: string;
  startDate: string;
  endDate: string;
  days: DayAssignment[];
}

/** Week of Mon Aug 3 – Sun Aug 9, 2026 */
export const WEEK_START = "2026-08-03";
export const TODAY = "2026-08-03";

export const jobs: Job[] = [
  {
    id: "ridgeview",
    name: "Ridgeview Addition",
    client: "Chen Residence",
    address: "214 Ridgeview Ct, Portland, OR",
    color: "#1b3012",
    startDate: "2026-08-03",
    endDate: "2026-08-08",
    days: [
      day("2026-08-03", 6, [
        crew("marcus", "Marcus T.", "Lead", "MT", 420),
        crew("elena", "Elena R.", "Carpenter", "ER", 340),
        crew("devon", "Devon K.", "Carpenter", "DK", 320),
        crew("sam", "Sam L.", "Laborer", "SL", 240),
      ], [
        sub("northform", "Northform Concrete", "Foundation", 2, 1800, 2600),
      ]),
      day("2026-08-04", 6, [
        crew("marcus", "Marcus T.", "Lead", "MT", 420),
        crew("elena", "Elena R.", "Carpenter", "ER", 340),
        crew("devon", "Devon K.", "Carpenter", "DK", 320),
        crew("priya", "Priya S.", "Apprentice", "PS", 220),
      ], [
        sub("northform", "Northform Concrete", "Foundation", 2, 1800, 2600),
        sub("alloy", "Alloy Steel Fab", "Rebar", 1, 950, 1400),
      ]),
      day("2026-08-05", 5, [
        crew("marcus", "Marcus T.", "Lead", "MT", 420),
        crew("elena", "Elena R.", "Carpenter", "ER", 340),
        crew("devon", "Devon K.", "Carpenter", "DK", 320),
        crew("sam", "Sam L.", "Laborer", "SL", 240),
        crew("priya", "Priya S.", "Apprentice", "PS", 220),
      ], [
        sub("northform", "Northform Concrete", "Foundation", 3, 2400, 3400),
      ]),
      day("2026-08-06", 5, [
        crew("marcus", "Marcus T.", "Lead", "MT", 420),
        crew("elena", "Elena R.", "Carpenter", "ER", 340),
        crew("devon", "Devon K.", "Carpenter", "DK", 320),
        crew("sam", "Sam L.", "Laborer", "SL", 240),
      ], [
        sub("cascade", "Cascade Framing Co.", "Framing", 3, 2100, 3100),
      ]),
      day("2026-08-07", 4, [
        crew("marcus", "Marcus T.", "Lead", "MT", 420),
        crew("elena", "Elena R.", "Carpenter", "ER", 340),
        crew("devon", "Devon K.", "Carpenter", "DK", 320),
      ], [
        sub("cascade", "Cascade Framing Co.", "Framing", 2, 1400, 2200),
      ]),
      day("2026-08-08", 3, [
        crew("marcus", "Marcus T.", "Lead", "MT", 420),
        crew("elena", "Elena R.", "Carpenter", "ER", 340),
      ], [
        sub("cascade", "Cascade Framing Co.", "Framing", 1, 700, 1100),
      ]),
    ],
  },
  {
    id: "harbor",
    name: "Harbor St Kitchen",
    client: "Walsh Homes",
    address: "88 Harbor St, Portland, OR",
    color: "#5e8d27",
    startDate: "2026-08-04",
    endDate: "2026-08-07",
    days: [
      day("2026-08-04", 5, [
        crew("jay", "Jay M.", "Lead", "JM", 400),
        crew("nina", "Nina P.", "Finish", "NP", 360),
      ], [
        sub("tileworks", "Tileworks NW", "Tile", 2, 1200, 1900),
      ], "Waiting on quartz template — one laborer short"),
      day("2026-08-05", 4, [
        crew("jay", "Jay M.", "Lead", "JM", 400),
        crew("nina", "Nina P.", "Finish", "NP", 360),
        crew("owen", "Owen B.", "Laborer", "OB", 230),
      ], [
        sub("tileworks", "Tileworks NW", "Tile", 2, 1200, 1900),
        sub("lumen", "Lumen Electric", "Rough-in", 1, 850, 1250),
      ]),
      day("2026-08-06", 3, [
        crew("jay", "Jay M.", "Lead", "JM", 400),
        crew("nina", "Nina P.", "Finish", "NP", 360),
        crew("owen", "Owen B.", "Laborer", "OB", 230),
      ], [
        sub("lumen", "Lumen Electric", "Devices", 1, 750, 1100),
      ]),
      day("2026-08-07", 3, [
        crew("jay", "Jay M.", "Lead", "JM", 400),
        crew("nina", "Nina P.", "Finish", "NP", 360),
        crew("owen", "Owen B.", "Laborer", "OB", 230),
      ], [
        sub("counterline", "Counterline Quartz", "Tops", 2, 1600, 2800),
      ]),
    ],
  },
  {
    id: "oakmont",
    name: "Oakmont Roof Tear-off",
    client: "Summit Property",
    address: "1502 Oakmont Ave, Beaverton, OR",
    color: "#404040",
    startDate: "2026-08-03",
    endDate: "2026-08-05",
    days: [
      day("2026-08-03", 6, [
        crew("rick", "Rick H.", "Lead", "RH", 380),
        crew("tina", "Tina V.", "Roofer", "TV", 300),
      ], [
        sub("skyline", "Skyline Roofing", "Tear-off", 2, 1600, 2200),
      ], "Two roofers called out — coverage is thin"),
      day("2026-08-04", 5, [
        crew("rick", "Rick H.", "Lead", "RH", 380),
        crew("tina", "Tina V.", "Roofer", "TV", 300),
        crew("cole", "Cole W.", "Laborer", "CW", 220),
      ], [
        sub("skyline", "Skyline Roofing", "Underlayment", 1, 900, 1400),
      ]),
      day("2026-08-05", 4, [
        crew("rick", "Rick H.", "Lead", "RH", 380),
        crew("tina", "Tina V.", "Roofer", "TV", 300),
        crew("cole", "Cole W.", "Laborer", "CW", 220),
        crew("amy", "Amy G.", "Laborer", "AG", 220),
      ], [
        sub("skyline", "Skyline Roofing", "Shingles", 2, 1800, 2700),
      ]),
    ],
  },
  {
    id: "mill",
    name: "Mill District Lobby",
    client: "Aperture Dev",
    address: "400 SE Mill St, Portland, OR",
    color: "#737373",
    startDate: "2026-08-06",
    endDate: "2026-08-12",
    days: [
      day("2026-08-06", 6, [
        crew("luis", "Luis A.", "Lead", "LA", 410),
        crew("kim", "Kim J.", "Carpenter", "KJ", 330),
      ], [
        sub("glasshaus", "Glasshaus", "Storefront", 2, 2400, 3600),
      ], "Glasshaus short a glazier — lobby install at risk"),
      day("2026-08-07", 5, [
        crew("luis", "Luis A.", "Lead", "LA", 410),
        crew("kim", "Kim J.", "Carpenter", "KJ", 330),
        crew("ben", "Ben R.", "Carpenter", "BR", 330),
      ], [
        sub("glasshaus", "Glasshaus", "Storefront", 2, 2400, 3600),
        sub("lumen", "Lumen Electric", "Lighting", 1, 900, 1350),
      ]),
      day("2026-08-08", 4, [
        crew("luis", "Luis A.", "Lead", "LA", 410),
        crew("kim", "Kim J.", "Carpenter", "KJ", 330),
        crew("ben", "Ben R.", "Carpenter", "BR", 330),
        crew("zoe", "Zoe F.", "Apprentice", "ZF", 210),
      ], [
        sub("polish", "Polish Floors Co.", "Concrete polish", 2, 1500, 2300),
      ]),
      day("2026-08-09", 3, [
        crew("luis", "Luis A.", "Lead", "LA", 410),
        crew("kim", "Kim J.", "Carpenter", "KJ", 330),
        crew("zoe", "Zoe F.", "Apprentice", "ZF", 210),
      ], [
        sub("polish", "Polish Floors Co.", "Concrete polish", 1, 900, 1400),
      ]),
      day("2026-08-10", 3, [
        crew("luis", "Luis A.", "Lead", "LA", 410),
        crew("kim", "Kim J.", "Carpenter", "KJ", 330),
        crew("ben", "Ben R.", "Carpenter", "BR", 330),
      ], [
        sub("polish", "Polish Floors Co.", "Punch list", 1, 700, 1100),
      ]),
      day("2026-08-11", 2, [
        crew("luis", "Luis A.", "Lead", "LA", 410),
        crew("kim", "Kim J.", "Carpenter", "KJ", 330),
      ], [
        sub("lumen", "Lumen Electric", "Final devices", 1, 650, 980),
      ]),
      day("2026-08-12", 2, [
        crew("luis", "Luis A.", "Lead", "LA", 410),
        crew("zoe", "Zoe F.", "Apprentice", "ZF", 210),
      ], [
        sub("polish", "Polish Floors Co.", "Walkthrough", 1, 500, 800),
      ]),
    ],
  },
];

function crew(
  id: string,
  name: string,
  role: string,
  initials: string,
  dayRate: number,
): CrewMember {
  return { id, name, role, initials, dayRate };
}

function sub(
  id: string,
  company: string,
  trade: string,
  headcount: number,
  dayCost: number,
  billed: number,
): Subcontractor {
  return { id, company, trade, headcount, dayCost, billed };
}

function day(
  date: string,
  requiredHeadcount: number,
  crewMembers: CrewMember[],
  subcontractors: Subcontractor[],
  notes?: string,
): DayAssignment {
  return { date, requiredHeadcount, crew: crewMembers, subcontractors, notes };
}

export function getWeekDates(weekStart = WEEK_START): string[] {
  const start = parseDate(weekStart);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return formatDate(d);
  });
}

export function getJobDay(job: Job, date: string): DayAssignment | undefined {
  return job.days.find((d) => d.date === date);
}

export function staffingHeadcount(day: DayAssignment): number {
  const crewCount = day.crew.length;
  const subCount = day.subcontractors.reduce((sum, s) => sum + s.headcount, 0);
  return crewCount + subCount;
}

export function getStaffingHealth(day: DayAssignment): StaffingHealth {
  const filled = staffingHeadcount(day);
  const ratio = filled / day.requiredHeadcount;
  if (ratio >= 1) return "healthy";
  if (ratio >= 0.75) return "tight";
  return "understaffed";
}

export function getDayEconomics(day: DayAssignment) {
  const crewCost = day.crew.reduce((sum, m) => sum + m.dayRate, 0);
  const subCost = day.subcontractors.reduce((sum, s) => sum + s.dayCost, 0);
  const revenue = day.subcontractors.reduce((sum, s) => sum + s.billed, 0) + crewCost * 1.55;
  const cost = crewCost + subCost;
  const profit = revenue - cost;
  const margin = revenue > 0 ? profit / revenue : 0;
  return { crewCost, subCost, cost, revenue, profit, margin };
}

export function jobSpansDate(job: Job, date: string): boolean {
  return date >= job.startDate && date <= job.endDate;
}

export function parseDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function formatWeekday(iso: string): string {
  return parseDate(iso).toLocaleDateString("en-US", { weekday: "short" });
}

export function formatDayNumber(iso: string): string {
  return String(parseDate(iso).getDate());
}

export function formatMonthYear(iso: string): string {
  return parseDate(iso).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export function formatMonth(iso: string): string {
  return parseDate(iso).toLocaleDateString("en-US", { month: "long" });
}

/** Monday-start week containing the given date. */
export function startOfWeek(iso: string): string {
  const date = parseDate(iso);
  const day = date.getDay(); // 0 Sun … 6 Sat
  const offset = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + offset);
  return formatDate(date);
}

export function addDays(iso: string, days: number): string {
  const date = parseDate(iso);
  date.setDate(date.getDate() + days);
  return formatDate(date);
}

export function shiftWeek(weekStart: string, weeks: number): string {
  return addDays(weekStart, weeks * 7);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercent(ratio: number): string {
  return `${Math.round(ratio * 100)}%`;
}
