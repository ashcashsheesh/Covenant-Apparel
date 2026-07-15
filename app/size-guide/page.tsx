import type { Metadata } from "next";
import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";

export const metadata: Metadata = {
  title: "Size Guide",
  description: "Find your perfect fit with our size guide for tees, hoodies, and more.",
};

const sizeCharts = [
  {
    name: "Tees & Tops",
    headers: ["Size", "Chest (in)", "Length (in)", "Shoulder (in)"],
    rows: [
      ["S", "34-36", "27", "17"],
      ["M", "38-40", "28", "18"],
      ["L", "42-44", "29", "19"],
      ["XL", "46-48", "30", "20"],
    ],
  },
  {
    name: "Hoodies & Crewnecks",
    headers: ["Size", "Chest (in)", "Length (in)", "Sleeve (in)"],
    rows: [
      ["S", "38-40", "26", "24"],
      ["M", "42-44", "27", "25"],
      ["L", "46-48", "28", "26"],
      ["XL", "50-52", "29", "27"],
    ],
  },
  {
    name: "Hats",
    headers: ["Size", "Circumference (in)"],
    rows: [
      ["S/M", "21.5-22.5"],
      ["L/XL", "22.5-23.5"],
    ],
  },
];

export default function SizeGuidePage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-20">
        <p className="text-xs uppercase tracking-[0.3em] text-stone">Fit Guide</p>
        <h1 className="mt-2 font-serif text-4xl text-charcoal md:text-5xl">Size Guide</h1>
        <p className="mt-4 text-sm leading-relaxed text-stone">
          All measurements are in inches. Our tees run true to size with a relaxed
          fit. Hoodies are oversized — size down for a regular fit.
        </p>

        <div className="mt-12 space-y-12">
          {sizeCharts.map((chart) => (
            <div key={chart.name}>
              <h2 className="font-serif text-xl text-charcoal">{chart.name}</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-charcoal/20">
                      {chart.headers.map((h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-left text-xs uppercase tracking-[0.1em] text-stone"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {chart.rows.map((row) => (
                      <tr key={row[0]} className="border-b border-charcoal/10">
                        {row.map((cell, i) => (
                          <td
                            key={i}
                            className={`px-4 py-3 ${i === 0 ? "font-medium text-charcoal" : "text-stone"}`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-12 text-sm text-stone">
          Still unsure?{" "}
          <Link href="/contact" className="text-charcoal underline hover:no-underline">
            Contact us
          </Link>{" "}
          and we&apos;ll help you find the right size.
        </p>
      </div>
    </SiteLayout>
  );
}
