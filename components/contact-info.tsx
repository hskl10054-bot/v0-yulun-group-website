import Link from "next/link"
import { Facebook, Instagram } from "lucide-react"

const ADDRESS = "台中市北屯區瀋陽北路73號"
const PHONE = "04-2247-9068"
const EMAIL = "yulun83417215@gmail.com"
const HOURS = "週一至週五　09:00 — 18:00"
const MAP_URL = "https://maps.app.goo.gl/Ya3FoWUXz36Rh5vj6"
const FB_URL = "https://www.facebook.com/p/%E7%A9%BA%E6%88%BF%E5%AD%90%E8%A8%AD%E8%A8%88-61564720748448/"
const IG_URL = "https://www.instagram.com/human_design.space/"

const GOLD = "#B5956A"
const MUTE = "rgba(255,255,255,0.55)"
const FAINT = "rgba(255,255,255,0.4)"

// Google 地圖嵌入（免金鑰）— 空房子室內設計・裕綸集團所在地
const MAP_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&z=16&output=embed`

// 精簡深色 footer — 品牌／地址・營業時間／電話／社群 分欄 ＋ 版權列。全站共用。
export function ContactInfo({ showCta = true }: { showCta?: boolean }) {
  return (
    <footer id="contact" style={{ background: "#1A1510", color: "#FAF8F4" }}>
      <div className="mx-auto max-w-6xl px-6 py-14 md:px-12 md:py-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4 lg:gap-12">
          {/* 品牌 + 地圖 + 預約 */}
          <div className="col-span-2 lg:col-span-1">
            <p style={{ fontSize: "1.35rem", fontWeight: 700, letterSpacing: "0.14em" }}>裕綸集團</p>
            <p style={{ fontSize: "0.72rem", letterSpacing: "0.3em", color: FAINT, marginTop: "0.35rem" }}>YULUN GROUP</p>
            {/* 空房子・裕綸集團 位置地圖 */}
            <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="mt-5 block overflow-hidden rounded-xl transition-opacity hover:opacity-90" style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
              <iframe
                title="空房子室內設計・裕綸集團 位置地圖"
                src={MAP_EMBED}
                className="block h-36 w-full"
                style={{ border: "none", filter: "grayscale(0.2) contrast(1.05)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </a>
            {showCta && (
              <Link href="/booking" className="mt-5 inline-flex items-center gap-2 rounded-full px-6 py-3 text-[0.85rem] tracking-[0.2em] transition-transform hover:-translate-y-0.5" style={{ backgroundColor: GOLD, color: "#FFFFFF", textDecoration: "none" }}>
                預約諮詢 →
              </Link>
            )}
          </div>

          {/* 公司地址 / 營業時間 */}
          <div>
            <p className="mb-4 text-[0.78rem] uppercase tracking-[0.22em]" style={{ color: GOLD }}>公司地址</p>
            <p style={{ fontSize: "0.92rem", color: FAINT, marginBottom: "0.6rem" }}>{HOURS}</p>
            <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1.5 transition-opacity hover:opacity-70" style={{ fontSize: "0.98rem", color: MUTE, textDecoration: "none", lineHeight: 1.7 }}>
              {ADDRESS}
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5, flexShrink: 0, marginTop: "0.25rem" }}>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>

          {/* 聯繫方式 */}
          <div>
            <p className="mb-4 text-[0.78rem] uppercase tracking-[0.22em]" style={{ color: GOLD }}>聯繫我們</p>
            <a href={`tel:${PHONE.replace(/-/g, "")}`} className="block transition-opacity hover:opacity-70" style={{ fontSize: "1.15rem", color: GOLD, textDecoration: "none", letterSpacing: "0.03em" }}>{PHONE}</a>
            <a href={`mailto:${EMAIL}`} className="mt-2 block transition-opacity hover:opacity-70" style={{ fontSize: "0.92rem", color: MUTE, textDecoration: "none" }}>{EMAIL}</a>
          </div>

          {/* 追蹤我們 */}
          <div>
            <p className="mb-4 text-[0.78rem] uppercase tracking-[0.22em]" style={{ color: GOLD }}>追蹤我們</p>
            <div className="flex items-center gap-3">
              <a href={FB_URL} target="_blank" rel="noopener noreferrer" aria-label="空房子 Facebook" className="flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-white/20 transition-colors hover:bg-white/10" style={{ color: GOLD }}>
                <Facebook className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} />
              </a>
              <a href={IG_URL} target="_blank" rel="noopener noreferrer" aria-label="空房子 Instagram" className="flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-white/20 transition-colors hover:bg-white/10" style={{ color: GOLD }}>
                <Instagram style={{ width: 18, height: 18 }} />
              </a>
            </div>
          </div>
        </div>

        {/* 版權列 */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 md:flex-row" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <p style={{ fontSize: "0.82rem", letterSpacing: "0.05em", color: FAINT }}>Copyright © 裕綸集團 Yulun Group All Rights Reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1" style={{ fontSize: "0.82rem", color: FAINT }}>
            <span>台中室內設計</span>
            <span style={{ opacity: 0.45 }}>｜</span>
            <span>台中室內裝修</span>
            <span style={{ opacity: 0.45 }}>｜</span>
            <Link href="/blog" className="transition-opacity hover:opacity-70" style={{ color: MUTE, textDecoration: "none" }}>裝修知識</Link>
            <span style={{ opacity: 0.45 }}>｜</span>
            <Link href="/privacy" className="transition-opacity hover:opacity-70" style={{ color: MUTE, textDecoration: "none" }}>隱私權政策</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
