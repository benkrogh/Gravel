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
    slug: "example",
    title: "Example",
    description: "Starter template showing the design system in use",
  },
];

export function getPrototype(slug: string): Prototype | undefined {
  return prototypes.find((p) => p.slug === slug);
}
