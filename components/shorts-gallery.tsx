"use client"

import { useState } from "react"

// 頻道 Shorts 短片牆 — 輕量內嵌：平常只載入封面縮圖，點擊才載入影片，對頁面速度幾乎零影響。
// 要新增 Shorts：把影片 ID（youtube.com/shorts/XXXXXXXXXXX 的 XXXXXXXXXXX）加進下面陣列即可。
const SHORTS: { id: string; title: string }[] = [
  { id: "-8aCes467M4", title: "奇奇妙妙屋 · 裝修短片" },
  { id: "ewYtT1FIF6k", title: "奇奇妙妙屋 · 裝修短片" },
]

const CHANNEL_SHORTS_URL = "https://www.youtube.com/@%E8%A3%95%E7%B6%B8/shorts"
const GOLD = "#B5956A"

function ShortCard({ id, title }: { id: string; title: string }) {
  const [play, setPlay] = useState(false)
  return (
    <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "9 / 16", background: "#000", boxShadow: "0 20px 44px -30px rgba(42,37,32,0.5)" }}>
      {play ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          style={{ border: 0 }}
        />
      ) : (
        <button type="button" onClick={() => setPlay(true)} aria-label={`播放：${title}`} className="group absolute inset-0 h-full w-full cursor-pointer">
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            onError={(e) => {
              const im = e.currentTarget as HTMLImageElement
              if (!im.dataset.fb) { im.dataset.fb = "1"; im.src = `https://i.ytimg.com/vi/${id}/mqdefault.jpg` }
            }}
            alt={title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.42))" }} aria-hidden="true" />
          <span className="absolute inset-x-0 bottom-0 p-3 text-left text-[0.8rem] font-medium leading-snug text-white" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>{title}</span>
          <span className="absolute left-1/2 top-[42%] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110" style={{ background: "rgba(255,255,255,0.92)", boxShadow: "0 10px 26px rgba(0,0,0,0.4)" }} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="24" height="24" fill={GOLD} style={{ marginLeft: 2 }}><path d="M8 5v14l11-7z" /></svg>
          </span>
        </button>
      )}
    </div>
  )
}

export function ShortsGallery() {
  if (SHORTS.length === 0) return null
  return (
    <section style={{ background: "#EFE7D8", padding: "3rem 0 6rem" }}>
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="mb-9 text-center">
          <span aria-hidden="true" className="-ml-0.5 mb-1 block select-none font-semibold uppercase leading-none" style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)", color: "rgba(107,78,49,0.10)", letterSpacing: "0.08em" }}>Shorts</span>
          <h2 style={{ fontFamily: "'Noto Sans TC', sans-serif", fontSize: "clamp(1.875rem, 4vw, 2.25rem)", fontWeight: 700, letterSpacing: "0.12em", color: "#2A2520" }}>精選短片</h2>
          <p className="mx-auto mt-3 max-w-xl text-[1rem] font-light leading-relaxed" style={{ color: "#5B5349" }}>一分鐘看懂裝修大小事</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {SHORTS.map((s) => <ShortCard key={s.id} id={s.id} title={s.title} />)}
        </div>
        <div className="mt-9 text-center">
          <a href={CHANNEL_SHORTS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[0.85rem] tracking-[0.2em] transition-opacity hover:opacity-70" style={{ color: GOLD, textDecoration: "none" }}>
            到 YouTube 看更多短片 →
          </a>
        </div>
      </div>
    </section>
  )
}
