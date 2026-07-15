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
    default: "Covenant Apparel",
    template: "%s | Covenant Apparel",
  },
  description: "Covenant Apparel",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Covenant Apparel",
    description: "Covenant Apparel",
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
