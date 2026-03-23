"use client"
import Link from "next/link"
import { ArrowLeft, ArrowRight, HardHat, ShieldCheck, FileText, Wrench, ClipboardList } from "lucide-react"
import { useEffect, useRef } from "react"
import { useCmsData, usePageColors, getContentValue, getListItemsBySection, getImageUrl, getContentStyle, getListItemStyle } from "@/lib/use-cms-data"

const iconMap: Record<string, typeof HardHat> = { HardHat, ShieldCheck, FileText, Wrench, ClipboardList }
const defaultIcons = [HardHat, Wrench, ClipboardList, ShieldCheck, FileText]
const strengthDefaultIcons = [HardHat, ShieldCheck, FileText]

const defaultServices = [
  { num: "01", icon: HardHat, name: "拆除與結構加強工程", desc: "安全拆除既有隔間與裝修，並依需求進行結構補強，為新設計奠定穩固基礎。" },
  { num: "02", icon: Wrench, name: "專業水電系統配置", desc: "專業水電技師負責管線配置、插座規劃、衛浴設備安裝，符合建築法規與安全標準。" },
  { num: "03", icon: ClipboardList, name: "高標準防水隔音工程", desc: "採用高規格防水工法與隔音材料，確保居住品質與空間結構的長期耐久。" },
  { num: "04", icon: ShieldCheck, name: "木作與細部木裝工程", desc: "系統櫃、天花板、木地板等木作項目，材料嚴選、工法精準，打造精緻的空間細節。" },
  { num: "05", icon: FileText, name: "系統家具安裝與整合", desc: "系統櫃體與家具的精準安裝，整合空間機能與美學，提供完整的收納解決方案。" },
]

const defaultProjects = [
  { title: "精準裁切，構築空間", type: "全室裝修・2025", image: "/images/construction/portfolio/construction-project-01.jpg", span2: true },
  { title: "設計落地：現場監工", type: "商業空間・2025", image: "/images/construction/portfolio/construction-project-02.jpg", span2: false },
  { title: "泥作整平，空間基石", type: "舊屋翻新・2025", image: "/images/construction/portfolio/construction-project-03.jpg", span2: false },
  { title: "專業電工紀實", type: "局部工程・2024", image: "/images/construction/portfolio/construction-project-04.jpg", span2: false },
  { title: "嚴謹的高空作業", type: "全室裝修・2025", image: "/images/construction/portfolio/construction-project-05.jpg", span2: false },
]

const defaultStrengths = [
  { icon: HardHat, title: "自有工班", desc: "不外包，全程自有專業工班施工，品質與進度完全掌控在自己手中。" },
  { icon: ShieldCheck, title: "合法執照", desc: "持有政府核定室內裝修專業技術人員證照，合法合規施工，保障屋主權益。" },
  { icon: FileText, title: "透明報價", desc: "逐項清單報價，無隱藏費用，每一分預算清清楚楚，讓你花得安心。" },
]

const defaultTestimonials = [
  { quote: "工班師傅很專業，每天收工前都會清理現場，整個工程過程完全不用擔心。", name: "黃先生", info: "全室裝修・台中北區・2024" },
  { quote: "報價單寫得很詳細，哪個項目多少錢一清二楚，完工後完全沒有追加費用。", name: "蔡太太", info: "老屋翻新・台中西屯・2023" },
  { quote: "工程進度比預期還快，品質也很好。監工人員很負責，有問題馬上回應。", name: "林先生", info: "商業空間・台中南區・2023" },
]

