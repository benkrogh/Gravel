import Link from "next/link";
import { prototypes } from "@/app/prototypes/registry";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-bg-subtle">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <header className="mb-12">
          <h1 className="text-3xl font-semibold text-text-primary">Gravel</h1>
          <p className="mt-2 text-text-secondary">
            Design prototypes for a services scheduling and operations tool for contractors.
          </p>
        </header>

        <section>
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-text-tertiary">
            Prototypes
          </h2>

          {prototypes.length === 0 ? (
            <p className="text-text-secondary">No prototypes yet.</p>
          ) : (
            <ul className="divide-y divide-border-default rounded-lg border border-border-default bg-bg-elevated">
              {prototypes.map((prototype) => (
                <li key={prototype.slug}>
                  <Link
                    href={`/prototypes/${prototype.slug}`}
                    className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-neutral-50"
                  >
                    <div>
                      <span className="font-medium text-text-primary">{prototype.title}</span>
                      {prototype.description && (
                        <p className="mt-0.5 text-sm text-text-secondary">{prototype.description}</p>
                      )}
                    </div>
                    <span className="text-text-tertiary">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
