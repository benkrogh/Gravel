import Image from "next/image";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";

export function FeatureRow({
  eyebrow,
  title,
  description,
  bullets,
  image,
  imageAlt,
  reverse,
}: {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  image: string;
  imageAlt: string;
  reverse?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center gap-12 lg:gap-20 lg:flex-row ${
        reverse ? "lg:flex-row-reverse" : ""
      }`}
    >
      <div className="w-full lg:w-1/2">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-neutral-100 shadow-lg">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="w-full lg:w-1/2">
        <span className="text-sm font-semibold uppercase tracking-wide text-brand-secondary">
          {eyebrow}
        </span>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
          {title}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-text-secondary">
          {description}
        </p>
        <ul className="mt-6 space-y-3">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3">
              <CheckCircle
                size={20}
                weight="fill"
                className="mt-0.5 shrink-0 text-brand-secondary"
              />
              <span className="text-sm text-text-secondary">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
