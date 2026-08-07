import type { Metadata } from "next"
import Link from "next/link"
import { POSTS } from "@/data/blog"
import { SiteMenu } from "@/components/site-menu"
import { BlogList } from "@/components/blog-list"

export const metadata: Metadata = {
  title: "裝修知識｜台中室內設計與裝修部落格－裕綸集團",
  description:
    "裕綸集團裝修知識部落格：台中室內設計、老屋翻新、預售屋客變、裝潢避雷與收納規劃等實用文章，陪你少走冤枉路，打造理想的家。",
  alternates: { canonical: "https://www.yulungroup.com/blog" },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "https://www.yulungroup.com/blog",
    siteName: "裕綸集團 Yulun Group",
    title: "裝修知識｜台中室內設計與裝修部落格－裕綸集團",
    description: "台中室內設計、老屋翻新、裝潢避雷與收納規劃等實用文章。",
    images: [{ url: "/images/hero-bg.jpg", width: 1567, height: 1045, alt: "裕綸集團 裝修知識" }],
  },
}


export default function BlogIndex() {
  const listSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "裕綸集團 裝修知識",
    url: "https://www.yulungroup.com/blog",
    blogPost: POSTS.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      url: `https://www.yulungroup.com/blog/${p.slug}`,
    })),
  }

  return (
    <main style={{ backgroundColor: "#FAF8F4", color: "#2A2520", minHeight: "100vh" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema).replace(/</g, "\\u003c") }} />

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-6 md:px-12" style={{ borderBottom: "0.5px solid #E8E3DA" }}>
        <Link href="/" className="text-sm tracking-[0.2em]" style={{ color: "#8C8479", textDecoration: "none" }}>← 裕綸集團</Link>
        <span style={{ fontSize: "clamp(1.05rem, 3.5vw, 1.5rem)", fontWeight: 300, letterSpacing: "0.15em", color: "#2A2520" }}>裝修知識</span>
        <div className="flex items-center gap-4">
          <Link href="/booking" className="text-[0.9rem] tracking-[0.25em]" style={{ color: "#B5956A", textDecoration: "none" }}>預約諮詢</Link>
          <SiteMenu color="#2A2520" />
        </div>
      </nav>

      <div className="mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-28">
        {/* Heading */}
        <div className="mb-14 border-b pb-6" style={{ borderColor: "rgba(43,39,34,0.12)" }}>
          <span aria-hidden="true" className="-ml-0.5 mb-1 block select-none font-semibold uppercase leading-none" style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)", color: "rgba(107,78,49,0.10)", letterSpacing: "0.08em" }}>Journal</span>
          <h1 className="text-3xl font-bold tracking-[0.12em] md:text-4xl">裝修知識</h1>
          <p className="mt-4 text-[1.05rem] font-light leading-loose" style={{ color: "#6B5D4F" }}>
            台中室內設計與裝修的實用觀念、案例與避雷指南，陪你把家打造得更理想。
          </p>
        </div>

        {/* 左側主題篩選 ＋ 文章列表 */}
        <BlogList />
      </div>
    </main>
  )
}
