import type { MetadataRoute } from "next";
import { getAllServiceSlugs } from "@lib/i18n-server";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kalissea.com";
  const slugs = getAllServiceSlugs();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
      alternates: {
        languages: {
          fr: `${baseUrl}/`,
          en: `${baseUrl}/en/`,
        },
      },
    },
    {
      url: `${baseUrl}/en/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = slugs.flatMap((slug) => [
    {
      url: `${baseUrl}/services/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: {
          fr: `${baseUrl}/services/${slug}`,
          en: `${baseUrl}/en/services/${slug}`,
        },
      },
    },
    {
      url: `${baseUrl}/en/services/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ]);

  return [...staticRoutes, ...serviceRoutes];
}
