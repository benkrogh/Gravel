import type { Metadata } from "next";
import { dmSans } from "@/lib/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Gravel Prototypes",
  description: "Design prototypes for Gravel — services scheduling and operations for contractors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
