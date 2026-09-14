import type { Metadata, Viewport } from "next";
import { MobilePrototype } from "@/app/prototypes/_components/mobile-prototype";

export const metadata: Metadata = {
  title: "Project Profitability — Gravel",
  description:
    "Internal cost-plus calculator — price labor, materials, and subs against a client budget.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MobilePrototype>{children}</MobilePrototype>;
}
