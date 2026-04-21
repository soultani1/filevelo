import type { MetadataRoute } from "next";
import { tools } from "@/lib/tools";

const BASE = "https://filevelo.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const home: MetadataRoute.Sitemap = [
    {
      url: BASE,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${BASE}/${tool.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const legalPages: MetadataRoute.Sitemap = [
    "/privacy",
    "/terms",
    "/support",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.3,
  }));

  return [...home, ...toolPages, ...legalPages];
}
