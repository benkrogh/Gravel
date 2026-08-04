import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gravel — Run your contracting business without the busywork",
  description:
    "Track job costs, send bids in minutes, manage your crew, and pay contractors — all from one elegant app.",
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-bg-default">{children}</div>;
}
