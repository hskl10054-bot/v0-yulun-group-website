"use client"

import { useState, useEffect, useRef, useCallback, type ChangeEvent, type DragEvent } from "react"
import {
  Home, Paintbrush, Hammer, Coffee,
  Save, Plus, Trash2, Upload, X, Check,
  ImageIcon, ChevronRight, Eye, Loader2, RefreshCw,
  Type, ChevronDown, Palette
} from "lucide-react"

import { getDefaultContentFont, getDefaultListFont } from "@/lib/default-fonts"
import { DEFAULT_COLORS } from "@/lib/default-colors"

// ─── Default List Items Per Page (pre-fill from current site) ────
type DefaultListItem = { title: string; subtitle: string; description: string; extra: string }
const DEFAULT_LIST_ITEMS: Record<string, Record<string, DefaultListItem[]>> = {
  home: {
    brand_cards: [
      { title: "空房子室內設計", subtitle: "Interior Design", description: "為你的空間注入魔法 — 空房開門，幸福進門。透過細膩的動線規劃與美學比例，將居住者的情感與性格注入每一寸留白。", extra: "/design" },
      { title: "裕綸室內裝修", subtitle: "Construction Engineering", description: "匠心傳承，穩健工程，構築世代安居。標準化 SOP 工程管理，讓美學建立在穩固且安全的結構之上。", extra: "/construction" },
    ],
    strengths: [
      { title: "自有工班", subtitle: "", description: "擁有專屬施工團隊，確保品質與進度全程掌控，減少外包風險。", extra: "" },
      { title: "專業執照", subtitle: "", description: "持有政府核定之室內裝修專業技術人員證照，合法合規、安心保障。", extra: "" },
      { title: "透明報價", subtitle: "", description: "逐項清單式報價，無隱藏費用，讓每一分預算都花在刀口上。", extra: "" },
    ],
    portfolio: [
      { title: "同齊咖吡 西區精忠店", subtitle: "2025", description: "", extra: "" },
      { title: "壹偲OnlyEase酵素保健茶飲", subtitle: "2025", description: "", extra: "" },
      { title: "勝麗交響曲", subtitle: "2025", description: "", extra: "" },
      { title: "清水聯馥悅", subtitle: "2024", description: "", extra: "" },
      { title: "居家住宅室內設計", subtitle: "2025", description: "", extra: "" },
    ],
    testimonials: [
      { title: "陳先生", subtitle: "全室設計+施工・台中西屯", description: "從設計到施工一條龍，省去了我很多協調的麻煩，完工後品質遠超預期。", extra: "" },
      { title: "林太太", subtitle: "三代同堂住宅・台中北區", description: "設計師非常有耐心，把我們家人不同的需求都融合在同一個空間裡，太厲害了。", extra: "" },
      { title: "張老闆", subtitle: "辦公室裝修・台中南區", description: "報價透明、工期準時，完全沒有追加費用的情況，這在業界真的很難得。", extra: "" },
    ],
  },
  design: {
    services: [
      { title: "預售屋客變規劃", subtitle: "01", description: "在交屋前即進行格局調整與建材升級規劃，提前為理想生活做好準備，省時省預算。", extra: "" },
      { title: "居家住宅室內設計", subtitle: "02", description: "從平面配置、立面設計到材料挑選，以人為本的空間美學，為每個家注入獨特靈魂。", extra: "" },
      { title: "老屋翻新空間重整", subtitle: "03", description: "保留空間記憶的同時，注入現代設計語彙。舊屋新生，讓老房子重新散發獨特魅力。", extra: "" },
      { title: "商業空間美學配置", subtitle: "04", description: "咖啡廳、辦公室、品牌門市等商業空間，以品牌精神為核心，設計吸引人且具功能性的環境。", extra: "" },
      { title: "軟裝設計與風格諮詢", subtitle: "05", description: "家具挑選、燈光配置、藝術品與植栽搭配，用軟裝語彙讓硬體設計更有生命力。", extra: "" },
    ],
    portfolio: [
      { title: "現代簡約｜光感餐廚", subtitle: "", description: "", extra: "" },
      { title: "暖色侘寂｜圓弧玄關", subtitle: "", description: "", extra: "" },
      { title: "輕奢現代｜石紋客餐廳", subtitle: "", description: "", extra: "" },
      { title: "極簡北歐｜純白入戶", subtitle: "", description: "", extra: "" },
      { title: "日式和風｜日光臥榻", subtitle: "", description: "", extra: "" },
    ],
    testimonials: [
      { title: "李小姐", subtitle: "台中北區・三房兩廳・2024", description: "從第一次諮詢到完工，整個過程都讓我感受到設計師對細節的堅持。現在每天回到家都像是回到一個懂我的地方。", extra: "" },
      { title: "黃先生", subtitle: "台中西區・老屋翻新・2023", description: "我只是說了幾個關鍵字，設計師就把我腦海裡模糊的想像變成了真實的空間。太神奇了。", extra: "" },
      { title: "吳老闆", subtitle: "台中南區・商業空間・2023", description: "咖啡廳開幕後不斷有客人說空間很有質感，生意比預期好很多。設計真的是最值得投資的事。", extra: "" },
    ],
  },
  construction: {
    services: [
      { title: "拆除與結構加強工程", subtitle: "01", description: "安全拆除既有隔間與裝修，並依需求進行結構補強，為新設計奠定穩固基礎。", extra: "" },
      { title: "專業水電系統配置", subtitle: "02", description: "專業水電技師負責管線配置、插座規劃、衛浴設備安裝，符合建築法規與安全標準。", extra: "" },
      { title: "高標準防水隔音工程", subtitle: "03", description: "採用高規格防水工法與隔音材料，確保居住品質與空間結構的長期耐久。", extra: "" },
      { title: "木作與細部木裝工程", subtitle: "04", description: "系統櫃、天花板、木地板等木作項目，材料嚴選、工法精準，打造精緻的空間細節。", extra: "" },
      { title: "系統家具安裝與整合", subtitle: "05", description: "系統櫃體與家具的精準安裝，整合空間機能與美學，提供完整的收納解決方案。", extra: "" },
    ],
    strengths: [
      { title: "自有工班", subtitle: "", description: "不外包，全程自有專業工班施工，品質與進度完全掌控在自己手中。", extra: "" },
      { title: "合法執照", subtitle: "", description: "持有政府核定室內裝修專業技術人員證照，合法合規施工，保障屋主權益。", extra: "" },
      { title: "透明報價", subtitle: "", description: "逐項清單報價，無隱藏費用，每一分預算清清楚楚，讓你花得安心。", extra: "" },
    ],
    portfolio: [
      { title: "精準裁切，構築空間", subtitle: "全室裝修・2025", description: "", extra: "" },
      { title: "設計落地：現場監工", subtitle: "商業空間・2025", description: "", extra: "" },
      { title: "泥作整平，空間基石", subtitle: "舊屋翻新・2025", description: "", extra: "" },
      { title: "專業電工紀實", subtitle: "局部工程・2024", description: "", extra: "" },
      { title: "嚴謹的高空作業", subtitle: "全室裝修・2025", description: "", extra: "" },
    ],
    testimonials: [
      { title: "黃先生", subtitle: "全室裝修・台中北區・2024", description: "工班師傅很專業，每天收工前都會清理現場，整個工程過程完全不用擔心。", extra: "" },
      { title: "蔡太太", subtitle: "老屋翻新・台中西屯・2023", description: "報價單寫得很詳細，哪個項目多少錢一清二楚，完工後完全沒有追加費用。", extra: "" },
      { title: "林先生", subtitle: "商業空間・台中南區・2023", description: "工程進度比預期還快，品質也很好。監工人員很負責，有問題馬上回應。", extra: "" },
    ],
  },
  cafe: {},
}

