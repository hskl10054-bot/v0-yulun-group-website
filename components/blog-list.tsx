"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { POSTS } from "@/data/blog"

const fmtDate = (d: string) => d.replace(/-/g, ".")

export function BlogList() {
  const cats = useMemo(() => {
    const counts = new Map<string, number>()
    for (const p of POSTS) counts.set(p.category, (counts.get(p.category) ?? 0) + 1)
    return [{ name: "全部", count: POSTS.length }, ...Array.from(counts, ([name, count]) => ({ name, count }))]
  }, [])
  const [active, setActive] = useState("全部")
  const list = active === "全部" ? POSTS : POSTS.filter((p) => p.category === active)

  return (
    <div className="flex flex-col gap-10 md:flex-row md:gap-14">
      {/* 左側主題篩選 */}
      <aside className="md:w-48 md:flex-none">
        <p className="mb-4 text-[0.72rem] uppercase tracking-[0.3em]" style={{ color: "#B5956A" }}>Topics · 主題</p>
        <div className="flex flex-wrap gap-2 md:sticky md:top-24 md:flex-col md:gap-1.5">
          {cats.map((c) => {
            const on = active === c.name
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => setActive(c.name)}
                className="flex items-center justify-between gap-3 rounded-full px-4 py-2 text-[0.92rem] tracking-wide transition-all md:rounded-xl md:px-4 md:py-2.5"
                style={{
                  color: on ? "#FFFFFF" : "#6B5D4F",
                  backgroundColor: on ? "#B5956A" : "#FFFFFF",
                  border: `1px solid ${on ? "#B5956A" : "#EAE3D8"}`,
                  fontWeight: on ? 600 : 400,
                }}
              >
                <span>{c.name}</span>
                <span className="text-[0.72rem]" style={{ color: on ? "rgba(255,255,255,0.75)" : "#B3AB9E" }}>{c.count}</span>
              </button>
            )
          })}
        </div>
      </aside>

      {/* 文章列表 */}
      <div className="flex-1">
        <div className="flex flex-col gap-4">
          {list.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group flex flex-col gap-3 rounded-2xl border border-[#E8E3DA] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#B5956A] hover:shadow-[0_24px_60px_-32px_rgba(42,37,32,0.42)] md:p-9"
              style={{ backgroundColor: "#FFFFFF", textDecoration: "none" }}
            >
              <div className="flex items-center gap-3 text-[0.8rem] tracking-[0.15em]" style={{ color: "#B5956A" }}>
                <span>{p.category}</span>
                <span style={{ opacity: 0.4 }}>|</span>
                <span style={{ color: "#A99E90" }}>{fmtDate(p.date)}</span>
              </div>
              <h2 className="text-[1.3rem] font-semibold leading-snug text-[#2A2520] transition-colors duration-300 group-hover:text-[#B5956A] md:text-[1.55rem]">{p.title}</h2>
              <p className="text-[1rem] font-light leading-[1.9] [text-wrap:pretty]" style={{ color: "#6B5D4F" }}>{p.description}</p>
              <span className="mt-1 inline-flex items-center gap-2 text-[0.85rem] uppercase tracking-[0.2em] transition-transform group-hover:gap-3" style={{ color: "#B5956A" }}>閱讀更多 →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
