import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export function CtaSection() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-primary px-8 py-16 text-center sm:px-16 sm:py-20">
        <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-brand-secondary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-brand-accent/10 blur-3xl" />

        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Ready to get out of spreadsheets?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/80">
            Start free for 14 days. No credit card, no setup fees, and you
            can cancel anytime.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              id="get-started"
              href="#"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-brand-primary transition-transform hover:scale-[1.02]"
            >
              Get started free
              <ArrowRight size={16} weight="bold" />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Talk to sales
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
