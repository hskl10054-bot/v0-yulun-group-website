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

// 台中行政區（用來從案件資料判斷在地關鍵字）。
const TC_DISTRICTS = [
  "中區", "東區", "南區", "西區", "北區", "北屯", "西屯", "南屯", "太平", "大里",
  "霧峰", "烏日", "豐原", "后里", "石岡", "東勢", "新社", "潭子", "大雅", "神岡",
  "大肚", "沙鹿", "龍井", "梧棲", "清水", "大甲", "外埔", "大安", "和平",
]
const pickDistrict = (text: string) => TC_DISTRICTS.find((d) => text.includes(d)) ?? null

// 挑一個風格詞（排除地名／屋型／類別等非風格用語），讓卡片有辨識度。
const NON_STYLE = /台中|新竹|新成屋|老屋|翻新|客變|建案|商業空間|餐飲|店舖|咖啡|咖吡|早午餐|飲料|OnlyEase|同齊/i
const pickStyle = (meta: string[]) => meta.find((m) => !NON_STYLE.test(m) && !m.includes("・")) ?? null

// 依每個案子的實際資料，產生「高設計需求」的在地 SEO 標籤。
// 住宅預設為台中新成屋設計、老屋案標老屋翻新；商空依型態（咖啡廳／早午餐／飲料店）與城市區域。
function seoTags(c: { zhName: string; enName: string; cat: string; meta: string[] }): string[] {
  const hay = [c.zhName, c.enName, ...c.meta].join(" ")

  if (c.cat === COMMERCIAL) {
    const city = /新竹/.test(hay) ? "新竹" : "台中"
    const district = city === "台中" ? pickDistrict(hay) : null
    const place = district ? `${city}${district}` : city
    let type = "商業空間設計"
    if (/同齊|咖啡|咖吡/.test(hay)) type = "咖啡廳設計"
    else if (/伍宅|早午餐|brunch/i.test(hay)) type = "早午餐店設計"
    else if (/壹偲|OnlyEase|酵境|Catalyst|飲料/i.test(hay)) type = "飲料店設計"
    return [`${place}・${type}`]
  }

  const district = pickDistrict(hay)
  const kind = /老屋|翻新/.test(hay) ? "老屋翻新" : "新成屋設計"
  const seo = district ? `台中${district}・${kind}` : `台中${kind}`
  const style = pickStyle(c.meta)
  return style ? [seo, style] : [seo]
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
    <section className="py-24 md:py-32" style={{ backgroundColor: colors.portfolio_bg }}>
      <div className="mx-auto max-w-[100rem] px-6 md:px-12">
        {/* Header */}
        <div className="mb-12 flex flex-wrap items-end justify-between gap-5 border-b pb-5 md:mb-14" style={{ borderColor: colors.strengths_card_border }}>
          <div>
            <span aria-hidden="true" className="-ml-0.5 mb-1 block select-none font-semibold uppercase leading-none" style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)", color: "rgba(107,78,49,0.10)", letterSpacing: "0.08em" }}>Portfolio</span>
            <h2 className="text-3xl font-bold tracking-[0.12em] md:text-4xl" style={{ color: colors.portfolio_heading }}>精選作品</h2>
          </div>
          <div className="flex items-center gap-6">
            {cats.length > 1 && (
              <div className="hidden items-center gap-5 md:flex">
                {cats.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => changeFilter(c)}
                    className="text-base tracking-[0.12em] transition-colors md:text-lg"
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
                  <h3 className="flex items-baseline gap-2 text-2xl font-normal tracking-wide md:text-[1.7rem]" style={{ color: colors.portfolio_heading }}>
                    <span className="shrink-0">{c.zhName}</span>
                    {c.enName && (
                      <span className="min-w-0 truncate text-lg font-light tracking-widest" style={{ color: colors.portfolio_accent }}>
                        {c.enName}
                      </span>
                    )}
                  </h3>
                  {seoTags(c).length > 0 && (
                    <p className="mt-2 truncate text-[0.92rem] font-light tracking-wide" style={{ color: colors.portfolio_accent }}>
                      {seoTags(c).join("　｜　")}
                    </p>
                  )}
                  {c.story && (
                    <p className="mt-3 line-clamp-2 text-[0.95rem] font-light leading-[2]" style={{ color: colors.portfolio_heading, opacity: 0.72 }}>
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
