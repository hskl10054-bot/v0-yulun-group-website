import type { MetadataRoute } from "next"
import { caseSlugs } from "@/data/cases"
import { getPublishedPosts } from "@/data/blog"

const baseUrl = "https://www.yulungroup.com"

// 每小時更新，排程文章到發佈日才會進 sitemap
export const revalidate = 3600

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

  const blogPages: MetadataRoute.Sitemap = getPublishedPosts().map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...staticPages, ...casePages, ...blogPages]
}
