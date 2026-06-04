import { getSupabaseAdmin } from "@/lib/supabase"
import { CASES as FALLBACK_CASES, slugify, type CaseStudy, type GalleryItem } from "@/data/cases"

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

interface DbCase {
  cat: string; zh_name: string; en_name: string; tagline: string; hero: string
  meta: unknown; story: string; problem: string; solution: string
  highlights: unknown; gallery: unknown
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

// Server-side cases read for SSR pages. Falls back to data/cases.ts when the
// `cases` table is empty or unreachable (e.g. env/DB not configured at build).
export async function getCasesServer(): Promise<CaseStudy[]> {
  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase.from("cases").select("*").order("sort_order")
    if (error || !data || data.length === 0) return FALLBACK_CASES
    return (data as DbCase[]).map(mapRow)
  } catch {
    return FALLBACK_CASES
  }
}

export async function getCaseBySlugServer(slug: string): Promise<CaseStudy | undefined> {
  const cases = await getCasesServer()
  return cases.find((c) => slugify(c.enName) === slug)
}
