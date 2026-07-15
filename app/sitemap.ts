import type { MetadataRoute } from "next";
import { getAllProductSlugs } from "@/lib/products";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://covenantapparel.com";
  const slugs = await getAllProductSlugs();

  const staticPages = ["", "/shop", "/about"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const productPages = slugs.map((slug) => ({
    url: `${baseUrl}/shop/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...productPages];
}
