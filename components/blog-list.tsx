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
      {/* 左側主題篩選（編輯雜誌式細線清單） */}
      <aside className="md:w-52 md:flex-none">
        <p className="mb-2 hidden text-[0.7rem] uppercase tracking-[0.32em] md:block" style={{ color: "#B5956A" }}>主題分類</p>
        <div className="-mx-1 flex gap-x-6 gap-y-1 overflow-x-auto px-1 pb-1 md:sticky md:top-24 md:mx-0 md:flex-col md:gap-0 md:overflow-visible md:px-0">
          {cats.map((c) => {
            const on = active === c.name
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => setActive(c.name)}
                className={
                  "group relative whitespace-nowrap py-2 text-left transition-colors md:w-full md:border-b md:py-3.5 md:pl-4 " +
                  (on ? "text-[#B5956A]" : "text-[#6B5D4F] hover:text-[#2A2520]")
                }
                style={{ borderColor: "rgba(43,39,34,0.08)" }}
              >
                {/* 桌機版金色指示條 */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1/2 hidden -translate-y-1/2 rounded-full transition-all duration-300 md:block"
                  style={{ width: 3, height: on ? 18 : 0, backgroundColor: "#B5956A" }}
                />
                <span className="flex items-baseline gap-2 md:justify-between">
                  <span className="text-[0.98rem] tracking-wide" style={{ fontWeight: on ? 600 : 400 }}>{c.name}</span>
                  <span className="text-[0.7rem] tabular-nums" style={{ color: on ? "#C4A46E" : "#BBB2A4" }}>{c.count}</span>
                </span>
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
