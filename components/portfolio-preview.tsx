"use client"

import { useRef } from "react"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { useWorksData, slugify } from "@/lib/use-works-data"

interface PortfolioPreviewProps {
  colors: Record<string, string>
}

// 首頁精選作品 — 案例卡片輪播（拉「案例分享」資料，含分類/坪數/敘述，連到案例內頁）。
export function PortfolioPreview({ colors }: PortfolioPreviewProps) {
  const { cases } = useWorksData()
  const scroller = useRef<HTMLDivElement>(null)

  const items = cases.filter((c) => c.hero).slice(0, 10)

  const scroll = (dir: number) => {
    const el = scroller.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" })
  }

  if (items.length === 0) return null

  return (
    <section className="py-24" style={{ backgroundColor: colors.portfolio_bg }}>
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between border-b pb-6" style={{ borderColor: colors.strengths_card_border }}>
          <div>
            <span className="mb-2 block text-[0.65rem] font-light uppercase tracking-[0.35em]" style={{ color: colors.portfolio_accent }}>Portfolio</span>
            <h2 className="text-2xl font-light tracking-[0.18em] md:text-3xl" style={{ color: colors.portfolio_heading }}>精選作品</h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="上一個"
              className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:bg-black/5"
              style={{ borderColor: colors.strengths_card_border, color: colors.portfolio_heading }}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="下一個"
              className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:bg-black/5"
              style={{ borderColor: colors.strengths_card_border, color: colors.portfolio_heading }}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scroller}
          className="flex snap-x gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((c) => {
            const slug = slugify(c.enName)
            return (
              <Link key={slug} href={`/works/${slug}`} className="group w-[280px] shrink-0 snap-start md:w-[360px]">
                <div className="overflow-hidden rounded-md">
                  <img
                    src={c.hero}
                    alt={`${c.zhName} ${c.enName}｜台中室內設計案例`}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-base font-normal tracking-wide" style={{ color: colors.portfolio_heading }}>
                    {c.zhName}
                    {c.enName && (
                      <span className="ml-2 text-xs font-light tracking-widest" style={{ color: colors.portfolio_accent }}>
                        {c.enName}
                      </span>
                    )}
                  </h3>
                  {c.meta.length > 0 && (
                    <p className="mt-1.5 text-xs font-light tracking-wide" style={{ color: colors.portfolio_accent }}>
                      {c.meta.slice(0, 2).join("　｜　")}
                    </p>
                  )}
                  {c.story && (
                    <p className="mt-2 line-clamp-2 text-sm font-light leading-relaxed" style={{ color: colors.portfolio_heading, opacity: 0.65 }}>
                      {c.story}
                    </p>
                  )}
                </div>
              </Link>
            )
          })}
        </div>

        {/* 更多作品 */}
        <div className="mt-10 text-center">
          <Link href="/works" className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] transition-colors" style={{ color: colors.portfolio_accent }}>
            更多作品 <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
