"use client"

import { useEffect, useState } from "react"

// Full-screen splash shown briefly on first load, then fades into the page.
// Displays /logo-icon.png centered; falls back to brand text if it's missing.
export function SplashScreen({ loading }: { loading: boolean }) {
  const [done, setDone] = useState(false)
  const [minElapsed, setMinElapsed] = useState(false)
  const [imgError, setImgError] = useState(false)

  // Keep the splash up for at least a moment so it doesn't just flash.
  useEffect(() => {
    const t = setTimeout(() => setMinElapsed(true), 700)
    return () => clearTimeout(t)
  }, [])

  const hide = !loading && minElapsed

  // Unmount after the fade-out finishes.
  useEffect(() => {
    if (hide) {
      const t = setTimeout(() => setDone(true), 650)
      return () => clearTimeout(t)
    }
  }, [hide])

  if (done) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-700 ${
        hide ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ backgroundColor: "#F5EFE6" }}
    >
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
          className="h-28 w-28 animate-pulse md:h-32 md:w-32"
          style={{ objectFit: "contain" }}
        />
      )}
    </div>
  )
}
