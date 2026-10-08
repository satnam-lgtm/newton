import type { MetadataRoute } from "next";
import { POSTS, SITE } from "@/lib/content";

const ROUTES = [
  "",
  "/services",
  "/content-arbitrage",
  "/work",
  "/about",
  "/blog",
  "/contact",
  "/audit",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...ROUTES.map((path) => ({
      url: `${SITE.url}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...POSTS.map((p) => ({
      url: `${SITE.url}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
