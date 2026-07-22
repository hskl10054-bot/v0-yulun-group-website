"use client"

import { useMemo, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { RESIDENTIAL, COMMERCIAL } from "@/data/cases"
import { useWorksData, slugify } from "@/lib/use-works-data"

interface PortfolioPreviewProps {
  colors: Record<string, string>
}

const CAT_LABEL: Record<string, string> = {
  全部: "全部",
  [RESIDENTIAL]: "住宅設計",
  [COMMERCIAL]: "商業空間",
}

// 首頁精選作品 — 案例卡片輪播（分類篩選 + 左右切換 + 敘述），沿用首頁配色風格。
export function PortfolioPreview({ colors }: PortfolioPreviewProps) {
  const { cases } = useWorksData()
  const scroller = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState("全部")

  const withHero = useMemo(() => cases.filter((c) => c.hero), [cases])
  const cats = useMemo(() => {
    const present = new Set(withHero.map((c) => c.cat))
    return ["全部", ...[RESIDENTIAL, COMMERCIAL].filter((c) => present.has(c))]
  }, [withHero])

  const items = filter === "全部" ? withHero : withHero.filter((c) => c.cat === filter)

  const scroll = (dir: number) => {
    const el = scroller.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" })
  }
  const changeFilter = (f: string) => {
    setFilter(f)
    scroller.current?.scrollTo({ left: 0 })
  }

  if (withHero.length === 0) return null

  return (
    <section className="py-28 md:py-36" style={{ backgroundColor: colors.portfolio_bg }}>
      <div className="mx-auto max-w-[105rem] px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="mb-12 flex flex-wrap items-end justify-between gap-5 border-b pb-7" style={{ borderColor: colors.strengths_card_border }}>
          <div>
            <span className="mb-3 block text-[0.7rem] font-light uppercase tracking-[0.4em]" style={{ color: colors.portfolio_accent }}>Portfolio</span>
            <h2 className="text-3xl font-light tracking-[0.2em] md:text-5xl" style={{ color: colors.portfolio_heading }}>精選作品</h2>
          </div>
          <div className="flex items-center gap-6">
            {cats.length > 1 && (
              <div className="hidden items-center gap-5 md:flex">
                {cats.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => changeFilter(c)}
                    className="text-sm tracking-[0.15em] transition-colors"
                    style={{ color: colors.portfolio_heading, fontWeight: filter === c ? 500 : 300, opacity: filter === c ? 1 : 0.55 }}
                  >
                    {CAT_LABEL[c] ?? c}
                  </button>
                ))}
              </div>
            )}
            <div className="flex items-center gap-2">
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
        </div>

        {/* Carousel */}
        <div
          ref={scroller}
          className="flex snap-x gap-8 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((c) => {
            const slug = slugify(c.enName)
            return (
              <Link key={slug} href={`/works/${slug}`} className="group w-[88vw] shrink-0 snap-start sm:w-[70vw] md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)]">
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={c.hero}
                    alt={`${c.zhName} ${c.enName}｜台中室內設計案例`}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-6">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
                    <h3 className="text-2xl font-normal tracking-wide md:text-[1.7rem]" style={{ color: colors.portfolio_heading }}>
                      {c.zhName}
                      {c.enName && (
                        <span className="ml-2 text-lg font-light tracking-widest" style={{ color: colors.portfolio_accent }}>
                          {c.enName}
                        </span>
                      )}
                    </h3>
                    {c.meta.length > 0 && (
                      <span className="text-[0.92rem] font-light tracking-wide" style={{ color: colors.portfolio_accent }}>
                        {c.meta.slice(0, 2).join("　｜　")}
                      </span>
                    )}
                  </div>
                  {c.story && (
                    <p className="mt-3.5 line-clamp-3 text-[1.02rem] font-light leading-[1.9]" style={{ color: colors.portfolio_heading, opacity: 0.72 }}>
                      {c.story}
                    </p>
                  )}
                </div>
              </Link>
            )
          })}
        </div>

        {/* 更多作品 */}
        <div className="mt-14 text-center">
          <Link href="/works" className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] transition-colors" style={{ color: colors.portfolio_accent }}>
            更多作品 <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
