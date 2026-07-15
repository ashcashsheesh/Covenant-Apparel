import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Covenant Apparel — Faith-Rooted Aesthetic Clothing",
    template: "%s | Covenant Apparel",
  },
  description:
    "Clean, aesthetic Christian apparel. Graphic tees, hoodies, and accessories designed for those who wear their conviction.",
  keywords: ["Christian clothing", "faith apparel", "graphic tees", "aesthetic clothing"],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Covenant Apparel",
    description: "Faith-rooted aesthetic clothing. Wear your conviction.",
    type: "website",
    locale: "en_US",
    siteName: "Covenant Apparel",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${instrumentSerif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cream text-charcoal">{children}</body>
    </html>
  );
}
