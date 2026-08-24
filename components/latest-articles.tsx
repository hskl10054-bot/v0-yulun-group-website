import Link from "next/link"
import { getPublishedPosts } from "@/data/blog"

const GOLD = "#B5956A"

// 首頁／空房子頁下方的「最新裝修知識」區塊：自動列出最新已發佈文章的內部連結。
// 伺服器端渲染 → 連結進入原始碼，Google 爬得到；排程文章到期會自動出現。
export function LatestArticles({ heading = "裝修知識", bg = "#F4F1EC" }: { heading?: string; bg?: string }) {
  const posts = getPublishedPosts().slice(0, 3)
  if (posts.length === 0) return null

  return (
    <section style={{ background: bg, padding: "6rem 0" }}>
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <span aria-hidden="true" className="-ml-0.5 mb-1 block select-none font-semibold uppercase leading-none" style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)", color: "rgba(107,78,49,0.10)", letterSpacing: "0.08em" }}>Journal</span>
            <h2 style={{ fontFamily: "'Noto Sans TC', sans-serif", fontSize: "clamp(1.875rem, 4vw, 2.25rem)", fontWeight: 700, letterSpacing: "0.12em", color: "#2A2520" }}>{heading}</h2>
          </div>
          <Link href="/blog" className="whitespace-nowrap text-[0.85rem] tracking-[0.2em] transition-opacity hover:opacity-70" style={{ color: GOLD, textDecoration: "none" }}>查看更多 →</Link>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group flex flex-col gap-3 rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#B5956A] hover:shadow-[0_24px_60px_-32px_rgba(42,37,32,0.42)]"
              style={{ borderColor: "#E8E3DA", background: "#FFFFFF", textDecoration: "none" }}
            >
              <span className="text-[0.72rem] tracking-[0.15em]" style={{ color: GOLD }}>{p.category}</span>
              <h3 className="text-[1.1rem] font-semibold leading-snug transition-colors group-hover:text-[#B5956A]" style={{ color: "#2A2520" }}>{p.title}</h3>
              <p className="text-[0.9rem] font-light leading-relaxed" style={{ color: "#6B5D4F", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.description}</p>
              <span className="mt-auto pt-1 text-[0.8rem] tracking-[0.15em]" style={{ color: GOLD }}>閱讀更多 →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
