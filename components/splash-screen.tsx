"use client"

import { useState } from "react"

// 開場過場：以「純 CSS 動畫」淡出（跟隨瀏覽器繪製時間軸，約 1.2 秒），
// 不依賴 JavaScript hydration，避免在慢速裝置上長時間遮住首圖（拖垮 LCP）。
export function SplashScreen() {
  const [imgError, setImgError] = useState(false)

  return (
    <div
      className="yl-splash"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F5EFE6",
        pointerEvents: "none",
      }}
    >
      <style>{`
        @keyframes ylSplashOut { 0%,40% { opacity: 1; } 100% { opacity: 0; visibility: hidden; } }
        .yl-splash { animation: ylSplashOut 1.25s ease-in forwards; will-change: opacity; }
        @media (prefers-reduced-motion: reduce) { .yl-splash { animation-duration: .5s; } }
      `}</style>
      {imgError ? (
        <div className="text-center animate-pulse">
          <div className="text-3xl font-bold tracking-[0.2em] text-[#2F2F2F] md:text-4xl">裕綸集團</div>
          <div className="mt-3 text-xs font-light tracking-[0.4em] text-[#6B4E31]">YULUN GROUP</div>
        </div>
      ) : (
        <img
          src="/logo-icon.png"
          alt="裕綸集團"
          onError={() => setImgError(true)}
          className="h-16 w-16 animate-pulse md:h-20 md:w-20"
          style={{ objectFit: "contain" }}
        />
      )}
    </div>
  )
}
