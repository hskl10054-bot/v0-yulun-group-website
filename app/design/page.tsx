"use client"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useEffect, useRef } from "react"

const services = [
  { num: "01", name: "預售屋客變規劃", desc: "在交屋前即進行格局調整與建材升級規劃，提前為理想生活做好準備，省時省預算。" },
  { num: "02", name: "居家住宅室內設計", desc: "從平面配置、立面設計到材料挑選，以人為本的空間美學，為每個家注入獨特靈魂。" },
  { num: "03", name: "老屋翻新空間重整", desc: "保留空間記憶的同時，注入現代設計語彙。舊屋新生，讓老房子重新散發獨特魅力。" },
  { num: "04", name: "商業空間美學配置", desc: "咖啡廳、辦公室、品牌門市等商業空間，以品牌精神為核心，設計吸引人且具功能性的環境。" },
  { num: "05", name: "軟裝設計與風格諮詢", desc: "家具挑選、燈光配置、藝術品與植栽搭配，用軟裝語彙讓硬體設計更有生命力。" },
]

const portfolios = [
  { title: "現代簡約｜光感餐廚", image: "/images/design/portfolio/design-work-01.jpg" },
  { title: "暖色侘寂｜圓弧玄關", image: "/images/design/portfolio/design-work-02.jpg" },
  { title: "輕奢現代｜石紋客餐廳", image: "/images/design/portfolio/design-work-03.jpg" },
  { title: "極簡北歐｜純白入戶", image: "/images/design/portfolio/design-work-04.jpg" },
  { title: "日式和風｜日光臥榻", image: "/images/design/portfolio/design-work-05.jpg" },
]

const testimonials = [
  { quote: "從第一次諮詢到完工，整個過程都讓我感受到設計師對細節的堅持。現在每天回到家都像是回到一個懂我的地方。", name: "李小姐", info: "台中北區・三房兩廳・2024" },
  { quote: "我只是說了幾個關鍵字，設計師就把我腦海裡模糊的想像變成了真實的空間。太神奇了。", name: "黃先生", info: "台中西區・老屋翻新・2023" },
  { quote: "咖啡廳開幕後不斷有客人說空間很有質感，生意比預期好很多。設計真的是最值得投資的事。", name: "吳老闆", info: "台中南區・商業空間・2023" },
]

