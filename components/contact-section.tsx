"use client"

import { useCmsData, getContentValue, getContentStyle } from "@/lib/use-cms-data"

export function ContactSection() {
  const { content } = useCmsData("home")

  const address = getContentValue(content, "contact", "address") || "台中市北屯區瀋陽北路73號"
  const phone = getContentValue(content, "contact", "phone") || "04-2247-9068"
  const email = getContentValue(content, "contact", "email") || "yulun83417215@gmail.com"
  const hours = getContentValue(content, "contact", "hours") || "週一至週五  09:00 — 18:00"

  return (
    <section id="contact" className="resp-contact" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <div className="resp-contact-left flex flex-col justify-start" style={{ background: "#FFFFFF", padding: "6rem" }}>
        <p style={{ fontSize: "0.62rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#B5956A", marginBottom: "1rem" }}>Contact</p>
        <h2 className="serif" style={{ fontSize: "2.8rem", fontWeight: 300, lineHeight: 1.2, marginBottom: "3rem" }}>聯絡裕綸集團</h2>
        {[["地址",address,"address"],["電話",phone,"phone"],["Email",email,"email"],["營業時間",hours,"hours"]].map(([label, val, key]) => (
          <div key={label} style={{ marginBottom: "2rem" }}>
            <p style={{ fontSize: "0.62rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#B5956A", marginBottom: "0.4rem" }}>{label}</p>
            <p className="serif" style={{ fontSize: "1.05rem", color: "#2A2520", ...getContentStyle(content, "contact", key, "home") }}>{val}</p>
          </div>
        ))}
      </div>
      <div className="resp-contact-right flex flex-col justify-start" style={{ background: "#2A2520", padding: "6rem" }}>
        <p style={{ fontSize: "0.62rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#B5956A", marginBottom: "1rem" }}>Send Message</p>
        <h2 className="serif" style={{ fontSize: "2.8rem", fontWeight: 300, color: "#FAF8F4", marginBottom: "2.5rem" }}>預約諮詢</h2>
        <div className="flex flex-col gap-5">
          {[
            { label: "姓名", placeholder: "您的大名", type: "text" },
            { label: "聯絡電話", placeholder: "0900-000-000", type: "tel" },
            { label: "有興趣的服務", placeholder: "室內設計 / 裝修工程 / 兩者皆是", type: "text" },
          ].map(({ label, placeholder, type }) => (
            <div key={label} style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem" }}>{label}</label>
              <input type={type} placeholder={placeholder} className="serif w-full border-0 border-b border-white/20 bg-transparent pb-2 pt-1 font-light tracking-wide text-[#FAFAF8] placeholder:text-white/25 outline-none focus:border-[#B5956A] transition-colors" style={{ fontSize: "1.05rem" }} />
            </div>
          ))}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem" }}>需求說明</label>
            <textarea placeholder="請簡單描述您的空間需求或想法..." rows={3} className="serif w-full resize-none border-0 border-b border-white/20 bg-transparent pb-2 pt-1 font-light tracking-wide text-[#FAFAF8] placeholder:text-white/25 outline-none focus:border-[#B5956A] transition-colors" style={{ fontSize: "1.05rem" }} />
          </div>
          <button style={{ marginTop: "1rem", background: "#6B4E31", color: "#FAF8F4", border: "none", padding: "1rem 2.5rem", fontFamily: "'Josefin Sans',sans-serif", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer", width: "fit-content" }}>
            送出諮詢 →
          </button>
        </div>
      </div>
    </section>
  )
}
