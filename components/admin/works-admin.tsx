"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { Plus, Trash2, Upload, Loader2, ChevronUp, ChevronDown, Save } from "lucide-react"

const RESIDENTIAL = "住宅設計"
const COMMERCIAL = "商業空間"

interface GalleryItem { src: string; caption: string }
interface EditCase {
  id: number
  sort_order: number
  cat: string
  zh_name: string
  en_name: string
  tagline: string
  hero: string
  meta: string[]
  story: string
  problem: string
  solution: string
  highlights: string[]
  gallery: GalleryItem[]
}

const arr = (v: unknown): unknown[] => (Array.isArray(v) ? v : [])

function normalize(row: Record<string, unknown>): EditCase {
  return {
    id: Number(row.id),
    sort_order: Number(row.sort_order ?? 0),
    cat: String(row.cat ?? RESIDENTIAL),
    zh_name: String(row.zh_name ?? ""),
    en_name: String(row.en_name ?? ""),
    tagline: String(row.tagline ?? ""),
    hero: String(row.hero ?? ""),
    meta: arr(row.meta).map(String),
    story: String(row.story ?? ""),
    problem: String(row.problem ?? ""),
    solution: String(row.solution ?? ""),
    highlights: arr(row.highlights).map(String),
    gallery: arr(row.gallery)
      .filter((g): g is GalleryItem => !!g && typeof g === "object")
      .map((g) => ({ src: String((g as GalleryItem).src ?? ""), caption: String((g as GalleryItem).caption ?? "") })),
  }
}

async function uploadImage(file: File): Promise<string> {
  const fd = new FormData()
  fd.append("file", file)
  const res = await fetch("/api/cases/upload", { method: "POST", body: fd })
  if (!res.ok) {
    const b = await res.json().catch(() => ({}))
    throw new Error(b.error || `上傳失敗 ${res.status}`)
  }
  return (await res.json()).url as string
}

// ─── small inputs ───────────────────────────────────────────────
function Label({ children }: { children: ReactNode }) {
  return <label className="mb-1 block text-xs font-medium text-gray-500">{children}</label>
}
function Text({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-300"
    />
  )
}
function Area({ value, onChange, rows = 4 }: { value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <textarea
      value={value}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm leading-relaxed focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-300"
    />
  )
}

function ImagePicker({ url, onUpload, aspect = "aspect-[16/10]" }: { url: string; onUpload: (u: string) => void; aspect?: string }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  return (
    <div className="flex items-center gap-3">
      <div className={`relative ${aspect} w-32 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50`}>
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-[11px] text-gray-300">無圖片</div>
        )}
      </div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 disabled:opacity-50"
      >
        {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
        {url ? "更換圖片" : "上傳圖片"}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={async (e) => {
          const f = e.target.files?.[0]
          if (!f) return
          setBusy(true)
          try {
            onUpload(await uploadImage(f))
          } catch (err) {
            alert(err instanceof Error ? err.message : "上傳失敗")
          } finally {
            setBusy(false)
            e.target.value = ""
          }
        }}
      />
    </div>
  )
}

function StringList({ items, onChange, placeholder }: { items: string[]; onChange: (v: string[]) => void; placeholder: string }) {
  return (
    <div className="space-y-2">
      {items.map((it, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            value={it}
            onChange={(e) => onChange(items.map((x, j) => (j === i ? e.target.value : x)))}
            placeholder={placeholder}
            className="w-full rounded-md border border-gray-200 px-3 py-1.5 text-sm focus:border-amber-400 focus:outline-none"
          />
          <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))} className="rounded p-1 text-gray-300 hover:text-red-500">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...items, ""])} className="inline-flex items-center gap-1 text-xs text-amber-700 hover:text-amber-800">
        <Plus className="h-3.5 w-3.5" /> 新增一項
      </button>
    </div>
  )
}

function GalleryEditor({ items, onChange }: { items: GalleryItem[]; onChange: (v: GalleryItem[]) => void }) {
  const set = (i: number, patch: Partial<GalleryItem>) => onChange(items.map((g, j) => (j === i ? { ...g, ...patch } : g)))
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir
    if (j < 0 || j >= items.length) return
    const next = [...items]
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
  }
  return (
    <div className="space-y-3">
      {items.map((g, i) => (
        <div key={i} className="rounded-lg border border-gray-100 bg-gray-50/60 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-medium text-gray-400">照片 {i + 1}{i === 0 ? "（清單第一張＝大圖）" : ""}</span>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => move(i, -1)} className="rounded p-1 text-gray-300 hover:text-gray-600"><ChevronUp className="h-4 w-4" /></button>
              <button type="button" onClick={() => move(i, 1)} className="rounded p-1 text-gray-300 hover:text-gray-600"><ChevronDown className="h-4 w-4" /></button>
              <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))} className="rounded p-1 text-gray-300 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
          <ImagePicker url={g.src} onUpload={(u) => set(i, { src: u })} aspect="aspect-[4/3]" />
          <div className="mt-2">
            <Label>照片說明</Label>
            <Text value={g.caption} onChange={(v) => set(i, { caption: v })} />
          </div>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...items, { src: "", caption: "" }])} className="inline-flex items-center gap-1 text-xs text-amber-700 hover:text-amber-800">
        <Plus className="h-3.5 w-3.5" /> 新增照片
      </button>
    </div>
  )
}

