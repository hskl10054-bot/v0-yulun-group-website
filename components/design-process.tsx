"use client"

import { useState } from "react"
import { Sparkles, Images, ClipboardList, Users, ShieldCheck, Camera } from "lucide-react"
import { PROCESS_INTRO, PROCESS_STEPS, PROCESS_FAQ } from "@/data/cases"

interface DesignProcessProps {
  colors: Record<string, string>
}

const VALUE_ADDS = [
  { Icon: Sparkles, t: "打造專屬風格", d: "從你的生活與故事出發，量身設計。" },
  { Icon: Images, t: "線上施工相簿", d: "隨時掌握台中工地的施工進度。" },
  { Icon: ClipboardList, t: "條列式報價", d: "施作前看清每一筆花費，透明無隱藏。" },
  { Icon: Users, t: "自有工班", d: "設計施工同一團隊，不外包、不脫節。" },
  { Icon: ShieldCheck, t: "保固兩年", d: "設計與工程，交屋後持續負責。" },
  { Icon: Camera, t: "完工專業拍攝", d: "為你的空間留下最美的紀錄。" },
]

const FEES = [
  "初談完全免費，不會在第一次見面就要你付任何錢。",
  "設計與工程分兩階段簽約：先簽設計、確認滿意，再進工程估價與簽約，每一步你都清楚、也保留喊停的主導權。",
  "付款分階段、跟著進度走，而不是一次付清。",
]

export function DesignProcess({ colors }: DesignProcessProps) {
  const heading = colors.portfolio_heading || "#2A2520"
  const accent = colors.portfolio_accent || "#B5956A"
  const text = colors.about_text || "#5B5349"
  const border = colors.services_card_border || colors.strengths_card_border || "#E8E3DA"
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: "#F4F1EC" }}>
      <div className="mx-auto max-w-[100rem] px-6 md:px-12">
        {/* Heading */}
        <div className="mb-12 border-b pb-6 md:mb-16" style={{ borderColor: "rgba(43,39,34,0.12)" }}>
          <span aria-hidden="true" className="-ml-0.5 mb-1 block select-none font-semibold uppercase leading-none" style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)", color: "rgba(107,78,49,0.10)", letterSpacing: "0.08em" }}>Process</span>
          <h2 className="text-3xl font-bold tracking-[0.12em] md:text-4xl" style={{ color: heading }}>合作流程</h2>
          <p className="mt-5 max-w-3xl text-[1.05rem] font-light leading-[2] [text-wrap:pretty] md:text-[1.15rem]" style={{ color: text }}>
            台中室內設計與裝修，是一筆重要的決定。{PROCESS_INTRO.lead}
          </p>
        </div>

        {/* Steps timeline */}
        <ol className="relative mx-auto max-w-3xl">
          {PROCESS_STEPS.map((s, i) => {
            const isLast = i === PROCESS_STEPS.length - 1
            return (
              <li key={s.no} className="relative flex gap-6 pb-10 last:pb-0">
                {!isLast && <span aria-hidden="true" className="absolute left-[1.25rem] top-11 bottom-0 w-px" style={{ backgroundColor: border }} />}
                <span className="relative z-10 flex h-10 w-10 flex-none items-center justify-center rounded-full text-[0.95rem] font-medium" style={{ border: `1px solid ${accent}`, color: accent, backgroundColor: "#F4F1EC", fontVariantNumeric: "tabular-nums" }}>
                  {s.no}
                </span>
                <div className="flex-1 pt-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-[1.2rem] font-semibold tracking-wide md:text-[1.35rem]" style={{ color: heading }}>{s.title}</h3>
                    <span className="text-[0.8rem] tracking-wide" style={{ color: accent }}>{s.time}</span>
                    {s.stage && <span className="rounded-full px-2.5 py-0.5 text-[0.68rem] tracking-[0.1em]" style={{ backgroundColor: "rgba(181,149,106,0.12)", color: accent }}>{s.stage}</span>}
                  </div>
                  <p className="mt-2 text-[1rem] font-light leading-[1.95] [text-wrap:pretty]" style={{ color: text }}>{s.desc}</p>
                  <p className="mt-3 text-[0.9rem] leading-relaxed" style={{ color: heading, opacity: 0.75 }}>
                    <b style={{ color: accent, fontWeight: 600 }}>你準備</b>　{s.prep}　·　<b style={{ color: accent, fontWeight: 600 }}>你得到</b>　{s.get}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>

        {/* Value adds */}
        <div className="mt-20">
          <h3 className="mb-8 text-[0.85rem] uppercase tracking-[0.25em]" style={{ color: accent }}>我們的承諾</h3>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VALUE_ADDS.map((v) => (
              <div key={v.t} className="flex items-start gap-4 rounded-2xl border p-6" style={{ borderColor: border, backgroundColor: "#FFFFFF" }}>
                <v.Icon strokeWidth={1.3} className="mt-0.5 h-7 w-7 flex-none" style={{ color: accent }} aria-hidden="true" />
                <div>
                  <p className="text-[1.05rem] font-semibold" style={{ color: heading }}>{v.t}</p>
                  <p className="mt-1 text-[0.92rem] font-light leading-relaxed" style={{ color: text }}>{v.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fees */}
        <div className="mt-16 rounded-2xl border p-8 md:p-10" style={{ borderColor: border, backgroundColor: "#FFFFFF" }}>
          <h3 className="mb-5 text-[1.35rem] font-bold tracking-wide" style={{ color: heading }}>關於費用，我們說清楚</h3>
          <ul className="flex flex-col gap-3">
            {FEES.map((f) => (
              <li key={f} className="flex gap-3 text-[1rem] font-light leading-[1.95] [text-wrap:pretty]" style={{ color: text }}>
                <span aria-hidden="true" style={{ color: accent }}>—</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Process FAQ */}
        <div className="mx-auto mt-16 max-w-3xl">
          <h3 className="mb-4 text-[0.85rem] uppercase tracking-[0.25em]" style={{ color: accent }}>合作前的常見問題</h3>
          {PROCESS_FAQ.map((f, i) => {
            const open = openFaq === i
            return (
              <div key={f.q} className="border-b" style={{ borderColor: border }}>
                <button type="button" onClick={() => setOpenFaq(open ? null : i)} aria-expanded={open} className="flex w-full items-center justify-between gap-5 py-5 text-left">
                  <span className="text-[1.05rem] font-medium leading-snug md:text-[1.15rem]" style={{ color: open ? accent : heading, transition: "color 0.3s" }}>{f.q}</span>
                  <span aria-hidden="true" className="flex h-6 w-6 flex-none items-center justify-center rounded-full border text-base leading-none" style={{ borderColor: accent, color: accent, transform: open ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.3s" }}>+</span>
                </button>
                <div className="grid transition-all duration-500 ease-out" style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}>
                  <div className="overflow-hidden">
                    <p className="pb-6 pr-8 text-[0.98rem] font-light leading-[1.95] [text-wrap:pretty]" style={{ color: text }}>{f.a}</p>
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
