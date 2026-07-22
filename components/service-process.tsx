"use client"

import { useEffect, useRef, useState } from "react"

interface ServiceProcessProps {
  colors: Record<string, string>
}

// 服務流程 — 設計階段（1–4）＋工程階段（5–9），沿用首頁浮水印標題與暖色系。
const STAGES = [
  {
    label: "設計階段",
    en: "Design Phase",
    start: 1,
    steps: ["初步資訊討論", "付費提案丈量", "簽訂設計委託", "設計規畫繪製"],
  },
  {
    label: "工程階段",
    en: "Construction Phase",
    start: 5,
    steps: ["裝潢工程確認", "簽訂工程合約", "工程進行", "驗收交屋", "售後保固"],
  },
]

export function ServiceProcess({ colors }: ServiceProcessProps) {
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
  const line = colors.strengths_card_border || "#E5E0DB"

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: "#F4F1EC" }}>
      <div className="mx-auto max-w-[100rem] px-6 md:px-12">
        {/* Heading */}
        <div className="mb-10 border-b pb-5 md:mb-16" style={{ borderColor: "rgba(43,39,34,0.12)" }}>
          <span
            aria-hidden="true"
            className="-ml-0.5 mb-1 block select-none font-semibold uppercase leading-none"
            style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)", color: "rgba(107,78,49,0.10)", letterSpacing: "0.08em" }}
          >
            Process
          </span>
          <h2 className="text-3xl font-bold tracking-[0.12em] md:text-4xl" style={{ color: heading }}>服務流程</h2>
          <p className="mt-4 text-[1.05rem] font-light md:text-[1.15rem]" style={{ color: colors.testimonials_text || heading, opacity: 0.6 }}>
            從設計到完工，一站式透明流程，每一步都與您同行。
          </p>
        </div>

        {/* Two stages */}
        <div ref={ref} className="grid gap-12 md:grid-cols-2 md:gap-20">
          {STAGES.map((stage, si) => (
            <div
              key={stage.label}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.9s ease-out ${si * 0.15}s, transform 0.9s ease-out ${si * 0.15}s`,
              }}
            >
              {/* Stage header */}
              <div className="mb-8 flex items-baseline gap-3">
                <h3 className="text-xl font-bold tracking-[0.1em] md:text-2xl" style={{ color: heading }}>{stage.label}</h3>
                <span className="text-[0.7rem] font-light uppercase tracking-[0.25em]" style={{ color: accent }}>{stage.en}</span>
              </div>

              {/* Steps timeline */}
              <ol className="relative">
                {stage.steps.map((step, i) => {
                  const num = stage.start + i
                  const isLast = i === stage.steps.length - 1
                  return (
                    <li key={step} className="relative flex items-center gap-5 pb-8 last:pb-0">
                      {!isLast && (
                        <span
                          aria-hidden="true"
                          className="absolute left-[1.125rem] top-9 bottom-0 w-px"
                          style={{ backgroundColor: line }}
                        />
                      )}
                      <span
                        className="relative z-10 flex h-9 w-9 flex-none items-center justify-center rounded-full text-[0.95rem] font-medium"
                        style={{ border: `1px solid ${accent}`, color: accent, backgroundColor: "#F4F1EC", fontVariantNumeric: "tabular-nums" }}
                      >
                        {num}
                      </span>
                      <span className="text-[1.05rem] tracking-wide md:text-[1.2rem]" style={{ color: heading }}>{step}</span>
                    </li>
                  )
                })}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
