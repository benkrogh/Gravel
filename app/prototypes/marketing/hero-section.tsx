import Image from "next/image";
import { ArrowRight, Star } from "@phosphor-icons/react/dist/ssr";

const stats = [
  { value: "$120M+", label: "in bids sent" },
  { value: "15,000+", label: "jobs tracked" },
  { value: "4.9", label: "average rating", icon: true },
];

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-neutral-950">
      <Image
        src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2400&q=80"
        alt="A contracting crew in hard hats reviewing a large construction site"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/60 via-transparent to-transparent" />

      <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-6 pb-24 pt-32 sm:pt-36 lg:px-8 lg:pt-40">
        <div className="max-w-xl">
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
            Built for contracting businesses
          </span>

          <h1 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            The business side of contracting, finally simple.
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-white/80">
            Track job costs, send bids in minutes, manage your crew, and pay
            contractors — all from one elegant app built for the field and
            the office.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#get-started"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-neutral-950 transition-transform hover:scale-[1.02]"
            >
              Get started free
              <ArrowRight size={16} weight="bold" />
            </a>
            <a
              href="#product"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              See how it works
            </a>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-white/15 pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="flex items-center gap-1.5 text-2xl font-semibold text-white">
                  {stat.value}
                  {stat.icon && (
                    <Star size={16} weight="fill" className="text-brand-secondary" />
                  )}
                </div>
                <p className="mt-0.5 text-sm text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
