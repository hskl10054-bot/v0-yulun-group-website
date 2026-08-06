import type { MetadataRoute } from "next"
import { caseSlugs } from "@/data/cases"
import { POSTS } from "@/data/blog"

const baseUrl = "https://www.yulungroup.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/design`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/construction`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/works`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/booking`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/cafe`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ]

  const casePages: MetadataRoute.Sitemap = caseSlugs.map((slug) => ({
    url: `${baseUrl}/works/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  const blogPages: MetadataRoute.Sitemap = POSTS.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...staticPages, ...casePages, ...blogPages]
}
