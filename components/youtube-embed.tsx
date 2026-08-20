"use client"

import { useState } from "react"

// 輕量 YouTube 內嵌：平常只載入一張封面縮圖（幾十 KB），
// 訪客按下播放後才真正載入 YouTube 影片 iframe —— 對頁面初始載入速度幾乎零影響。
export function YoutubeEmbed({ id, title }: { id: string; title: string }) {
  const [play, setPlay] = useState(false)

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl"
      style={{ aspectRatio: "16 / 9", background: "#000", boxShadow: "0 30px 60px -32px rgba(42,37,32,0.5)" }}
    >
      {play ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          style={{ border: 0 }}
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlay(true)}
          aria-label={`播放影片：${title}`}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          <img
            src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement
              if (!img.dataset.fallback) {
                img.dataset.fallback = "1"
                img.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
              }
            }}
            alt={title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.4))" }} aria-hidden="true" />
          <span
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20"
            style={{ background: "rgba(255,255,255,0.94)", boxShadow: "0 12px 34px rgba(0,0,0,0.4)" }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" width="30" height="30" fill="#B5956A" style={{ marginLeft: 3 }}>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  )
}
