import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background text-foreground">{children}</body>
    </html>
  );
}
