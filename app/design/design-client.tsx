"use client"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Facebook, Instagram } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useCmsData, usePageColors, getContentValue, getListItemsBySection, getImageUrl, getContentStyle, getListItemStyle } from "@/lib/use-cms-data"
import { submitForm } from "@/lib/submit-form"
import { formatPhone } from "@/lib/utils"
import { PortfolioPreview } from "@/components/portfolio-preview"
import { ServiceItems } from "@/components/service-items"
import { DesignProcess } from "@/components/design-process"
import { CountUp } from "@/components/count-up"
import { SiteMenu } from "@/components/site-menu"

const defaultServices = [
  { num: "01", name: "預售屋客變規劃", desc: "在交屋前即進行格局調整與建材升級規劃，提前為理想生活做好準備，省時省預算。" },
  { num: "02", name: "居家住宅室內設計", desc: "從平面配置、立面設計到材料挑選，以人為本的空間美學，為每個家注入獨特靈魂。" },
  { num: "03", name: "老屋翻新空間重整", desc: "保留空間記憶的同時，注入現代設計語彙。舊屋新生，讓老房子重新散發獨特魅力。" },
  { num: "04", name: "商業空間美學配置", desc: "咖啡廳、辦公室、品牌門市等商業空間，以品牌精神為核心，設計吸引人且具功能性的環境。" },
  { num: "05", name: "軟裝設計與風格諮詢", desc: "家具挑選、燈光配置、藝術品與植栽搭配，用軟裝語彙讓硬體設計更有生命力。" },
]

const defaultTestimonials = [
  { quote: "從第一次諮詢到完工，整個過程都讓我感受到設計師對細節的堅持。現在每天回到家都像是回到一個懂我的地方。", name: "李小姐", info: "台中北區・三房兩廳・2024" },
  { quote: "我只是說了幾個關鍵字，設計師就把我腦海裡模糊的想像變成了真實的空間。太神奇了。", name: "黃先生", info: "台中西區・老屋翻新・2023" },
  { quote: "咖啡廳開幕後不斷有客人說空間很有質感，生意比預期好很多。設計真的是最值得投資的事。", name: "吳老闆", info: "台中南區・商業空間・2023" },
]

