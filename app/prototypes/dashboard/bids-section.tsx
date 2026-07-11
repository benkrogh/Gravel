"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BidDetailSheet } from "./bid-detail-sheet";
import { bids, type Bid } from "./bid-data";

export function BidsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeBid, setActiveBid] = useState<Bid | null>(null);
  const dragState = useRef({ x: 0, y: 0, dragging: false });

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

  const handlePointerDown = (event: React.PointerEvent) => {
    dragState.current = {
      x: event.clientX,
      y: event.clientY,
      dragging: false,
    };
  };

  const handlePointerMove = (event: React.PointerEvent) => {
    const deltaX = Math.abs(event.clientX - dragState.current.x);
    const deltaY = Math.abs(event.clientY - dragState.current.y);
    if (deltaX > 6 || deltaY > 6) {
      dragState.current.dragging = true;
    }
  };

  const handleBidTap = (bid: Bid) => {
    if (!dragState.current.dragging) {
      setActiveBid(bid);
    }
  };

  return (
    <>
      <section className="mt-8">
        <h2 className="px-4 text-lg font-semibold text-text-primary">Bids</h2>

        <div
          className="mt-4 overflow-hidden touch-pan-x overscroll-x-contain"
          ref={emblaRef}
          onPointerMove={handlePointerMove}
        >
          <div className="flex gap-3 pl-4 pr-4">
            {bids.map((bid) => (
              <button
                key={bid.id}
                type="button"
                onPointerDown={handlePointerDown}
                onClick={() => handleBidTap(bid)}
                className="relative h-44 w-[17.5rem] shrink-0 grow-0 basis-[17.5rem] cursor-grab overflow-hidden rounded-3xl text-left active:cursor-grabbing"
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
              </button>
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

      {activeBid && (
        <BidDetailSheet bid={activeBid} onClose={() => setActiveBid(null)} />
      )}
    </>
  );
}
