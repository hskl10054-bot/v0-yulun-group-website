"use client"

import { useEffect, useState } from "react"

// Facebook Page Messenger link (page id 61564720748448 — 空房子設計).
const MESSENGER_URL = "https://m.me/61564720748448"

// SEO 常見問題 — 點擊會帶進首頁預約表單的「需求說明」
const FAQS = [
  "台中室內設計費用？",
  "設計到完工多久？",
  "如何預約免費的空間格局諮詢？",
  "請問裝修預算與進度怎麼做到透明？",
]

// Floating buttons shown on every page: FAQ + Messenger inquiry + back-to-top.
export function FloatingContact() {
  const [showTop, setShowTop] = useState(false)
  const [faqOpen, setFaqOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // 客人進站時，常見問題自動跳出一次（每個瀏覽階段只跳一次）。
  useEffect(() => {
    if (sessionStorage.getItem("faqShown")) return
    const t = setTimeout(() => {
      setFaqOpen(true)
      sessionStorage.setItem("faqShown", "1")
    }, 1200)
    return () => clearTimeout(t)
  }, [])

  // 點問題 → 複製問題文字並開啟 Messenger，客人貼上即可送出。
  const askQuestion = (q: string) => {
    navigator.clipboard?.writeText(q).catch(() => {})
    window.open(MESSENGER_URL, "_blank", "noopener")
    setCopied(true)
    setTimeout(() => setCopied(false), 2600)
  }

  return (
    <div className="fixed bottom-5 right-4 z-[9990] flex flex-col items-center gap-3">
      {/* 常見問題面板（浮在上方，靠右對齊，不影響按鈕位置） */}
      {faqOpen && (
        <div className="absolute bottom-full right-0 mb-3 w-[21rem] max-w-[calc(100vw-2rem)] rounded-2xl bg-white p-5 shadow-xl ring-1 ring-black/5">
          <p className="mb-3 text-sm font-semibold tracking-wider text-[#6B4E31]">常見問題</p>
          <div className="flex flex-col">
            {FAQS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => askQuestion(q)}
                className="border-b border-black/5 py-3 text-left text-[15px] leading-relaxed text-[#4A4A4A] transition-colors last:border-0 hover:text-[#E2A4AB]"
              >
                {q}
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs leading-snug text-[#A98C78]">點問題 → 複製並開啟 Messenger，貼上即可送出</p>
        </div>
      )}

      {/* 已複製提示 */}
      {copied && (
        <div className="absolute bottom-full right-0 mb-3 w-[21rem] max-w-[calc(100vw-2rem)] rounded-xl bg-[#2F2F2F] px-4 py-3 text-center text-[13px] text-white shadow-xl">
          ✓ 問題已複製，請在 Messenger 對話框貼上送出
        </div>
      )}

      {/* 常見問題 toggle */}
      <button
        type="button"
        onClick={() => setFaqOpen((v) => !v)}
        aria-label="常見問題"
        aria-expanded={faqOpen}
        className="group flex flex-col items-center gap-1"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg ring-2 ring-[#E2A4AB] transition-transform duration-200 group-hover:scale-110 md:h-12 md:w-12">
          <svg viewBox="0 0 24 24" fill="none" stroke="#E2A4AB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <path d="M12 17h.01" />
          </svg>
        </span>
        <span className="rounded-full whitespace-nowrap bg-white px-3.5 py-1 text-[10px] font-medium tracking-wider text-[#6B4E31] shadow-md ring-1 ring-black/5">
          常見問題
        </span>
      </button>

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
