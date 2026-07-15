import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Covenant Apparel.",
};

export default function AboutPage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-6 py-12 md:py-16">
        <h1 className="text-2xl font-semibold text-black md:text-3xl">About</h1>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-black/70">
          <p>
            Covenant Apparel began as a dream I had in middle school. What started as a
            simple idea grew into something much greater as my faith deepened. Looking
            back, I can see that God was shaping not only the vision for this brand, but
            also my heart behind it.
          </p>

          <p>
            I never wanted Covenant to be just another clothing brand. I wanted to create
            apparel that reflects my faith, points people to Jesus, and reminds us to
            live boldly for Him.
          </p>

          <p>
            As I became more involved in the Church, I saw faithful churches struggling
            financially. Ministries were limited not because they lacked passion, but
            because they lacked the resources to continue the work God had called them to
            do. That is why Covenant Apparel donates 100% of its profits to churches and
            gospel-centered ministries. Every purchase is an opportunity to strengthen the
            local Church and help share the hope of the Gospel.
          </p>

          <p>
            The name Covenant is rooted in God&apos;s unchanging faithfulness. Even when we
            fall short, He remains faithful. That truth is the foundation of everything
            this brand stands for.
          </p>

          <p>
            Thank you for being part of this mission. Together, we can create something
            that points people to Christ and makes an eternal impact.
          </p>

          <p className="italic">
            Whatever you do, do it all for the glory of God. — 1 Corinthians 10:31
          </p>

          <div className="pt-2 text-black">
            <p>Sincerely,</p>
            <p className="mt-1">Asher (founder)</p>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
