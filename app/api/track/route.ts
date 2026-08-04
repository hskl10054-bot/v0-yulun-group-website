import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// 依 referrer 主機判斷來源類型
const SEARCH = ["google.", "bing.", "yahoo.", "duckduckgo.", "yandex.", "baidu.", "ecosia.", "brave.", "sogou.", "naver."]
const SOCIAL = ["facebook.", "fb.", "m.me", "instagram.", "l.instagram", "line.", "liff.line", "t.co", "twitter.", "x.com", "linkedin.", "youtube.", "pinterest.", "threads.", "tiktok."]

function classify(refHost: string): string {
  if (!refHost) return "direct"
  const h = refHost.toLowerCase()
  if (SEARCH.some((s) => h.includes(s))) return "organic"
  if (SOCIAL.some((s) => h.includes(s))) return "social"
  return "referral"
}

export async function POST(req: Request) {
  try {
    const { path, ref } = await req.json()
    if (!path || typeof path !== "string") return NextResponse.json({ ok: false })
    // 不記錄後台與報表頁本身
    if (path.startsWith("/admin") || path.startsWith("/seo-report") || path.startsWith("/api")) {
      return NextResponse.json({ ok: true })
    }
    let refHost = ""
    try { refHost = ref ? new URL(ref).hostname : "" } catch { /* ignore */ }
    // 自家網域的內部跳轉不計為外部來源
    const isInternal = refHost.includes("yulungroup.com") || refHost.includes("localhost")
    const source = isInternal ? "internal" : classify(refHost)

    const supabase = getSupabaseAdmin()
    await supabase.from("page_views").insert({ path: path.slice(0, 300), source, ref_host: refHost ? refHost.slice(0, 200) : null })
    return NextResponse.json({ ok: true })
  } catch {
    // 表格未建立或任何錯誤都靜默略過，不影響前台
    return NextResponse.json({ ok: false })
  }
}
