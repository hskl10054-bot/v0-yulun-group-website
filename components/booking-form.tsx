"use client"

import { useState } from "react"
import { submitForm } from "@/lib/submit-form"
import { formatPhone } from "@/lib/utils"

// 明亮版預約諮詢表單 — 整合「空房子室內設計」與「裕綸室內裝修」的綜合需求問卷。
// 全站的預約按鈕都連到 /booking 使用此表單。

const GOLD = "#B5956A"
const INK = "#2A2520"
const MUTE = "#8C8479"
const LINE = "#E4DED4"

const SERVICES = [
  { key: "室內設計（空房子）", title: "室內設計", sub: "空房子室內設計" },
  { key: "裝修工程（裕綸室內裝修）", title: "裝修工程", sub: "裕綸室內裝修" },
  { key: "設計＋裝修一站式", title: "設計＋裝修", sub: "一站式服務" },
]
const HOUSE_STATES = ["新成屋", "預售屋（客變）", "中古屋", "老屋翻新", "毛胚屋", "商業空間"]
const BUILDING_TYPES = ["電梯大樓", "公寓", "透天厝", "商辦", "店面"]
const BUDGETS = ["100 萬以下", "100 – 200 萬", "200 – 300 萬", "300 – 500 萬", "500 萬以上", "尚未確定"]
const CONTACT_TIMES = ["早上 9–12", "中午 12–13", "下午 13–18", "晚上 18–21"]

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.9rem",
  fontWeight: 500,
  letterSpacing: "0.12em",
  color: INK,
  marginBottom: "0.7rem",
}
const inputStyle: React.CSSProperties = {
  width: "100%",
  fontSize: "1.02rem",
  color: INK,
  background: "transparent",
  border: "none",
  borderBottom: `1px solid ${LINE}`,
  outline: "none",
  padding: "0.55rem 0",
  fontWeight: 300,
  transition: "border-color 0.3s",
}

