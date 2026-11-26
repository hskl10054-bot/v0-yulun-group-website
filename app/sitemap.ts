import type { MetadataRoute } from "next"
import { caseSlugs } from "@/data/cases"
import { getPublishedPosts } from "@/data/blog"

const baseUrl = "https://www.yulungroup.com"

// 每小時更新，排程文章到發佈日才會進 sitemap
export const revalidate = 3600

export default function sitemap(): MetadataRoute.Sitemap {
  // 固定頁與作品頁沒有可靠的「最後修改日」，刻意不填 lastModified，
  // 避免像以前那樣全部填成重建當下的同一時間、被 Google 判定不可信而忽略。
  // 文章則使用各自真實的發佈日（下方 blogPages）。
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/design`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/construction`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services/old-house-renovation`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/works`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/booking`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/cafe`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  ]

  const casePages: MetadataRoute.Sitemap = caseSlugs.map((slug) => ({
    url: `${baseUrl}/works/${slug}`,
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
