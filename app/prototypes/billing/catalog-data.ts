export type CatalogCategory = "labor" | "material";

export interface CatalogItem {
  id: string;
  category: CatalogCategory;
  name: string;
  unit: string;
  rate: number;
}

/** Searchable catalog of labor and material line items for the create flow. */
export const catalogItems: CatalogItem[] = [
  { id: "labor-general", category: "labor", name: "General labor", unit: "hr", rate: 45 },
  { id: "labor-carpenter", category: "labor", name: "Carpenter", unit: "hr", rate: 65 },
  { id: "labor-lead", category: "labor", name: "Project lead", unit: "hr", rate: 95 },
  { id: "labor-electrician", category: "labor", name: "Electrician", unit: "hr", rate: 85 },
  { id: "labor-plumber", category: "labor", name: "Plumber", unit: "hr", rate: 80 },
  { id: "labor-roofer", category: "labor", name: "Roofer", unit: "hr", rate: 60 },
  { id: "labor-painter", category: "labor", name: "Painter", unit: "hr", rate: 50 },
  { id: "labor-tile", category: "labor", name: "Tile setter", unit: "hr", rate: 68 },
  { id: "mat-lumber", category: "material", name: "2x4 lumber", unit: "ft", rate: 3 },
  { id: "mat-drywall", category: "material", name: "Drywall sheet (4x8)", unit: "sheet", rate: 14 },
  { id: "mat-concrete", category: "material", name: "Concrete", unit: "yd", rate: 145 },
  { id: "mat-paint", category: "material", name: "Paint", unit: "gallon", rate: 38 },
  { id: "mat-tile", category: "material", name: "Tile", unit: "sq ft", rate: 7 },
  { id: "mat-shingles", category: "material", name: "Roofing shingles", unit: "bundle", rate: 42 },
  { id: "mat-wire", category: "material", name: "Electrical wire", unit: "ft", rate: 2 },
  { id: "mat-pipe", category: "material", name: "PVC pipe", unit: "ft", rate: 3 },
  { id: "mat-hardware", category: "material", name: "Fasteners & hardware", unit: "box", rate: 22 },
  { id: "mat-permit", category: "material", name: "Permit & inspection fee", unit: "flat", rate: 350 },
];

export function searchCatalog(query: string): CatalogItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return catalogItems;
  return catalogItems.filter((item) => item.name.toLowerCase().includes(q));
}
