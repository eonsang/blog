import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/content";

const SITE_URL = "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPublishedPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}${post.permalink}`,
    lastModified: post.updated ?? post.date,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  return [...staticPages, ...postEntries];
}
