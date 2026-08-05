export interface Prototype {
  slug: string;
  title: string;
  description?: string;
}

/**
 * Register prototypes here to appear on the home page index.
 * Each prototype lives at app/prototypes/[slug]/page.tsx
 */
export const prototypes: Prototype[] = [
  {
    slug: "dashboard",
    title: "Home Dashboard",
    description: "Mobile home screen — budget, crew, bids, and navigation",
  },
  {
    slug: "marketing",
    title: "Marketing Website",
    description: "Public landing page — cost tracking, bids, crew, and billpay",
  },
  {
    slug: "scheduling",
    title: "Crew Schedule",
    description:
      "Week calendar of jobsites — click in for staffing health and day profit margin",
  },
  {
    slug: "example",
    title: "Example",
    description: "Starter template showing the design system in use",
  },
];

export function getPrototype(slug: string): Prototype | undefined {
  return prototypes.find((p) => p.slug === slug);
}
