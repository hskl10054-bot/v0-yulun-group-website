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
  "採逐項清單式報價，每一筆材料與花費都寫清楚，讓你知道錢花在哪、也方便比較。",
  "付款分階段、跟著工程進度走，而不是一次付清，你隨時清楚進度與金額。",
]

export function DesignProcess({ colors }: DesignProcessProps) {
  const heading = colors.portfolio_heading || "#2A2520"
  const accent = colors.portfolio_accent || "#B5956A"
  const text = colors.about_text || "#5B5349"
  const border = colors.services_card_border || colors.strengths_card_border || "#E8E3DA"
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <section id="process" className="scroll-mt-24 py-24 md:py-32" style={{ backgroundColor: "#F4F1EC" }}>
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
          <style>{`
            .va-card { transition: transform .38s cubic-bezier(.2,.7,.2,1), box-shadow .38s ease, border-color .38s ease; box-shadow: 0 10px 30px -24px rgba(42,37,32,0.28); }
            .va-card:hover { transform: translateY(-6px); border-color: ${accent}; box-shadow: 0 28px 54px -30px rgba(42,37,32,0.38); }
            .va-badge { transition: background-color .38s ease, transform .38s ease; }
            .va-card:hover .va-badge { background-color: ${accent}; transform: scale(1.06) rotate(-3deg); }
            .va-icn { transition: color .38s ease; }
            .va-card:hover .va-icn { color: #FFFFFF; }
            .va-title { transition: color .38s ease; }
            .va-card:hover .va-title { color: ${accent}; }
          `}</style>
          <h3 className="mb-8 text-[0.85rem] uppercase tracking-[0.25em]" style={{ color: accent }}>我們的承諾</h3>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VALUE_ADDS.map((v) => (
              <div key={v.t} className="va-card flex items-start gap-4 rounded-2xl border p-6 md:p-7" style={{ borderColor: border, backgroundColor: "#FFFFFF", cursor: "default" }}>
                <span className="va-badge flex h-12 w-12 flex-none items-center justify-center rounded-2xl" style={{ backgroundColor: "rgba(181,149,106,0.12)" }}>
                  <v.Icon strokeWidth={1.4} className="va-icn h-6 w-6" style={{ color: accent }} aria-hidden="true" />
                </span>
                <div>
                  <p className="va-title text-[1.08rem] font-semibold tracking-wide" style={{ color: heading }}>{v.t}</p>
                  <p className="mt-1.5 text-[0.92rem] font-light leading-relaxed" style={{ color: text }}>{v.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fees */}
        <div className="mt-16 overflow-hidden rounded-3xl p-8 md:p-11" style={{ backgroundColor: "#FFFFFF", borderTop: `3px solid ${accent}`, boxShadow: "0 24px 60px -34px rgba(42,37,32,0.32)" }}>
          <h3 className="text-[1.4rem] font-bold tracking-wide" style={{ color: heading }}>關於費用，我們說清楚</h3>
          <span aria-hidden="true" className="mt-3 mb-6 block h-[2px] w-12 rounded-full" style={{ backgroundColor: accent }} />
          <ul className="flex flex-col gap-4">
            {FEES.map((f) => (
              <li key={f} className="flex items-start gap-3.5 text-[1rem] font-light leading-[1.95] [text-wrap:pretty]" style={{ color: text }}>
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-none rounded-full" style={{ backgroundColor: accent }} />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Process FAQ */}
        <div className="mx-auto mt-24 max-w-3xl">
          <h3 className="mb-10 text-center text-[0.8rem] uppercase tracking-[0.35em]" style={{ color: accent }}>合作前的常見問題</h3>
          <div style={{ borderTop: `1px solid ${border}` }}>
            {PROCESS_FAQ.map((f, i) => {
              const open = openFaq === i
              return (
                <div key={f.q} className="border-b" style={{ borderColor: border }}>
                  <button type="button" onClick={() => setOpenFaq(open ? null : i)} aria-expanded={open} className="flex w-full items-start gap-4 py-7 text-left md:gap-8 md:py-8">
                    <span className="flex-none pt-0.5 text-[0.85rem] font-semibold tracking-wider [font-variant-numeric:tabular-nums] md:text-[0.95rem]" style={{ color: accent }}>Q{i + 1}.</span>
                    <span className="flex-1 text-[1.05rem] font-medium leading-snug md:text-[1.2rem]" style={{ color: open ? accent : heading, transition: "color 0.3s" }}>{f.q}</span>
                    <span aria-hidden="true" className="flex-none pt-1 text-xl font-light leading-none" style={{ color: accent, transform: open ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.3s" }}>+</span>
                  </button>
                  <div className="grid transition-all duration-500 ease-out" style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}>
                    <div className="overflow-hidden">
                      <p className="pb-8 pl-8 pr-8 text-[0.98rem] font-light leading-[1.95] [text-wrap:pretty] md:pl-[3.75rem]" style={{ color: text }}>{f.a}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
