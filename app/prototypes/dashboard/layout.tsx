import type { Metadata, Viewport } from "next";
import { MobilePrototype } from "@/app/prototypes/_components/mobile-prototype";

export const metadata: Metadata = {
  title: "Home Dashboard — Gravel",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MobilePrototype>{children}</MobilePrototype>;
}
