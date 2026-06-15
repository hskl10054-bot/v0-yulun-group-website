"use client"

// Floating "message us" button (bottom-right) so visitors who won't fill the
// form can open Facebook Messenger and ask us directly.
// Facebook Page Messenger link (page id 61564720748448 — 空房子設計).
const MESSENGER_URL = "https://m.me/61564720748448"

export function FloatingContact() {
  // Hidden until a real Messenger link is configured (avoids a dead button).
  if (MESSENGER_URL === "https://m.me/") return null

  return (
    <a
      href={MESSENGER_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="用 Messenger 直接詢問我們"
      className="group fixed bottom-6 right-5 z-[9990] flex flex-col items-center gap-1.5"
    >
      <span
        className="flex h-14 w-14 items-center justify-center rounded-full shadow-lg ring-1 ring-black/5 transition-transform duration-200 group-hover:scale-110 md:h-16 md:w-16"
        style={{ background: "#E2A4AB" }}
      >
        <svg viewBox="0 0 24 24" fill="#ffffff" className="h-7 w-7 md:h-8 md:w-8" aria-hidden="true">
          <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.19.16.14.26.35.27.57l.05 1.78c.02.57.6.94 1.12.71l1.98-.87c.17-.08.36-.09.54-.04 1.03.28 2.12.43 3.3.43 5.64 0 10-4.13 10-9.7C22 6.13 17.64 2 12 2zm6 7.46l-2.93 4.64c-.47.73-1.46.92-2.16.4l-2.33-1.74a.6.6 0 0 0-.72 0l-3.15 2.39c-.42.32-.97-.18-.68-.62l2.93-4.64c.47-.73 1.46-.92 2.16-.4l2.33 1.74a.6.6 0 0 0 .72 0l3.15-2.39c.42-.32.97.18.68.62z" />
        </svg>
      </span>
      <span className="rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-medium tracking-wider text-[#6B4E31] shadow-sm">
        線上詢問
      </span>
    </a>
  )
}