// ─── Brand Color Palette ─────────────────────────────────────────
const BRAND_PALETTE = [
  { value: "#2F2F2F", label: "深炭灰", group: "主色" },
  { value: "#2A2520", label: "深棕黑", group: "主色" },
  { value: "#1A1510", label: "極深棕", group: "主色" },
  { value: "#6B4E31", label: "暖胡桃", group: "強調色" },
  { value: "#8A7A68", label: "煙灰棕", group: "強調色" },
  { value: "#B5956A", label: "金沙色", group: "強調色" },
  { value: "#8C8479", label: "石灰色", group: "輔助色" },
  { value: "#6B6B6B", label: "中灰色", group: "輔助色" },
  { value: "#D4C5B2", label: "淺駝色", group: "輔助色" },
  { value: "#FAFAF8", label: "暖白色", group: "背景色" },
  { value: "#F5F0E8", label: "淺米色", group: "背景色" },
  { value: "#F0EBE3", label: "亞麻色", group: "背景色" },
  { value: "#E8E3DA", label: "淺沙色", group: "背景色" },
  { value: "#E5E0DB", label: "淺灰棕", group: "背景色" },
  { value: "#FFFFFF", label: "純白色", group: "背景色" },
  { value: "#D8D0C8", label: "霧灰色", group: "邊框色" },
  { value: "#BFB09A", label: "奶茶色", group: "特殊色" },
  { value: "#000000", label: "純黑色", group: "特殊色" },
]

