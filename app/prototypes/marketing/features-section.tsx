import { FeatureRow } from "./feature-row";

const features = [
  {
    eyebrow: "Cost tracking",
    title: "Know where every dollar goes",
    description:
      "Every receipt, invoice, and labor hour rolls up into a live budget-versus-actual view, so you catch overruns before they eat your margin.",
    bullets: [
      "Live budget vs. actual, updated automatically",
      "Snap a photo of a receipt to log an expense",
      "Job profitability at a glance, on every project",
    ],
    image:
      "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "A home renovation project mid-progress with exposed framing",
  },
  {
    eyebrow: "Bids & estimates",
    title: "Win more work with less effort",
    description:
      "Start from a template, adjust line items in seconds, and send a polished bid your client can approve and sign from their phone.",
    bullets: [
      "Reusable templates for common job types",
      "Instant line-item edits — no re-typing the whole bid",
      "Client e-signatures, so approvals happen same-day",
    ],
    image:
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Two people reviewing hand-drawn architectural plans",
  },
  {
    eyebrow: "Crew management",
    title: "Your crew, organized",
    description:
      "Onboard new hires, assign them to jobs, and track hours worked — all in the same app they already use to check their schedule.",
    bullets: [
      "Assign and schedule jobs in a couple taps",
      "Built-in time tracking and job checklists",
      "In-app messaging keeps the whole crew aligned",
    ],
    image:
      "https://images.unsplash.com/photo-1618090584176-7132b9911657?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "A carpenter working on a wood-paneled wall with a drill",
  },
  {
    eyebrow: "Bill pay",
    title: "Get paid, pay out — simple",
    description:
      "Collect client payments and pay your subcontractors from the same place you manage the job, with automatic invoicing and bank-level security.",
    bullets: [
      "One-tap contractor and vendor payouts",
      "Invoices generated automatically from the bid",
      "Bank-level encryption on every transaction",
    ],
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Two business partners shaking hands over a deal",
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-bg-subtle py-24">
      <div className="mx-auto max-w-7xl space-y-24 px-6 lg:space-y-32 lg:px-8">
        {features.map((feature, index) => (
          <FeatureRow key={feature.title} {...feature} reverse={index % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
