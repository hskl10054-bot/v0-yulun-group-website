import type { Metadata } from "next"
import Link from "next/link"
import { SiteMenu } from "@/components/site-menu"
import { ContactInfo } from "@/components/contact-info"
import { Breadcrumb } from "@/components/breadcrumb"

const URL = "https://www.yulungroup.com/services/old-house-renovation"

export const metadata: Metadata = {
  title: "台中老屋翻新｜中古屋、透天翻修設計施工一站式－裕綸集團",
  description:
    "台中老屋翻新一站式服務：結構補強、管線更新、防水與格局改造，自有工班施工、工程保固一年。從 30 年老屋到收租套房，看裕綸怎麼讓老房子重新好住。立即預約免費現場會勘。",
  alternates: { canonical: URL },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: URL,
    siteName: "裕綸集團 Yulun Group",
    title: "台中老屋翻新｜中古屋、透天翻修設計施工一站式－裕綸集團",
    description:
      "台中老屋翻新一站式服務：結構補強、管線更新、防水與格局改造，自有工班施工、工程保固一年。立即預約免費現場會勘。",
    images: [{ url: "/images/hero-bg.jpg", width: 1567, height: 1045, alt: "台中老屋翻新｜裕綸集團" }],
  },
}

const GOLD = "#B5956A"
const INK = "#2A2520"
const MUTE = "#8C8479"

const problems = [
  { t: "管線老化、漏水壁癌", d: "20 年以上的水電管線與防水層多半已到使用年限，翻新時一次更新最安心。" },
  { t: "格局零碎、採光不佳", d: "舊式隔間常讓空間又暗又小，透過格局重整引進光線、動線更順。" },
  { t: "結構與安全疑慮", d: "牆面裂縫、鋼筋外露、老舊配電盤，需專業評估並做結構補強。" },
  { t: "機能不足、收納少", d: "依現在的生活重新配置廚衛與收納，讓老屋也能符合當代需求。" },
]

const steps = [
  { n: "01", t: "現場會勘與結構評估", d: "實地勘查屋況、管線與結構，釐清可改與不可動的部分，並討論需求與預算。" },
  { n: "02", t: "設計規劃與報價", d: "平面配置、材料與風格提案，提供逐項清單報價，確認後再進場。" },
  { n: "03", t: "拆除與基礎工程", d: "拆除舊裝修後，重拉水電、重做防水、必要時結構補強——老屋翻新最關鍵的隱蔽工程。" },
  { n: "04", t: "施工與監工", d: "自有工班進場，泥作、木作、油漆、系統櫃依序施作，進度與工地照持續同步。" },
  { n: "05", t: "驗收與保固", d: "逐項點交、複驗確認，提供一年工程保固，交屋後有問題持續負責。" },
]

const faqs = [
  {
    q: "台中老屋翻新要多久？",
    a: "依坪數與工程範圍而定，全室翻新通常約 2–3 個月。涉及結構補強或管線全換的老屋，建議預留更充裕的時間，我們會在簽約前提供完整時程規劃。",
  },
  {
    q: "老屋翻新一坪多少？費用怎麼抓？",
    a: "老屋翻新費用受屋齡、管線與結構狀況、翻修範圍影響很大，基礎工程（水電、防水、結構）往往是老屋的重點花費。詳細的費用結構與省錢重點，可參考我們的文章整理。",
  },
  {
    q: "翻新期間需要搬出去嗎？",
    a: "全室翻新通常需要淨空，局部翻修則多半可以協調。我們會依工程範圍，把對生活的影響降到最低。",
  },
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${URL}#service`,
  name: "台中老屋翻新",
  serviceType: "老屋翻新",
  provider: { "@id": "https://www.yulungroup.com/#localbusiness" },
  areaServed: { "@type": "City", name: "台中市" },
  description:
    "台中中古屋、透天老屋翻新設計施工一站式服務，含結構補強、管線更新、防水工程與格局改造，自有工班施工、工程保固一年。",
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "首頁", item: "https://www.yulungroup.com/" },
    { "@type": "ListItem", position: 2, name: "台中老屋翻新", item: URL },
  ],
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
}