function ColorPicker({ value, onChange, label }: {
  value: string; onChange: (v: string) => void; label: string
}) {
  const [open, setOpen] = useState(false)
  const current = value || ""
  const groups = [...new Set(BRAND_PALETTE.map((c) => c.group))]

  return (
    <div className="space-y-1.5">
      <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-wider">{label}</label>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 hover:border-gray-300 transition-colors"
        >
          <div
            className="w-5 h-5 rounded border border-gray-200 shrink-0"
            style={{ background: current || "linear-gradient(135deg, #fff 45%, #e5e5e5 45%, #e5e5e5 55%, #fff 55%)" }}
          />
          <span>{current || "預設"}</span>
          <ChevronDown className={`h-3 w-3 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {current && (
          <button onClick={() => onChange("")} className="text-[10px] text-gray-400 hover:text-red-500 transition-colors">清除</button>
        )}
      </div>
      {open && (
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-lg space-y-3">
          {groups.map((group) => (
            <div key={group}>
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1.5">{group}</p>
              <div className="flex flex-wrap gap-1.5">
                {BRAND_PALETTE.filter((c) => c.group === group).map((c) => (
                  <button
                    key={c.value}
                    onClick={() => { onChange(c.value); setOpen(false) }}
                    className={`group/swatch relative w-8 h-8 rounded-lg border-2 transition-all hover:scale-110 ${
                      current === c.value ? "border-amber-500 ring-2 ring-amber-200" : "border-gray-200 hover:border-gray-400"
                    }`}
                    style={{ background: c.value }}
                    title={`${c.label} (${c.value})`}
                  >
                    {current === c.value && (
                      <Check className={`absolute inset-0 m-auto h-3.5 w-3.5 ${
                        ["#FFFFFF", "#FAFAF8", "#F5F0E8", "#F0EBE3", "#E8E3DA", "#E5E0DB", "#D8D0C8", "#D4C5B2"].includes(c.value)
                          ? "text-gray-600" : "text-white"
                      }`} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {/* Custom color input */}
          <div className="border-t border-gray-100 pt-3">
            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1.5">自訂色碼</p>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={current || "#FFFFFF"}
                onChange={(e) => onChange(e.target.value)}
                className="w-8 h-8 rounded border border-gray-200 cursor-pointer"
              />
              <input
                type="text"
                value={current}
                onChange={(e) => onChange(e.target.value)}
                placeholder="#RRGGBB"
                className="flex-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-700 outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Types ───────────────────────────────────────────────────────
interface ContentRow {
  id?: number; page: string; section: string; key: string; value: string
}
interface ListItem {
  id?: number; page: string; section: string; sort_order: number
  title: string; subtitle: string; description: string; extra: string
}
interface ImageRow {
  id?: number; page: string; section: string; url: string; alt: string; sort_order: number
}
type PageKey = "home" | "design" | "construction" | "cafe"
type ToastType = "success" | "error"

// ─── API helpers ─────────────────────────────────────────────────
async function api<T>(url: string, opts?: RequestInit): Promise<T> {
  const res = await fetch(url, opts)
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `API error ${res.status}`)
  }
  return res.json()
}

// ─── Sub-Components ──────────────────────────────────────────────

const ASPECT_RATIOS = [
  { value: "", label: "原始比例" },
  { value: "1/1", label: "1:1 正方形" },
  { value: "4/3", label: "4:3" },
  { value: "3/2", label: "3:2" },
  { value: "16/9", label: "16:9 寬螢幕" },
  { value: "21/9", label: "21:9 超寬" },
  { value: "3/4", label: "3:4 直式" },
  { value: "2/3", label: "2:3 直式" },
  { value: "9/16", label: "9:16 直式" },
]

const OBJECT_FITS = [
  { value: "cover", label: "填滿裁切 (Cover)" },
  { value: "contain", label: "完整顯示 (Contain)" },
  { value: "fill", label: "拉伸填滿 (Fill)" },
  { value: "none", label: "原始尺寸 (None)" },
]

const OBJECT_POSITIONS = [
  { value: "center", label: "置中" },
  { value: "top", label: "靠上" },
  { value: "bottom", label: "靠下" },
  { value: "left", label: "靠左" },
  { value: "right", label: "靠右" },
  { value: "top left", label: "左上" },
  { value: "top right", label: "右上" },
  { value: "bottom left", label: "左下" },
  { value: "bottom right", label: "右下" },
]

function ImageUploader({ currentImage, onUpload, page, section, sortOrder, label,
  aspectRatio, objectFit, objectPosition, onAspectRatioChange, onObjectFitChange, onObjectPositionChange
}: {
  currentImage: string; onUpload: (url: string) => void
  page: string; section: string; sortOrder: number; label?: string
  aspectRatio?: string; objectFit?: string; objectPosition?: string
  onAspectRatioChange?: (v: string) => void; onObjectFitChange?: (v: string) => void; onObjectPositionChange?: (v: string) => void
}) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(currentImage)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => { setPreview(currentImage) }, [currentImage])

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) return
    const localUrl = URL.createObjectURL(file)
    setPreview(localUrl)
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append("file", file)
      fd.append("page", page)
      fd.append("section", section)
      fd.append("sort_order", String(sortOrder))
      fd.append("alt", "")
      const result = await api<{ url: string }>("/api/upload", { method: "POST", body: fd })
      setPreview(result.url)
      onUpload(result.url)
    } catch {
      setPreview(currentImage)
    } finally {
      setUploading(false)
    }
  }, [page, section, sortOrder, currentImage, onUpload])

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault(); setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [handleFile])

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }, [handleFile])

  const hasImage = !!preview
  const hasSettings = onAspectRatioChange && onObjectFitChange && onObjectPositionChange
  const activeRatio = aspectRatio || ""
  const activeFit = objectFit || "cover"
  const activePos = objectPosition || "center"
  const hasCustomSettings = activeRatio || activeFit !== "cover" || activePos !== "center"

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center gap-2">
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</label>
          {hasImage ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-600">
              <Check className="h-3 w-3" /> 已上傳
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-medium text-red-500">
              <X className="h-3 w-3" /> 尚未上傳
            </span>
          )}
        </div>
      )}
      <div
        className={`relative border-2 border-dashed rounded-xl transition-colors cursor-pointer overflow-hidden ${
          dragOver ? "border-amber-500 bg-amber-50" : hasImage ? "border-emerald-200 hover:border-emerald-300" : "border-red-200 hover:border-red-300 bg-red-50/30"
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
      >
        {uploading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-white/80">
            <Loader2 className="h-6 w-6 animate-spin text-amber-600" />
            <span className="ml-2 text-sm text-amber-700">上傳中...</span>
          </div>
        )}
        {preview ? (
          <div className="relative group">
            {/* Full image preview */}
            <div className="bg-[#f5f5f5] p-2">
              <img
                src={preview}
                alt="Preview"
                className="w-full rounded-lg"
                style={{ maxHeight: "400px", objectFit: "contain" }}
              />
            </div>
            {/* Simulated display preview */}
            {hasCustomSettings && (
              <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">前台顯示預覽</p>
                <div className="bg-[#e8e3da] rounded-lg overflow-hidden mx-auto" style={{ maxWidth: "100%", aspectRatio: activeRatio || "auto", maxHeight: "200px" }}>
                  <img
                    src={preview}
                    alt="Display preview"
                    className="w-full h-full rounded-lg"
                    style={{
                      objectFit: (activeFit as React.CSSProperties["objectFit"]) || "cover",
                      objectPosition: activePos || "center",
                      aspectRatio: activeRatio || "auto",
                      maxHeight: "200px",
                    }}
                  />
                </div>
              </div>
            )}
            {/* Image info bar */}
            <div className="flex items-center justify-between bg-white px-4 py-2.5 border-t border-gray-100">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <ImageIcon className="h-3.5 w-3.5" />
                <span className="truncate max-w-[200px]">{preview.startsWith("http") ? new URL(preview).pathname.split("/").pop() : preview.split("/").pop()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">點擊更換</span>
                <Upload className="h-3.5 w-3.5 text-gray-400" />
              </div>
            </div>
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-3">
              <div className="bg-white/90 rounded-lg px-4 py-2.5 flex items-center gap-2 shadow-lg">
                <Upload className="h-4 w-4 text-amber-700" />
                <span className="text-sm font-medium text-amber-700">更換圖片</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <ImageIcon className="h-8 w-8 text-red-400" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">此區塊尚未設定圖片</p>
              <p className="text-xs text-gray-400 mt-1">拖拉圖片到此處，或點擊上傳</p>
              <p className="text-[10px] text-gray-300 mt-0.5">支援 JPG, PNG, WebP｜上傳至 Cloudinary</p>
            </div>
          </div>
        )}
      </div>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />

      {/* Display settings panel */}
      {hasImage && hasSettings && (
        <div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs transition-colors ${
              hasCustomSettings ? "bg-amber-50 text-amber-700" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
            }`}
          >
            <ImageIcon className="h-3.5 w-3.5" />
            <span>顯示設定</span>
            {hasCustomSettings && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
            <ChevronDown className={`h-3 w-3 transition-transform ${showSettings ? "rotate-180" : ""}`} />
          </button>
          {showSettings && (
            <div className="mt-2 p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-wider">顯示比例</label>
                  <select value={activeRatio} onChange={(e) => onAspectRatioChange(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-2.5 py-2 text-xs text-gray-700 outline-none focus:border-amber-400">
                    {ASPECT_RATIOS.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-wider">填充模式</label>
                  <select value={activeFit} onChange={(e) => onObjectFitChange(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-2.5 py-2 text-xs text-gray-700 outline-none focus:border-amber-400">
                    {OBJECT_FITS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-wider">對齊位置</label>
                  <select value={activePos} onChange={(e) => onObjectPositionChange(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-2.5 py-2 text-xs text-gray-700 outline-none focus:border-amber-400">
                    {OBJECT_POSITIONS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
                  </select>
                </div>
              </div>
              <p className="text-[10px] text-gray-400 leading-relaxed">
                <strong>填滿裁切</strong>：圖片填滿區域，超出部分裁切。
                <strong>完整顯示</strong>：完整顯示圖片，可能有留白。
                <strong>對齊位置</strong>：裁切時保留的焦點位置。
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function HeroCarouselEditor({ images, onUpload, onDelete, page }: {
  images: ImageRow[]
  onUpload: () => void
  onDelete: (id: number) => void
  page: string
}) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) return
    setUploading(true)
    try {
      const nextSortOrder = images.length > 0
        ? Math.max(...images.map((img) => img.sort_order)) + 1
        : 1
      const fd = new FormData()
      fd.append("file", file)
      fd.append("page", page)
      fd.append("section", "hero")
      fd.append("sort_order", String(nextSortOrder))
      fd.append("alt", "")
      await api<{ url: string }>("/api/upload", { method: "POST", body: fd })
      onUpload()
    } catch {
      // Upload failed
    } finally {
      setUploading(false)
    }
  }, [images, page, onUpload])

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    if (e.target) e.target.value = ""
  }, [handleFile])

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [handleFile])

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">
          輪播背景圖片（{images.length} 張）
        </label>
        {images.length > 1 && (
          <span className="text-[10px] text-gray-400">自動輪播間隔 5 秒</span>
        )}
      </div>

      {/* Existing images grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {images.map((img, idx) => (
            <div key={img.id} className="group relative rounded-xl border border-gray-200 overflow-hidden bg-gray-50">
              <div className="relative aspect-video">
                <img src={img.url} alt={img.alt || `Hero ${idx + 1}`} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 rounded-md bg-black/60 px-2 py-0.5 text-[10px] text-white font-medium">
                  {idx + 1} / {images.length}
                </div>
                <button
                  onClick={() => { if (img.id) onDelete(img.id) }}
                  className="absolute top-2 right-2 rounded-md bg-red-500/80 p-1.5 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  title="刪除此圖片"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 text-xs text-gray-500">
                <ImageIcon className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{img.url.startsWith("http") ? new URL(img.url).pathname.split("/").pop() : img.url.split("/").pop()}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add new image */}
      <div
        className={`border-2 border-dashed rounded-xl transition-colors cursor-pointer ${
          uploading ? "border-amber-300 bg-amber-50/50" : "border-gray-200 hover:border-amber-300 hover:bg-amber-50/30"
        }`}
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {uploading ? (
          <div className="flex items-center justify-center py-8 gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-amber-600" />
            <span className="text-sm text-amber-700">上傳中...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              <Plus className="h-5 w-5 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500">新增輪播圖片</p>
            <p className="text-[10px] text-gray-300">拖拉圖片到此處，或點擊上傳 — JPG, PNG, WebP</p>
          </div>
        )}
      </div>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
    </div>
  )
}

function Toast({ message, type, onClose }: { message: string; type: ToastType; onClose: () => void }) {
  const bg = type === "success" ? "bg-emerald-600" : "bg-red-600"
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 ${bg} text-white pl-4 pr-3 py-3 rounded-lg shadow-xl animate-slide-up`}>
      {type === "success" ? <Check className="h-5 w-5 shrink-0" /> : <X className="h-5 w-5 shrink-0" />}
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 hover:bg-white/20 rounded p-1 transition-colors">
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────────

const pageNav: { key: PageKey; label: string; icon: typeof Home }[] = [
  { key: "home", label: "首頁", icon: Home },
  { key: "design", label: "空房子設計", icon: Paintbrush },
  { key: "construction", label: "裕綸裝修", icon: Hammer },
  { key: "cafe", label: "同齊咖啡", icon: Coffee },
]

export default function AdminPage() {
  const [activePage, setActivePage] = useState<PageKey>("home")
  const [content, setContent] = useState<ContentRow[]>([])
  const [listItems, setListItems] = useState<ListItem[]>([])
  const [images, setImages] = useState<ImageRow[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Track local changes
  const [dirtyContent, setDirtyContent] = useState<ContentRow[]>([])
  const [dirtyListItems, setDirtyListItems] = useState<Map<number | string, Partial<ListItem>>>(new Map())
  const [newListItems, setNewListItems] = useState<ListItem[]>([])
  const [deletedListItemIds, setDeletedListItemIds] = useState<number[]>([])

  const showToast = (message: string, type: ToastType = "success") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  // ─── Fetch Data ──────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [c, l, i] = await Promise.all([
        api<ContentRow[]>(`/api/content?page=${activePage}`),
        api<ListItem[]>(`/api/list-items?page=${activePage}`),
        api<ImageRow[]>(`/api/images?page=${activePage}`),
      ])
      setContent(c)
      setListItems(l)
      setImages(i)
      setDirtyContent([])
      setDirtyListItems(new Map())
      setNewListItems([])
      setDeletedListItemIds([])
    } catch (e) {
      showToast(`載入失敗：${e instanceof Error ? e.message : "未知錯誤"}`, "error")
    } finally {
      setLoading(false)
    }
  }, [activePage])

  useEffect(() => { fetchData() }, [fetchData])

  // Auto-populate default list items for sections that have no DB items
  useEffect(() => {
    if (loading) return
    const pageDefaults = DEFAULT_LIST_ITEMS[activePage]
    if (!pageDefaults) return
    const itemsToAdd: ListItem[] = []
    for (const [section, defaults] of Object.entries(pageDefaults)) {
      const hasDbItems = listItems.some((li) => li.page === activePage && li.section === section)
      const hasNewItems = newListItems.some((li) => li.page === activePage && li.section === section)
      if (!hasDbItems && !hasNewItems && defaults.length > 0) {
        defaults.forEach((d, i) => {
          itemsToAdd.push({
            page: activePage,
            section,
            sort_order: i + 1,
            title: d.title,
            subtitle: d.subtitle,
            description: d.description,
            extra: d.extra,
          })
        })
      }
    }
    if (itemsToAdd.length > 0) {
      setNewListItems((prev) => [...prev, ...itemsToAdd])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, activePage])

  // ─── Content Helpers ─────────────────────────────────────────
  const getContent = (section: string, key: string): string => {
    // Check dirty first
    const dirty = dirtyContent.find((c) => c.section === section && c.key === key)
    if (dirty) return dirty.value
    const row = content.find((c) => c.page === activePage && c.section === section && c.key === key)
    if (row?.value) return row.value
    // Fallback to default colors for color section
    if (section === "colors") {
      return DEFAULT_COLORS[activePage]?.[key] || ""
    }
    // Fallback to default fonts for font style keys
    if (key.endsWith("_font_size") || key.endsWith("_font_family")) {
      const prop = key.endsWith("_font_size") ? "fontSize" : "fontFamily"
      // Content field fonts: section="hero", key="title_font_size"
      const fieldKey = key.replace(/_font_size$/, "").replace(/_font_family$/, "")
      // Check if this is a list item style: section="services_styles", key="item_1_title_font_size"
      if (section.endsWith("_styles")) {
        const sectionKey = section.replace(/_styles$/, "")
        const match = fieldKey.match(/^item_\d+_(.+)$/)
        if (match) {
          const field = match[1]
          const defaults = getDefaultListFont(activePage, sectionKey, field)
          return defaults[prop] || ""
        }
      } else {
        const defaults = getDefaultContentFont(activePage, section, fieldKey)
        return defaults[prop] || ""
      }
    }
    return ""
  }

  const setContentValue = (section: string, key: string, value: string) => {
    setDirtyContent((prev) => {
      const existing = prev.findIndex((c) => c.section === section && c.key === key)
      const row: ContentRow = { page: activePage, section, key, value }
      if (existing >= 0) {
        const next = [...prev]
        next[existing] = row
        return next
      }
      return [...prev, row]
    })
  }

  // ─── List Item Helpers ───────────────────────────────────────
  const getListItems = (section: string): ListItem[] => {
    const fromDb = listItems
      .filter((li) => li.page === activePage && li.section === section && !deletedListItemIds.includes(li.id!))
      .map((li) => {
        const dirty = dirtyListItems.get(li.id!)
        return dirty ? { ...li, ...dirty } : li
      })
    const fromNew = newListItems.filter((li) => li.page === activePage && li.section === section)
    return [...fromDb, ...fromNew].sort((a, b) => a.sort_order - b.sort_order)
  }

  const updateListItemField = (item: ListItem, field: keyof ListItem, value: string) => {
    if (item.id && item.id > 0) {
      // Existing DB item
      setDirtyListItems((prev) => {
        const next = new Map(prev)
        const existing = next.get(item.id!) || {}
        next.set(item.id!, { ...existing, [field]: value })
        return next
      })
    } else {
      // New item (not yet in DB)
      setNewListItems((prev) =>
        prev.map((li) =>
          li === item || (li.page === item.page && li.section === item.section && li.sort_order === item.sort_order && !li.id)
            ? { ...li, [field]: value }
            : li
        )
      )
    }
  }

  const addNewListItem = (section: string, template: Partial<ListItem>) => {
    const existing = getListItems(section)
    const maxOrder = existing.reduce((max, li) => Math.max(max, li.sort_order), 0)
    setNewListItems((prev) => [
      ...prev,
      {
        page: activePage,
        section,
        sort_order: maxOrder + 1,
        title: "",
        subtitle: "",
        description: "",
        extra: "",
        ...template,
      } as ListItem,
    ])
  }

  const deleteListItem = (item: ListItem) => {
    if (item.id && item.id > 0) {
      setDeletedListItemIds((prev) => [...prev, item.id!])
    } else {
      setNewListItems((prev) => prev.filter((li) => li !== item))
    }
  }

  // ─── Get Image URL ───────────────────────────────────────────
  const getImageUrl = (section: string, sortOrder: number = 1): string => {
    const img = images.find((i) => i.page === activePage && i.section === section && i.sort_order === sortOrder)
    return img?.url || ""
  }

  const getImagesBySection = (section: string): ImageRow[] => {
    return images.filter((i) => i.page === activePage && i.section === section).sort((a, b) => a.sort_order - b.sort_order)
  }

  // Helper to generate image display setting props for ImageUploader
  const imageDisplayProps = (section: string, sortOrder: number = 1) => ({
    aspectRatio: getContent(`${section}_img`, `${sortOrder}_aspect_ratio`),
    objectFit: getContent(`${section}_img`, `${sortOrder}_object_fit`),
    objectPosition: getContent(`${section}_img`, `${sortOrder}_object_position`),
    onAspectRatioChange: (v: string) => setContentValue(`${section}_img`, `${sortOrder}_aspect_ratio`, v),
    onObjectFitChange: (v: string) => setContentValue(`${section}_img`, `${sortOrder}_object_fit`, v),
    onObjectPositionChange: (v: string) => setContentValue(`${section}_img`, `${sortOrder}_object_position`, v),
  })

  // ─── Save All Changes ───────────────────────────────────────
  const handleSave = async () => {
    setSaving(true)
    try {
      const promises: Promise<unknown>[] = []

      // Save dirty content
      if (dirtyContent.length > 0) {
        promises.push(
          api("/api/content", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: dirtyContent }),
          })
        )
      }

      // Save dirty list items (updates)
      for (const [id, updates] of dirtyListItems) {
        promises.push(
          api("/api/list-items", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, ...updates }),
          })
        )
      }

      // Save new list items
      for (const item of newListItems) {
        promises.push(
          api("/api/list-items", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
          })
        )
      }

      // Delete list items
      for (const id of deletedListItemIds) {
        promises.push(api(`/api/list-items?id=${id}`, { method: "DELETE" }))
      }

      await Promise.all(promises)
      showToast("儲存成功！內容已更新至資料庫。")
      // Refresh data
      await fetchData()
    } catch (e) {
      showToast(`儲存失敗：${e instanceof Error ? e.message : "未知錯誤"}`, "error")
    } finally {
      setSaving(false)
    }
  }

  const hasDirtyChanges = dirtyContent.length > 0 || dirtyListItems.size > 0 || newListItems.length > 0 || deletedListItemIds.length > 0

  // ─── Render Helpers ──────────────────────────────────────────

  const renderContentFields = (section: string, fields: { key: string; label: string; type?: "text" | "textarea"; withStyle?: boolean }[]) => (
    <>
      {fields.map((f) => {
        const styleProps = f.withStyle !== false ? {
          fontSize: getContent(section, `${f.key}_font_size`),
          fontFamily: getContent(section, `${f.key}_font_family`),
          onFontSizeChange: (v: string) => setContentValue(section, `${f.key}_font_size`, v),
          onFontFamilyChange: (v: string) => setContentValue(section, `${f.key}_font_family`, v),
        } : {}
        return f.type === "textarea" ? (
          <TextArea key={f.key} label={f.label} value={getContent(section, f.key)} onChange={(v) => setContentValue(section, f.key, v)} {...styleProps} />
        ) : (
          <Field key={f.key} label={f.label} value={getContent(section, f.key)} onChange={(v) => setContentValue(section, f.key, v)} {...styleProps} />
        )
      })}
    </>
  )

  // Style helpers for list items — stored in page_content as "{sectionKey}_styles" section
  const getListItemStyle = (sectionKey: string, sortOrder: number, field: string, prop: string): string => {
    return getContent(`${sectionKey}_styles`, `item_${sortOrder}_${field}_${prop}`)
  }
  const setListItemStyle = (sectionKey: string, sortOrder: number, field: string, prop: string, value: string) => {
    setContentValue(`${sectionKey}_styles`, `item_${sortOrder}_${field}_${prop}`, value)
  }

  const renderListSection = (
    sectionKey: string,
    title: string,
    subtitle: string,
    fields: { field: keyof ListItem; label: string; type?: "text" | "textarea"; span?: string; withStyle?: boolean }[],
    addLabel: string,
    addTemplate?: Partial<ListItem>,
    options?: { withImage?: boolean; imageSection?: string },
  ) => {
    const items = getListItems(sectionKey)
    const imgSection = options?.imageSection || sectionKey
    return (
      <Section title={title} subtitle={subtitle}>
        {items.map((item, idx) => {
          const renderField = (f: typeof fields[0]) => {
            const styleProps = f.withStyle !== false ? {
              fontSize: getListItemStyle(sectionKey, item.sort_order, f.field as string, "font_size"),
              fontFamily: getListItemStyle(sectionKey, item.sort_order, f.field as string, "font_family"),
              onFontSizeChange: (v: string) => setListItemStyle(sectionKey, item.sort_order, f.field as string, "font_size", v),
              onFontFamilyChange: (v: string) => setListItemStyle(sectionKey, item.sort_order, f.field as string, "font_family", v),
            } : {}
            return f.type === "textarea" ? (
              <TextArea key={f.field} label={f.label} value={(item[f.field] as string) || ""} onChange={(v) => updateListItemField(item, f.field, v)} {...styleProps} />
            ) : (
              <Field key={f.field} label={f.label} value={(item[f.field] as string) || ""} onChange={(v) => updateListItemField(item, f.field, v)} {...styleProps} />
            )
          }
          return (
            <Card key={item.id || `new-${idx}`} onDelete={() => deleteListItem(item)}>
              {fields.length > 1 && fields.some((f) => f.span) ? (
                <div className="grid gap-4" style={{
                  gridTemplateColumns: fields.filter((f) => f.span).map((f) => f.span === "short" ? "80px" : "1fr").join(" ")
                }}>
                  {fields.filter((f) => f.span).map(renderField)}
                </div>
              ) : null}
              {fields.filter((f) => !f.span).map(renderField)}
              {options?.withImage && (
                <ImageUploader
                  label="圖片"
                  currentImage={getImageUrl(imgSection, item.sort_order)}
                  onUpload={() => fetchData()}
                  page={activePage}
                  section={imgSection}
                  sortOrder={item.sort_order}
                  {...imageDisplayProps(imgSection, item.sort_order)}
                />
              )}
            </Card>
          )
        })}
        <AddButton label={addLabel} onClick={() => addNewListItem(sectionKey, addTemplate || {})} />
      </Section>
    )
  }

  // ─── Color Settings Renderer ─────────────────────────────────
  const renderColorSection = (sections: { key: string; label: string; fields: { key: string; label: string }[] }[]) => (
    <ColorSection sections={sections} getContent={getContent} setContentValue={setContentValue} />
  )

  // Color field definitions per page
  const colorFields = {
    bg: { key: "bg", label: "背景色" },
    text: { key: "text", label: "文字色" },
    heading: { key: "heading", label: "標題色" },
    accent: { key: "accent", label: "強調色" },
    border: { key: "border", label: "邊框色" },
    subtitle: { key: "subtitle_color", label: "副標題色" },
    card_bg: { key: "card_bg", label: "卡片背景" },
    card_border: { key: "card_border", label: "卡片邊框" },
    btn_bg: { key: "btn_bg", label: "按鈕背景" },
    btn_text: { key: "btn_text", label: "按鈕文字" },
    overlay: { key: "overlay", label: "遮罩色" },
    icon: { key: "icon", label: "圖示色" },
  }

  // ─── Page Renderers ──────────────────────────────────────────

  const renderHomePage = () => (
    <div className="space-y-10">
      {renderColorSection([
        { key: "hero", label: "首頁橫幅 Hero", fields: [colorFields.bg, colorFields.heading, colorFields.text, colorFields.accent, colorFields.overlay] },
        { key: "brands", label: "品牌卡片 Brand Cards", fields: [colorFields.overlay, colorFields.heading, colorFields.text, colorFields.accent] },
        { key: "strengths", label: "集團實力 Strengths", fields: [colorFields.bg, colorFields.heading, colorFields.text, colorFields.accent, colorFields.card_bg, colorFields.card_border, colorFields.icon] },
        { key: "portfolio", label: "精選作品 Portfolio", fields: [colorFields.bg, colorFields.heading, colorFields.accent] },
        { key: "testimonials", label: "客戶評語 Testimonials", fields: [colorFields.bg, colorFields.heading, colorFields.text, colorFields.card_border, colorFields.accent] },
        { key: "contact", label: "聯絡資訊 Contact", fields: [colorFields.bg, colorFields.heading, colorFields.text, colorFields.accent, colorFields.btn_bg, colorFields.btn_text] },
        { key: "footer", label: "頁尾 Footer", fields: [colorFields.bg, colorFields.text, colorFields.accent] },
      ])}

      <Section title="首頁橫幅" subtitle="Hero Section">
        {renderContentFields("hero", [
          { key: "subtitle", label: "副標題（英文）" },
          { key: "title", label: "主標題" },
          { key: "slogan", label: "標語", type: "textarea" },
        ])}
        <HeroCarouselEditor
          images={getImagesBySection("hero")}
          onUpload={() => fetchData()}
          onDelete={async (id) => {
            try {
              await api(`/api/upload?id=${id}`, { method: "DELETE" })
              showToast("圖片已刪除")
              await fetchData()
            } catch (e) {
              showToast(`刪除失敗：${e instanceof Error ? e.message : "未知錯誤"}`, "error")
            }
          }}
          page="home"
        />
      </Section>

      {renderListSection("brand_cards", "品牌卡片", "Brand Cards", [
        { field: "title", label: "品牌名稱" },
        { field: "subtitle", label: "英文副標題" },
        { field: "description", label: "品牌描述", type: "textarea" },
        { field: "extra", label: "連結路徑" },
      ], "新增品牌卡片")}

      {/* Brand Card Images */}
      <Section title="品牌卡片圖片" subtitle="Brand Card Images">
        <ImageUploader label="空房子設計 — 卡片圖片" currentImage={getImageUrl("brand_design")} onUpload={() => fetchData()} page="home" section="brand_design" sortOrder={1} {...imageDisplayProps("brand_design")} />
        <ImageUploader label="裕綸裝修 — 卡片圖片" currentImage={getImageUrl("brand_construction")} onUpload={() => fetchData()} page="home" section="brand_construction" sortOrder={1} {...imageDisplayProps("brand_construction")} />
      </Section>

      {renderListSection("strengths", "集團實力", "Strengths", [
        { field: "title", label: "標題" },
        { field: "description", label: "描述", type: "textarea" },
      ], "新增實力項目")}

      {renderListSection("portfolio", "精選作品", "Portfolio", [
        { field: "title", label: "作品名稱" },
        { field: "subtitle", label: "年份" },
      ], "新增作品", undefined, { withImage: true })}

      {renderListSection("testimonials", "客戶評語", "Testimonials", [
        { field: "title", label: "客戶名稱" },
        { field: "subtitle", label: "附加資訊" },
        { field: "description", label: "評語內容", type: "textarea" },
      ], "新增評語")}

      <Section title="聯絡資訊" subtitle="Contact">
        {renderContentFields("contact", [
          { key: "address", label: "地址" },
          { key: "phone", label: "電話" },
          { key: "email", label: "Email" },
          { key: "hours", label: "營業時間" },
        ])}
      </Section>
    </div>
  )

  const renderDesignPage = () => (
    <div className="space-y-10">
      {renderColorSection([
        { key: "hero", label: "首頁橫幅 Hero", fields: [colorFields.bg, colorFields.heading, colorFields.text, colorFields.accent] },
        { key: "about", label: "關於我們 About", fields: [colorFields.bg, colorFields.heading, colorFields.text, colorFields.accent] },
        { key: "services", label: "服務項目 Services", fields: [colorFields.bg, colorFields.heading, colorFields.text, colorFields.accent, colorFields.card_border] },
        { key: "portfolio", label: "精選作品 Portfolio", fields: [colorFields.bg, colorFields.heading, colorFields.accent, colorFields.overlay] },
        { key: "testimonials", label: "客戶評語 Testimonials", fields: [colorFields.bg, colorFields.heading, colorFields.text, colorFields.card_border, colorFields.accent] },
        { key: "contact", label: "聯絡區域 Contact", fields: [colorFields.bg, colorFields.heading, colorFields.text, colorFields.accent, colorFields.btn_bg, colorFields.btn_text] },
        { key: "footer", label: "頁尾 Footer", fields: [colorFields.bg, colorFields.text] },
      ])}
      <Section title="首頁橫幅" subtitle="Hero">
        {renderContentFields("hero", [
          { key: "en_subtitle", label: "英文副標題" },
          { key: "title", label: "主標題" },
          { key: "title_italic", label: "斜體標題" },
          { key: "description", label: "說明文字", type: "textarea" },
        ])}
        <ImageUploader label="Hero 圖片" currentImage={getImageUrl("hero")} onUpload={() => fetchData()} page="design" section="hero" sortOrder={1} {...imageDisplayProps("hero")} />
      </Section>

      <Section title="關於我們" subtitle="About">
        {renderContentFields("about", [
          { key: "quote", label: "引言" },
          { key: "description", label: "描述", type: "textarea" },
        ])}
        <div className="grid grid-cols-3 gap-4">
          {[
            { numKey: "projects", labelKey: "projects_label", label: "完成案例" },
            { numKey: "years", labelKey: "years_label", label: "品牌經驗" },
            { numKey: "satisfaction", labelKey: "satisfaction_label", label: "滿意度" },
          ].map((stat) => (
            <div key={stat.numKey} className="space-y-2 rounded-lg border border-gray-100 p-3">
              <Field label="數字" value={getContent("stats", stat.numKey)} onChange={(v) => setContentValue("stats", stat.numKey, v)} />
              <Field label="標籤" value={getContent("stats", stat.labelKey)} onChange={(v) => setContentValue("stats", stat.labelKey, v)} />
            </div>
          ))}
        </div>
      </Section>

      {renderListSection("services", "服務項目", "Services", [
        { field: "subtitle", label: "編號", span: "short" },
        { field: "title", label: "服務名稱" },
        { field: "description", label: "描述", type: "textarea" },
      ], "新增服務")}

      {renderListSection("portfolio", "精選作品", "Portfolio", [
        { field: "title", label: "作品名稱" },
      ], "新增作品", undefined, { withImage: true })}

      {renderListSection("testimonials", "客戶評語", "Testimonials", [
        { field: "title", label: "客戶名稱" },
        { field: "subtitle", label: "附加資訊" },
        { field: "description", label: "評語內容", type: "textarea" },
      ], "新增評語")}

      <Section title="聯絡資訊" subtitle="Contact">
        {renderContentFields("contact", [
          { key: "address", label: "地址" },
          { key: "phone", label: "電話" },
          { key: "email", label: "Email" },
          { key: "hours", label: "營業時間" },
        ])}
      </Section>
    </div>
  )

  const renderConstructionPage = () => (
    <div className="space-y-10">
      {renderColorSection([
        { key: "hero", label: "首頁橫幅 Hero", fields: [colorFields.bg, colorFields.heading, colorFields.text, colorFields.accent] },
        { key: "strengths", label: "優勢 Strengths", fields: [colorFields.bg, colorFields.heading, colorFields.text, colorFields.card_bg, colorFields.card_border, colorFields.icon] },
        { key: "services", label: "服務項目 Services", fields: [colorFields.bg, colorFields.heading, colorFields.text, colorFields.accent, colorFields.card_border] },
        { key: "portfolio", label: "施工案例 Projects", fields: [colorFields.bg, colorFields.heading, colorFields.accent, colorFields.overlay] },
        { key: "testimonials", label: "客戶評語 Testimonials", fields: [colorFields.bg, colorFields.heading, colorFields.text, colorFields.card_border, colorFields.accent] },
        { key: "contact", label: "聯絡區域 Contact", fields: [colorFields.bg, colorFields.heading, colorFields.text, colorFields.accent, colorFields.btn_bg, colorFields.btn_text] },
        { key: "footer", label: "頁尾 Footer", fields: [colorFields.bg, colorFields.text] },
      ])}

      <Section title="首頁橫幅" subtitle="Hero">
        {renderContentFields("hero", [
          { key: "en_subtitle", label: "英文副標題" },
          { key: "title", label: "主標題第一行" },
          { key: "title_line2", label: "主標題第二行" },
          { key: "title_line3", label: "主標題第三行" },
          { key: "description", label: "說明文字", type: "textarea" },
        ])}
        <ImageUploader label="Hero 圖片" currentImage={getImageUrl("hero")} onUpload={() => fetchData()} page="construction" section="hero" sortOrder={1} {...imageDisplayProps("hero")} />
      </Section>

      {renderListSection("strengths", "我們的優勢", "Strengths", [
        { field: "title", label: "標題" },
        { field: "description", label: "描述", type: "textarea" },
      ], "新增優勢")}

      {renderListSection("services", "服務項目", "Services", [
        { field: "subtitle", label: "編號", span: "short" },
        { field: "title", label: "服務名稱" },
        { field: "description", label: "描述", type: "textarea" },
      ], "新增服務")}

      {renderListSection("portfolio", "施工案例", "Projects", [
        { field: "title", label: "案例名稱" },
        { field: "subtitle", label: "案例類型" },
      ], "新增案例", undefined, { withImage: true })}

      {renderListSection("testimonials", "客戶評語", "Testimonials", [
        { field: "title", label: "客戶名稱" },
        { field: "subtitle", label: "附加資訊" },
        { field: "description", label: "評語內容", type: "textarea" },
      ], "新增評語")}

      <Section title="聯絡資訊" subtitle="Contact">
        {renderContentFields("contact", [
          { key: "address", label: "地址" },
          { key: "phone", label: "電話" },
          { key: "email", label: "Email" },
          { key: "hours", label: "營業時間" },
        ])}
      </Section>
    </div>
  )

  const renderCafePage = () => (
    <div className="space-y-10">
      {renderColorSection([
        { key: "hero", label: "首頁橫幅 Hero", fields: [colorFields.bg, colorFields.heading, colorFields.text, colorFields.accent] },
        { key: "features", label: "品牌特色 Features", fields: [colorFields.bg, colorFields.heading, colorFields.text, colorFields.card_bg, colorFields.card_border, colorFields.icon] },
        { key: "stores", label: "門市資訊 Stores", fields: [colorFields.bg, colorFields.heading, colorFields.text, colorFields.accent, colorFields.card_border] },
        { key: "footer", label: "頁尾 Footer", fields: [colorFields.bg, colorFields.text] },
      ])}

      <Section title="首頁橫幅" subtitle="Hero">
        {renderContentFields("hero", [
          { key: "en_subtitle", label: "英文副標題" },
          { key: "title", label: "主標題" },
          { key: "title_italic", label: "斜體標題" },
          { key: "description", label: "說明文字", type: "textarea" },
        ])}
        <ImageUploader label="Hero 圖片" currentImage={getImageUrl("hero")} onUpload={() => fetchData()} page="cafe" section="hero" sortOrder={1} {...imageDisplayProps("hero")} />
      </Section>

      {renderListSection("features", "品牌特色", "Features", [
        { field: "title", label: "標題" },
        { field: "description", label: "描述", type: "textarea" },
      ], "新增特色")}

      {renderListSection("stores", "門市資訊", "Stores", [
        { field: "title", label: "店名" },
        { field: "description", label: "地址" },
      ], "新增門市")}

      <Section title="營業時間" subtitle="Hours">
        {renderContentFields("hours", [
          { key: "display", label: "營業時間" },
        ])}
      </Section>
    </div>
  )

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-32">
          <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
          <span className="ml-3 text-gray-500">載入中...</span>
        </div>
      )
    }
    switch (activePage) {
      case "home": return renderHomePage()
      case "design": return renderDesignPage()
      case "construction": return renderConstructionPage()
      case "cafe": return renderCafePage()
    }
  }

  const currentPageLabel = pageNav.find((p) => p.key === activePage)?.label || ""

  return (
    <div className="flex h-screen bg-gray-50">
      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
      `}</style>

      {/* Sidebar */}
      <aside className={`flex flex-col border-r border-gray-200 bg-white transition-all duration-300 ${sidebarCollapsed ? "w-16" : "w-64"}`}>
        <div className="flex h-16 items-center justify-between border-b border-gray-100 px-4">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-700 text-white text-xs font-bold">裕</div>
              <span className="text-sm font-semibold text-gray-800 tracking-wide">裕綸 CMS</span>
            </div>
          )}
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
            <ChevronRight className={`h-4 w-4 transition-transform ${sidebarCollapsed ? "" : "rotate-180"}`} />
          </button>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {!sidebarCollapsed && <p className="mb-2 px-3 text-[10px] font-medium uppercase tracking-widest text-gray-400">頁面管理</p>}
          {pageNav.map((page) => {
            const Icon = page.icon
            const active = activePage === page.key
            return (
              <button key={page.key} onClick={() => setActivePage(page.key)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${active ? "bg-amber-50 text-amber-800 font-medium" : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"}`}
                title={sidebarCollapsed ? page.label : undefined}
              >
                <Icon className={`h-[18px] w-[18px] shrink-0 ${active ? "text-amber-700" : ""}`} />
                {!sidebarCollapsed && <span>{page.label}</span>}
              </button>
            )
          })}
        </nav>
        <div className="border-t border-gray-100 p-3">
          <a href="/" target="_blank" className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors" title={sidebarCollapsed ? "預覽網站" : undefined}>
            <Eye className="h-[18px] w-[18px] shrink-0" />
            {!sidebarCollapsed && <span>預覽網站</span>}
          </a>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-8">
          <div>
            <h1 className="text-lg font-semibold text-gray-800">{currentPageLabel}</h1>
            <p className="text-xs text-gray-400">編輯頁面內容</p>
          </div>
          <div className="flex items-center gap-3">
            {hasDirtyChanges && (
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs text-amber-700 font-medium">
                有未儲存的變更
              </span>
            )}
            <button onClick={fetchData} className="rounded-lg border border-gray-200 p-2 text-gray-400 hover:text-gray-600 transition-colors" title="重新載入">
              <RefreshCw className="h-4 w-4" />
            </button>
            <button onClick={handleSave} disabled={saving}
              className="flex items-center gap-2 rounded-lg bg-amber-700 px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-amber-800 disabled:opacity-60"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {saving ? "儲存中..." : "儲存變更"}
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="mx-auto max-w-3xl">
            {renderContent()}
          </div>
        </div>
      </main>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}

