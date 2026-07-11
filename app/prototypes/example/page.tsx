import Link from "next/link";

export default function ExamplePrototype() {
  return (
    <main className="min-h-screen bg-bg-default">
      <header className="border-b border-border-default bg-bg-elevated px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div>
            <Link href="/" className="text-sm text-text-tertiary hover:text-text-secondary">
              ← All prototypes
            </Link>
            <h1 className="mt-1 text-xl font-semibold text-text-primary">Example</h1>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10">
        <p className="mb-8 text-text-secondary">
          Use this as a starting point for new prototypes. Copy the folder, update the registry,
          and build your design.
        </p>

        {/* Color swatches */}
        <section className="mb-10">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-text-tertiary">
            Colors
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Swatch label="Primary" className="bg-brand-primary" />
            <Swatch label="Neutral 100" className="bg-neutral-100" />
            <Swatch label="Neutral 500" className="bg-neutral-500" />
            <Swatch label="Neutral 900" className="bg-neutral-900" />
          </div>
        </section>

        {/* Typography */}
        <section className="mb-10">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-text-tertiary">
            Typography
          </h2>
          <div className="space-y-3 rounded-lg border border-border-default p-6">
            <p className="text-3xl font-semibold">Heading — DM Sans 600</p>
            <p className="text-base">Body — DM Sans 400</p>
            <p className="text-sm text-text-secondary">Secondary — DM Sans 400</p>
          </div>
        </section>

        {/* Status badges */}
        <section>
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-text-tertiary">
            Status
          </h2>
          <div className="flex flex-wrap gap-2">
            <Badge color="success">Scheduled</Badge>
            <Badge color="warning">Pending</Badge>
            <Badge color="error">Cancelled</Badge>
            <Badge color="info">In progress</Badge>
          </div>
        </section>
      </div>
    </main>
  );
}

function Swatch({ label, className }: { label: string; className: string }) {
  return (
    <div>
      <div className={`h-16 rounded-lg ${className}`} />
      <p className="mt-2 text-sm text-text-secondary">{label}</p>
    </div>
  );
}

function Badge({
  children,
  color,
}: {
  children: React.ReactNode;
  color: "success" | "warning" | "error" | "info";
}) {
  const colorClasses = {
    success: "bg-status-success/10 text-status-success",
    warning: "bg-status-warning/10 text-status-warning",
    error: "bg-status-error/10 text-status-error",
    info: "bg-status-info/10 text-status-info",
  };

  return (
    <span className={`rounded-full px-3 py-1 text-sm font-medium ${colorClasses[color]}`}>
      {children}
    </span>
  );
}
