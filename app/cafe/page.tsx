"use client"
import Link from "next/link"
import { ArrowLeft, MapPin, Clock, Coffee } from "lucide-react"
import { useEffect, useRef } from "react"

const stores = [
  { name: "北屯旗艦店", address: "台中市北屯區熱河路二段226號" },
  { name: "西區精忠店", address: "台中市西區精忠街36號" },
  { name: "南區忠明店", address: "台中市南區忠明南路576號" },
  { name: "花蓮創始店", address: "花蓮市建國路23號2樓" },
]

const features = [
  { title: "不限時深夜咖啡", desc: "營業至深夜，提供舒適的空間讓你不受時間限制，盡情享受每一刻的寧靜。" },
  { title: "自烘咖啡豆", desc: "嚴選產區生豆，自家烘焙，以專業的烘豆技術呈現每一支豆子最完美的風味。" },
  { title: "場地租賃", desc: "提供多功能場地租借服務，適合商務洽公、讀書會、小型聚會等各種用途。" },
]

export default function CafePage() {
  const fadeRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          ;(e.target as HTMLElement).style.opacity = "1"
          ;(e.target as HTMLElement).style.transform = "translateY(0)"
        }
      }),
      { threshold: 0.1 }
    )
    fadeRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const fadeStyle = { opacity: 0, transform: "translateY(28px)", transition: "opacity 0.8s ease, transform 0.8s ease" }
  const addRef = (i: number) => (el: HTMLElement | null) => { fadeRefs.current[i] = el }

  return (
    <div style={{ fontFamily: "'Josefin Sans', sans-serif", background: "#FAF8F4", color: "#2A2520", letterSpacing: "0.05em" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Noto+Serif+TC:wght@300;400&family=Josefin+Sans:wght@200;300;400&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .serif { font-family: 'Cormorant Garamond', serif; }
        .noto { font-family: 'Noto Serif TC', serif; }
        .store-card:hover { border-color: #6B4E31 !important; background: #F5F0E8 !important; }
        .feature-card:hover { border-color: #6B4E31 !important; }
        .feature-card:hover .feature-icon { background: #6B4E31 !important; border-color: #6B4E31 !important; }
        .feature-card:hover .feature-icon svg { color: #FAF8F4 !important; }
        .back-link:hover { color: #6B4E31 !important; }

        /* Responsive */
        @media (max-width: 1024px) {
          .resp-nav { padding: 1.2rem 2rem !important; }
          .resp-hero { grid-template-columns: 1fr !important; min-height: auto !important; }
          .resp-hero-text { padding: 5rem 2.5rem 3rem !important; }
          .resp-hero-visual { min-height: 40vh !important; }
          .resp-section { padding: 5rem 2.5rem !important; }
          .resp-grid3 { grid-template-columns: repeat(2, 1fr) !important; }
          .resp-grid2 { grid-template-columns: 1fr !important; }
          .resp-footer { padding: 2rem 2.5rem !important; flex-direction: column !important; gap: 1rem !important; text-align: center !important; }
        }
        @media (max-width: 640px) {
          .resp-nav { padding: 1rem 1.2rem !important; }
          .resp-nav-brand { font-size: 1rem !important; }
          .resp-nav-cta { display: none !important; }
          .resp-hero-text { padding: 5rem 1.5rem 2.5rem !important; }
          .resp-section { padding: 3.5rem 1.5rem !important; }
          .resp-grid3 { grid-template-columns: 1fr !important; }
          .resp-footer { padding: 1.5rem 1.2rem !important; }
          .resp-heading { font-size: 2rem !important; }
        }
      `}</style>

      {/* NAV */}
      <nav className="resp-nav" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.5rem 4rem", background: "rgba(250,248,244,0.92)", backdropFilter: "blur(12px)", borderBottom: "0.5px solid #E8E3DA" }}>
        <Link href="/" className="back-link" style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8C8479", textDecoration: "none", transition: "color 0.3s" }}>
          <ArrowLeft size={14} /> 裕綸集團
        </Link>
        <span className="serif resp-nav-brand" style={{ fontSize: "1.3rem", fontWeight: 300, letterSpacing: "0.15em", color: "#2A2520" }}>同齊咖啡</span>
        <a href="#stores" className="resp-nav-cta" style={{ fontSize: "0.68rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#6B4E31", textDecoration: "none" }}>門市資訊</a>
      </nav>

      {/* HERO */}
      <section className="resp-hero" style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", paddingTop: "5rem" }}>
        <div className="resp-hero-text" style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "6rem 4rem 6rem 6rem" }}>
          <p ref={addRef(0)} style={{ ...fadeStyle, fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#6B4E31", marginBottom: "2rem" }}>Specialty Coffee</p>
          <h1 ref={addRef(1)} className="serif" style={{ ...fadeStyle, transitionDelay: "0.15s", fontSize: "clamp(3.5rem, 6vw, 5.5rem)", fontWeight: 300, lineHeight: 1.05, marginBottom: "2rem" }}>
            一杯咖啡<br /><em style={{ fontStyle: "italic", color: "#8C8479" }}>千種連結</em>
          </h1>
          <p ref={addRef(2)} className="noto" style={{ ...fadeStyle, transitionDelay: "0.3s", fontSize: "0.88rem", lineHeight: 2, color: "#8C8479", maxWidth: 400, marginBottom: "3rem", fontWeight: 300 }}>
            在同齊，咖啡是空間的媒介，連結著人與人之間的對話。我們提供自家烘焙的精品咖啡豆，並在舒適的空間中創造不限時的寧靜時刻。無論是尋求靈感的商務洽公，或是好友聚會，同齊咖啡都是你生活中最溫暖的交匯點。
          </p>
          <a ref={addRef(3)} href="#stores" style={{ ...fadeStyle, transitionDelay: "0.45s", display: "inline-flex", alignItems: "center", gap: "1rem", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#2A2520", textDecoration: "none", borderBottom: "1px solid #2A2520", paddingBottom: "0.3rem", width: "fit-content", transition: "color 0.3s, border-color 0.3s" }}>
            查看門市資訊
          </a>
        </div>
        <div className="resp-hero-visual" style={{ background: "#6B4E31", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
          <Coffee size={64} style={{ color: "rgba(255,255,255,0.25)" }} />
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>Café Image</p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="resp-section" style={{ padding: "8rem 6rem", background: "#F5F0E8" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <p ref={addRef(4)} style={{ ...fadeStyle, fontSize: "0.62rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#6B4E31", marginBottom: "1rem" }}>Features</p>
          <h2 ref={addRef(5)} className="serif resp-heading" style={{ ...fadeStyle, transitionDelay: "0.15s", fontSize: "2.8rem", fontWeight: 300, marginBottom: "1.5rem" }}>品牌特色</h2>
          <div style={{ width: 48, height: 1, background: "#6B4E31", margin: "0 auto 4rem" }} />
          <div className="resp-grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2rem" }}>
            {features.map((f, i) => (
              <div key={f.title} className="feature-card" ref={addRef(6 + i)} style={{ ...fadeStyle, transitionDelay: `${i * 0.15}s`, padding: "3rem 2rem", border: "0.5px solid #D8D0C8", background: "#fff", transition: "border-color 0.4s", textAlign: "center" }}>
                <div className="feature-icon" style={{ width: 64, height: 64, border: "0.5px solid #D8D0C8", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", transition: "background 0.4s, border-color 0.4s" }}>
                  <Coffee size={28} style={{ color: "#6B4E31", transition: "color 0.4s" }} />
                </div>
                <h3 className="serif" style={{ fontSize: "1.4rem", fontWeight: 400, marginBottom: "1rem" }}>{f.title}</h3>
                <p className="noto" style={{ fontSize: "0.82rem", lineHeight: 2, color: "#8C8479", fontWeight: 300 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORES */}
      <section id="stores" className="resp-section" style={{ padding: "8rem 6rem", background: "#FAF8F4" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4rem", borderBottom: "0.5px solid #E8E3DA", paddingBottom: "2rem" }}>
          <div>
            <p style={{ fontSize: "0.62rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#6B4E31", marginBottom: "0.5rem" }}>Stores</p>
            <h2 className="serif resp-heading" style={{ fontSize: "2.8rem", fontWeight: 300 }}>門市資訊</h2>
          </div>
        </div>
        <div className="resp-grid2" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1.5rem" }}>
          {stores.map((s, i) => (
            <div key={s.name} className="store-card" ref={addRef(9 + i)} style={{ ...fadeStyle, transitionDelay: `${(i % 2) * 0.15}s`, padding: "2.5rem", border: "0.5px solid #E8E3DA", transition: "border-color 0.3s, background 0.3s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1rem" }}>
                <MapPin size={16} style={{ color: "#6B4E31" }} />
                <h3 className="serif" style={{ fontSize: "1.4rem", fontWeight: 400 }}>{s.name}</h3>
              </div>
              <p className="noto" style={{ fontSize: "0.88rem", lineHeight: 2, color: "#8C8479", fontWeight: 300 }}>{s.address}</p>
            </div>
          ))}
        </div>
        <div ref={addRef(13)} style={{ ...fadeStyle, transitionDelay: "0.3s", marginTop: "3rem", padding: "2rem", border: "0.5px solid #E8E3DA", display: "flex", alignItems: "center", gap: "1rem" }}>
          <Clock size={16} style={{ color: "#6B4E31" }} />
          <div>
            <p style={{ fontSize: "0.62rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#6B4E31", marginBottom: "0.4rem" }}>營業時間</p>
            <p className="serif" style={{ fontSize: "1.05rem", color: "#2A2520" }}>週一至週日  09:00 — 18:00</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="resp-footer" style={{ background: "#1A1510", padding: "2.5rem 6rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "0.5px solid rgba(255,255,255,0.05)" }}>
        <span className="serif" style={{ fontSize: "1.1rem", fontWeight: 300, letterSpacing: "0.15em", color: "rgba(255,255,255,0.45)" }}>同齊咖啡</span>
        <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>© 2026 同齊咖啡・裕綸集團</p>
        <div style={{ display: "flex", gap: "2rem" }}>
          {[{name:"Instagram",href:"https://www.instagram.com/human_design.space/"}].map(s => (
            <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)", textDecoration: "none", textTransform: "uppercase" }}>{s.name}</a>
          ))}
        </div>
      </footer>
    </div>
  )
}