export default function DesignPage() {
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
        :root { --cream:#F5F0E8; --warm-white:#FAF8F4; --charcoal:#2A2520; --stone:#8C8479; --gold:#B5956A; --light-stone:#E8E3DA; }
        .serif { font-family: 'Cormorant Garamond', serif; }
        .noto { font-family: 'Noto Serif TC', serif; }
        .service-card:hover { border-color: #B5956A !important; background: #F5F0E8 !important; }
        .portfolio-item:hover .portfolio-overlay { opacity: 1 !important; }
        .portfolio-item:hover .portfolio-bg { transform: scale(1.04) !important; }
        @media (hover: none) {
          .portfolio-overlay { opacity: 1 !important; }
        }
        .cta-link:hover { color: #B5956A !important; border-color: #B5956A !important; }
        .back-link:hover { color: #B5956A !important; }
        .form-input { background: transparent; border: none; border-bottom: 0.5px solid rgba(255,255,255,0.2); padding: 0.7rem 0; width: 100%; font-family: 'Cormorant Garamond','Noto Serif TC',serif; font-size: 1.05rem; font-weight: 300; letter-spacing: 0.1em; color: #FAF8F4; outline: none; transition: border-color 0.3s; }
        .form-input:focus { border-bottom-color: #B5956A; }
        .form-input::placeholder { color: rgba(255,255,255,0.3); }
        textarea.form-input { resize: none; height: 90px; }

        /* Responsive */
        @media (max-width: 1024px) {
          .resp-nav { padding: 1.2rem 2rem !important; }
          .resp-hero { grid-template-columns: 1fr !important; min-height: auto !important; }
          .resp-hero-text { padding: 5rem 2.5rem 3rem !important; }
          .resp-hero-img { min-height: 50vh; position: relative !important; }
          .resp-hero-img img { position: absolute; }
          .resp-section { padding: 5rem 2.5rem !important; }
          .resp-section-inner { padding: 0 2.5rem !important; }
          .resp-grid3 { grid-template-columns: repeat(2, 1fr) !important; }
          .resp-grid2 { grid-template-columns: 1fr !important; }
          .resp-portfolio { grid-template-columns: 1fr 1fr !important; grid-template-rows: auto !important; }
          .resp-portfolio > div { aspect-ratio: 4/3; position: relative !important; }
          .resp-portfolio > div:first-child { grid-row: auto !important; }
          .resp-portfolio > div img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
          .resp-contact { grid-template-columns: 1fr !important; min-height: auto !important; }
          .resp-contact-left, .resp-contact-right { padding: 4rem 2.5rem !important; }
          .resp-footer { padding: 2rem 2.5rem !important; flex-direction: column !important; gap: 1rem !important; text-align: center !important; }
        }
        @media (max-width: 640px) {
          .resp-nav { padding: 1rem 1.2rem !important; }
          .resp-nav-brand { font-size: 1rem !important; }
          .resp-nav-cta { display: none !important; }
          .resp-hero-text { padding: 5rem 1.5rem 2.5rem !important; }
          .resp-hero-img { min-height: 40vh; }
          .resp-section { padding: 3.5rem 1.5rem !important; }
          .resp-section-inner { padding: 0 1.5rem !important; }
          .resp-grid3 { grid-template-columns: 1fr !important; }
          .resp-portfolio { grid-template-columns: 1fr !important; }
          .resp-portfolio > div { aspect-ratio: 4/3 !important; }
          .resp-contact-left, .resp-contact-right { padding: 3rem 1.5rem !important; }
          .resp-footer { padding: 1.5rem 1.2rem !important; }
          .resp-heading { font-size: 2rem !important; }
          .resp-stats { flex-direction: column !important; gap: 1.5rem !important; }
        }
      `}</style>

      {/* NAV */}
      <nav className="resp-nav" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.5rem 4rem", background: "rgba(250,248,244,0.92)", backdropFilter: "blur(12px)", borderBottom: "0.5px solid #E8E3DA" }}>
        <Link href="/" className="back-link" style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8C8479", textDecoration: "none", transition: "color 0.3s" }}>
          <ArrowLeft size={14} /> 裕綸集團
        </Link>
        <span className="serif resp-nav-brand" style={{ fontSize: "1.3rem", fontWeight: 300, letterSpacing: "0.15em", color: "#2A2520" }}>空房子・室內設計</span>
        <a href="#contact" className="resp-nav-cta" style={{ fontSize: "0.68rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#B5956A", textDecoration: "none" }}>預約諮詢</a>
      </nav>

      {/* HERO */}
      <section className="resp-hero" style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", paddingTop: "5rem" }}>
        <div className="resp-hero-text" style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "6rem 4rem 6rem 6rem" }}>
          <p ref={addRef(0)} style={{ ...fadeStyle, fontSize: "1.275rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#B5956A", marginBottom: "2rem" }}>Taichung Interior Design Studio</p>
          <h1 ref={addRef(1)} className="serif" style={{ ...fadeStyle, transitionDelay: "0.15s", fontSize: "clamp(3.5rem, 6vw, 5.5rem)", fontWeight: 300, lineHeight: 1.05, marginBottom: "2rem" }}>
            為你的空間<br /><span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}><em style={{ fontStyle: "italic", color: "#8C8479" }}>注入魔法</em><img src="/images/sparkle.svg" alt="" width={80} height={80} style={{ flexShrink: 0, marginLeft: "0.1rem" }} /></span>
          </h1>
          <p ref={addRef(2)} className="noto" style={{ ...fadeStyle, transitionDelay: "0.3s", fontSize: "0.88rem", lineHeight: 2, color: "#8C8479", maxWidth: 380, marginBottom: "3rem", fontWeight: 300 }}>
            空房開門，幸福進門。我們相信空間不只是鋼筋水泥，更是承載幸福的容器。當魔法注入空間，家便開始講述屬於你的幸福故事。
          </p>
          <a ref={addRef(3)} href="#portfolio" className="cta-link" style={{ ...fadeStyle, transitionDelay: "0.45s", display: "inline-flex", alignItems: "center", gap: "1rem", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#2A2520", textDecoration: "none", borderBottom: "1px solid #2A2520", paddingBottom: "0.3rem", width: "fit-content", transition: "color 0.3s, border-color 0.3s" }}>
            探索作品集 <ArrowRight size={14} />
          </a>
        </div>
        <div className="resp-hero-img" style={{ position: "relative", overflow: "hidden" }}>
          <img src="/images/design/hero/design-hero.jpg" alt="空房子室內設計" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
        </div>
      </section>

      {/* ABOUT */}
      <section className="resp-hero" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "70vh" }}>
        <div className="resp-hero-text" style={{ background: "linear-gradient(160deg, #D4C4AE 0%, #BFB09A 40%, #9A8870 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "6rem 5rem" }}>
          <blockquote className="serif" style={{ fontSize: "2rem", fontWeight: 300, fontStyle: "italic", color: "rgba(255,255,255,0.9)", lineHeight: 1.8, letterSpacing: "0.08em", textAlign: "center" }}>
            「空間是無聲的語言，<br />設計是讓它開口說話。」
          </blockquote>
        </div>
        <div className="resp-contact-left" style={{ background: "#F5F0E8", padding: "6rem 5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p ref={addRef(4)} style={{ ...fadeStyle, fontSize: "1.245rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#B5956A", marginBottom: "1.5rem" }}>About Us</p>
          <h2 ref={addRef(5)} className="serif resp-heading" style={{ ...fadeStyle, transitionDelay: "0.15s", fontSize: "2.8rem", fontWeight: 300, lineHeight: 1.2, marginBottom: "2rem" }}>我們是誰</h2>
          <p ref={addRef(6)} className="noto" style={{ ...fadeStyle, transitionDelay: "0.3s", fontSize: "0.88rem", lineHeight: 2.1, color: "#8C8479", marginBottom: "3rem", fontWeight: 300 }}>
            空房子設計致力於打破格局束縛，以人為本，透過細膩的動線規劃與美學比例，將居住者的情感與性格注入每一寸留白。我們不做複製品，每一個案子都從屋主的生活習慣、個性與夢想出發，打造獨一無二的空間故事。
          </p>
          <div ref={addRef(7)} className="resp-stats" style={{ ...fadeStyle, transitionDelay: "0.45s", display: "flex", gap: "3rem" }}>
            {[["150+","完成案例"],["8","年品牌經驗"],["98%","客戶滿意度"]].map(([num, label]) => (
              <div key={label}>
                <span className="serif" style={{ fontSize: "2.5rem", fontWeight: 300, color: "#2A2520", display: "block" }}>{num}</span>
                <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "#8C8479", textTransform: "uppercase" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="resp-section" style={{ padding: "8rem 6rem", background: "#FAF8F4" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4rem", borderBottom: "0.5px solid #E8E3DA", paddingBottom: "2rem" }}>
          <div>
            <p style={{ fontSize: "1.245rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#B5956A", marginBottom: "0.5rem" }}>Services</p>
            <h2 className="serif resp-heading" style={{ fontSize: "2.8rem", fontWeight: 300 }}>服務項目</h2>
          </div>
          <a href="#contact" className="cta-link" style={{ fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#2A2520", textDecoration: "none", borderBottom: "1px solid #2A2520", paddingBottom: "0.3rem", transition: "color 0.3s, border-color 0.3s" }}>諮詢方案 →</a>
        </div>
        <div className="resp-grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
          {services.map((s, i) => (
            <div key={s.num} className="service-card" ref={addRef(8 + i)} style={{ ...fadeStyle, transitionDelay: `${(i % 3) * 0.15}s`, padding: "2.5rem", border: "0.5px solid #E8E3DA", transition: "border-color 0.3s, background 0.3s", cursor: "default" }}>
              <span style={{ fontSize: "2.49rem", color: "#B5956A", marginBottom: "1.5rem", display: "block", fontFamily: "'Cormorant Garamond', serif" }}>{s.num}</span>
              <h3 className="serif" style={{ fontSize: "1.4rem", fontWeight: 400, marginBottom: "1rem" }}>{s.name}</h3>
              <p className="noto" style={{ fontSize: "0.82rem", lineHeight: 2, color: "#8C8479", fontWeight: 300 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" style={{ padding: "6rem 0", background: "#F5F0E8" }}>
        <div className="resp-section-inner" style={{ padding: "0 6rem", marginBottom: "3rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <p style={{ fontSize: "1.245rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#B5956A", marginBottom: "0.5rem" }}>Portfolio</p>
            <h2 className="serif resp-heading" style={{ fontSize: "2.8rem", fontWeight: 300 }}>精選作品</h2>
          </div>
          <a href="#" className="cta-link" style={{ fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#2A2520", textDecoration: "none", borderBottom: "1px solid #2A2520", paddingBottom: "0.3rem", transition: "color 0.3s, border-color 0.3s" }}>查看所有案例 →</a>
        </div>
        <div className="resp-portfolio" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "300px 300px", gap: "2px" }}>
          {portfolios.map((p, i) => (
            <div key={p.title} className="portfolio-item" style={{ position: "relative", overflow: "hidden", gridRow: i === 0 ? "span 2" : undefined }}>
              <img src={p.image} alt={p.title} className="portfolio-bg" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }} />
              <div className="portfolio-overlay" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(30,25,20,0.7) 0%, transparent 60%)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "2rem", opacity: 0, transition: "opacity 0.4s" }}>
                <h3 className="serif" style={{ fontSize: "1.3rem", fontWeight: 300, color: "#fff" }}>{p.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="resp-section" style={{ padding: "8rem 6rem", background: "#F5F0E8" }}>
        <p style={{ fontSize: "1.245rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#B5956A", marginBottom: "1rem" }}>Testimonials</p>
        <h2 className="serif resp-heading" style={{ fontSize: "2.8rem", fontWeight: 300, color: "#2A2520", marginBottom: "4rem" }}>客戶怎麼說</h2>
        <div className="resp-grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2rem" }}>
          {testimonials.map((t, i) => (
            <div key={t.name} ref={addRef(20 + i)} style={{ ...fadeStyle, transitionDelay: `${i * 0.15}s`, padding: "2.5rem", border: "0.5px solid #E8E3DA" }}>
              <p className="serif" style={{ fontSize: "1rem", fontStyle: "italic", color: "#2A2520", lineHeight: 1.9, marginBottom: "2rem", fontWeight: 300 }}>「{t.quote}」</p>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#B5956A" }}>{t.name}</p>
              <p style={{ fontSize: "0.65rem", color: "#8C8479", marginTop: "0.3rem", letterSpacing: "0.1em" }}>{t.info}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="resp-contact" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div className="resp-contact-left" style={{ background: "#FFFFFF", padding: "6rem", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
          <p style={{ fontSize: "1.245rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#B5956A", marginBottom: "1rem" }}>Contact</p>
          <h2 className="serif resp-heading" style={{ fontSize: "2.8rem", fontWeight: 300, lineHeight: 1.2, marginBottom: "3rem" }}>開始你的<br />空間對話</h2>
          {[["地址","台中市北屯區瀋陽北路73號"],["電話","04-2247-9068"],["Email","yulun83417215@gmail.com"],["營業時間","週一至週五  09:00 — 18:00"]].map(([label, val]) => (
            <div key={label} style={{ marginBottom: "2rem" }}>
              <p style={{ fontSize: "0.62rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#B5956A", marginBottom: "0.4rem" }}>{label}</p>
              <p className="serif" style={{ fontSize: "1.05rem", color: "#2A2520" }}>{val}</p>
            </div>
          ))}
        </div>
        <div className="resp-contact-right" style={{ background: "#2A2520", padding: "6rem", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
          <p style={{ fontSize: "1.245rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#B5956A", marginBottom: "1rem" }}>Send Message</p>
          <h2 className="serif resp-heading" style={{ fontSize: "2.8rem", fontWeight: 300, color: "#FAF8F4", marginBottom: "2.5rem" }}>預約諮詢</h2>
          {[["姓名","您的大名","text"],["聯絡電話","0900-000-000","tel"],["案件類型","新成屋 / 老屋翻新 / 商業空間","text"]].map(([label, ph, type]) => (
            <div key={String(label)} style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem" }}>{label}</label>
              <input type={String(type)} placeholder={String(ph)} className="form-input" />
            </div>
          ))}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem" }}>需求說明</label>
            <textarea placeholder="簡單描述您的空間與想法..." className="form-input" />
          </div>
          <button style={{ marginTop: "1rem", background: "#B5956A", color: "#FAF8F4", border: "none", padding: "1rem 2.5rem", fontFamily: "'Josefin Sans',sans-serif", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer", width: "fit-content" }}>
            送出諮詢 →
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="resp-footer" style={{ background: "#1A1510", padding: "2.5rem 6rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "0.5px solid rgba(255,255,255,0.05)" }}>
        <span className="serif" style={{ fontSize: "1.1rem", fontWeight: 300, letterSpacing: "0.15em", color: "rgba(255,255,255,0.45)" }}>空房子室內設計</span>
        <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>© 2026 空房子室內設計・裕綸集團</p>
        <div style={{ display: "flex", gap: "2rem" }}>
          <a href="/" style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)", textDecoration: "none", textTransform: "uppercase", transition: "color 0.3s" }}>裕綸集團</a>
        </div>
      </footer>
    </div>
  )
}