export default function DesignPage() {
  const { content, listItems, images, loading } = useCmsData("design")
  const colors = usePageColors(content, "design")

  const [formData, setFormData] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [aboutVisible, setAboutVisible] = useState(false)
  const aboutColRef = useRef<HTMLDivElement>(null)

  // Services from CMS or fallback
  const cmsServices = getListItemsBySection(listItems, "services")
  const services = cmsServices.length > 0
    ? cmsServices.map((li) => ({ num: li.subtitle || String(li.sort_order).padStart(2, "0"), name: li.title, desc: li.description, sortOrder: li.sort_order }))
    : defaultServices.map((s, i) => ({ ...s, sortOrder: i + 1 }))

  // Testimonials from CMS or fallback
  const cmsTestimonials = getListItemsBySection(listItems, "testimonials")
  const testimonials = cmsTestimonials.length > 0
    ? cmsTestimonials.map((li) => ({ quote: li.description, name: li.title, info: li.subtitle, sortOrder: li.sort_order }))
    : defaultTestimonials.map((t, i) => ({ ...t, sortOrder: i + 1 }))

  // Content from CMS
  const heroImg = getImageUrl(images, "hero") || "/images/design/hero/design-hero.jpg"
  const heroEnSubtitle = getContentValue(content, "hero", "en_subtitle") || "Taichung Interior Design Studio"
  const heroTitle = getContentValue(content, "hero", "title")
  const heroTitleItalic = getContentValue(content, "hero", "title_italic")
  const heroDesc = getContentValue(content, "hero", "description")
  const aboutQuote = getContentValue(content, "hero", "quote") || getContentValue(content, "about", "quote")
  const aboutDesc = getContentValue(content, "about", "description")
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

  useEffect(() => {
    const el = aboutColRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setAboutVisible(true); obs.disconnect() } },
      { threshold: 0.2 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div className={`transition-opacity duration-700 ease-in-out ${loading ? "opacity-0" : "opacity-100"}`} style={{ fontFamily: "'Josefin Sans', sans-serif", background: colors.hero_bg, color: colors.hero_heading, letterSpacing: "0.05em" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Noto+Serif+TC:wght@300;400&family=Josefin+Sans:wght@200;300;400&display=swap');
        @layer base { * { margin: 0; padding: 0; box-sizing: border-box; } }
        :root { --cream:#F5F0E8; --warm-white:#FAF8F4; --charcoal:#2A2520; --stone:#8C8479; --gold:#B5956A; --light-stone:#E8E3DA; }
        .serif { font-family: 'Cormorant Garamond', 'Noto Sans TC', sans-serif; }
        .noto { font-family: 'Noto Serif TC', serif; }
        .gold-shimmer {
          background: linear-gradient(100deg, #B5956A 25%, #E9CB93 44%, #F6E7BF 50%, #E9CB93 56%, #B5956A 75%);
          background-size: 200% auto;
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent; color: transparent;
          animation: goldShimmer 6.5s linear infinite;
          filter: drop-shadow(0 0 8px rgba(220,184,124,0.28));
        }
        @keyframes goldShimmer { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }
        @media (prefers-reduced-motion: reduce) { .gold-shimmer { animation: none; } }
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
          .resp-portfolio > * { aspect-ratio: 4/3; position: relative !important; }
          .resp-portfolio > *:first-child { grid-row: auto !important; }
          .resp-portfolio > * img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
          .resp-contact { grid-template-columns: 1fr !important; min-height: auto !important; }
          .resp-contact-left, .resp-contact-right { padding: 4rem 2.5rem !important; }
          .resp-footer { padding: 2rem 2.5rem !important; flex-direction: column !important; gap: 1rem !important; text-align: center !important; }
          .resp-brand { grid-template-columns: 1fr !important; gap: 3rem !important; }
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
          .resp-portfolio > * { aspect-ratio: 4/3 !important; }
          .resp-contact-left, .resp-contact-right { padding: 3rem 1.5rem !important; }
          .resp-footer { padding: 1.5rem 1.2rem !important; }
          .resp-heading { font-size: 2rem !important; }
          .resp-stats { flex-direction: column !important; gap: 1.5rem !important; }
        }
      `}</style>

      {/* NAV */}
      <nav className="resp-nav" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.5rem 4rem", background: "rgba(250,248,244,0.92)", backdropFilter: "blur(12px)", borderBottom: `0.5px solid ${colors.services_card_border}` }}>
        <Link href="/" className="back-link" style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.95rem", letterSpacing: "0.2em", textTransform: "uppercase", color: colors.hero_text, textDecoration: "none", transition: "color 0.3s" }}>
          <ArrowLeft size={16} /> 裕綸集團
        </Link>
        <Link href="/design" className="resp-nav-brand" style={{ display: "flex", alignItems: "center", gap: "0.55rem", textDecoration: "none" }}>
          <img src="/images/hds-mark.png" alt="空房子室內設計" style={{ height: "60px", width: "auto" }} />
          <span style={{ fontSize: "1.5rem", fontWeight: 300, letterSpacing: "0.15em", color: colors.hero_heading }}>空房子・室內設計</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <a href="#contact" className="resp-nav-cta" style={{ fontSize: "0.9rem", letterSpacing: "0.25em", textTransform: "uppercase", color: colors.hero_accent, textDecoration: "none" }}>預約諮詢</a>
          <SiteMenu color={colors.hero_heading} />
        </div>
      </nav>

      {/* HERO */}
      <section className="resp-hero" style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", paddingTop: "5rem" }}>
        <div className="resp-hero-text" style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "6rem 4rem 6rem 6rem" }}>
          <p ref={addRef(0)} style={{ ...fadeStyle, fontSize: "1.275rem", letterSpacing: "0.35em", textTransform: "uppercase", color: colors.hero_accent, marginBottom: "2rem", ...getContentStyle(content,"hero", "en_subtitle", "design") }}>{heroEnSubtitle}</p>
          <h1 ref={addRef(1)} style={{ ...fadeStyle, transitionDelay: "0.15s", fontFamily: "'Noto Sans TC', sans-serif", fontSize: "clamp(3rem, 5.5vw, 5rem)", fontWeight: 500, letterSpacing: "0.04em", lineHeight: 1.15, marginBottom: "2rem", color: colors.hero_heading, ...getContentStyle(content,"hero", "title", "design") }}>
            {heroTitle || "為你的空間"}<br /><span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}><em className="gold-shimmer" style={{ fontStyle: "normal", color: colors.hero_accent, ...getContentStyle(content,"hero", "title_italic", "design") }}>{heroTitleItalic || "注入魔法"}</em><img src="/images/sparkle.svg" alt="" width={80} height={80} className="sparkle-twinkle" style={{ flexShrink: 0, marginLeft: "0.1rem" }} /></span>
          </h1>
          <p ref={addRef(2)} className="noto" style={{ ...fadeStyle, transitionDelay: "0.3s", fontSize: "1.05rem", lineHeight: 2, color: colors.hero_text, maxWidth: 420, marginBottom: "3rem", fontWeight: 300, ...getContentStyle(content,"hero", "description", "design") }}>
            {heroDesc || "空房開門，幸福進門。我們相信空間不只是鋼筋水泥，更是承載幸福的容器。當魔法注入空間，家便開始講述屬於你的幸福故事。"}
          </p>
          <a ref={addRef(3)} href="#portfolio" className="cta-link" style={{ ...fadeStyle, transitionDelay: "0.45s", display: "inline-flex", alignItems: "center", gap: "1rem", fontSize: "0.82rem", letterSpacing: "0.25em", textTransform: "uppercase", color: colors.hero_heading, textDecoration: "none", borderBottom: `1px solid ${colors.hero_heading}`, paddingBottom: "0.3rem", width: "fit-content", transition: "color 0.3s, border-color 0.3s" }}>
            探索作品集 <ArrowRight size={14} />
          </a>
        </div>
        <div className="resp-hero-img" style={{ position: "relative", overflow: "hidden" }}>
          <img src={heroImg} alt="空房子室內設計" className="hero-kenburns" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
        </div>
      </section>

      {/* ABOUT */}
      <section className="resp-hero" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "70vh" }}>
        <div ref={aboutColRef} className="resp-hero-text" style={{ position: "relative", display: "flex", alignItems: "flex-end", minHeight: "70vh", overflow: "hidden" }}>
          <img src="/images/design-storefront.jpg" alt="空房子室內設計門市" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: aboutVisible ? 1 : 0, transform: aboutVisible ? "translateX(0)" : "translateX(-60px)", transition: "opacity 1.2s ease-out, transform 1.4s cubic-bezier(.2,.7,.2,1)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 42%)" }} />
          <blockquote className="serif" style={{ position: "relative", width: "100%", textAlign: "center", padding: "0 2.5rem 2.5rem", fontSize: "1.05rem", fontWeight: 300, fontStyle: "italic", color: "rgba(255,255,255,0.95)", lineHeight: 1.9, letterSpacing: "0.05em", ...getContentStyle(content,"about", "quote", "design") }}>
            {aboutQuote || "「空間是無聲的語言，設計是讓它開口說話。」"}
          </blockquote>
        </div>
        <div className="resp-contact-left" style={{ background: colors.about_bg, padding: "6rem 5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <span ref={addRef(4)} aria-hidden="true" className="-ml-0.5 mb-1 block select-none font-semibold uppercase leading-none" style={{ ...fadeStyle, fontSize: "clamp(2rem, 5.5vw, 4rem)", color: "rgba(107,78,49,0.10)", letterSpacing: "0.08em" }}>About Us</span>
          <h2 ref={addRef(5)} style={{ ...fadeStyle, transitionDelay: "0.15s", fontFamily: "'Noto Sans TC', sans-serif", fontSize: "clamp(1.875rem, 4vw, 2.25rem)", fontWeight: 700, letterSpacing: "0.12em", lineHeight: 1.3, marginBottom: "2rem", color: "#E2A4AB" }}>關於空房子</h2>
          <p ref={addRef(6)} className="noto" style={{ ...fadeStyle, transitionDelay: "0.3s", fontSize: "1.05rem", lineHeight: 2.1, color: colors.about_text, marginBottom: "3rem", fontWeight: 300, ...getContentStyle(content,"about", "description", "design") }}>
            {aboutDesc || "空房子設計致力於打破格局束縛，以人為本，透過細膩的動線規劃與美學比例，將居住者的情感與性格注入每一寸留白。我們不做複製品，每一個案子都從屋主的生活習慣、個性與夢想出發，打造獨一無二的空間故事。"}
          </p>
          <div ref={addRef(7)} className="resp-stats" style={{ ...fadeStyle, transitionDelay: "0.45s", display: "flex", gap: "3rem" }}>
            {[
              { target: 150, suffix: "+", label: "完成案例" },
              { target: 8, suffix: "", label: "年品牌經驗" },
              { target: 98, suffix: "%", label: "客戶滿意度" },
            ].map((s) => (
              <div key={s.label}>
                <CountUp
                  target={s.target}
                  suffix={s.suffix}
                  className="serif"
                  style={{ fontSize: "2.5rem", fontWeight: 300, color: colors.about_heading, display: "block" }}
                />
                <span style={{ fontSize: "0.78rem", letterSpacing: "0.2em", color: colors.about_text, textTransform: "uppercase" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND IDENTITY — 空房子 專屬 LOGO 識別故事 */}
      <section className="resp-section" style={{ padding: "8rem 6rem", background: colors.hero_bg }}>
        <div style={{ marginBottom: "4rem", borderBottom: `0.5px solid ${colors.services_card_border}`, paddingBottom: "2rem" }}>
          <span aria-hidden="true" className="-ml-0.5 mb-1 block select-none font-semibold uppercase leading-none" style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)", color: "rgba(107,78,49,0.10)", letterSpacing: "0.08em" }}>Identity</span>
          <h2 style={{ fontFamily: "'Noto Sans TC', sans-serif", fontSize: "clamp(1.875rem, 4vw, 2.25rem)", fontWeight: 700, letterSpacing: "0.12em", color: colors.hero_heading }}>品牌識別</h2>
        </div>
        <div className="resp-brand" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <div ref={addRef(30)} style={{ ...fadeStyle, display: "flex", justifyContent: "center" }}>
            <img src="/images/hds-mark.png" alt="空房子室內設計 品牌識別標誌" style={{ width: "min(65%, 340px)", height: "auto" }} />
          </div>
          <div>
            <p ref={addRef(31)} className="noto" style={{ ...fadeStyle, fontSize: "1.2rem", lineHeight: 2.1, color: colors.hero_heading, fontWeight: 300, marginBottom: "0.9rem" }}>
              圓，開口向外——喻示客戶的宅邸，承接魔法，氣象更新。
            </p>
            <p ref={addRef(32)} style={{ ...fadeStyle, transitionDelay: "0.12s", fontSize: "0.8rem", letterSpacing: "0.32em", textTransform: "uppercase", color: colors.hero_accent, marginBottom: "2.5rem" }}>
              Human · Design · Space
            </p>
            <div ref={addRef(33)} style={{ ...fadeStyle, transitionDelay: "0.24s", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.75rem 2.5rem" }}>
              {[
                { en: "Design", zh: "設計美學", desc: "以比例與留白，構築空間的靈魂。" },
                { en: "Human", zh: "以人為本", desc: "從屋主的生活與夢想出發。" },
                { en: "New", zh: "煥然一新", desc: "為老屋與新居注入嶄新氣象。" },
                { en: "Engineering", zh: "專業工程", desc: "自有工班，落實每一處細節。" },
              ].map((c) => (
                <div key={c.en}>
                  <p style={{ fontSize: "0.68rem", letterSpacing: "0.25em", textTransform: "uppercase", color: colors.hero_accent, marginBottom: "0.45rem" }}>{c.en}</p>
                  <p style={{ fontFamily: "'Noto Sans TC', sans-serif", fontSize: "1.12rem", fontWeight: 600, color: colors.hero_heading, marginBottom: "0.35rem" }}>{c.zh}</p>
                  <p className="noto" style={{ fontSize: "0.92rem", lineHeight: 1.8, color: colors.hero_text, fontWeight: 300 }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES — 詳細卡片版（含 SEO 敘述） */}
      <ServiceItems colors={colors} detailed />

      {/* 合作流程（/process 完整內容：步驟＋承諾＋費用＋FAQ） */}
      <DesignProcess colors={colors} />

      {/* PORTFOLIO — 沿用首頁的案例卡片輪播（分類篩選＋左右切換＋敘述） */}
      <div id="portfolio">
        <PortfolioPreview colors={colors} />
      </div>

      {/* TESTIMONIALS */}
      <section className="resp-section" style={{ padding: "8rem 6rem", background: colors.testimonials_bg }}>
        <span aria-hidden="true" className="-ml-0.5 mb-1 block select-none font-semibold uppercase leading-none" style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)", color: "rgba(107,78,49,0.10)", letterSpacing: "0.08em" }}>Testimonials</span>
        <h2 style={{ fontFamily: "'Noto Sans TC', sans-serif", fontSize: "clamp(1.875rem, 4vw, 2.25rem)", fontWeight: 700, letterSpacing: "0.12em", color: colors.testimonials_heading, marginBottom: "3.5rem" }}>客戶怎麼說</h2>
        <div className="resp-grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2rem" }}>
          {testimonials.map((t, i) => (
            <div key={t.name} ref={addRef(20 + i)} style={{ ...fadeStyle, transitionDelay: `${i * 0.15}s`, padding: "2.5rem", border: `0.5px solid ${colors.testimonials_card_border}` }}>
              <p className="serif" style={{ fontSize: "1.05rem", fontStyle: "italic", color: colors.testimonials_text, lineHeight: 1.9, marginBottom: "2rem", fontWeight: 300, ...getListItemStyle(content, "testimonials", t.sortOrder, "description", "design") }}>「{t.quote}」</p>
              <p style={{ fontSize: "0.82rem", letterSpacing: "0.2em", textTransform: "uppercase", color: colors.testimonials_accent, ...getListItemStyle(content, "testimonials", t.sortOrder, "title", "design") }}>{t.name}</p>
              <p style={{ fontSize: "0.78rem", color: colors.testimonials_text, marginTop: "0.3rem", letterSpacing: "0.1em", ...getListItemStyle(content, "testimonials", t.sortOrder, "subtitle", "design") }}>{t.info}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="resp-contact" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div className="resp-contact-left" style={{ background: colors.contact_bg, padding: "6rem", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
          <span aria-hidden="true" className="-ml-0.5 mb-1 block select-none font-semibold uppercase leading-none" style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)", color: "rgba(107,78,49,0.10)", letterSpacing: "0.08em" }}>Contact</span>
          <h2 style={{ fontFamily: "'Noto Sans TC', sans-serif", fontSize: "clamp(1.875rem, 4vw, 2.25rem)", fontWeight: 700, letterSpacing: "0.12em", lineHeight: 1.3, color: colors.contact_heading, marginBottom: "3rem" }}>開始你的空間對話</h2>
          {[["地址",contactAddress,"address"],["電話",contactPhone,"phone"],["Email",contactEmail,"email"],["營業時間",contactHours,"hours"]].map(([label, val, key]) => (
            <div key={label} style={{ marginBottom: "2rem" }}>
              <p style={{ fontSize: "0.9rem", letterSpacing: "0.35em", textTransform: "uppercase", color: colors.contact_accent, marginBottom: "0.4rem" }}>{label}</p>
              {key === "address" ? (
                <a
                  href="https://maps.app.goo.gl/Ya3FoWUXz36Rh5vj6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="serif inline-flex items-center gap-1.5 hover:opacity-70 transition-opacity"
                  style={{ fontSize: "1.05rem", color: colors.contact_heading, textDecoration: "none", ...getContentStyle(content, "contact", key, "design") }}
                >
                  {val}
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5, flexShrink: 0 }}>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              ) : (
                <p className="serif" style={{ fontSize: "1.05rem", color: colors.contact_heading, ...getContentStyle(content, "contact", key, "design") }}>{val}</p>
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
              title="空房子室內設計 — 台中市北屯區瀋陽北路73號"
            />
          </div>
        </div>
        <div className="resp-contact-right" style={{ background: colors.contact_heading, padding: "6rem", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
          <span aria-hidden="true" className="-ml-0.5 mb-1 block select-none font-semibold uppercase leading-none" style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)", color: "rgba(255,255,255,0.09)", letterSpacing: "0.08em" }}>Send Message</span>
          <h2 style={{ fontFamily: "'Noto Sans TC', sans-serif", fontSize: "clamp(1.875rem, 4vw, 2.25rem)", fontWeight: 700, letterSpacing: "0.12em", color: colors.contact_btn_text, marginBottom: "2.5rem" }}>預約諮詢</h2>
          {[["姓名","您的大名","text"],["聯絡電話","0900-000-000","tel"],["案件類型","新成屋 / 老屋翻新 / 商業空間","text"],["預算金額","例如：100萬 — 300萬","text"]].map(([label, ph, type]) => (
            <div key={String(label)} style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontSize: "0.9rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem" }}>{label}</label>
              <input type={String(type)} placeholder={String(ph)} value={formData[String(label)] || ""} onChange={(e) => { const val = String(label) === "聯絡電話" ? formatPhone(e.target.value) : e.target.value; setFormData(prev => ({ ...prev, [String(label)]: val })) }} className="form-input" />
            </div>
          ))}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontSize: "0.9rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem" }}>需求說明</label>
            <textarea placeholder="簡單描述您的空間與想法..." value={formData["需求說明"] || ""} onChange={(e) => setFormData(prev => ({ ...prev, "需求說明": e.target.value }))} className="form-input" />
          </div>
          <button
            disabled={submitting}
            onClick={async () => {
              setSubmitting(true)
              try {
                await submitForm(formData, "室內設計")
                setSubmitted(true)
                setFormData({})
              } catch { /* ignore */ }
              setSubmitting(false)
            }}
            style={{ marginTop: "1rem", background: colors.contact_btn_bg, color: colors.contact_btn_text, border: "none", padding: "1rem 2.5rem", fontFamily: "'Josefin Sans',sans-serif", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", cursor: submitting ? "not-allowed" : "pointer", width: "fit-content", opacity: submitting ? 0.6 : 1 }}>
            {submitting ? "送出中..." : submitted ? "已送出 ✓" : "立即報價 →"}
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="resp-footer" style={{ background: colors.footer_bg, padding: "2.5rem 6rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "0.5px solid rgba(255,255,255,0.05)" }}>
        <span className="serif" style={{ fontSize: "1.1rem", fontWeight: 300, letterSpacing: "0.15em", color: "rgba(255,255,255,0.45)" }}>空房子室內設計</span>
        <p style={{ fontSize: "0.9rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>© 2026 空房子室內設計・裕綸集團</p>
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <a href="https://www.instagram.com/human_design.space/" target="_blank" rel="noopener noreferrer" aria-label="空房子 Instagram" style={{ color: "#B5956A", display: "flex" }}>
            <Instagram size={20} />
          </a>
          <a href="https://www.facebook.com/p/%E7%A9%BA%E6%88%BF%E5%AD%90%E8%A8%AD%E8%A8%88-61564720748448/" target="_blank" rel="noopener noreferrer" aria-label="空房子 Facebook" style={{ color: "#B5956A", display: "flex" }}>
            <Facebook size={20} />
          </a>
          <a href="/" style={{ fontSize: "0.9rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)", textDecoration: "none", textTransform: "uppercase", transition: "color 0.3s" }}>裕綸集團</a>
        </div>
      </footer>
    </div>
  )
}
