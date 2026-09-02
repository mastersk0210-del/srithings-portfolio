import type { MetadataRoute } from "next";
import { models } from "@/data/models";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, priority: 1 },
    ...models.map((m) => ({
      url: `${site.url}/models/${m.slug}`,
      lastModified: now,
      priority: 0.8,
    })),
  ];
}