export default function OldHouseRenovationPage() {
  return (
    <main style={{ backgroundColor: "#FAF8F4", color: INK, minHeight: "100vh" }}>
      {[serviceSchema, breadcrumbSchema, faqSchema].map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s).replace(/</g, "\\u003c") }} />
      ))}

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-6 md:px-12" style={{ borderBottom: "0.5px solid #E8E3DA" }}>
        <Link href="/" className="text-sm tracking-[0.2em]" style={{ color: MUTE, textDecoration: "none" }}>← 裕綸集團</Link>
        <span style={{ fontSize: "clamp(1.05rem, 3.5vw, 1.5rem)", fontWeight: 300, letterSpacing: "0.15em", color: INK }}>台中老屋翻新</span>
        <SiteMenu color={INK} />
      </nav>

      <div className="mx-auto max-w-5xl px-6 pt-5 md:px-12">
        <Breadcrumb items={[{ name: "首頁", href: "/" }, { name: "台中老屋翻新" }]} />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pb-4 pt-20 text-center md:px-12 md:pt-28">
        <p className="mb-4 text-[0.85rem] uppercase tracking-[0.35em]" style={{ color: GOLD }}>Old House Renovation</p>
        <h1 style={{ fontFamily: "'Noto Sans TC', sans-serif", fontSize: "clamp(2.2rem, 5vw, 3.4rem)", fontWeight: 700, letterSpacing: "0.08em" }}>台中老屋翻新</h1>
        <p className="mx-auto mt-6 max-w-2xl text-[1.05rem] font-light leading-loose" style={{ color: "#5B5349" }}>
          從 30 年老公寓到收租套房、老透天，裕綸提供台中老屋翻新的一站式服務——結構補強、管線更新、防水與格局改造，自有工班施工、工程保固一年，讓老房子重新好住。
        </p>
        <div className="mt-8">
          <Link href="/booking" className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-[0.95rem] font-medium tracking-[0.12em]" style={{ background: GOLD, color: "#fff", textDecoration: "none" }}>
            預約免費現場會勘 →
          </Link>
        </div>
      </section>

      {/* Problems */}
      <section className="px-6 py-20 md:px-12" style={{ background: "#F4EFE7" }}>
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-10 text-center" style={{ fontFamily: "'Noto Sans TC', sans-serif", fontSize: "clamp(1.6rem, 3.5vw, 2.1rem)", fontWeight: 700, letterSpacing: "0.1em" }}>老屋常見的四個問題</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {problems.map((p) => (
              <div key={p.t} className="rounded-2xl bg-white p-7" style={{ boxShadow: "0 18px 44px -34px rgba(42,37,32,0.4)" }}>
                <h3 className="mb-2 text-[1.15rem] font-semibold" style={{ color: INK }}>{p.t}</h3>
                <p className="text-[0.95rem] font-light leading-relaxed" style={{ color: "#6B5D4F" }}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="px-6 py-20 md:px-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center" style={{ fontFamily: "'Noto Sans TC', sans-serif", fontSize: "clamp(1.6rem, 3.5vw, 2.1rem)", fontWeight: 700, letterSpacing: "0.1em" }}>老屋翻新流程</h2>
          <div className="space-y-6">
            {steps.map((s) => (
              <div key={s.n} className="flex gap-5 rounded-2xl p-6" style={{ background: "#fff", boxShadow: "0 18px 44px -34px rgba(42,37,32,0.35)" }}>
                <span className="shrink-0 text-[1.6rem] font-bold" style={{ color: "rgba(181,149,106,0.5)", fontFamily: "'Cormorant Garamond', serif" }}>{s.n}</span>
                <div>
                  <h3 className="mb-1 text-[1.1rem] font-semibold" style={{ color: INK }}>{s.t}</h3>
                  <p className="text-[0.95rem] font-light leading-relaxed" style={{ color: "#6B5D4F" }}>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-[0.95rem] font-light leading-relaxed" style={{ color: MUTE }}>
            老屋翻新的重點在看不見的「基礎工程」。裕綸由
            <Link href="/construction" style={{ color: GOLD }}> 自有工班的標準化施工 </Link>
            把關水電、防水與結構，施工品質全程掌握。
          </p>
        </div>
      </section>

      {/* Cost + cases（內部連結） */}
      <section className="px-6 py-20 md:px-12" style={{ background: "#F4EFE7" }}>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-5" style={{ fontFamily: "'Noto Sans TC', sans-serif", fontSize: "clamp(1.6rem, 3.5vw, 2.1rem)", fontWeight: 700, letterSpacing: "0.1em" }}>費用與實際案例</h2>
          <p className="mx-auto max-w-2xl text-[1.02rem] font-light leading-loose" style={{ color: "#5B5349" }}>
            老屋翻新費用受屋齡、管線與結構狀況影響很大。想先抓預算，可看
            <Link href="/blog/old-house-renovation-cost" style={{ color: GOLD }}>《台中老屋翻新費用一坪多少？》</Link>
            ；想看實際成果，推薦
            <Link href="/works/renewal" style={{ color: GOLD }}>老屋翻新收租套房案例「新生」</Link>
            與
            <Link href="/blog/taichung-nantun-old-house-living-room" style={{ color: GOLD }}>南屯 30 年老屋翻新實錄</Link>
            。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/works/renewal" className="rounded-full border px-6 py-2.5 text-[0.9rem]" style={{ borderColor: GOLD, color: GOLD, textDecoration: "none" }}>看老屋翻新案例</Link>
            <Link href="/blog/old-house-renovation-cost" className="rounded-full border px-6 py-2.5 text-[0.9rem]" style={{ borderColor: GOLD, color: GOLD, textDecoration: "none" }}>翻新費用怎麼算</Link>
            <Link href="/design" className="rounded-full border px-6 py-2.5 text-[0.9rem]" style={{ borderColor: GOLD, color: GOLD, textDecoration: "none" }}>台中室內設計服務</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-10 text-center" style={{ fontFamily: "'Noto Sans TC', sans-serif", fontSize: "clamp(1.6rem, 3.5vw, 2.1rem)", fontWeight: 700, letterSpacing: "0.1em" }}>常見問題</h2>
          <div className="space-y-5">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-2xl bg-white p-7" style={{ boxShadow: "0 18px 44px -34px rgba(42,37,32,0.35)" }}>
                <h3 className="mb-2 text-[1.05rem] font-semibold" style={{ color: INK }}>Q. {f.q}</h3>
                <p className="text-[0.95rem] font-light leading-relaxed" style={{ color: "#6B5D4F" }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24 md:px-12">
        <div className="mx-auto max-w-3xl rounded-3xl px-8 py-14 text-center" style={{ background: INK, color: "#FAF8F4" }}>
          <h2 style={{ fontFamily: "'Noto Sans TC', sans-serif", fontSize: "clamp(1.5rem, 3.5vw, 2rem)", fontWeight: 700, letterSpacing: "0.08em" }}>老屋想翻新，先從一次免費會勘開始</h2>
          <p className="mx-auto mt-4 max-w-xl text-[1rem] font-light leading-loose" style={{ color: "rgba(255,255,255,0.7)" }}>
            不用先想好所有答案。留下需求與預算，我們到現場評估屋況，一站式為你規劃台中老屋翻新。
          </p>
          <Link href="/booking" className="mt-7 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-[0.95rem] font-medium tracking-[0.12em]" style={{ background: GOLD, color: "#fff", textDecoration: "none" }}>
            預約免費諮詢 →
          </Link>
        </div>
      </section>

      <ContactInfo showCta={false} />
    </main>
  )
}
