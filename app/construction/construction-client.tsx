"use client"
import Link from "next/link"
import { ArrowLeft, ArrowRight, HardHat, ShieldCheck, FileText, Wrench, ClipboardList } from "lucide-react"
import { ServiceItems } from "@/components/service-items"
import { SiteMenu } from "@/components/site-menu"
import { ContactInfo } from "@/components/contact-info"

// 工程服務的英文小標（對應中文名稱）
const SERVICE_EN: Record<string, string> = {
  "拆除與結構加強工程": "Demolition & Structure",
  "專業水電系統配置": "Plumbing & Electrical",
  "高標準防水隔音工程": "Waterproof & Soundproof",
  "木作與細部木裝工程": "Carpentry & Woodwork",
  "系統家具安裝與整合": "System Furniture",
}
import { useEffect, useRef, useState } from "react"
import { useCmsData, usePageColors, getContentValue, getListItemsBySection, getImageUrl, getContentStyle, getListItemStyle } from "@/lib/use-cms-data"
import { submitForm } from "@/lib/submit-form"
import { formatPhone } from "@/lib/utils"
import { PortfolioModal } from "@/components/portfolio-modal"

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


export default function ConstructionPage() {
  const { content, listItems, images, loading } = useCmsData("construction")
  const colors = usePageColors(content, "construction")
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [selectedProject, setSelectedProject] = useState<{ title: string; type: string; image: string; sortOrder: number } | null>(null)

  // Services from CMS or fallback
  const cmsServices = getListItemsBySection(listItems, "services")
  const services = cmsServices.length > 0
    ? cmsServices.map((li, i) => ({ num: li.subtitle || String(li.sort_order).padStart(2, "0"), icon: defaultIcons[i % defaultIcons.length], name: li.title, desc: li.description, sortOrder: li.sort_order }))
    : defaultServices.map((s, i) => ({ ...s, sortOrder: i + 1 }))

  // 轉成 ServiceItems 卡片格式（沿用空房子的呈現樣貌）
  const serviceItems = services.map((s) => ({ label: s.name, en: SERVICE_EN[s.name] ?? "Construction", desc: s.desc, Icon: s.icon }))

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

  // 施工藍圖：滑進畫面時觸發線稿描繪動畫
  const bpRef = useRef<HTMLDivElement>(null)
  const [bpIn, setBpIn] = useState(false)
  useEffect(() => {
    const el = bpRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setBpIn(true); io.disconnect() } }, { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div className={`transition-opacity duration-700 ease-in-out ${loading ? "opacity-0" : "opacity-100"}`} style={{ fontFamily: "'Josefin Sans', sans-serif", background: colors.hero_bg, color: colors.hero_heading, letterSpacing: "0.05em" }}>
      <style>{`
        @layer base { * { margin: 0; padding: 0; box-sizing: border-box; } }
        .serif { font-family: 'Cormorant Garamond', 'Noto Sans TC', sans-serif; }
        .noto { font-family: 'Noto Serif TC', serif; }
        /* 施工藍圖背景動畫 */
        .bp-grid { position: absolute; inset: 0; pointer-events: none;
          -webkit-mask-image: radial-gradient(120% 100% at 70% 50%, #000 55%, transparent 100%);
          mask-image: radial-gradient(120% 100% at 70% 50%, #000 55%, transparent 100%); }
        .bp-grid-a { background-image:
          repeating-linear-gradient(0deg, rgba(107,78,49,0.05) 0 1px, transparent 1px 26px),
          repeating-linear-gradient(90deg, rgba(107,78,49,0.05) 0 1px, transparent 1px 26px);
          animation: bpDriftA 24s linear infinite; }
        .bp-grid-b { background-image:
          repeating-linear-gradient(0deg, rgba(107,78,49,0.08) 0 1px, transparent 1px 130px),
          repeating-linear-gradient(90deg, rgba(107,78,49,0.08) 0 1px, transparent 1px 130px);
          animation: bpDriftB 38s linear infinite; }
        @keyframes bpDriftA { from { background-position: 0 0, 0 0; } to { background-position: 26px 26px, 26px 26px; } }
        @keyframes bpDriftB { from { background-position: 0 0, 0 0; } to { background-position: -130px 130px, -130px 130px; } }
        .bp-plan :is(line,rect,circle,path) { stroke-dasharray: 2600; stroke-dashoffset: 2600; }
        .bp-plan text { opacity: 0; }
        .bp-wrap.in-view .bp-plan :is(line,rect,circle,path) { animation: bpDraw 1.7s ease forwards; }
        .bp-wrap.in-view .bp-plan text { animation: bpFade 1s ease 1s forwards; }
        @keyframes bpDraw { to { stroke-dashoffset: 0; } }
        @keyframes bpFade { to { opacity: 1; } }
        .bp-wrap.in-view .bp-plan g > :nth-child(-n+5) { animation-delay: 0.05s; }
        .bp-wrap.in-view .bp-plan g > :nth-child(n+6):nth-child(-n+11) { animation-delay: 0.35s; }
        .bp-wrap.in-view .bp-plan g > :nth-child(n+12):nth-child(-n+17) { animation-delay: 0.6s; }
        .bp-wrap.in-view .bp-plan g > :nth-child(n+18) { animation-delay: 0.85s; }
        @media (prefers-reduced-motion: reduce) {
          .bp-grid { animation: none; }
          .bp-plan :is(line,rect,circle,path) { stroke-dashoffset: 0; animation: none; }
          .bp-plan text { opacity: 1; animation: none; }
        }
        .service-card:hover { border-color: ${colors.services_accent} !important; background: ${colors.strengths_bg} !important; }
        .portfolio-item:hover .portfolio-overlay { opacity: 1 !important; }
        .portfolio-item:hover .portfolio-bg { transform: scale(1.04) !important; }
        @media (hover: none) {
          .portfolio-overlay { opacity: 1 !important; }
        }
        .strength-card h3, .strength-card p { transition: color 0.4s, opacity 0.4s; }
        .strength-card:hover { background: ${colors.strengths_icon} !important; border-color: ${colors.strengths_icon} !important; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }
        .strength-card:hover .strength-icon { background: #FFFFFF !important; border-color: rgba(255,255,255,0.4) !important; }
        .strength-card:hover .strength-icon svg { color: ${colors.strengths_icon} !important; }
        .strength-card:hover h3 { color: #FFFFFF !important; }
        .strength-card:hover p { color: #FFFFFF !important; opacity: 0.9; }
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
        <Link href="/" className="back-link" style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.95rem", letterSpacing: "0.2em", textTransform: "uppercase", color: colors.hero_text, textDecoration: "none", transition: "color 0.3s" }}>
          <ArrowLeft size={16} /> 裕綸集團
        </Link>
        <span className="serif resp-nav-brand" style={{ fontSize: "1.5rem", fontWeight: 300, letterSpacing: "0.15em", color: colors.hero_heading }}>裕綸・室內裝修</span>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <a href="/booking" className="resp-nav-cta" style={{ fontSize: "0.9rem", letterSpacing: "0.25em", textTransform: "uppercase", color: colors.hero_accent, textDecoration: "none" }}>免費估價</a>
          <SiteMenu color={colors.hero_heading} />
        </div>
      </nav>

      {/* HERO */}
      <section className="resp-hero" style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", paddingTop: "5rem" }}>
        <div className="resp-hero-text" style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "6rem 4rem 6rem 6rem" }}>
          <p ref={addRef(0)} style={{ ...fadeStyle, fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: colors.hero_accent, marginBottom: "2rem", ...getContentStyle(content, "hero", "en_subtitle", "construction") }}>{heroEnSubtitle}</p>
          <h1 ref={addRef(1)} style={{ ...fadeStyle, transitionDelay: "0.15s", fontFamily: "'Noto Sans TC', sans-serif", fontSize: "clamp(3rem, 5.5vw, 5rem)", fontWeight: 500, letterSpacing: "0.04em", lineHeight: 1.15, marginBottom: "2rem", color: colors.hero_heading, ...getContentStyle(content, "hero", "title", "construction") }}>
            {heroTitle}<br /><em style={{ fontStyle: "normal", color: colors.hero_accent, ...getContentStyle(content, "hero", "title_line2", "construction") }}>{heroTitleLine2}</em><br /><span style={getContentStyle(content, "hero", "title_line3", "construction")}>{heroTitleLine3}</span>
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
      <section className="resp-section" style={{ position: "relative", overflow: "hidden", padding: "8rem 6rem", background: colors.strengths_bg }}>
        {/* 施工藍圖背景 — 滑進畫面時線稿描繪 ＋ 雙向格線流動 */}
        <div ref={bpRef} aria-hidden="true" className={`bp-wrap${bpIn ? " in-view" : ""}`} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div className="bp-grid bp-grid-a" />
          <div className="bp-grid bp-grid-b" />
          <svg
            className="bp-plan"
            viewBox="0 0 600 420"
            preserveAspectRatio="xMidYMid meet"
            style={{ position: "absolute", right: "-3%", bottom: "-8%", width: "min(760px, 60%)", height: "auto", color: "#6B4E31", opacity: 0.18 }}
          >
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            {/* 外牆 */}
            <rect x="40" y="48" width="520" height="332" strokeWidth="3" />
            <rect x="50" y="58" width="500" height="312" strokeWidth="1" />
            {/* 隔間牆 */}
            <line x1="340" y1="58" x2="340" y2="248" strokeWidth="2" />
            <line x1="340" y1="248" x2="550" y2="248" strokeWidth="2" />
            <line x1="50" y1="248" x2="200" y2="248" strokeWidth="2" />
            <line x1="200" y1="248" x2="200" y2="370" strokeWidth="2" />
            {/* 門開口與門扇弧線 */}
            <path d="M150 58 A44 44 0 0 1 194 102" strokeWidth="1.5" />
            <line x1="150" y1="58" x2="150" y2="102" strokeWidth="1.5" />
            <path d="M340 170 A38 38 0 0 0 302 208" strokeWidth="1.5" />
            <line x1="340" y1="170" x2="302" y2="170" strokeWidth="1.5" />
            {/* 窗（外牆雙線） */}
            <line x1="240" y1="48" x2="320" y2="48" strokeWidth="1" />
            <line x1="240" y1="54" x2="320" y2="54" strokeWidth="1" />
            <line x1="40" y1="150" x2="40" y2="210" strokeWidth="1" />
            <line x1="46" y1="150" x2="46" y2="210" strokeWidth="1" />
            {/* 家具符號：圓桌、床、沙發 */}
            <circle cx="450" cy="150" r="34" strokeWidth="1.5" />
            <rect x="70" y="96" width="120" height="86" rx="4" strokeWidth="1.5" />
            <line x1="70" y1="128" x2="190" y2="128" strokeWidth="1" />
            <rect x="250" y="290" width="130" height="46" rx="6" strokeWidth="1.5" />
            {/* 樓梯 */}
            <rect x="430" y="286" width="96" height="74" strokeWidth="1.5" />
            <line x1="430" y1="300" x2="526" y2="300" strokeWidth="1" />
            <line x1="430" y1="314" x2="526" y2="314" strokeWidth="1" />
            <line x1="430" y1="328" x2="526" y2="328" strokeWidth="1" />
            <line x1="430" y1="342" x2="526" y2="342" strokeWidth="1" />
            {/* 尺寸標註線 */}
            <line x1="40" y1="24" x2="560" y2="24" strokeWidth="1" />
            <line x1="40" y1="16" x2="40" y2="32" strokeWidth="1" />
            <line x1="340" y1="16" x2="340" y2="32" strokeWidth="1" />
            <line x1="560" y1="16" x2="560" y2="32" strokeWidth="1" />
            <text x="180" y="20" fontSize="13" fill="currentColor" stroke="none" textAnchor="middle" letterSpacing="1">3,600</text>
            <text x="450" y="20" fontSize="13" fill="currentColor" stroke="none" textAnchor="middle" letterSpacing="1">2,200</text>
            </g>
          </svg>
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <p ref={addRef(4)} style={{ ...fadeStyle, fontSize: "0.75rem", letterSpacing: "0.35em", textTransform: "uppercase", color: colors.strengths_icon, marginBottom: "1rem" }}>Our Strengths</p>
          <h2 ref={addRef(5)} style={{ ...fadeStyle, transitionDelay: "0.15s", fontFamily: "'Noto Sans TC', sans-serif", fontSize: "clamp(1.875rem, 4vw, 2.25rem)", fontWeight: 700, letterSpacing: "0.12em", marginBottom: "1.5rem", color: colors.strengths_heading }}>為什麼選擇我們</h2>
          <div style={{ width: 48, height: 1, background: colors.strengths_icon, margin: "0 auto 4rem" }} />
          <div className="resp-grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2rem" }}>
            {strengths.map((s, i) => (
              <div key={s.title} className="strength-card" ref={addRef(6 + i)} style={{ ...fadeStyle, transitionDelay: `${i * 0.15}s`, padding: "3rem 2rem", border: `0.5px solid ${colors.strengths_card_border}`, background: colors.strengths_card_bg, transition: "background 0.4s, border-color 0.4s, box-shadow 0.4s", textAlign: "center" }}>
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

      {/* SERVICES — 與空房子同款卡片呈現（保留裝修工程內容） */}
      <ServiceItems colors={colors} detailed items={serviceItems} />

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "6rem 0", background: colors.portfolio_bg }}>
        <div className="resp-section-inner" style={{ padding: "0 6rem", marginBottom: "3rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <span aria-hidden="true" className="-ml-0.5 mb-1 block select-none font-semibold uppercase leading-none" style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)", color: "rgba(107,78,49,0.10)", letterSpacing: "0.08em" }}>Projects</span>
            <h2 style={{ fontFamily: "'Noto Sans TC', sans-serif", fontSize: "clamp(1.875rem, 4vw, 2.25rem)", fontWeight: 700, letterSpacing: "0.12em", color: colors.portfolio_heading }}>施工案例</h2>
          </div>
          <a href="#contact" className="cta-link" style={{ fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: colors.portfolio_heading, textDecoration: "none", borderBottom: `1px solid ${colors.portfolio_heading}`, paddingBottom: "0.3rem", transition: "color 0.3s, border-color 0.3s" }}>索取更多案例 →</a>
        </div>
        <div className="resp-portfolio" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "300px 300px", gap: "2px" }}>
          {projects.map((p, i) => (
            <div key={p.title} className="portfolio-item" onClick={() => setSelectedProject(p)} style={{ position: "relative", overflow: "hidden", gridRow: i === 0 ? "span 2" : undefined, cursor: "pointer" }}>
              <img src={p.image} alt={p.title} className="portfolio-bg" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${colors.portfolio_overlay} 0%, transparent 50%)`, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "2rem" }}>
                <h3 className="serif" style={{ fontSize: "1.3rem", fontWeight: 300, color: "#fff", marginBottom: "0.3rem", ...getListItemStyle(content, "portfolio", p.sortOrder, "title", "construction") }}>{p.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedProject && (
        <PortfolioModal
          isOpen={true}
          onClose={() => setSelectedProject(null)}
          title={selectedProject.title}
          subtitle={selectedProject.type}
          coverImage={selectedProject.image}
          page="construction"
          sortOrder={selectedProject.sortOrder}
        />
      )}

      {/* CONTACT — 精簡深色 footer（聯絡資訊 ＋ 版權；表單已移至 /booking） */}
      <ContactInfo showCta />
    </div>
  )
}
