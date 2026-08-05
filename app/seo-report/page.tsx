import type { Metadata } from "next"
import { getSupabaseAdmin } from "@/lib/supabase"
import { gscQuery, gscQueryEx, gscConfigured, type GscRow } from "@/lib/gsc"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export const metadata: Metadata = {
  title: "SEO 流量報表｜裕綸集團（內部）",
  robots: { index: false, follow: false },
}

const GOLD = "#B5956A"
const INK = "#2A2520"
const MUTE = "#8C8479"
const LINE = "#E4DED4"

const PATH_LABELS: Record<string, string> = {
  "/": "首頁",
  "/design": "空房子室內設計",
  "/construction": "裕綸室內裝修",
  "/works": "案例分享",
  "/blog": "裝修知識",
  "/booking": "預約諮詢",
  "/process": "合作流程",
  "/cafe": "同齊咖啡",
  "/privacy": "隱私權政策",
}
function labelFor(path: string): string {
  if (PATH_LABELS[path]) return PATH_LABELS[path]
  if (path.startsWith("/blog/")) return "文章：" + decodeURIComponent(path.replace("/blog/", ""))
  if (path.startsWith("/works/")) return "案例：" + decodeURIComponent(path.replace("/works/", ""))
  return path
}

const SOURCES = ["organic", "social", "referral", "direct", "internal"] as const
type Source = (typeof SOURCES)[number]
const SOURCE_LABELS: Record<Source, string> = {
  organic: "自然搜尋",
  social: "社群",
  referral: "外部連結",
  direct: "直接進站",
  internal: "站內",
}
const SOURCE_COLORS: Record<Source, string> = {
  organic: "#B5956A",
  social: "#E2A4AB",
  referral: "#8FA98C",
  direct: "#9C8FB0",
  internal: "#C7BEB1",
}

const tpeMonth = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Taipei", year: "numeric", month: "2-digit" })
const tpeDate = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Taipei", year: "numeric", month: "2-digit", day: "2-digit" })
const monthLabel = (ym: string) => {
  const [y, m] = ym.split("-")
  return `${y} 年 ${Number(m)} 月`
}
const fmtCtr = (ctr: number) => `${(ctr * 100).toFixed(1)}%`
const fmtPos = (p: number) => p.toFixed(1)

interface Row { created_at: string; path: string; source: string }

const SETUP_SQL = `create table if not exists page_views (
  id bigint generated always as identity primary key,
  path text not null,
  source text not null default 'direct',
  ref_host text,
  created_at timestamptz not null default now()
);
create index if not exists page_views_created_at_idx on page_views (created_at);
alter table page_views enable row level security;`

