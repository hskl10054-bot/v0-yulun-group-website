"use client"

import { useEffect, useRef, useState, type ElementType } from "react"
import { PencilRuler, Home, RefreshCw, Sofa, Building2, Store, Hammer } from "lucide-react"

export interface ServiceItem {
  label: string
  en: string
  desc: string
  Icon: ElementType
}

interface ServiceItemsProps {
  colors: Record<string, string>
  // detailed = 卡片式（含 SEO 敘述，用於 /design）；預設為首頁的簡潔圖示格。
  detailed?: boolean
  // items = 自訂服務項目（如 /construction 的工程項目）；未提供時使用預設。
  items?: ServiceItem[]
}

const ITEMS: ServiceItem[] = [
  { label: "預售客變", en: "Pre-sale Customization", Icon: PencilRuler, desc: "交屋前調整格局與建材升級，台中預售屋客變提前規劃，省時又省預算。" },
  { label: "新屋裝修", en: "New Home Renovation", Icon: Home, desc: "台中新成屋設計裝修，從空屋到入住，機能與美感一次規劃到位。" },
  { label: "老屋翻新", en: "Renovation", Icon: RefreshCw, desc: "台中老屋翻新改造，重整水電管線與格局，讓老房子重獲新生。" },
  { label: "家居設計", en: "Residential Design", Icon: Sofa, desc: "以人為本的住宅室內設計，從動線、採光到收納全面規劃。" },
  { label: "商業空間", en: "Commercial Design", Icon: Building2, desc: "咖啡廳、辦公室、品牌門市，以品牌精神為核心的商業空間設計。" },
  { label: "店面設計", en: "Retail Design", Icon: Store, desc: "兼顧品牌形象與營運動線的店面設計，吸睛又好經營。" },
  { label: "裝潢施工", en: "Interior Construction", Icon: Hammer, desc: "自有工班、標準化施工，透明報價、工程保固，品質全程把關。" },
]

export function ServiceItems({ colors, detailed = false, items }: ServiceItemsProps) {
  const list = items ?? ITEMS
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)

  const GRAY = "#B7AEA3"
  const HOT = "#6B4E31"

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const heading = colors.portfolio_heading || "#2F2F2F"
  const accent = colors.portfolio_accent || "#B5956A"
  const text = colors.testimonials_text || "#6B5D4F"
  const border = colors.strengths_card_border || colors.services_card_border || colors.testimonials_card_border || "#E5E0DB"

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: "#FAF8F4" }}>
      <div className="mx-auto max-w-[100rem] px-6 md:px-12">
        {/* Heading */}
        <div className="mb-10 border-b pb-5 md:mb-14" style={{ borderColor: "rgba(43,39,34,0.12)" }}>
          <span
            aria-hidden="true"
            className="-ml-0.5 mb-1 block select-none font-semibold uppercase leading-none"
            style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)", color: "rgba(107,78,49,0.10)", letterSpacing: "0.08em" }}
          >
            Services
          </span>
          <h2 className="text-3xl font-bold tracking-[0.12em] md:text-4xl" style={{ color: heading }}>服務項目</h2>
        </div>

        {detailed ? (
          /* 詳細卡片版（含 SEO 敘述） */
          <div ref={ref} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((it, i) => {
              const active = hovered === i
              const iconColor = active ? HOT : visible ? accent : GRAY
              return (
                <article
                  key={it.label}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
                  className="flex flex-col gap-4 rounded-2xl border p-7 md:p-8"
                  style={{
                    borderColor: active ? accent : border,
                    backgroundColor: active ? "rgba(181,149,106,0.05)" : "transparent",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(22px)",
                    transition: `opacity 0.6s ease-out ${i * 0.07}s, transform 0.6s ease-out ${i * 0.07}s, border-color 0.35s ease, background-color 0.35s ease`,
                  }}
                >
                  <it.Icon strokeWidth={1.2} className="h-9 w-9" style={{ color: iconColor, transition: "color 0.35s ease" }} aria-hidden="true" />
                  <div>
                    <h3 className="text-[1.25rem] font-semibold tracking-wide md:text-[1.35rem]" style={{ color: active ? HOT : heading, transition: "color 0.35s ease" }}>{it.label}</h3>
                    <p className="mt-1 text-[0.66rem] font-light uppercase tracking-[0.18em]" style={{ color: accent }}>{it.en}</p>
                  </div>
                  <p className="text-[0.95rem] font-light leading-[1.9] [text-wrap:pretty]" style={{ color: text, opacity: 0.85 }}>{it.desc}</p>
                </article>
              )
            })}
          </div>
        ) : (
          /* 簡潔圖示格（首頁） */
          <div ref={ref} className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
            {list.map((it, i) => {
              const active = hovered === i
              const iconColor = active ? HOT : visible ? accent : GRAY
              return (
                <div
                  key={it.label}
                  className="flex cursor-default flex-col items-center gap-4 text-center"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(22px)",
                    transition: `opacity 0.7s ease-out ${i * 0.08}s, transform 0.7s ease-out ${i * 0.08}s`,
                  }}
                >
                  <it.Icon
                    strokeWidth={1.2}
                    className="h-9 w-9 md:h-10 md:w-10"
                    style={{ color: iconColor, transform: active ? "translateY(-5px)" : "translateY(0)", transition: "color 0.45s ease, transform 0.3s ease" }}
                    aria-hidden="true"
                  />
                  <span className="flex flex-col items-center gap-1.5">
                    <span className="text-[1.05rem] tracking-[0.05em] md:text-[1.18rem]" style={{ color: active ? HOT : heading, transition: "color 0.45s ease" }}>{it.label}</span>
                    <span className="text-[0.6rem] font-light uppercase tracking-[0.18em] md:text-[0.66rem]" style={{ color: iconColor, transition: "color 0.45s ease" }}>{it.en}</span>
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
