import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Covenant Apparel — our mission, values, and story.",
};

export default function AboutPage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-20">
        <p className="text-xs uppercase tracking-[0.3em] text-stone">Our Story</p>
        <h1 className="mt-2 font-serif text-4xl text-charcoal md:text-5xl">
          About Covenant
        </h1>

        <div className="mt-12 space-y-8 text-sm leading-relaxed text-stone">
          <p>
            Covenant Apparel was born from a simple belief: faith doesn&apos;t have to
            be loud to be powerful. We create clothing that carries meaning — pieces
            you&apos;re proud to wear every day, not just on Sunday.
          </p>
          <p>
            Every design starts with intention. We blend clean, contemporary aesthetics
            with subtle references to the values that ground us — grace, mercy, faith,
            and redemption. Our graphics are bold enough to start conversations, but
            refined enough to fit seamlessly into your everyday wardrobe.
          </p>

          <h2 className="pt-4 font-serif text-2xl text-charcoal">Our Mission</h2>
          <p>
            To create premium apparel that helps people express their faith with
            confidence and style — without compromise. We believe what you wear can
            be both a statement of identity and a work of art.
          </p>

          <h2 className="pt-4 font-serif text-2xl text-charcoal">Our Values</h2>
          <ul className="space-y-3">
            <li>
              <strong className="text-charcoal">Quality First</strong> — Premium
              materials and construction that lasts.
            </li>
            <li>
              <strong className="text-charcoal">Intentional Design</strong> — Every
              piece tells a story worth sharing.
            </li>
            <li>
              <strong className="text-charcoal">Ethical Production</strong> — We partner
              with manufacturers who share our standards.
            </li>
            <li>
              <strong className="text-charcoal">Community</strong> — Building a family
              of believers who inspire each other.
            </li>
          </ul>

          <h2 className="pt-4 font-serif text-2xl text-charcoal">A Note from the Founder</h2>
          <p>
            I started Covenant because I was tired of choosing between clothes that
            looked good and clothes that meant something. This brand is my answer to
            that — apparel designed for people who live with purpose, walk with faith,
            and refuse to blend in.
          </p>
          <p className="font-serif italic text-charcoal">— The Covenant Team</p>
        </div>
      </div>
    </SiteLayout>
  );
}