// ─── main ───────────────────────────────────────────────────────
export function WorksAdmin() {
  const [cases, setCases] = useState<EditCase[]>([])
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState<number | null>(null)
  const [dirty, setDirty] = useState<Set<number>>(new Set())
  const [openId, setOpenId] = useState<number | null>(null)
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null)
  const [needsTable, setNeedsTable] = useState(false)

  const flash = (text: string, ok = true) => {
    setMsg({ text, ok })
    setTimeout(() => setMsg(null), 3500)
  }

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/cases", { cache: "no-store" })
      if (!res.ok) {
        // table likely missing
        setNeedsTable(true)
        setCases([])
        return
      }
      const rows = await res.json()
      setNeedsTable(false)
      setCases(Array.isArray(rows) ? rows.map(normalize) : [])
    } catch {
      setNeedsTable(true)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => { load() }, [])

  const markDirty = (id: number) => setDirty((s) => new Set(s).add(id))
  const patch = (id: number, p: Partial<EditCase>) => {
    setCases((cs) => cs.map((c) => (c.id === id ? { ...c, ...p } : c)))
    markDirty(id)
  }

  const save = async (c: EditCase) => {
    setSavingId(c.id)
    try {
      const res = await fetch("/api/cases", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(c),
      })
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "儲存失敗")
      setDirty((s) => { const n = new Set(s); n.delete(c.id); return n })
      flash(`已儲存「${c.zh_name || c.en_name}」`)
    } catch (e) {
      flash(e instanceof Error ? e.message : "儲存失敗", false)
    } finally {
      setSavingId(null)
    }
  }

  const addCase = async () => {
    const maxOrder = cases.reduce((m, c) => Math.max(m, c.sort_order), 0)
    try {
      const res = await fetch("/api/cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sort_order: maxOrder + 1, cat: RESIDENTIAL, zh_name: "新案例", en_name: `New Case ${maxOrder + 1}` }),
      })
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "新增失敗")
      const row = normalize(await res.json())
      setCases((cs) => [...cs, row])
      setOpenId(row.id)
      flash("已新增空白案例，請填寫並儲存")
    } catch (e) {
      flash(e instanceof Error ? e.message : "新增失敗", false)
    }
  }

  const removeCase = async (c: EditCase) => {
    if (!confirm(`確定刪除「${c.zh_name || c.en_name}」？此動作無法復原。`)) return
    try {
      const res = await fetch(`/api/cases?id=${c.id}`, { method: "DELETE" })
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "刪除失敗")
      setCases((cs) => cs.filter((x) => x.id !== c.id))
      flash("已刪除")
    } catch (e) {
      flash(e instanceof Error ? e.message : "刪除失敗", false)
    }
  }

  const reorder = async (c: EditCase, dir: -1 | 1) => {
    const sorted = [...cases].sort((a, b) => a.sort_order - b.sort_order)
    const idx = sorted.findIndex((x) => x.id === c.id)
    const j = idx + dir
    if (j < 0 || j >= sorted.length) return
    const a = sorted[idx], b = sorted[j]
    const ao = a.sort_order, bo = b.sort_order
    setCases((cs) => cs.map((x) => (x.id === a.id ? { ...x, sort_order: bo } : x.id === b.id ? { ...x, sort_order: ao } : x)))
    try {
      await Promise.all([
        fetch("/api/cases", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: a.id, sort_order: bo }) }),
        fetch("/api/cases", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: b.id, sort_order: ao }) }),
      ])
    } catch {
      flash("排序儲存失敗，請重新整理", false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center py-24 text-gray-400"><Loader2 className="mr-2 h-5 w-5 animate-spin" />載入案例中…</div>
  }

  if (needsTable) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800">
        <p className="mb-2 font-semibold">尚未建立「案例」資料表</p>
        <p className="leading-relaxed">
          請先到 Supabase → SQL Editor，貼上專案裡 <code className="rounded bg-amber-100 px-1">scripts/cases-table.sql</code> 的內容並執行一次（會建立資料表並匯入現有 15 筆案例）。完成後按下面「重新載入」。
        </p>
        <button onClick={load} className="mt-4 rounded-md bg-amber-700 px-4 py-2 text-xs font-medium text-white hover:bg-amber-800">重新載入</button>
      </div>
    )
  }

  const sorted = [...cases].sort((a, b) => a.sort_order - b.sort_order)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-800">案例作品</h2>
          <p className="text-xs text-gray-400">共 {cases.length} 筆。每筆改完請按該案的「儲存」。</p>
        </div>
        <button onClick={addCase} className="inline-flex items-center gap-1.5 rounded-lg bg-amber-700 px-4 py-2 text-sm font-medium text-white hover:bg-amber-800">
          <Plus className="h-4 w-4" /> 新增案例
        </button>
      </div>

      {msg && (
        <div className={`rounded-lg px-4 py-2 text-sm ${msg.ok ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{msg.text}</div>
      )}

      {sorted.map((c, idx) => {
        const open = openId === c.id
        const isDirty = dirty.has(c.id)
        return (
          <div key={c.id} className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="flex flex-col">
                <button onClick={() => reorder(c, -1)} disabled={idx === 0} className="text-gray-300 hover:text-gray-600 disabled:opacity-30"><ChevronUp className="h-4 w-4" /></button>
                <button onClick={() => reorder(c, 1)} disabled={idx === sorted.length - 1} className="text-gray-300 hover:text-gray-600 disabled:opacity-30"><ChevronDown className="h-4 w-4" /></button>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.hero} alt="" className="h-12 w-16 shrink-0 rounded object-cover bg-gray-100" />
              <button onClick={() => setOpenId(open ? null : c.id)} className="flex-1 text-left">
                <div className="text-sm font-medium text-gray-800">{c.zh_name || "（未命名）"} <span className="ml-1 text-xs font-normal text-gray-400">{c.en_name}</span></div>
                <div className="text-[11px] text-gray-400">{c.cat}・{c.gallery.length} 張相片</div>
              </button>
              {isDirty && <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] text-amber-700">未儲存</span>}
              <button onClick={() => save(c)} disabled={savingId === c.id} className="inline-flex items-center gap-1 rounded-md bg-amber-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-amber-800 disabled:opacity-50">
                {savingId === c.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />} 儲存
              </button>
              <button onClick={() => removeCase(c)} className="rounded-md p-1.5 text-gray-300 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
            </div>

            {open && (
              <div className="space-y-5 border-t border-gray-100 p-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>分類</Label>
                    <select value={c.cat} onChange={(e) => patch(c.id, { cat: e.target.value })} className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none">
                      <option value={RESIDENTIAL}>{RESIDENTIAL}</option>
                      <option value={COMMERCIAL}>{COMMERCIAL}</option>
                    </select>
                  </div>
                  <div>
                    <Label>排序值（小的在前）</Label>
                    <Text value={String(c.sort_order)} onChange={(v) => patch(c.id, { sort_order: Number(v) || 0 })} />
                  </div>
                  <div>
                    <Label>中文名</Label>
                    <Text value={c.zh_name} onChange={(v) => patch(c.id, { zh_name: v })} />
                  </div>
                  <div>
                    <Label>英文名（決定網址，請用英文、每筆不重複）</Label>
                    <Text value={c.en_name} onChange={(v) => patch(c.id, { en_name: v })} />
                  </div>
                </div>

                <div>
                  <Label>標語</Label>
                  <Text value={c.tagline} onChange={(v) => patch(c.id, { tagline: v })} />
                </div>

                <div>
                  <Label>標籤（地點、風格…）</Label>
                  <StringList items={c.meta} onChange={(v) => patch(c.id, { meta: v })} placeholder="例：台中・沙鹿" />
                </div>

                <div>
                  <Label>主視覺（封面大圖）</Label>
                  <ImagePicker url={c.hero} onUpload={(u) => patch(c.id, { hero: u })} />
                </div>

                <div>
                  <Label>使用者的故事</Label>
                  <Area value={c.story} onChange={(v) => patch(c.id, { story: v })} />
                </div>
                <div>
                  <Label>原本的難題</Label>
                  <Area value={c.problem} onChange={(v) => patch(c.id, { problem: v })} />
                </div>
                <div>
                  <Label>我們的解法</Label>
                  <Area value={c.solution} onChange={(v) => patch(c.id, { solution: v })} rows={6} />
                </div>

                <div>
                  <Label>亮點（條列）</Label>
                  <StringList items={c.highlights} onChange={(v) => patch(c.id, { highlights: v })} placeholder="一句話亮點" />
                </div>

                <div>
                  <Label>完工實景相簿（第一張會當作大圖）</Label>
                  <GalleryEditor items={c.gallery} onChange={(v) => patch(c.id, { gallery: v })} />
                </div>

                <div className="flex justify-end border-t border-gray-100 pt-4">
                  <button onClick={() => save(c)} disabled={savingId === c.id} className="inline-flex items-center gap-1.5 rounded-lg bg-amber-700 px-5 py-2 text-sm font-medium text-white hover:bg-amber-800 disabled:opacity-50">
                    {savingId === c.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} 儲存這個案例
                  </button>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
