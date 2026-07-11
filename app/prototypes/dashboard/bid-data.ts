export interface MaterialItem {
  label: string;
  description: string;
  estimatedCost: string;
}

export interface Bid {
  id: string;
  title: string;
  range: string;
  image: string;
  address: string;
  budget: string;
  timeline: string;
  proposalDue: string;
  materials: MaterialItem[];
  summary: string;
}

export const bids: Bid[] = [
  {
    id: "1",
    title: "Bathroom Remodel",
    range: "$12 – 17k",
    image:
      "https://images.unsplash.com/photo-1761673271363-6efe71f08d18?auto=format&fit=crop&w=1200&q=80",
    address: "1842 Oakridge Lane, Portland, OR 97209",
    budget: "$12,000 – $17,000",
    timeline: "6 – 8 weeks",
    proposalDue: "March 28, 2026",
    materials: [
      {
        label: "Tile",
        description:
          'Large-format matte porcelain in warm white (12×24") for shower walls and floor',
        estimatedCost: "$2,800 – $3,400",
      },
      {
        label: "Cabinets",
        description:
          "Floating vanity in white oak with soft-close drawers, no upper cabinets",
        estimatedCost: "$1,900 – $2,600",
      },
      {
        label: "Fixtures & hardware",
        description: "Brushed nickel shower system, faucet, and accessories",
        estimatedCost: "$1,200 – $1,800",
      },
      {
        label: "Color palette",
        description: "Warm whites, sand beige, brushed nickel, sage green accent",
        estimatedCost: "Allow $400 – $600",
      },
    ],
    summary:
      "Full gut remodel of primary bath including new walk-in shower, floating vanity, heated floors, and updated plumbing. Client prefers minimal, spa-like aesthetic with natural materials.",
  },
  {
    id: "2",
    title: "Deck & Porch",
    range: "$8 – 12k",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    address: "320 Cedar Hollow Dr, Bend, OR 97701",
    budget: "$8,000 – $12,000",
    timeline: "3 – 4 weeks",
    proposalDue: "April 5, 2026",
    materials: [
      {
        label: "Decking",
        description: "Composite decking in weathered gray with hidden fasteners",
        estimatedCost: "$3,200 – $4,100",
      },
      {
        label: "Railing",
        description: "Matte black aluminum railing with wood handrail cap",
        estimatedCost: "$1,400 – $1,900",
      },
      {
        label: "Built-in storage",
        description: "Bench storage along rear railing with hinged lid",
        estimatedCost: "$900 – $1,200",
      },
      {
        label: "Lighting",
        description: "Recessed stair lights and low-voltage post caps",
        estimatedCost: "$600 – $900",
      },
    ],
    summary:
      "Replace existing wraparound deck and front porch with composite decking, new railing, and integrated lighting. Must match existing craftsman home style.",
  },
  {
    id: "3",
    title: "Kitchen Refresh",
    range: "$15 – 22k",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
    address: "905 Willamette Blvd, Eugene, OR 97401",
    budget: "$15,000 – $22,000",
    timeline: "8 – 10 weeks",
    proposalDue: "April 12, 2026",
    materials: [
      {
        label: "Tile",
        description: "Subway tile backsplash in gloss white with dark grout",
        estimatedCost: "$800 – $1,100",
      },
      {
        label: "Cabinets",
        description: "Shaker-style cabinets in sage green with soft-close hinges",
        estimatedCost: "$6,500 – $8,200",
      },
      {
        label: "Countertops",
        description: "Quartz in calacatta pattern with eased edge profile",
        estimatedCost: "$3,400 – $4,200",
      },
      {
        label: "Color palette",
        description: "Sage green, warm white, brass hardware, natural oak shelving",
        estimatedCost: "Allow $500 – $750",
      },
    ],
    summary:
      "Kitchen update including cabinet refacing or replacement, new countertops, backsplash, and appliance relocation. Open to contractor recommendations on layout improvements.",
  },
];

export function getBid(id: string): Bid | undefined {
  return bids.find((bid) => bid.id === id);
}
