import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/", "/seo-report"],
    },
    sitemap: "https://www.yulungroup.com/sitemap.xml",
    host: "https://www.yulungroup.com",
  }
}
