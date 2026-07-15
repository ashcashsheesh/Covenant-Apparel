import { SiteLayout } from "@/components/layout/SiteLayout";
import { Hero } from "@/components/home/Hero";
import { InfoBar } from "@/components/home/InfoBar";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";

export default function Home() {
  return (
    <SiteLayout>
      <Hero />
      <InfoBar />
      <FeaturedProducts />
    </SiteLayout>
  );
}
