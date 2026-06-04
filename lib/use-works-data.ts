"use client"

import { useEffect, useState } from "react"
import { CASES as FALLBACK_CASES, slugify, type CaseStudy, type GalleryItem } from "@/data/cases"

// Raw row shape from the Supabase `cases` table (snake_case, jsonb columns).
interface DbCase {
  id: number
  sort_order: number
  cat: string
  zh_name: string
  en_name: string
  tagline: string
  hero: string
  meta: unknown
  story: string
  problem: string
  solution: string
  highlights: unknown
  gallery: unknown
}

function asArray(v: unknown): unknown[] {
  if (Array.isArray(v)) return v
  if (typeof v === "string" && v.trim()) {
    try {
      const p = JSON.parse(v)
      return Array.isArray(p) ? p : []
    } catch {
      return []
    }
  }
  return []
}

function mapRow(row: DbCase): CaseStudy {
  return {
    cat: row.cat as CaseStudy["cat"],
    zhName: row.zh_name,
    enName: row.en_name,
    tagline: row.tagline,
    hero: row.hero,
    meta: asArray(row.meta).map(String),
    story: row.story,
    problem: row.problem,
    solution: row.solution,
    highlights: asArray(row.highlights).map(String),
    gallery: asArray(row.gallery)
      .filter((g): g is GalleryItem => !!g && typeof g === "object" && "src" in g)
      .map((g) => ({ src: String((g as GalleryItem).src), caption: String((g as GalleryItem).caption ?? "") })),
  }
}

// Reads cases from the CMS (`/api/cases`); falls back to the hard-coded
// data/cases.ts when the table is empty or unreachable, so the page never breaks.
export function useWorksData(): { cases: CaseStudy[]; loading: boolean } {
  const [cases, setCases] = useState<CaseStudy[]>(FALLBACK_CASES)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetch("/api/cases", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : []))
      .then((rows: DbCase[]) => {
        if (cancelled) return
        if (Array.isArray(rows) && rows.length > 0) setCases(rows.map(mapRow))
        else setCases(FALLBACK_CASES)
      })
      .catch(() => {
        if (!cancelled) setCases(FALLBACK_CASES)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { cases, loading }
}

export { slugify }
export type { CaseStudy }
