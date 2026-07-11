import Image from "next/image";

const bids = [
  {
    id: "1",
    title: "Bathroom Remodel",
    range: "$12 – 17k",
    image:
      "https://images.unsplash.com/photo-1552320792-136385dd9341?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    title: "Deck & Porch",
    range: "$8 – 12k",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    title: "Kitchen Refresh",
    range: "$15 – 22k",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
  },
];

export function BidsSection() {
  return (
    <section>
      <h2 className="text-lg font-semibold text-text-primary">Bids</h2>
      <div className="mt-4 -mx-6 flex gap-3 overflow-x-auto px-6 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {bids.map((bid) => (
          <button
            key={bid.id}
            type="button"
            className="relative h-44 w-64 shrink-0 overflow-hidden rounded-3xl"
          >
            <Image
              src={bid.image}
              alt={bid.title}
              fill
              className="object-cover"
              sizes="256px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4 text-left">
              <p className="font-semibold text-white">{bid.title}</p>
              <p className="mt-0.5 text-sm text-white/80">{bid.range}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
