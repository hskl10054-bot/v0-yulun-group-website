"use client"

import { useCmsData, getContentValue, getContentStyle } from "@/lib/use-cms-data"

interface ContactSectionProps {
  colors: Record<string, string>
}

export function ContactSection({ colors }: ContactSectionProps) {
  const { content } = useCmsData("home")

  const address = getContentValue(content, "contact", "address") || "台中市北屯區瀋陽北路73號"
  const phone = getContentValue(content, "contact", "phone") || "04-2247-9068"
  const email = getContentValue(content, "contact", "email") || "yulun83417215@gmail.com"
  const hours = getContentValue(content, "contact", "hours") || "週一至週五  09:00 — 18:00"

  return (
    <section id="contact" className="resp-contact" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <div className="resp-contact-left flex flex-col justify-start" style={{ background: colors.contact_bg, padding: "6rem" }}>
        <p style={{ fontSize: "0.62rem", letterSpacing: "0.4em", textTransform: "uppercase", color: colors.contact_accent, marginBottom: "1rem" }}>Contact</p>
        <h2 className="serif" style={{ fontSize: "2.8rem", fontWeight: 300, lineHeight: 1.2, marginBottom: "3rem", color: colors.contact_heading }}>聯絡裕綸集團</h2>
        {[["地址",address,"address"],["電話",phone,"phone"],["Email",email,"email"],["營業時間",hours,"hours"]].map(([label, val, key]) => (
          <div key={label} style={{ marginBottom: "2rem" }}>
            <p style={{ fontSize: "0.62rem", letterSpacing: "0.35em", textTransform: "uppercase", color: colors.contact_accent, marginBottom: "0.4rem" }}>{label}</p>
            {key === "address" ? (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(val)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="serif inline-flex items-center gap-1.5 hover:opacity-70 transition-opacity"
                style={{ fontSize: "1.05rem", color: colors.contact_heading, textDecoration: "none", ...getContentStyle(content, "contact", key, "home") }}
              >
                {val}
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5, flexShrink: 0 }}>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            ) : (
              <p className="serif" style={{ fontSize: "1.05rem", color: colors.contact_heading, ...getContentStyle(content, "contact", key, "home") }}>{val}</p>
            )}
          </div>
        ))}
      </div>
      <div className="resp-contact-right flex flex-col justify-start" style={{ background: colors.footer_bg, padding: "6rem" }}>
        <p style={{ fontSize: "0.62rem", letterSpacing: "0.4em", textTransform: "uppercase", color: colors.contact_accent, marginBottom: "1rem" }}>Send Message</p>
        <h2 className="serif" style={{ fontSize: "2.8rem", fontWeight: 300, color: colors.footer_text, marginBottom: "2.5rem" }}>預約諮詢</h2>
        <div className="flex flex-col gap-5">
          {[
            { label: "姓名", placeholder: "您的大名", type: "text" },
            { label: "聯絡電話", placeholder: "0900-000-000", type: "tel" },
            { label: "有興趣的服務", placeholder: "室內設計 / 裝修工程 / 兩者皆是", type: "text" },
          ].map(({ label, placeholder, type }) => (
            <div key={label} style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem" }}>{label}</label>
              <input type={type} placeholder={placeholder} className="serif w-full bg-transparent font-light tracking-wide placeholder:text-white/25 outline-none" style={{ fontSize: "1.05rem", color: colors.footer_text, border: "none", boxShadow: "none", paddingBottom: "0.5rem", paddingTop: "0.25rem" }} />
              <hr style={{ border: "none", height: "1px", background: "rgba(255,255,255,0.15)", marginTop: "0", width: "100%" }} />
            </div>
          ))}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem" }}>需求說明</label>
            <textarea placeholder="請簡單描述您的空間需求或想法..." rows={1} className="serif w-full resize-none bg-transparent font-light tracking-wide placeholder:text-white/25 outline-none" style={{ fontSize: "1.05rem", color: colors.footer_text, border: "none", boxShadow: "none", paddingBottom: "0.5rem", paddingTop: "0.25rem", display: "block", borderBottom: "none", width: "100%", margin: "0" }} />
            <hr style={{ border: "none", height: "1px", background: "rgba(255,255,255,0.15)", marginTop: "0", width: "100%" }} />
          </div>
          <button style={{ marginTop: "1rem", background: colors.contact_btn_bg, color: colors.contact_btn_text, border: "none", padding: "1rem 2.5rem", fontFamily: "'Josefin Sans',sans-serif", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer", width: "fit-content" }}>
            送出諮詢 →
          </button>
        </div>
      </div>
    </section>
  )
}
