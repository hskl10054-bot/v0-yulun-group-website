"use client"

import { useEffect, useRef, useState } from "react"
import { PencilRuler, Home, RefreshCw, Sofa, Building2, Store, Hammer } from "lucide-react"

interface ServiceItemsProps {
  colors: Record<string, string>
}

// 服務項目 — 圖示 + 名稱，沿用首頁浮水印標題與暖色系。建築設計已移除。
const ITEMS = [
  { label: "預售客變", en: "Pre-sale Customization", Icon: PencilRuler },
  { label: "新屋裝修", en: "New Home Interior", Icon: Home },
  { label: "老屋翻新", en: "Old House Renewal", Icon: RefreshCw },
  { label: "家居設計", en: "Residential Design", Icon: Sofa },
  { label: "商業空間", en: "Commercial Space", Icon: Building2 },
  { label: "店面設計", en: "Storefront Design", Icon: Store },
  { label: "裝潢施工", en: "Interior Construction", Icon: Hammer },
]

export function ServiceItems({ colors }: ServiceItemsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

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
      { threshold: 0.2 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const heading = colors.portfolio_heading || "#2F2F2F"
  const accent = colors.portfolio_accent || "#B5956A"

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: "#FAF8F4" }}>
      <div className="mx-auto max-w-[100rem] px-6 md:px-12">
        {/* Heading */}
        <div className="mb-10 border-b pb-5 md:mb-16" style={{ borderColor: "rgba(43,39,34,0.12)" }}>
          <span
            aria-hidden="true"
            className="-ml-0.5 mb-1 block select-none font-semibold uppercase leading-none"
            style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)", color: "rgba(107,78,49,0.10)", letterSpacing: "0.08em" }}
          >
            Services
          </span>
          <h2 className="text-3xl font-bold tracking-[0.12em] md:text-4xl" style={{ color: heading }}>服務項目</h2>
        </div>

        {/* Items grid */}
        <div ref={ref} className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {ITEMS.map((it, i) => (
            <div
              key={it.label}
              className="group flex flex-col items-center gap-4 text-center"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(22px)",
                transition: `opacity 0.7s ease-out ${i * 0.08}s, transform 0.7s ease-out ${i * 0.08}s`,
              }}
            >
              <it.Icon
                strokeWidth={1.2}
                className="h-9 w-9 transition-transform duration-300 group-hover:-translate-y-1 md:h-10 md:w-10"
                style={{ color: accent }}
                aria-hidden="true"
              />
              <span className="flex flex-col items-center gap-1.5">
                <span className="text-[1.05rem] tracking-[0.05em] md:text-[1.18rem]" style={{ color: heading }}>{it.label}</span>
                <span className="text-[0.6rem] font-light uppercase tracking-[0.18em] md:text-[0.66rem]" style={{ color: accent }}>{it.en}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
