import type { Icon } from "@phosphor-icons/react";
import {
  ChartLineUp,
  ClipboardText,
  HardHat,
  Wallet,
} from "@phosphor-icons/react/dist/ssr";

const valueProps: {
  icon: Icon;
  title: string;
  description: string;
}[] = [
  {
    icon: ChartLineUp,
    title: "Track every dollar",
    description:
      "See real-time costs against your budget on every job, so nothing slips through the cracks.",
  },
  {
    icon: ClipboardText,
    title: "Bids in minutes, not days",
    description:
      "Build professional bids from templates, adjust line items on the fly, and send for e-signature.",
  },
  {
    icon: HardHat,
    title: "Hire and manage your crew",
    description:
      "Onboard workers, assign jobs, track hours, and keep everyone on the same page.",
  },
  {
    icon: Wallet,
    title: "Bill pay, made simple",
    description:
      "Pay contractors and vendors in a couple taps — no more chasing checks or spreadsheets.",
  },
];

export function ValuePropsSection() {
  return (
    <section id="product" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
          Everything your business needs, in one app
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-text-secondary">
          Gravel replaces the spreadsheets, sticky notes, and group texts with
          one calm, connected workspace.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {valueProps.map(({ icon: IconComponent, title, description }) => (
          <div key={title}>
            <div className="flex size-12 items-center justify-center rounded-2xl bg-brand-accent text-brand-primary">
              <IconComponent size={24} weight="duotone" />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-text-primary">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
