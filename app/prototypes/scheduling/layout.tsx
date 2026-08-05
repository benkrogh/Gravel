import type { Metadata, Viewport } from "next";
import { MobilePrototype } from "@/app/prototypes/_components/mobile-prototype";

export const metadata: Metadata = {
  title: "Crew Schedule — Gravel",
  description:
    "Week calendar for scheduling crews across jobsites, with staffing health and day margins.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function SchedulingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MobilePrototype>{children}</MobilePrototype>;
}