export function BookingForm({ source = "預約頁" }: { source?: string }) {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [times, setTimes] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const set = (k: string, v: string) => setFormData((p) => ({ ...p, [k]: v }))
  const toggleTime = (t: string) =>
    setTimes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = GOLD
  }
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = LINE
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-5 rounded-3xl bg-white px-8 py-16 md:px-16 md:py-20" style={{ boxShadow: "0 30px 80px -40px rgba(42,37,32,0.25)" }}>
        <div style={{ fontSize: "3rem", lineHeight: 1, color: GOLD }}>✓</div>
        <h3 style={{ fontSize: "1.9rem", fontWeight: 600, color: INK, letterSpacing: "0.04em" }}>已收到您的諮詢</h3>
        <p className="font-light" style={{ fontSize: "1.05rem", lineHeight: 2, color: "#6B5D4F" }}>
          感謝您的來信，空房子室內設計 × 裕綸室內裝修專人將於 3 個工作天內與您聯繫。<br />
          若有急件，歡迎直撥{" "}
          <a href="tel:+886-4-2247-9068" style={{ color: GOLD, textDecoration: "underline" }}>04-2247-9068</a>。
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-2 rounded-full px-7 py-3 text-[0.85rem] tracking-[0.2em] transition-colors"
          style={{ background: "transparent", color: MUTE, border: `1px solid ${LINE}`, cursor: "pointer" }}
        >
          再填一筆 →
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-3xl bg-white px-6 py-10 md:px-12 md:py-14" style={{ boxShadow: "0 30px 80px -40px rgba(42,37,32,0.25)" }}>
      <div className="flex flex-col gap-11">
        {/* ── 需求類型 ── */}
        <section className="flex flex-col gap-6">
          <SectionLabel n="01" title="想諮詢的服務" hint="可選擇一站式，我們會整合設計與工程" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {SERVICES.map((s) => {
              const active = formData["想諮詢的服務"] === s.key
              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => set("想諮詢的服務", s.key)}
                  className="flex flex-col items-center gap-1 rounded-2xl px-4 py-5 text-center transition-all"
                  style={{
                    border: `1px solid ${active ? GOLD : LINE}`,
                    background: active ? "rgba(181,149,106,0.07)" : "#FFFFFF",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ fontSize: "1.05rem", fontWeight: 600, color: active ? GOLD : INK, letterSpacing: "0.05em" }}>{s.title}</span>
                  <span style={{ fontSize: "0.78rem", color: MUTE, letterSpacing: "0.08em" }}>{s.sub}</span>
                </button>
              )
            })}
          </div>
        </section>

        {/* ── 聯絡資訊 ── */}
        <section className="flex flex-col gap-6">
          <SectionLabel n="02" title="聯絡資訊" />
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <Field label="姓名">
              <input style={inputStyle} onFocus={onFocus} onBlur={onBlur} placeholder="您的大名" value={formData["姓名"] || ""} onChange={(e) => set("姓名", e.target.value)} />
            </Field>
            <div>
              <span style={labelStyle}>稱謂</span>
              <div className="flex items-center gap-6 pt-1">
                {["先生", "小姐"].map((t) => {
                  const active = formData["稱謂"] === t
                  return (
                    <button key={t} type="button" onClick={() => set("稱謂", t)} className="flex items-center gap-2" style={{ background: "transparent", border: "none", cursor: "pointer", padding: 0 }}>
                      <span className="flex h-4 w-4 items-center justify-center rounded-full" style={{ border: `1.5px solid ${active ? GOLD : "#C9C1B4"}` }}>
                        {active && <span className="h-2 w-2 rounded-full" style={{ background: GOLD }} />}
                      </span>
                      <span style={{ fontSize: "1rem", color: active ? INK : MUTE, fontWeight: active ? 500 : 300 }}>{t}</span>
                    </button>
                  )
                })}
              </div>
            </div>
            <Field label="聯絡電話">
              <input type="tel" style={inputStyle} onFocus={onFocus} onBlur={onBlur} placeholder="0900-000-000" value={formData["聯絡電話"] || ""} onChange={(e) => set("聯絡電話", formatPhone(e.target.value))} />
            </Field>
            <Field label="LINE ID / Email">
              <input style={inputStyle} onFocus={onFocus} onBlur={onBlur} placeholder="方便聯繫的 LINE 或信箱" value={formData["LINE ID / Email"] || ""} onChange={(e) => set("LINE ID / Email", e.target.value)} />
            </Field>
          </div>
          <div>
            <span style={labelStyle}>方便聯繫時段</span>
            <div className="flex flex-wrap gap-2.5 pt-1">
              {CONTACT_TIMES.map((t) => {
                const active = times.includes(t)
                return (
                  <button key={t} type="button" onClick={() => toggleTime(t)} className="rounded-full px-4 py-2 text-[0.88rem] transition-all" style={{ border: `1px solid ${active ? GOLD : LINE}`, background: active ? "rgba(181,149,106,0.09)" : "#FFFFFF", color: active ? GOLD : MUTE, cursor: "pointer", fontWeight: active ? 500 : 300 }}>
                    {t}
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── 房屋資訊 ── */}
        <section className="flex flex-col gap-6">
          <SectionLabel n="03" title="房屋資訊" hint="讓我們更了解您的空間，選填即可" />
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <Field label="房屋所在地 / 建案名稱">
              <input style={inputStyle} onFocus={onFocus} onBlur={onBlur} placeholder="例如：台中市北屯區 / 瀋石苑" value={formData["房屋所在地 / 建案名稱"] || ""} onChange={(e) => set("房屋所在地 / 建案名稱", e.target.value)} />
            </Field>
            <Field label="室內坪數">
              <input style={inputStyle} onFocus={onFocus} onBlur={onBlur} placeholder="例如：35 坪" value={formData["室內坪數"] || ""} onChange={(e) => set("室內坪數", e.target.value)} />
            </Field>
            <Field label="房屋狀態">
              <Select value={formData["房屋狀態"] || ""} onChange={(v) => set("房屋狀態", v)} placeholder="請選擇房屋狀態" options={HOUSE_STATES} onFocus={onFocus} onBlur={onBlur} />
            </Field>
            <Field label="建物類型">
              <Select value={formData["建物類型"] || ""} onChange={(v) => set("建物類型", v)} placeholder="請選擇建物類型" options={BUILDING_TYPES} onFocus={onFocus} onBlur={onBlur} />
            </Field>
            <Field label="裝修預算">
              <Select value={formData["裝修預算"] || ""} onChange={(v) => set("裝修預算", v)} placeholder="請選擇預算範圍" options={BUDGETS} onFocus={onFocus} onBlur={onBlur} />
            </Field>
          </div>
        </section>

        {/* ── 需求說明 ── */}
        <section className="flex flex-col gap-6">
          <SectionLabel n="04" title="需求與喜好" />
          <Field label="想跟我們說的話">
            <textarea rows={4} className="resize-none" style={{ ...inputStyle, lineHeight: 1.9 }} onFocus={onFocus} onBlur={onBlur} placeholder="平時的生活習慣、喜歡的風格、機能需求或任何想法都可以寫下來…" value={formData["需求說明"] || ""} onChange={(e) => set("需求說明", e.target.value)} />
          </Field>
        </section>

        <button
          disabled={submitting}
          onClick={async () => {
            setSubmitting(true)
            try {
              await submitForm({ ...formData, 方便聯繫時段: times.join("、") }, source)
              setSubmitted(true)
              setFormData({})
              setTimes([])
            } catch { /* ignore */ }
            setSubmitting(false)
          }}
          className="mt-1 w-full rounded-full py-4 text-[0.95rem] tracking-[0.25em] transition-transform hover:-translate-y-0.5"
          style={{ background: GOLD, color: "#FFFFFF", border: "none", cursor: submitting ? "not-allowed" : "pointer", opacity: submitting ? 0.6 : 1 }}
        >
          {submitting ? "送出中…" : "送出預約諮詢 →"}
        </button>
        <p className="-mt-3 text-center text-[0.82rem] font-light" style={{ color: MUTE }}>
          送出後，空房子室內設計 × 裕綸室內裝修專人將於 3 個工作天內與您聯繫。初次諮詢完全免費。
        </p>
      </div>
    </div>
  )
}

function SectionLabel({ n, title, hint }: { n: string; title: string; hint?: string }) {
  return (
    <div className="flex items-baseline gap-3 border-b pb-3" style={{ borderColor: LINE }}>
      <span style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.85rem", letterSpacing: "0.2em", color: GOLD }}>{n}</span>
      <h3 style={{ fontSize: "1.2rem", fontWeight: 600, color: INK, letterSpacing: "0.06em" }}>{title}</h3>
      {hint && <span className="hidden sm:inline" style={{ fontSize: "0.8rem", fontWeight: 300, color: MUTE }}>{hint}</span>}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <span style={labelStyle}>{label}</span>
      {children}
    </div>
  )
}

function Select({
  value, onChange, placeholder, options, onFocus, onBlur,
}: {
  value: string
  onChange: (v: string) => void
  placeholder: string
  options: string[]
  onFocus: (e: React.FocusEvent<HTMLSelectElement>) => void
  onBlur: (e: React.FocusEvent<HTMLSelectElement>) => void
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        className="appearance-none"
        style={{ ...inputStyle, color: value ? INK : "#B3AB9E", paddingRight: "1.5rem", cursor: "pointer" }}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o} style={{ color: INK }}>{o}</option>
        ))}
      </select>
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MUTE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  )
}
