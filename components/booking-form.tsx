"use client"

import { useState } from "react"
import { submitForm } from "@/lib/submit-form"
import { formatPhone } from "@/lib/utils"

// 預約諮詢表單（深色面板版）。全站的預約按鈕都連到 /booking 使用此表單。
export function BookingForm({ source = "預約頁" }: { source?: string }) {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="flex flex-col gap-5" style={{ paddingTop: "1rem" }}>
        <div style={{ fontSize: "2.5rem", lineHeight: 1, color: "#B5956A" }}>✓</div>
        <h3 style={{ fontSize: "1.8rem", fontWeight: 600, color: "#FAF8F4" }}>已收到您的諮詢</h3>
        <p className="font-light" style={{ fontSize: "1.05rem", lineHeight: 1.9, color: "rgba(255,255,255,0.6)" }}>
          感謝您的來信，專人將於 3 個工作天內與您聯繫。<br />
          若有急件，歡迎直撥{" "}
          <a href="tel:+886-918-230-603" style={{ color: "#FAF8F4", textDecoration: "underline" }}>0918-230-603</a>。
        </p>
        <button
          onClick={() => setSubmitted(false)}
          style={{ marginTop: "0.5rem", background: "transparent", color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.2)", padding: "0.75rem 2rem", fontFamily: "'Josefin Sans',sans-serif", fontSize: "0.9rem", letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer", width: "fit-content" }}
        >
          再填一筆 →
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      {[
        { label: "姓名", placeholder: "您的大名", type: "text" },
        { label: "聯絡電話", placeholder: "0900-000-000", type: "tel" },
        { label: "有興趣的服務", placeholder: "室內設計 / 裝修工程 / 兩者皆是", type: "text" },
        { label: "預算金額", placeholder: "例如：100萬 — 300萬", type: "text" },
      ].map(({ label, placeholder, type }) => (
        <div key={label} style={{ marginBottom: "1.25rem" }}>
          <label style={{ display: "block", fontSize: "0.9rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem" }}>{label}</label>
          <input type={type} placeholder={placeholder} value={formData[label] || ""} onChange={(e) => { const val = label === "聯絡電話" ? formatPhone(e.target.value) : e.target.value; setFormData(prev => ({ ...prev, [label]: val })) }} className="w-full bg-transparent font-light tracking-wide placeholder:text-white/25 outline-none" style={{ fontSize: "1.05rem", color: "#FAF8F4", border: "none", boxShadow: "none", paddingBottom: "0.5rem", paddingTop: "0.25rem" }} />
          <hr style={{ border: "none", height: "1px", background: "rgba(255,255,255,0.15)", marginTop: "0", width: "100%" }} />
        </div>
      ))}
      <div style={{ marginBottom: "1.25rem" }}>
        <label style={{ display: "block", fontSize: "0.9rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem" }}>需求說明</label>
        <textarea placeholder="請簡單描述您的空間需求或想法..." rows={2} value={formData["需求說明"] || ""} onChange={(e) => setFormData(prev => ({ ...prev, "需求說明": e.target.value }))} className="w-full resize-none bg-transparent font-light tracking-wide placeholder:text-white/25 outline-none" style={{ fontSize: "1.05rem", color: "#FAF8F4", border: "none", boxShadow: "none", paddingBottom: "0.5rem", paddingTop: "0.25rem", display: "block", width: "100%", margin: "0" }} />
        <hr style={{ border: "none", height: "1px", background: "rgba(255,255,255,0.15)", marginTop: "0", width: "100%" }} />
      </div>
      <button
        disabled={submitting}
        onClick={async () => {
          setSubmitting(true)
          try {
            await submitForm(formData, source)
            setSubmitted(true)
            setFormData({})
          } catch { /* ignore */ }
          setSubmitting(false)
        }}
        style={{ marginTop: "1rem", background: "#B5956A", color: "#FAF8F4", border: "none", padding: "1rem 2.5rem", fontFamily: "'Josefin Sans',sans-serif", fontSize: "0.9rem", letterSpacing: "0.3em", textTransform: "uppercase", cursor: submitting ? "not-allowed" : "pointer", width: "fit-content", opacity: submitting ? 0.6 : 1 }}>
        {submitting ? "送出中..." : "送出預約 →"}
      </button>
    </div>
  )
}
