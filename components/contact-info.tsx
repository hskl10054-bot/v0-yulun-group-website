import Link from "next/link"

const ADDRESS = "台中市北屯區瀋陽北路73號"
const PHONE = "04-2247-9068"
const EMAIL = "yulun83417215@gmail.com"
const HOURS = "週一至週五　09:00 — 18:00"
const MAP_URL = "https://maps.app.goo.gl/Ya3FoWUXz36Rh5vj6"

const INK = "#2A2520"
const GOLD = "#B5956A"

// 聯絡資訊區塊 — 放在各頁最下方（footer 上方）與 /booking。showCta 顯示「預約諮詢 → /booking」按鈕。
export function ContactInfo({ showCta = true, bg = "#F0EAE0" }: { showCta?: boolean; bg?: string }) {
  const items: [string, string][] = [
    ["電話", PHONE],
    ["電子郵件", EMAIL],
    ["營業時間", HOURS],
  ]
  return (
    <section id="contact" className="py-24 md:py-32" style={{ backgroundColor: bg }}>
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="mb-12 border-b pb-6 md:mb-16" style={{ borderColor: "rgba(43,39,34,0.12)" }}>
          <span aria-hidden="true" className="-ml-0.5 mb-1 block select-none font-semibold uppercase leading-none" style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)", color: "rgba(107,78,49,0.10)", letterSpacing: "0.08em" }}>Contact</span>
          <h2 className="text-3xl font-bold tracking-[0.12em] md:text-4xl" style={{ color: INK }}>聯絡裕綸集團</h2>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          {/* Info */}
          <div>
            <div className="mb-8">
              <p className="mb-1 text-[0.9rem] uppercase tracking-[0.3em]" style={{ color: GOLD }}>地址</p>
              <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-70" style={{ fontSize: "1.15rem", color: INK, textDecoration: "none" }}>
                {ADDRESS}
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5, flexShrink: 0 }}>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
            {items.map(([label, val]) => (
              <div key={label} className="mb-8">
                <p className="mb-1 text-[0.9rem] uppercase tracking-[0.3em]" style={{ color: GOLD }}>{label}</p>
                <p style={{ fontSize: "1.15rem", color: INK }}>{val}</p>
              </div>
            ))}
            {showCta && (
              <Link href="/booking" className="mt-2 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-[0.9rem] tracking-[0.2em] transition-transform hover:-translate-y-0.5" style={{ backgroundColor: GOLD, color: "#FFFFFF", textDecoration: "none" }}>
                預約諮詢 →
              </Link>
            )}
          </div>

          {/* Map */}
          <div className="overflow-hidden rounded-xl border" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0, display: "block", minHeight: "320px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="裕綸集團 — 台中市北屯區瀋陽北路73號"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
