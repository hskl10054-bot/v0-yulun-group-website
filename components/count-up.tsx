"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"

interface CountUpProps {
  target: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
  style?: CSSProperties
}

// 數字動畫：滑入視線時，從 0 緩動跳動到目標值（每個實例自帶進場偵測，只跑一次）。
export function CountUp({ target, prefix = "", suffix = "", duration = 1600, className, style }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)
  const [val, setVal] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      setVal(target)
      return
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          obs.disconnect()
          const t0 = performance.now()
          const tick = (now: number) => {
            const p = Math.min((now - t0) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
            setVal(Math.round(eased * target))
            if (p < 1) requestAnimationFrame(tick)
            else setVal(target)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.4 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration])

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums", ...style }}>
      {prefix}
      {val}
      {suffix}
    </span>
  )
}
