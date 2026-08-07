import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { POSTS, getPost } from "@/data/blog"
import { SiteMenu } from "@/components/site-menu"

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return { title: "文章｜裝修知識－裕綸集團" }
  const url = `https://www.yulungroup.com/blog/${post.slug}`
  return {
    title: `${post.title}｜裕綸集團`,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "zh_TW",
      url,
      siteName: "裕綸集團 Yulun Group",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      images: [{ url: "/images/hero-bg.jpg", width: 1567, height: 1045, alt: post.title }],
    },
  }
}

const fmtDate = (d: string) => d.replace(/-/g, ".")

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const url = `https://www.yulungroup.com/blog/${post.slug}`
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    inLanguage: "zh-TW",
    keywords: post.keywords.join("、"),
    mainEntityOfPage: url,
    image: "https://www.yulungroup.com/images/hero-bg.jpg",
    author: { "@type": "Organization", name: "空房子室內設計", url: "https://www.yulungroup.com/design" },
    publisher: { "@type": "Organization", name: "裕綸集團", logo: { "@type": "ImageObject", url: "https://www.yulungroup.com/icon-512.png" } },
  }
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首頁", item: "https://www.yulungroup.com/" },
      { "@type": "ListItem", position: 2, name: "裝修知識", item: "https://www.yulungroup.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title },
    ],
  }

  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <main style={{ backgroundColor: "#FAF8F4", color: "#2A2520", minHeight: "100vh" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }} />

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-6 md:px-12" style={{ borderBottom: "0.5px solid #E8E3DA" }}>
        <Link href="/blog" className="text-sm tracking-[0.2em]" style={{ color: "#8C8479", textDecoration: "none" }}>← 裝修知識</Link>
        <Link href="/" style={{ fontSize: "clamp(1.05rem, 3.5vw, 1.5rem)", fontWeight: 300, letterSpacing: "0.15em", color: "#2A2520", textDecoration: "none" }}>裕綸集團</Link>
        <div className="flex items-center gap-4">
          <Link href="/booking" className="text-[0.9rem] tracking-[0.25em]" style={{ color: "#B5956A", textDecoration: "none" }}>預約諮詢</Link>
          <SiteMenu color="#2A2520" />
        </div>
      </nav>

      <article className="mx-auto max-w-3xl px-6 py-16 md:px-8 md:py-24">
        {/* Header */}
        <div className="mb-10">
          <div className="mb-5 flex items-center gap-3 text-[0.8rem] tracking-[0.15em]" style={{ color: "#B5956A" }}>
            <span>{post.category}</span>
            <span style={{ opacity: 0.4 }}>|</span>
            <span style={{ color: "#A99E90" }}>{fmtDate(post.date)}</span>
          </div>
          <h1 className="text-[1.8rem] font-bold leading-tight tracking-[0.02em] md:text-[2.6rem]">{post.title}</h1>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-6">
          {post.content.map((block, i) => {
            if ("h" in block) {
              return <h2 key={i} className="mt-4 text-[1.3rem] font-bold tracking-wide md:text-[1.5rem]" style={{ color: "#2A2520" }}>{block.h}</h2>
            }
            if ("list" in block) {
              return (
                <ul key={i} className="flex flex-col gap-3 pl-1">
                  {block.list.map((it, j) => (
                    <li key={j} className="flex gap-3 text-[1.05rem] font-light leading-[1.95] [text-wrap:pretty]" style={{ color: "#4A4237" }}>
                      <span aria-hidden="true" style={{ color: "#B5956A" }}>—</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              )
            }
            return <p key={i} className="text-[1.08rem] font-light leading-[2.05] [text-wrap:pretty]" style={{ color: "#4A4237" }}>{block.p}</p>
          })}
        </div>

        {/* 免費資源下載（若文章有附檔） */}
        {post.download && (
          <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl border p-7 md:flex-row md:items-center md:justify-between md:p-8" style={{ borderColor: "#B5956A", backgroundColor: "#FBF7F1" }}>
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl" style={{ background: "rgba(181,149,106,0.14)" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B5956A" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><polyline points="9 15 12 18 15 15" /></svg>
              </span>
              <div>
                <p className="text-[1.08rem] font-semibold" style={{ color: "#2A2520" }}>{post.download.label}</p>
                <p className="mt-1 text-[0.92rem] font-light leading-relaxed" style={{ color: "#6B5D4F" }}>{post.download.note}</p>
              </div>
            </div>
            <a href={post.download.file} download={post.download.filename} target="_blank" rel="noopener noreferrer" className="inline-flex flex-none items-center gap-2 rounded-full px-7 py-3 text-[0.85rem] tracking-[0.15em] transition-transform hover:-translate-y-0.5" style={{ backgroundColor: "#B5956A", color: "#FFFFFF", textDecoration: "none" }}>
              下載 PDF ↓
            </a>
          </div>
        )}

        {/* CTA */}
        <div className="mt-8 rounded-2xl border p-8 text-center md:p-10" style={{ borderColor: "#E8E3DA", backgroundColor: "#FFFFFF" }}>
          <p className="text-[1.15rem] font-medium" style={{ color: "#2A2520" }}>想把家交給專業團隊規劃？</p>
          <p className="mt-2 text-[0.98rem] font-light leading-relaxed" style={{ color: "#6B5D4F" }}>空房子室內設計 × 裕綸室內裝修，台中設計裝修一站式服務。</p>
          <Link href="/booking" className="mt-6 inline-flex items-center gap-2 rounded-full px-8 py-3 text-[0.85rem] tracking-[0.2em]" style={{ backgroundColor: "#B5956A", color: "#FFFFFF", textDecoration: "none" }}>
            預約免費諮詢 →
          </Link>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-5 text-[0.85rem] tracking-[0.25em] uppercase" style={{ color: "#B5956A" }}>延伸閱讀</h2>
            <div className="flex flex-col gap-3">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="flex flex-col gap-1 rounded-xl border p-5 transition-colors" style={{ borderColor: "#E8E3DA", backgroundColor: "#FFFFFF", textDecoration: "none" }}>
                  <span className="text-[1.05rem] font-medium leading-snug" style={{ color: "#2A2520" }}>{p.title}</span>
                  <span className="text-[0.85rem] font-light" style={{ color: "#8C8479" }}>{p.category}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </main>
  )
}
