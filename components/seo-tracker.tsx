"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

// 第一方輕量流量追蹤：每次瀏覽（含站內換頁）記錄一筆，
// 來源以「本次工作階段的進站 referrer」歸因（進站來自 Google → 該階段所有頁都算自然流量）。
export function SeoTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname) return
    if (pathname.startsWith("/admin") || pathname.startsWith("/seo-report")) return

    let entryRef = ""
    try {
      if (sessionStorage.getItem("yl_entryRefSet")) {
        entryRef = sessionStorage.getItem("yl_entryRef") ?? ""
      } else {
        entryRef = document.referrer || ""
        sessionStorage.setItem("yl_entryRef", entryRef)
        sessionStorage.setItem("yl_entryRefSet", "1")
      }
    } catch { /* ignore */ }

    const body = JSON.stringify({ path: pathname, ref: entryRef })
    try {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {})
    } catch { /* ignore */ }
  }, [pathname])

  return null
}
