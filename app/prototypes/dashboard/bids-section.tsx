"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const bids = [
  {
    id: "1",
    title: "Bathroom Remodel",
    range: "$12 – 17k",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
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
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const updateIndex = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", updateIndex);
    emblaApi.on("reInit", updateIndex);

    return () => {
      emblaApi.off("select", updateIndex);
      emblaApi.off("reInit", updateIndex);
    };
  }, [emblaApi]);

  return (
    <section className="mt-8">
      <h2 className="px-4 text-lg font-semibold text-text-primary">Bids</h2>

      <div
        className="mt-4 overflow-hidden touch-pan-x overscroll-x-contain"
        ref={emblaRef}
      >
        <div className="flex gap-3 pl-4 pr-4">
          {bids.map((bid) => (
            <article
              key={bid.id}
              className="relative h-44 w-[17.5rem] shrink-0 grow-0 basis-[17.5rem] cursor-grab overflow-hidden rounded-3xl active:cursor-grabbing"
            >
              <Image
                src={bid.image}
                alt={bid.title}
                fill
                draggable={false}
                className="pointer-events-none object-cover select-none"
                sizes="280px"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="pointer-events-none absolute bottom-0 left-0 p-4">
                <p className="font-semibold text-white">{bid.title}</p>
                <p className="mt-0.5 text-sm text-white/80">{bid.range}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-3 flex justify-center gap-1.5">
        {bids.map((bid, index) => (
          <button
            key={bid.id}
            type="button"
            aria-label={`Go to ${bid.title}`}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-1.5 rounded-full transition-all duration-200 ${
              index === selectedIndex
                ? "w-5 bg-brand-primary"
                : "w-1.5 bg-neutral-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
