import type { Metadata, Viewport } from "next";
import { MobilePrototype } from "@/app/prototypes/_components/mobile-prototype";

export const metadata: Metadata = {
  title: "Billing — Gravel",
  description:
    "Mobile invoicing — outstanding balances, line items, and payment status for contract work.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function BillingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MobilePrototype>{children}</MobilePrototype>;
}