// ─── Shared UI Components ────────────────────────────────────────

function Section({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 px-6 py-4">
        <h2 className="text-base font-semibold text-gray-800">{title}</h2>
        <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
      </div>
      <div className="space-y-5 p-6">{children}</div>
    </div>
  )
}

function Card({ children, onDelete }: { children: React.ReactNode; onDelete: () => void }) {
  return (
    <div className="group relative rounded-lg border border-gray-100 bg-gray-50/50 p-5 space-y-4 transition-colors hover:border-gray-200">
      <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={onDelete} className="rounded p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors" title="刪除">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      {children}
    </div>
  )
}

const FONT_FAMILIES = [
  { value: "", label: "預設" },
  { value: "'Noto Sans TC', sans-serif", label: "Noto Sans TC" },
  { value: "'Noto Serif TC', serif", label: "Noto Serif TC" },
  { value: "'Cormorant Garamond', serif", label: "Cormorant Garamond" },
  { value: "'Josefin Sans', sans-serif", label: "Josefin Sans" },
  { value: "system-ui, sans-serif", label: "System UI" },
  { value: "'Georgia', serif", label: "Georgia" },
  { value: "'Arial', sans-serif", label: "Arial" },
]

const FONT_SIZES = [
  { value: "", label: "預設" },
  { value: "0.625rem", label: "10px (極小)" },
  { value: "0.65rem", label: "10.4px" },
  { value: "0.7rem", label: "11.2px" },
  { value: "0.75rem", label: "12px (小)" },
  { value: "0.82rem", label: "13.1px" },
  { value: "0.875rem", label: "14px" },
  { value: "0.88rem", label: "14.1px" },
  { value: "1rem", label: "16px (內文)" },
  { value: "1.05rem", label: "16.8px" },
  { value: "1.125rem", label: "18px" },
  { value: "1.25rem", label: "20px" },
  { value: "1.275rem", label: "20.4px" },
  { value: "1.3rem", label: "20.8px" },
  { value: "1.4rem", label: "22.4px" },
  { value: "1.5rem", label: "24px (小標)" },
  { value: "1.75rem", label: "28px" },
  { value: "2rem", label: "32px (標題)" },
  { value: "2.49rem", label: "39.8px" },
  { value: "2.5rem", label: "40px" },
  { value: "2.8rem", label: "44.8px" },
  { value: "3rem", label: "48px (大標)" },
  { value: "3.5rem", label: "56px" },
  { value: "4rem", label: "64px (超大)" },
  { value: "5rem", label: "80px" },
]

