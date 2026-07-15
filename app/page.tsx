import { SiteLayout } from "@/components/layout/SiteLayout";
import { Hero } from "@/components/home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { BrandStatement } from "@/components/home/BrandStatement";
import { LookbookTeaser } from "@/components/home/LookbookTeaser";
import { Newsletter } from "@/components/home/Newsletter";

export default function Home() {
  return (
    <SiteLayout>
      <Hero />
      <FeaturedProducts />
      <BrandStatement />
      <LookbookTeaser />
      <Newsletter />
    </SiteLayout>
  );
}
