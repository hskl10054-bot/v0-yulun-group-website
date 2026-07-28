"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { Menu } from "lucide-react"

const ITEMS = [
  { label: "首頁", href: "/" },
  { label: "空房子室內設計", href: "/design" },
  { label: "裕綸室內裝修", href: "/construction" },
  { label: "案例分享", href: "/works" },
  { label: "裝修知識", href: "/blog" },
  { label: "聯絡我們", href: "/#contact" },
]

const INK = "#2A2520"
const GOLD = "#B5956A"

// 共用漢堡選單（☰）。展開為右上角「溫和半透明毛玻璃小卡」，位置依按鈕實際座標動態對齊。
export function SiteMenu({ color = "#2F2F2F" }: { color?: string }) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [pos, setPos] = useState({ top: 72, right: 18 })
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => setMounted(true), [])

  const place = () => {
    const r = btnRef.current?.getBoundingClientRect()
    if (r) setPos({ top: Math.round(r.bottom + 12), right: Math.max(12, Math.round(window.innerWidth - r.right)) })
  }

  const toggle = () => {
    if (!open) place()
    setOpen((v) => !v)
  }

  const overlay = (
    <>
      {/* 透明點擊層：點外面關閉，頁面完全可見 */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: open ? "auto" : "none" }}
      />
      {/* 浮動選單卡 — 半透明毛玻璃、極簡留白 */}
      <div
        role="menu"
        style={{
          position: "fixed",
          top: `${pos.top}px`,
          right: `${pos.right}px`,
          zIndex: 10000,
          width: "min(232px, 76vw)",
          background: "rgba(250,248,244,0.62)",
          backdropFilter: "blur(26px) saturate(1.25)",
          WebkitBackdropFilter: "blur(26px) saturate(1.25)",
          border: "1px solid rgba(255,255,255,0.45)",
          borderRadius: "22px",
          boxShadow: "0 24px 60px rgba(43,39,34,0.13)",
          padding: "1.4rem 0",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0) scale(1)" : "translateY(-8px) scale(0.98)",
          transformOrigin: "top right",
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.3s ease, transform 0.34s cubic-bezier(.2,.7,.2,1)",
        }}
      >
        {ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => setOpen(false)}
            style={{
              display: "block",
              padding: "0.72rem 1.9rem",
              fontFamily: "'Noto Sans TC', sans-serif",
              fontSize: "0.95rem",
              fontWeight: 300,
              letterSpacing: "0.2em",
              color: INK,
              textDecoration: "none",
              transition: "color 0.25s ease, transform 0.25s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = GOLD; e.currentTarget.style.transform = "translateX(5px)" }}
            onMouseLeave={(e) => { e.currentTarget.style.color = INK; e.currentTarget.style.transform = "translateX(0)" }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </>
  )

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={toggle}
        aria-label="選單"
        aria-expanded={open}
        style={{ background: "none", border: "none", cursor: "pointer", padding: "0.25rem", color, display: "flex", alignItems: "center" }}
      >
        <Menu size={22} />
      </button>
      {mounted && createPortal(overlay, document.body)}
    </>
  )
}
