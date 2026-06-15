"use client"

import { useEffect, useState } from "react"

// Facebook Page Messenger link (page id 61564720748448 — 空房子設計).
const MESSENGER_URL = "https://m.me/61564720748448"

// Floating buttons shown on every page: quick Messenger inquiry + back-to-top.
export function FloatingContact() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="fixed bottom-5 right-4 z-[9990] flex flex-col items-center gap-3">
      {/* Messenger 詢問 */}
      <a
        href={MESSENGER_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="用 Messenger 直接詢問我們"
        className="group flex flex-col items-center gap-1"
      >
        <span
          className="flex h-11 w-11 items-center justify-center rounded-full shadow-lg ring-1 ring-black/5 transition-transform duration-200 group-hover:scale-110 md:h-12 md:w-12"
          style={{ background: "#E2A4AB" }}
        >
          <svg viewBox="0 0 24 24" fill="#ffffff" className="h-6 w-6" aria-hidden="true">
            <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.19.16.14.26.35.27.57l.05 1.78c.02.57.6.94 1.12.71l1.98-.87c.17-.08.36-.09.54-.04 1.03.28 2.12.43 3.3.43 5.64 0 10-4.13 10-9.7C22 6.13 17.64 2 12 2zm6 7.46l-2.93 4.64c-.47.73-1.46.92-2.16.4l-2.33-1.74a.6.6 0 0 0-.72 0l-3.15 2.39c-.42.32-.97-.18-.68-.62l2.93-4.64c.47-.73 1.46-.92 2.16-.4l2.33 1.74a.6.6 0 0 0 .72 0l3.15-2.39c.42-.32.97.18.68.62z" />
          </svg>
        </span>
        <span className="rounded-full whitespace-nowrap bg-white px-3.5 py-1 text-[10px] font-medium tracking-wider text-[#6B4E31] shadow-md ring-1 ring-black/5">
          線上詢問
        </span>
      </a>

      {/* 回到最上面（向下捲動後才顯示） */}
      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="回到最上面"
          className="group flex flex-col items-center gap-1"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg ring-2 ring-[#E2A4AB] transition-transform duration-200 group-hover:scale-110 md:h-11 md:w-11">
            <svg viewBox="0 0 24 24" fill="none" stroke="#E2A4AB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
              <path d="M6 15l6-6 6 6" />
            </svg>
          </span>
          <span className="rounded-full whitespace-nowrap bg-white px-3.5 py-1 text-[10px] font-medium tracking-[0.18em] text-[#6B4E31] shadow-md ring-1 ring-black/5">
            TOP
          </span>
        </button>
      )}
    </div>
  )
}