export default async function SeoReport({ searchParams }: { searchParams: Promise<{ k?: string }> }) {
  const { k } = await searchParams
  const required = process.env.SEO_REPORT_KEY
  if (required && k !== required) {
    return (
      <main style={{ minHeight: "100vh", background: "#FAF8F4", color: INK, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: MUTE, letterSpacing: "0.1em" }}>需要存取金鑰。請在網址加上 ?k=你的金鑰</p>
      </main>
    )
  }

  const supabase = getSupabaseAdmin()
  const since = new Date(Date.now() - 200 * 24 * 3600 * 1000).toISOString()
  const { data, error } = await supabase
    .from("page_views")
    .select("created_at, path, source")
    .gte("created_at", since)
    .order("created_at", { ascending: false })
    .limit(100000)

  const firstPartyMissing = !!error // 資料表尚未建立
  const rows = (data ?? []) as Row[]
  const nowMonth = tpeMonth.format(new Date())

  // 各月統計
  const byMonth = new Map<string, { total: number; src: Record<string, number>; pages: Map<string, Record<string, number>> }>()
  for (const r of rows) {
    const ym = tpeMonth.format(new Date(r.created_at))
    if (!byMonth.has(ym)) byMonth.set(ym, { total: 0, src: {}, pages: new Map() })
    const bucket = byMonth.get(ym)!
    bucket.total++
    bucket.src[r.source] = (bucket.src[r.source] ?? 0) + 1
    if (!bucket.pages.has(r.path)) bucket.pages.set(r.path, {})
    const p = bucket.pages.get(r.path)!
    p[r.source] = (p[r.source] ?? 0) + 1
  }

  const months = Array.from(byMonth.keys()).sort().reverse()
  const cur = byMonth.get(nowMonth) ?? { total: 0, src: {}, pages: new Map() }

  // 本月各頁面（依自然搜尋排序）
  const pageRows = Array.from(cur.pages.entries())
    .map(([path, s]) => ({
      path,
      organic: s.organic ?? 0,
      social: s.social ?? 0,
      referral: s.referral ?? 0,
      direct: s.direct ?? 0,
      internal: s.internal ?? 0,
      total: Object.values(s).reduce((a, b) => a + b, 0),
    }))
    .sort((a, b) => b.organic - a.organic || b.total - a.total)

  const curOrganic = cur.src.organic ?? 0
  const pct = (n: number, d: number) => (d > 0 ? Math.round((n / d) * 100) : 0)

  // ── Google Search Console（真實關鍵字級自然搜尋資料）──
  const gscOn = gscConfigured()
  const today = tpeDate.format(new Date())
  const monthStart = `${nowMonth}-01`
  const sixMonthsAgo = tpeDate.format(new Date(Date.now() - 183 * 24 * 3600 * 1000))
  let gscKeywords: GscRow[] | null = null
  let gscPages: GscRow[] | null = null
  let gscDaily: GscRow[] | null = null
  let gscError: string | null = null
  if (gscOn) {
    const kwRes = await gscQueryEx({ startDate: monthStart, endDate: today, dimensions: ["query"], rowLimit: 20 })
    gscKeywords = kwRes.rows
    gscError = kwRes.error
    if (gscKeywords) {
      ;[gscPages, gscDaily] = await Promise.all([
        gscQuery({ startDate: monthStart, endDate: today, dimensions: ["page"], rowLimit: 20 }),
        gscQuery({ startDate: sixMonthsAgo, endDate: today, dimensions: ["date"], rowLimit: 500 }),
      ])
    }
  }
  // 依月份彙整 GSC 每日資料
  const gscByMonth = new Map<string, { clicks: number; impressions: number }>()
  for (const r of gscDaily ?? []) {
    const ym = (r.keys[0] ?? "").slice(0, 7)
    if (!ym) continue
    const b = gscByMonth.get(ym) ?? { clicks: 0, impressions: 0 }
    b.clicks += r.clicks
    b.impressions += r.impressions
    gscByMonth.set(ym, b)
  }
  const gscMonths = Array.from(gscByMonth.keys()).sort().reverse().slice(0, 6)
  const gscPagePath = (u: string) => {
    try { return new URL(u).pathname } catch { return u }
  }

  return (
    <main style={{ minHeight: "100vh", background: "#FAF8F4", color: INK }}>
      <div className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-20">
        {/* Header */}
        <div className="mb-10 border-b pb-6" style={{ borderColor: LINE }}>
          <p className="mb-2 text-[0.8rem] tracking-[0.35em] uppercase" style={{ color: GOLD }}>SEO Traffic Report · 內部</p>
          <h1 style={{ fontFamily: "'Noto Sans TC', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 600, letterSpacing: "0.06em" }}>SEO 自然流量報表</h1>
          <p className="mt-3 text-[0.95rem] font-light" style={{ color: MUTE }}>
            本月（{monthLabel(nowMonth)}）即時統計 · 每次瀏覽自動記錄，本頁隨時更新
          </p>
        </div>

        {/* ══ Google Search Console：關鍵字級自然搜尋 ══ */}
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-[1.25rem] font-semibold" style={{ letterSpacing: "0.06em" }}>搜尋關鍵字（Google Search Console）</h2>
          <span className="text-[0.78rem]" style={{ color: "#B3AB9E" }}>{monthLabel(nowMonth)}</span>
        </div>

        {!gscOn ? (
          <div className="rounded-2xl bg-white p-6 text-[0.92rem] font-light leading-loose" style={{ color: "#6B5D4F", boxShadow: "0 20px 50px -35px rgba(42,37,32,0.3)" }}>
            尚未連結 Google Search Console。請在 Vercel 環境變數設定 <code style={{ color: GOLD }}>GSC_CLIENT_EMAIL</code>、<code style={{ color: GOLD }}>GSC_PRIVATE_KEY</code>、<code style={{ color: GOLD }}>GSC_SITE_URL</code>，並在 Search Console 將服務帳戶加為使用者後即可顯示。
          </div>
        ) : gscKeywords === null ? (
          <div className="rounded-2xl bg-white p-6 text-[0.92rem] font-light leading-loose" style={{ color: "#B5776A", boxShadow: "0 20px 50px -35px rgba(42,37,32,0.3)" }}>
            無法取得 GSC 資料。請確認：① 服務帳戶已加入 Search Console 使用者 ② <code>GSC_SITE_URL</code> 格式正確（<code>sc-domain:yulungroup.com</code> 或 <code>https://www.yulungroup.com/</code>）③ 金鑰正確。
            {gscError && (
              <pre className="mt-4 overflow-x-auto rounded-lg p-3 text-[0.75rem] leading-relaxed" style={{ background: "#F5EFE6", color: "#7A5C4E", whiteSpace: "pre-wrap" }}>診斷：{gscError}</pre>
            )}
          </div>
        ) : (
          <>
            {/* 熱門關鍵字 Top 20 */}
            <div className="overflow-x-auto rounded-2xl bg-white" style={{ boxShadow: "0 20px 50px -35px rgba(42,37,32,0.3)" }}>
              <table className="w-full border-collapse text-left" style={{ fontSize: "0.92rem" }}>
                <thead>
                  <tr style={{ color: MUTE, borderBottom: `1px solid ${LINE}` }}>
                    <th className="px-5 py-4 font-medium">搜尋關鍵字</th>
                    <th className="px-4 py-4 text-right font-medium" style={{ color: GOLD }}>點擊</th>
                    <th className="px-4 py-4 text-right font-medium">曝光</th>
                    <th className="px-4 py-4 text-right font-medium">CTR</th>
                    <th className="px-5 py-4 text-right font-medium">平均排名</th>
                  </tr>
                </thead>
                <tbody>
                  {gscKeywords.map((r) => (
                    <tr key={r.keys[0]} style={{ borderBottom: `1px solid ${LINE}` }}>
                      <td className="px-5 py-3.5" style={{ color: INK }}>{r.keys[0]}</td>
                      <td className="px-4 py-3.5 text-right" style={{ color: GOLD, fontWeight: 600 }}>{r.clicks}</td>
                      <td className="px-4 py-3.5 text-right" style={{ color: "#6B5D4F" }}>{r.impressions}</td>
                      <td className="px-4 py-3.5 text-right" style={{ color: "#6B5D4F" }}>{fmtCtr(r.ctr)}</td>
                      <td className="px-5 py-3.5 text-right" style={{ color: "#6B5D4F" }}>{fmtPos(r.position)}</td>
                    </tr>
                  ))}
                  {gscKeywords.length === 0 && (
                    <tr><td colSpan={5} className="px-5 py-8 text-center" style={{ color: MUTE }}>本月尚無搜尋資料（GSC 約有 2–3 天延遲）</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* 各頁面自然點擊 */}
            <h3 className="mb-3 mt-10 text-[1.05rem] font-semibold" style={{ letterSpacing: "0.06em" }}>各頁面自然搜尋點擊</h3>
            <div className="overflow-x-auto rounded-2xl bg-white" style={{ boxShadow: "0 20px 50px -35px rgba(42,37,32,0.3)" }}>
              <table className="w-full border-collapse text-left" style={{ fontSize: "0.92rem" }}>
                <thead>
                  <tr style={{ color: MUTE, borderBottom: `1px solid ${LINE}` }}>
                    <th className="px-5 py-4 font-medium">頁面</th>
                    <th className="px-4 py-4 text-right font-medium" style={{ color: GOLD }}>點擊</th>
                    <th className="px-4 py-4 text-right font-medium">曝光</th>
                    <th className="px-4 py-4 text-right font-medium">CTR</th>
                    <th className="px-5 py-4 text-right font-medium">平均排名</th>
                  </tr>
                </thead>
                <tbody>
                  {(gscPages ?? []).map((r) => (
                    <tr key={r.keys[0]} style={{ borderBottom: `1px solid ${LINE}` }}>
                      <td className="px-5 py-3.5" style={{ color: INK }}>
                        {labelFor(gscPagePath(r.keys[0]))}
                        <span className="ml-2 text-[0.75rem]" style={{ color: "#C0B8AB" }}>{gscPagePath(r.keys[0])}</span>
                      </td>
                      <td className="px-4 py-3.5 text-right" style={{ color: GOLD, fontWeight: 600 }}>{r.clicks}</td>
                      <td className="px-4 py-3.5 text-right" style={{ color: "#6B5D4F" }}>{r.impressions}</td>
                      <td className="px-4 py-3.5 text-right" style={{ color: "#6B5D4F" }}>{fmtCtr(r.ctr)}</td>
                      <td className="px-5 py-3.5 text-right" style={{ color: "#6B5D4F" }}>{fmtPos(r.position)}</td>
                    </tr>
                  ))}
                  {(gscPages ?? []).length === 0 && (
                    <tr><td colSpan={5} className="px-5 py-8 text-center" style={{ color: MUTE }}>本月尚無資料</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* 近 6 月搜尋趨勢 */}
            <h3 className="mb-3 mt-10 text-[1.05rem] font-semibold" style={{ letterSpacing: "0.06em" }}>近 6 個月搜尋趨勢</h3>
            <div className="overflow-x-auto rounded-2xl bg-white" style={{ boxShadow: "0 20px 50px -35px rgba(42,37,32,0.3)" }}>
              <table className="w-full border-collapse text-left" style={{ fontSize: "0.92rem" }}>
                <thead>
                  <tr style={{ color: MUTE, borderBottom: `1px solid ${LINE}` }}>
                    <th className="px-5 py-4 font-medium">月份</th>
                    <th className="px-4 py-4 text-right font-medium" style={{ color: GOLD }}>自然點擊</th>
                    <th className="px-4 py-4 text-right font-medium">曝光</th>
                    <th className="px-5 py-4 text-right font-medium">CTR</th>
                  </tr>
                </thead>
                <tbody>
                  {gscMonths.map((ym) => {
                    const b = gscByMonth.get(ym)!
                    return (
                      <tr key={ym} style={{ borderBottom: `1px solid ${LINE}` }}>
                        <td className="px-5 py-3.5" style={{ color: INK }}>{monthLabel(ym)}{ym === nowMonth && <span className="ml-2 text-[0.72rem]" style={{ color: GOLD }}>本月</span>}</td>
                        <td className="px-4 py-3.5 text-right" style={{ color: GOLD, fontWeight: 600 }}>{b.clicks}</td>
                        <td className="px-4 py-3.5 text-right" style={{ color: "#6B5D4F" }}>{b.impressions}</td>
                        <td className="px-5 py-3.5 text-right" style={{ color: "#6B5D4F" }}>{b.impressions > 0 ? ((b.clicks / b.impressions) * 100).toFixed(1) : "0.0"}%</td>
                      </tr>
                    )
                  })}
                  {gscMonths.length === 0 && (
                    <tr><td colSpan={4} className="px-5 py-8 text-center" style={{ color: MUTE }}>尚無資料</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        <div className="mt-14 mb-2 border-t pt-8" style={{ borderColor: LINE }}>
          <p className="text-[0.85rem]" style={{ color: MUTE }}>以下為網站第一方統計（含社群、直接、外部連結來源）</p>
        </div>

        {firstPartyMissing && (
          <div className="rounded-2xl bg-white p-6" style={{ boxShadow: "0 20px 50px -35px rgba(42,37,32,0.3)" }}>
            <p className="text-[0.92rem] font-light leading-loose" style={{ color: "#6B5D4F" }}>
              第一方統計尚未啟用。請在 Supabase → SQL Editor 執行以下指令建立資料表，之後每次瀏覽就會自動記錄：
            </p>
            <pre className="mt-4 overflow-x-auto rounded-xl p-4 text-[0.78rem] leading-relaxed" style={{ background: "#1A1510", color: "#EDE6DA" }}>{SETUP_SQL}</pre>
          </div>
        )}

        {/* 本月來源總覽 */}
        <h2 className="mb-4 text-[1.1rem] font-semibold" style={{ letterSpacing: "0.06em" }}>本月流量來源</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {SOURCES.map((s) => (
            <div key={s} className="rounded-2xl bg-white p-5" style={{ boxShadow: "0 20px 50px -35px rgba(42,37,32,0.3)" }}>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: SOURCE_COLORS[s] }} />
                <span className="text-[0.82rem]" style={{ color: MUTE }}>{SOURCE_LABELS[s]}</span>
              </div>
              <p className="mt-2" style={{ fontSize: "1.9rem", fontWeight: 700, color: INK }}>{cur.src[s] ?? 0}</p>
              <p className="text-[0.75rem]" style={{ color: "#B3AB9E" }}>{pct(cur.src[s] ?? 0, cur.total)}%</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[0.9rem]" style={{ color: MUTE }}>
          本月總瀏覽 <b style={{ color: INK }}>{cur.total}</b> 次，其中自然搜尋 <b style={{ color: GOLD }}>{curOrganic}</b> 次（{pct(curOrganic, cur.total)}%）。
        </p>

        {/* 本月各標籤（頁面）自然流量 */}
        <h2 className="mb-4 mt-14 text-[1.1rem] font-semibold" style={{ letterSpacing: "0.06em" }}>本月各頁面（標籤）流量</h2>
        <div className="overflow-x-auto rounded-2xl bg-white" style={{ boxShadow: "0 20px 50px -35px rgba(42,37,32,0.3)" }}>
          <table className="w-full border-collapse text-left" style={{ fontSize: "0.92rem" }}>
            <thead>
              <tr style={{ color: MUTE, borderBottom: `1px solid ${LINE}` }}>
                <th className="px-5 py-4 font-medium">頁面 / 標籤</th>
                <th className="px-4 py-4 text-right font-medium" style={{ color: GOLD }}>自然搜尋</th>
                <th className="px-4 py-4 text-right font-medium">社群</th>
                <th className="px-4 py-4 text-right font-medium">直接</th>
                <th className="px-4 py-4 text-right font-medium">外部</th>
                <th className="px-5 py-4 text-right font-medium">總計</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((p) => (
                <tr key={p.path} style={{ borderBottom: `1px solid ${LINE}` }}>
                  <td className="px-5 py-3.5" style={{ color: INK }}>
                    {labelFor(p.path)}
                    <span className="ml-2 text-[0.75rem]" style={{ color: "#C0B8AB" }}>{p.path}</span>
                  </td>
                  <td className="px-4 py-3.5 text-right" style={{ color: GOLD, fontWeight: 600 }}>{p.organic}</td>
                  <td className="px-4 py-3.5 text-right" style={{ color: "#6B5D4F" }}>{p.social}</td>
                  <td className="px-4 py-3.5 text-right" style={{ color: "#6B5D4F" }}>{p.direct}</td>
                  <td className="px-4 py-3.5 text-right" style={{ color: "#6B5D4F" }}>{p.referral}</td>
                  <td className="px-5 py-3.5 text-right" style={{ color: INK, fontWeight: 600 }}>{p.total}</td>
                </tr>
              ))}
              {pageRows.length === 0 && (
                <tr><td colSpan={6} className="px-5 py-8 text-center" style={{ color: MUTE }}>本月尚無資料</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 近 6 個月趨勢 */}
        <h2 className="mb-4 mt-14 text-[1.1rem] font-semibold" style={{ letterSpacing: "0.06em" }}>近 6 個月趨勢</h2>
        <div className="overflow-x-auto rounded-2xl bg-white" style={{ boxShadow: "0 20px 50px -35px rgba(42,37,32,0.3)" }}>
          <table className="w-full border-collapse text-left" style={{ fontSize: "0.92rem" }}>
            <thead>
              <tr style={{ color: MUTE, borderBottom: `1px solid ${LINE}` }}>
                <th className="px-5 py-4 font-medium">月份</th>
                <th className="px-4 py-4 text-right font-medium">總瀏覽</th>
                <th className="px-4 py-4 text-right font-medium" style={{ color: GOLD }}>自然搜尋</th>
                <th className="px-4 py-4 text-right font-medium">社群</th>
                <th className="px-5 py-4 text-right font-medium">自然佔比</th>
              </tr>
            </thead>
            <tbody>
              {months.slice(0, 6).map((ym) => {
                const b = byMonth.get(ym)!
                const org = b.src.organic ?? 0
                return (
                  <tr key={ym} style={{ borderBottom: `1px solid ${LINE}` }}>
                    <td className="px-5 py-3.5" style={{ color: INK }}>{monthLabel(ym)}{ym === nowMonth && <span className="ml-2 text-[0.72rem]" style={{ color: GOLD }}>本月</span>}</td>
                    <td className="px-4 py-3.5 text-right" style={{ color: INK }}>{b.total}</td>
                    <td className="px-4 py-3.5 text-right" style={{ color: GOLD, fontWeight: 600 }}>{org}</td>
                    <td className="px-4 py-3.5 text-right" style={{ color: "#6B5D4F" }}>{b.src.social ?? 0}</td>
                    <td className="px-5 py-3.5 text-right" style={{ color: "#6B5D4F" }}>{pct(org, b.total)}%</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-10 text-[0.82rem] font-light leading-loose" style={{ color: "#B3AB9E" }}>
          說明：來源以「本次工作階段進站的 referrer」歸因。自然搜尋＝來自 Google／Bing／Yahoo 等搜尋引擎。
          此為第一方統計，關鍵字層級的資料請搭配 Google Search Console。本頁不對外公開、不被搜尋引擎索引。
        </p>
      </div>
    </main>
  )
}