export default function ConstructionPage() {
  const { content, listItems, images, loading } = useCmsData("construction")
  const colors = usePageColors(content, "construction")

  // Services from CMS or fallback
  const cmsServices = getListItemsBySection(listItems, "services")
  const services = cmsServices.length > 0
    ? cmsServices.map((li, i) => ({ num: li.subtitle || String(li.sort_order).padStart(2, "0"), icon: defaultIcons[i % defaultIcons.length], name: li.title, desc: li.description, sortOrder: li.sort_order }))
    : defaultServices.map((s, i) => ({ ...s, sortOrder: i + 1 }))

  // Projects from CMS or fallback
  const cmsProjects = getListItemsBySection(listItems, "portfolio")
  const projects = cmsProjects.length > 0
    ? cmsProjects.map((li, i) => ({
        title: li.title,
        type: li.subtitle,
        image: getImageUrl(images, "portfolio", li.sort_order) || `/images/construction/portfolio/construction-project-0${li.sort_order}.jpg`,
        span2: i === 0,
        sortOrder: li.sort_order,
      }))
    : defaultProjects.map((p, i) => ({ ...p, sortOrder: i + 1 }))

  // Strengths from CMS or fallback
  const cmsStrengths = getListItemsBySection(listItems, "strengths")
  const strengths = cmsStrengths.length > 0
    ? cmsStrengths.map((li, i) => ({ icon: strengthDefaultIcons[i % strengthDefaultIcons.length], title: li.title, desc: li.description, sortOrder: li.sort_order }))
    : defaultStrengths.map((s, i) => ({ ...s, sortOrder: i + 1 }))

  // Testimonials from CMS or fallback
  const cmsTestimonials = getListItemsBySection(listItems, "testimonials")
  const testimonials = cmsTestimonials.length > 0
    ? cmsTestimonials.map((li) => ({ quote: li.description, name: li.title, info: li.subtitle, sortOrder: li.sort_order }))
    : defaultTestimonials.map((t, i) => ({ ...t, sortOrder: i + 1 }))

  // Content from CMS
  const heroImg = getImageUrl(images, "hero") || "/images/construction/hero/construction-hero.jpg"
  const heroEnSubtitle = getContentValue(content, "hero", "en_subtitle") || "Taichung Construction Engineering"
  const heroTitle = getContentValue(content, "hero", "title") || "匠心傳承"
  const heroTitleLine2 = getContentValue(content, "hero", "title_line2") || "穩健工程"
  const heroTitleLine3 = getContentValue(content, "hero", "title_line3") || "構築世代安居"
  const heroDesc = getContentValue(content, "hero", "description")
  const contactAddress = getContentValue(content, "contact", "address") || "台中市北屯區瀋陽北路73號"
  const contactPhone = getContentValue(content, "contact", "phone") || "04-2247-9068"
  const contactEmail = getContentValue(content, "contact", "email") || "yulun83417215@gmail.com"
  const contactHours = getContentValue(content, "contact", "hours") || "週一至週五  09:00 — 18:00"
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
    <div className={`transition-opacity duration-700 ease-in-out ${loading ? "opacity-0" : "opacity-100"}`} style={{ fontFamily: "'Josefin Sans', sans-serif", background: colors.hero_bg, color: colors.hero_heading, letterSpacing: "0.05em" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Noto+Serif+TC:wght@300;400&family=Josefin+Sans:wght@200;300;400&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .serif { font-family: 'Cormorant Garamond', serif; }
        .noto { font-family: 'Noto Serif TC', serif; }
        .service-card:hover { border-color: ${colors.services_accent} !important; background: ${colors.strengths_bg} !important; }
        .portfolio-item:hover .portfolio-overlay { opacity: 1 !important; }
        .portfolio-item:hover .portfolio-bg { transform: scale(1.04) !important; }
        @media (hover: none) {
          .portfolio-overlay { opacity: 1 !important; }
        }
        .strength-card:hover { border-color: ${colors.strengths_icon} !important; }
        .strength-card:hover .strength-icon { background: ${colors.strengths_icon} !important; border-color: ${colors.strengths_icon} !important; }
        .strength-card:hover .strength-icon svg { color: ${colors.hero_bg} !important; }
        .back-link:hover { color: ${colors.hero_accent} !important; }
        .cta-link:hover { color: ${colors.hero_accent} !important; border-color: ${colors.hero_accent} !important; }
        .form-input { background: transparent; border: none; border-bottom: 0.5px solid rgba(255,255,255,0.2); padding: 0.7rem 0; width: 100%; font-family: 'Cormorant Garamond','Noto Serif TC',serif; font-size: 1.05rem; font-weight: 300; letter-spacing: 0.1em; color: ${colors.contact_btn_text}; outline: none; transition: border-color 0.3s; }
        .form-input:focus { border-bottom-color: ${colors.contact_accent}; }
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
        }
      `}</style>

      {/* NAV */}
      <nav className="resp-nav" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.5rem 4rem", background: "rgba(250,248,244,0.92)", backdropFilter: "blur(12px)", borderBottom: `0.5px solid ${colors.services_card_border}` }}>
        <Link href="/" className="back-link" style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: colors.hero_text, textDecoration: "none", transition: "color 0.3s" }}>
          <ArrowLeft size={14} /> 裕綸集團
        </Link>
        <span className="serif resp-nav-brand" style={{ fontSize: "1.3rem", fontWeight: 300, letterSpacing: "0.15em", color: colors.hero_heading }}>裕綸・室內裝修</span>
        <a href="#contact" className="resp-nav-cta" style={{ fontSize: "0.68rem", letterSpacing: "0.25em", textTransform: "uppercase", color: colors.hero_accent, textDecoration: "none" }}>免費估價</a>
      </nav>

      {/* HERO */}
      <section className="resp-hero" style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", paddingTop: "5rem" }}>
        <div className="resp-hero-text" style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "6rem 4rem 6rem 6rem" }}>
          <p ref={addRef(0)} style={{ ...fadeStyle, fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: colors.hero_accent, marginBottom: "2rem", ...getContentStyle(content, "hero", "en_subtitle", "construction") }}>{heroEnSubtitle}</p>
          <h1 ref={addRef(1)} className="serif" style={{ ...fadeStyle, transitionDelay: "0.15s", fontSize: "clamp(3.2rem, 5.5vw, 5.5rem)", fontWeight: 300, lineHeight: 1.05, marginBottom: "2rem", ...getContentStyle(content, "hero", "title", "construction") }}>
            {heroTitle}<br /><em style={{ fontStyle: "italic", color: colors.hero_text, ...getContentStyle(content, "hero", "title_line2", "construction") }}>{heroTitleLine2}</em><br /><span style={getContentStyle(content, "hero", "title_line3", "construction")}>{heroTitleLine3}</span>
          </h1>
          <p ref={addRef(2)} className="noto" style={{ ...fadeStyle, transitionDelay: "0.3s", fontSize: "0.88rem", lineHeight: 2, color: colors.hero_text, maxWidth: 380, marginBottom: "3rem", fontWeight: 300, ...getContentStyle(content, "hero", "description", "construction") }}>
            {heroDesc || "裕綸裝修擁有政府核可專業施工證照，秉持標準化 SOP 工程管理。我們重視隱蔽工程細節，從水電配置、防水工法到結構強化，皆由具備資深執照的職人團隊把關。2年保固，安心無憂。"}
          </p>
          <a ref={addRef(3)} href="#projects" className="cta-link" style={{ ...fadeStyle, transitionDelay: "0.45s", display: "inline-flex", alignItems: "center", gap: "1rem", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: colors.hero_heading, textDecoration: "none", borderBottom: `1px solid ${colors.hero_heading}`, paddingBottom: "0.3rem", width: "fit-content", transition: "color 0.3s, border-color 0.3s" }}>
            查看施工案例 <ArrowRight size={14} />
          </a>
        </div>
        <div className="resp-hero-img" style={{ position: "relative", overflow: "hidden" }}>
          <img src={heroImg} alt="裕綸室內裝修" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
        </div>
      </section>

      {/* STRENGTHS */}
      <section className="resp-section" style={{ padding: "8rem 6rem", background: colors.strengths_bg }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <p ref={addRef(4)} style={{ ...fadeStyle, fontSize: "0.62rem", letterSpacing: "0.4em", textTransform: "uppercase", color: colors.strengths_icon, marginBottom: "1rem" }}>Our Strengths</p>
          <h2 ref={addRef(5)} className="serif resp-heading" style={{ ...fadeStyle, transitionDelay: "0.15s", fontSize: "2.8rem", fontWeight: 300, marginBottom: "1.5rem", color: colors.strengths_heading }}>為什麼選擇我們</h2>
          <div style={{ width: 48, height: 1, background: colors.strengths_icon, margin: "0 auto 4rem" }} />
          <div className="resp-grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2rem" }}>
            {strengths.map((s, i) => (
              <div key={s.title} className="strength-card" ref={addRef(6 + i)} style={{ ...fadeStyle, transitionDelay: `${i * 0.15}s`, padding: "3rem 2rem", border: `0.5px solid ${colors.strengths_card_border}`, background: colors.strengths_card_bg, transition: "border-color 0.4s", textAlign: "center" }}>
                <div className="strength-icon" style={{ width: 64, height: 64, border: `0.5px solid ${colors.strengths_card_border}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", transition: "background 0.4s, border-color 0.4s" }}>
                  <s.icon size={28} style={{ color: colors.strengths_icon, transition: "color 0.4s" }} />
                </div>
                <h3 className="serif" style={{ fontSize: "1.4rem", fontWeight: 400, marginBottom: "1rem", ...getListItemStyle(content, "strengths", s.sortOrder, "title", "construction") }}>{s.title}</h3>
                <p className="noto" style={{ fontSize: "0.82rem", lineHeight: 2, color: colors.strengths_text, fontWeight: 300, ...getListItemStyle(content, "strengths", s.sortOrder, "description", "construction") }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="resp-section" style={{ padding: "8rem 6rem", background: colors.services_bg }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4rem", borderBottom: `0.5px solid ${colors.services_card_border}`, paddingBottom: "2rem" }}>
          <div>
            <p style={{ fontSize: "0.62rem", letterSpacing: "0.4em", textTransform: "uppercase", color: colors.services_accent, marginBottom: "0.5rem" }}>Services</p>
            <h2 className="serif resp-heading" style={{ fontSize: "2.8rem", fontWeight: 300, color: colors.services_heading }}>服務項目</h2>
          </div>
          <a href="#contact" className="cta-link" style={{ fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: colors.services_heading, textDecoration: "none", borderBottom: `1px solid ${colors.services_heading}`, paddingBottom: "0.3rem", transition: "color 0.3s, border-color 0.3s" }}>免費估價 →</a>
        </div>
        <div className="resp-grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
          {services.map((s, i) => (
            <div key={s.num} className="service-card" ref={addRef(9 + i)} style={{ ...fadeStyle, transitionDelay: `${(i % 3) * 0.15}s`, padding: "2.5rem", border: `0.5px solid ${colors.services_card_border}`, transition: "border-color 0.3s, background 0.3s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1.5rem" }}>
                <span className="serif" style={{ fontSize: "0.75rem", color: colors.services_accent, ...getListItemStyle(content, "services", s.sortOrder, "subtitle", "construction") }}>{s.num}</span>
                <s.icon size={16} style={{ color: colors.services_accent }} />
              </div>
              <h3 className="serif" style={{ fontSize: "1.4rem", fontWeight: 400, marginBottom: "1rem", ...getListItemStyle(content, "services", s.sortOrder, "title", "construction") }}>{s.name}</h3>
              <p className="noto" style={{ fontSize: "0.82rem", lineHeight: 2, color: colors.services_text, fontWeight: 300, ...getListItemStyle(content, "services", s.sortOrder, "description", "construction") }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "6rem 0", background: colors.portfolio_bg }}>
        <div className="resp-section-inner" style={{ padding: "0 6rem", marginBottom: "3rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <p style={{ fontSize: "0.62rem", letterSpacing: "0.4em", textTransform: "uppercase", color: colors.portfolio_accent, marginBottom: "0.5rem" }}>Projects</p>
            <h2 className="serif resp-heading" style={{ fontSize: "2.8rem", fontWeight: 300, color: colors.portfolio_heading }}>施工案例</h2>
          </div>
          <a href="#contact" className="cta-link" style={{ fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: colors.portfolio_heading, textDecoration: "none", borderBottom: `1px solid ${colors.portfolio_heading}`, paddingBottom: "0.3rem", transition: "color 0.3s, border-color 0.3s" }}>索取更多案例 →</a>
        </div>
        <div className="resp-portfolio" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "300px 300px", gap: "2px" }}>
          {projects.map((p, i) => (
            <div key={p.title} className="portfolio-item" style={{ position: "relative", overflow: "hidden", gridRow: i === 0 ? "span 2" : undefined }}>
              <img src={p.image} alt={p.title} className="portfolio-bg" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${colors.portfolio_overlay} 0%, transparent 50%)`, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "2rem" }}>
                <h3 className="serif" style={{ fontSize: "1.3rem", fontWeight: 300, color: "#fff", marginBottom: "0.3rem", ...getListItemStyle(content, "portfolio", p.sortOrder, "title", "construction") }}>{p.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="resp-section" style={{ padding: "8rem 6rem", background: colors.testimonials_bg }}>
        <p style={{ fontSize: "0.62rem", letterSpacing: "0.4em", textTransform: "uppercase", color: colors.testimonials_accent, marginBottom: "1rem" }}>Testimonials</p>
        <h2 className="serif resp-heading" style={{ fontSize: "2.8rem", fontWeight: 300, color: colors.testimonials_heading, marginBottom: "4rem" }}>客戶怎麼說</h2>
        <div className="resp-grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2rem" }}>
          {testimonials.map((t, i) => (
            <div key={t.name} ref={addRef(15 + i)} style={{ ...fadeStyle, transitionDelay: `${i * 0.15}s`, padding: "2.5rem", border: `0.5px solid ${colors.testimonials_card_border}` }}>
              <p className="serif" style={{ fontSize: "1rem", fontStyle: "italic", color: colors.testimonials_text, lineHeight: 1.9, marginBottom: "2rem", fontWeight: 300, ...getListItemStyle(content, "testimonials", t.sortOrder, "description", "construction") }}>「{t.quote}」</p>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: colors.testimonials_accent, ...getListItemStyle(content, "testimonials", t.sortOrder, "title", "construction") }}>{t.name}</p>
              <p style={{ fontSize: "0.65rem", color: colors.testimonials_text, marginTop: "0.3rem", letterSpacing: "0.1em", ...getListItemStyle(content, "testimonials", t.sortOrder, "subtitle", "construction") }}>{t.info}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="resp-contact" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div className="resp-contact-left" style={{ background: colors.contact_bg, padding: "6rem", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.4em", textTransform: "uppercase", color: colors.contact_accent, marginBottom: "1rem" }}>Contact</p>
          <h2 className="serif resp-heading" style={{ fontSize: "2.8rem", fontWeight: 300, lineHeight: 1.2, marginBottom: "3rem", color: colors.contact_heading }}>免費丈量<br />估價諮詢</h2>
          {[["地址",contactAddress,"address"],["電話",contactPhone,"phone"],["Email",contactEmail,"email"],["營業時間",contactHours,"hours"]].map(([label, val, key]) => (
            <div key={label} style={{ marginBottom: "2rem" }}>
              <p style={{ fontSize: "0.62rem", letterSpacing: "0.35em", textTransform: "uppercase", color: colors.contact_accent, marginBottom: "0.4rem" }}>{label}</p>
              {key === "address" ? (
                <a
                  href="https://maps.app.goo.gl/Ya3FoWUXz36Rh5vj6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="serif inline-flex items-center gap-1.5 hover:opacity-70 transition-opacity"
                  style={{ fontSize: "1.05rem", color: colors.contact_heading, textDecoration: "none", ...getContentStyle(content, "contact", key, "construction") }}
                >
                  {val}
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5, flexShrink: 0 }}>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              ) : (
                <p className="serif" style={{ fontSize: "1.05rem", color: colors.contact_heading, ...getContentStyle(content, "contact", key, "construction") }}>{val}</p>
              )}
            </div>
          ))}
          {/* Google Maps Embed */}
          <div style={{ marginTop: "1rem", borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(0,0,0,0.08)" }}>
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent(contactAddress)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="220"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="裕綸室內裝修 — 台中市北屯區瀋陽北路73號"
            />
          </div>
        </div>
        <div className="resp-contact-right" style={{ background: colors.contact_heading, padding: "6rem", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.4em", textTransform: "uppercase", color: colors.contact_accent, marginBottom: "1rem" }}>Free Estimate</p>
          <h2 className="serif resp-heading" style={{ fontSize: "2.8rem", fontWeight: 300, color: colors.contact_btn_text, marginBottom: "2.5rem" }}>申請估價</h2>
          {[["姓名","您的大名","text"],["聯絡電話","0900-000-000","tel"],["工程類型","全室裝修 / 局部工程 / 商業空間","text"],["坪數（選填）","例：30坪","text"]].map(([label, ph, type]) => (
            <div key={String(label)} style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem" }}>{label}</label>
              <input type={String(type)} placeholder={String(ph)} className="form-input" />
            </div>
          ))}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem" }}>工程說明</label>
            <textarea placeholder="請簡單描述您的裝修需求..." className="form-input" />
          </div>
          <button style={{ marginTop: "1rem", background: colors.contact_btn_bg, color: colors.contact_btn_text, border: "none", padding: "1rem 2.5rem", fontFamily: "'Josefin Sans',sans-serif", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer", width: "fit-content" }}>
            送出申請 →
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="resp-footer" style={{ background: colors.footer_bg, padding: "2.5rem 6rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "0.5px solid rgba(255,255,255,0.05)" }}>
        <span className="serif" style={{ fontSize: "1.1rem", fontWeight: 300, letterSpacing: "0.15em", color: "rgba(255,255,255,0.45)" }}>裕綸室內裝修</span>
        <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>© 2026 裕綸室內裝修・裕綸集團</p>
        <div style={{ display: "flex", gap: "2rem" }}>
          <a href="/" style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)", textDecoration: "none", textTransform: "uppercase" }}>裕綸集團</a>
        </div>
      </footer>
    </div>
  )
}