function StyleControls({ fontSize, fontFamily, onFontSizeChange, onFontFamilyChange }: {
  fontSize: string; fontFamily: string
  onFontSizeChange: (v: string) => void; onFontFamilyChange: (v: string) => void
}) {
  return (
    <div className="flex gap-3 mt-2 p-3 rounded-lg bg-gray-50 border border-gray-100">
      <div className="flex-1 space-y-1">
        <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-wider">字級</label>
        <select value={fontSize} onChange={(e) => onFontSizeChange(e.target.value)}
          className="w-full rounded border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-700 outline-none focus:border-amber-400">
          {FONT_SIZES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>
      <div className="flex-1 space-y-1">
        <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-wider">字體</label>
        <select value={fontFamily} onChange={(e) => onFontFamilyChange(e.target.value)}
          className="w-full rounded border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-700 outline-none focus:border-amber-400">
          {FONT_FAMILIES.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
        </select>
      </div>
    </div>
  )
}

function Field({ label, value, onChange, placeholder, fontSize, fontFamily, onFontSizeChange, onFontFamilyChange }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string
  fontSize?: string; fontFamily?: string; onFontSizeChange?: (v: string) => void; onFontFamilyChange?: (v: string) => void
}) {
  const [showStyle, setShowStyle] = useState(false)
  const hasStyleControls = onFontSizeChange && onFontFamilyChange
  const hasStyleValues = fontSize || fontFamily

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</label>
        {hasStyleControls && (
          <button onClick={() => setShowStyle(!showStyle)}
            className={`flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] transition-colors ${hasStyleValues ? "bg-amber-50 text-amber-600" : "text-gray-400 hover:text-gray-600"}`}
            title="字級/字體設定">
            <Type className="h-3 w-3" />
            <span>Aa</span>
            <ChevronDown className={`h-2.5 w-2.5 transition-transform ${showStyle ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder || label}
        style={{ fontSize: fontSize || undefined, fontFamily: fontFamily || undefined }}
        className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-300 outline-none transition-colors focus:border-amber-400 focus:ring-2 focus:ring-amber-100" />
      {hasStyleControls && showStyle && (
        <StyleControls fontSize={fontSize || ""} fontFamily={fontFamily || ""} onFontSizeChange={onFontSizeChange} onFontFamilyChange={onFontFamilyChange} />
      )}
    </div>
  )
}

function TextArea({ label, value, onChange, placeholder, fontSize, fontFamily, onFontSizeChange, onFontFamilyChange }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string
  fontSize?: string; fontFamily?: string; onFontSizeChange?: (v: string) => void; onFontFamilyChange?: (v: string) => void
}) {
  const [showStyle, setShowStyle] = useState(false)
  const hasStyleControls = onFontSizeChange && onFontFamilyChange
  const hasStyleValues = fontSize || fontFamily

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</label>
        {hasStyleControls && (
          <button onClick={() => setShowStyle(!showStyle)}
            className={`flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] transition-colors ${hasStyleValues ? "bg-amber-50 text-amber-600" : "text-gray-400 hover:text-gray-600"}`}
            title="字級/字體設定">
            <Type className="h-3 w-3" />
            <span>Aa</span>
            <ChevronDown className={`h-2.5 w-2.5 transition-transform ${showStyle ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder || label} rows={3}
        style={{ fontSize: fontSize || undefined, fontFamily: fontFamily || undefined }}
        className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-300 outline-none transition-colors focus:border-amber-400 focus:ring-2 focus:ring-amber-100 resize-none" />
      {hasStyleControls && showStyle && (
        <StyleControls fontSize={fontSize || ""} fontFamily={fontFamily || ""} onFontSizeChange={onFontSizeChange} onFontFamilyChange={onFontFamilyChange} />
      )}
    </div>
  )
}

function ColorSection({ sections, getContent, setContentValue }: {
  sections: { key: string; label: string; fields: { key: string; label: string }[] }[]
  getContent: (section: string, key: string) => string
  setContentValue: (section: string, key: string, value: string) => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors rounded-xl"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-100 to-amber-50">
            <Palette className="h-4 w-4 text-amber-700" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-800">色彩設定</h2>
            <p className="text-xs text-gray-400 mt-0.5">Color Settings — 依品牌色票調整各區塊顏色</p>
          </div>
        </div>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="border-t border-gray-100 px-6 py-5 space-y-6">
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-3">品牌色票</p>
            <div className="flex flex-wrap gap-2">
              {BRAND_PALETTE.map((c) => (
                <div key={c.value} className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-lg border border-gray-200 shadow-sm" style={{ background: c.value }} title={c.label} />
                  <span className="text-[8px] text-gray-400">{c.value}</span>
                </div>
              ))}
            </div>
          </div>
          {sections.map((sec) => (
            <div key={sec.key} className="space-y-3">
              <p className="text-xs font-semibold text-gray-600 border-b border-gray-100 pb-2">{sec.label}</p>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {sec.fields.map((f) => (
                  <ColorPicker
                    key={f.key}
                    label={f.label}
                    value={getContent("colors", `${sec.key}_${f.key}`)}
                    onChange={(v) => setContentValue("colors", `${sec.key}_${f.key}`, v)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-200 py-3 text-sm text-gray-400 transition-colors hover:border-amber-300 hover:text-amber-600">
      <Plus className="h-4 w-4" />
      {label}
    </button>
  )
}
