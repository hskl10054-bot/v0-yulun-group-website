"use client"

import { useState } from "react"
import { FAQS } from "@/data/faqs"

interface FaqSectionProps {
  colors: Record<string, string>
}

// 常見問答 — 手風琴（點擊展開），沿用首頁浮水印標題與金色點綴，並利於 SEO。
export function FaqSection({ colors }: FaqSectionProps) {
  const [open, setOpen] = useState<number | null>(0)

  const heading = colors.portfolio_heading || "#2F2F2F"
  const accent = colors.portfolio_accent || "#B5956A"
  const text = colors.testimonials_text || "#5B5349"
  const border = colors.strengths_card_border || "#E5E0DB"

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="mx-auto max-w-[100rem] px-6 md:px-12">
        {/* Heading */}
        <div className="mb-10 border-b pb-5 md:mb-14" style={{ borderColor: "rgba(43,39,34,0.12)" }}>
          <span
            aria-hidden="true"
            className="-ml-0.5 mb-1 block select-none font-semibold uppercase leading-none"
            style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)", color: "rgba(107,78,49,0.10)", letterSpacing: "0.08em" }}
          >
            FAQ
          </span>
          <h2 className="text-3xl font-bold tracking-[0.12em] md:text-4xl" style={{ color: heading }}>常見問答</h2>
        </div>

        {/* Accordion */}
        <div className="mx-auto max-w-4xl">
          {FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q} className="border-b" style={{ borderColor: border }}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-5 py-6 text-left"
                >
                  <span className="text-[1.1rem] font-medium leading-snug md:text-[1.25rem]" style={{ color: isOpen ? accent : heading, transition: "color 0.3s" }}>
                    {f.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 flex-none items-center justify-center rounded-full border text-lg leading-none"
                    style={{
                      borderColor: accent,
                      color: accent,
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  className="grid transition-all duration-500 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-7 pr-10 text-[1rem] font-light leading-[2] [text-wrap:pretty] md:text-[1.08rem]" style={{ color: text }}>
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
