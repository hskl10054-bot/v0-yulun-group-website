"use client"

import { useEffect, useState } from "react"
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

// 共用漢堡選單（☰）。展開為右上角「溫和半透明毛玻璃小卡」，用 Portal 掛到 body。
export function SiteMenu({ color = "#2F2F2F" }: { color?: string }) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const overlay = (
    <>
      {/* 透明點擊層：點外面關閉，頁面完全可見 */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: open ? "auto" : "none" }}
      />
      {/* 浮動選單卡 */}
      <div
        role="menu"
        style={{
          position: "fixed",
          top: "4.75rem",
          right: "1.1rem",
          zIndex: 10000,
          width: "min(248px, 78vw)",
          background: "rgba(250,247,242,0.82)",
          backdropFilter: "blur(18px) saturate(1.1)",
          WebkitBackdropFilter: "blur(18px) saturate(1.1)",
          border: "1px solid rgba(43,39,34,0.08)",
          borderRadius: "18px",
          boxShadow: "0 18px 50px rgba(43,39,34,0.16)",
          padding: "0.5rem 0",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0) scale(1)" : "translateY(-10px) scale(0.97)",
          transformOrigin: "top right",
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.26s ease, transform 0.28s cubic-bezier(.2,.7,.2,1)",
        }}
      >
        {ITEMS.map((item, i) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => setOpen(false)}
            style={{
              display: "block",
              padding: "0.85rem 1.4rem",
              fontFamily: "'Noto Sans TC', sans-serif",
              fontSize: "1.02rem",
              fontWeight: 400,
              letterSpacing: "0.08em",
              color: INK,
              textDecoration: "none",
              borderBottom: i < ITEMS.length - 1 ? "1px solid rgba(43,39,34,0.07)" : "none",
              transition: "color 0.2s, background 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = GOLD; e.currentTarget.style.background = "rgba(181,149,106,0.08)" }}
            onMouseLeave={(e) => { e.currentTarget.style.color = INK; e.currentTarget.style.background = "transparent" }}
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
        type="button"
        onClick={() => setOpen((v) => !v)}
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
