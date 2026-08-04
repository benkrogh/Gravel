import { Quotes } from "@phosphor-icons/react/dist/ssr";

const testimonials = [
  {
    quote:
      "We used to spend Sunday nights reconciling receipts. Now I know exactly where every job stands before I even get out of the truck.",
    name: "Marcus Tran",
    role: "Owner, Tran & Sons Construction",
    initials: "MT",
    color: "#5e8d27",
  },
  {
    quote:
      "Bids that used to take me an afternoon now take fifteen minutes. We're closing more work simply because we respond faster.",
    name: "Elena Reyes",
    role: "Founder, Reyes Renovations",
    initials: "ER",
    color: "#1b3012",
  },
  {
    quote:
      "Paying my crew and subs used to mean three different apps and a checkbook. Gravel is the only one I open now.",
    name: "Devon Kessler",
    role: "General Contractor, Kessler Build Co.",
    initials: "DK",
    color: "#737373",
  },
];

export function TestimonialsSection() {
  return (
    <section id="customers" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
          Trusted by crews who'd rather be building
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-text-secondary">
          Thousands of contractors run their day-to-day business on Gravel.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.name}
            className="flex flex-col rounded-3xl border border-border-default bg-bg-elevated p-8"
          >
            <Quotes size={28} weight="fill" className="text-brand-accent" />
            <blockquote className="mt-4 flex-1 text-base leading-relaxed text-text-primary">
              "{testimonial.quote}"
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span
                className="flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: testimonial.color }}
              >
                {testimonial.initials}
              </span>
              <div>
                <p className="text-sm font-semibold text-text-primary">
                  {testimonial.name}
                </p>
                <p className="text-sm text-text-tertiary">{testimonial.role}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
