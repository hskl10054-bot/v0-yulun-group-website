"use client"

import { useState, useRef, useCallback, type ChangeEvent, type DragEvent } from "react"
import {
  Home, Paintbrush, Hammer, Coffee,
  Save, Plus, Trash2, Upload, X, Check,
  ImageIcon, ChevronRight, LogOut,
  GripVertical, Eye
} from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────
interface ServiceItem {
  id: string; num: string; name: string; desc: string
}
interface TestimonialItem {
  id: string; quote: string; name: string; info: string
}
interface PortfolioItem {
  id: string; title: string; type?: string; image: string
}
interface StoreItem {
  id: string; name: string; address: string
}
interface ContactInfo {
  address: string; phone: string; email: string; hours: string
}
interface HeroContent {
  subtitle: string; title: string; description: string; image: string
}
interface AboutContent {
  quote: string; description: string
  stats: { num: string; label: string }[]
}

type PageKey = "home" | "design" | "construction" | "cafe"

// ─── Initial Data ────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 10)

const initialData = {
  home: {
    hero: {
      subtitle: "Yulun Group",
      title: "裕綸集團",
      description: "職人建築，穩健基石，構築空間的永續價值。",
      image: "/images/hero-bg.jpg",
    } as HeroContent,
    brandDesign: {
      title: "空房子室內設計",
      subtitle: "Interior Design",
      description: "為你的空間注入魔法 — 空房開門，幸福進門。透過細膩的動線規劃與美學比例，將居住者的情感與性格注入每一寸留白。",
      image: "/images/design-brand.jpg",
    },
    brandConstruction: {
      title: "裕綸室內裝修",
      subtitle: "Construction Engineering",
      description: "匠心傳承，穩健工程，構築世代安居。標準化 SOP 工程管理，讓美學建立在穩固且安全的結構之上。",
      image: "/images/construction-brand.jpg",
    },
    strengths: [
      { id: uid(), title: "自有工班", description: "擁有專屬施工團隊，確保品質與進度全程掌控，減少外包風險。" },
      { id: uid(), title: "專業執照", description: "持有政府核定之室內裝修專業技術人員證照，合法合規、安心保障。" },
      { id: uid(), title: "透明報價", description: "逐項清單式報價，無隱藏費用，讓每一分預算都花在刀口上。" },
    ],
    portfolio: [
      { id: uid(), title: "同齊咖吡 西區精忠店", type: "2025", image: "/images/home/portfolio/home-portfolio-01.jpg" },
      { id: uid(), title: "壹偲OnlyEase酵素保健茶飲", type: "2025", image: "/images/home/portfolio/home-portfolio-02.JPG" },
      { id: uid(), title: "勝麗交響曲", type: "2025", image: "/images/home/portfolio/home-portfolio-03.JPG" },
      { id: uid(), title: "清水聯馥悅", type: "2024", image: "/images/home/portfolio/home-portfolio-04.jpg" },
      { id: uid(), title: "居家住宅室內設計", type: "2025", image: "/images/home/portfolio/home-portfolio-05.jpg" },
    ] as PortfolioItem[],
    testimonials: [
      { id: uid(), quote: "從設計到施工一條龍，省去了我很多協調的麻煩，完工後品質遠超預期。", name: "陳先生", info: "全室設計+施工・台中西屯" },
      { id: uid(), quote: "設計師非常有耐心，把我們家人不同的需求都融合在同一個空間裡，太厲害了。", name: "林太太", info: "三代同堂住宅・台中北區" },
      { id: uid(), quote: "報價透明、工期準時，完全沒有追加費用的情況，這在業界真的很難得。", name: "張老闆", info: "辦公室裝修・台中南區" },
    ] as TestimonialItem[],
    contact: {
      address: "台中市北屯區瀋陽北路73號",
      phone: "04-2247-9068",
      email: "yulun83417215@gmail.com",
      hours: "週一至週五  09:00 — 18:00",
    } as ContactInfo,
  },
  design: {
    hero: {
      subtitle: "Taichung Interior Design Studio",
      title: "為你的空間注入魔法",
      description: "空房開門，幸福進門。我們相信空間不只是鋼筋水泥，更是承載幸福的容器。當魔法注入空間，家便開始講述屬於你的幸福故事。",
      image: "/images/design/hero/design-hero.jpg",
    } as HeroContent,
    about: {
      quote: "「空間是無聲的語言，設計是讓它開口說話。」",
      description: "空房子設計致力於打破格局束縛，以人為本，透過細膩的動線規劃與美學比例，將居住者的情感與性格注入每一寸留白。我們不做複製品，每一個案子都從屋主的生活習慣、個性與夢想出發，打造獨一無二的空間故事。",
      stats: [
        { num: "150+", label: "完成案例" },
        { num: "8", label: "年品牌經驗" },
        { num: "98%", label: "客戶滿意度" },
      ],
    } as AboutContent,
    services: [
      { id: uid(), num: "01", name: "預售屋客變規劃", desc: "在交屋前即進行格局調整與建材升級規劃，提前為理想生活做好準備，省時省預算。" },
      { id: uid(), num: "02", name: "居家住宅室內設計", desc: "從平面配置、立面設計到材料挑選，以人為本的空間美學，為每個家注入獨特靈魂。" },
      { id: uid(), num: "03", name: "老屋翻新空間重整", desc: "保留空間記憶的同時，注入現代設計語彙。舊屋新生，讓老房子重新散發獨特魅力。" },
      { id: uid(), num: "04", name: "商業空間美學配置", desc: "咖啡廳、辦公室、品牌門市等商業空間，以品牌精神為核心，設計吸引人且具功能性的環境。" },
      { id: uid(), num: "05", name: "軟裝設計與風格諮詢", desc: "家具挑選、燈光配置、藝術品與植栽搭配，用軟裝語彙讓硬體設計更有生命力。" },
    ] as ServiceItem[],
    portfolio: [
      { id: uid(), title: "現代簡約｜光感餐廚", image: "/images/design/portfolio/design-work-01.jpg" },
      { id: uid(), title: "暖色侘寂｜圓弧玄關", image: "/images/design/portfolio/design-work-02.jpg" },
      { id: uid(), title: "輕奢現代｜石紋客餐廳", image: "/images/design/portfolio/design-work-03.jpg" },
      { id: uid(), title: "極簡北歐｜純白入戶", image: "/images/design/portfolio/design-work-04.jpg" },
      { id: uid(), title: "日式和風｜日光臥榻", image: "/images/design/portfolio/design-work-05.jpg" },
    ] as PortfolioItem[],
    testimonials: [
      { id: uid(), quote: "從第一次諮詢到完工，整個過程都讓我感受到設計師對細節的堅持。現在每天回到家都像是回到一個懂我的地方。", name: "李小姐", info: "台中北區・三房兩廳・2024" },
      { id: uid(), quote: "我只是說了幾個關鍵字，設計師就把我腦海裡模糊的想像變成了真實的空間。太神奇了。", name: "黃先生", info: "台中西區・老屋翻新・2023" },
      { id: uid(), quote: "咖啡廳開幕後不斷有客人說空間很有質感，生意比預期好很多。設計真的是最值得投資的事。", name: "吳老闆", info: "台中南區・商業空間・2023" },
    ] as TestimonialItem[],
    contact: {
      address: "台中市北屯區瀋陽北路73號",
      phone: "04-2247-9068",
      email: "yulun83417215@gmail.com",
      hours: "週一至週五  09:00 — 18:00",
    } as ContactInfo,
  },
  construction: {
    hero: {
      subtitle: "Taichung Construction Engineering",
      title: "匠心傳承 穩健工程 構築世代安居",
      description: "裕綸裝修擁有政府核可專業施工證照，秉持標準化 SOP 工程管理。我們重視隱蔽工程細節，從水電配置、防水工法到結構強化，皆由具備資深執照的職人團隊把關。2年保固，安心無憂。",
      image: "/images/construction/hero/construction-hero.jpg",
    } as HeroContent,
    strengths: [
      { id: uid(), title: "自有工班", description: "不外包，全程自有專業工班施工，品質與進度完全掌控在自己手中。" },
      { id: uid(), title: "合法執照", description: "持有政府核定室內裝修專業技術人員證照，合法合規施工，保障屋主權益。" },
      { id: uid(), title: "透明報價", description: "逐項清單報價，無隱藏費用，每一分預算清清楚楚，讓你花得安心。" },
    ],
    services: [
      { id: uid(), num: "01", name: "拆除與結構加強工程", desc: "安全拆除既有隔間與裝修，並依需求進行結構補強，為新設計奠定穩固基礎。" },
      { id: uid(), num: "02", name: "專業水電系統配置", desc: "專業水電技師負責管線配置、插座規劃、衛浴設備安裝，符合建築法規與安全標準。" },
      { id: uid(), num: "03", name: "高標準防水隔音工程", desc: "採用高規格防水工法與隔音材料，確保居住品質與空間結構的長期耐久。" },
      { id: uid(), num: "04", name: "木作與細部木裝工程", desc: "系統櫃、天花板、木地板等木作項目，材料嚴選、工法精準，打造精緻的空間細節。" },
      { id: uid(), num: "05", name: "系統家具安裝與整合", desc: "系統櫃體與家具的精準安裝，整合空間機能與美學，提供完整的收納解決方案。" },
    ] as ServiceItem[],
    portfolio: [
      { id: uid(), title: "精準裁切，構築空間", type: "全室裝修・2025", image: "/images/construction/portfolio/construction-project-01.jpg" },
      { id: uid(), title: "設計落地：現場監工", type: "商業空間・2025", image: "/images/construction/portfolio/construction-project-02.jpg" },
      { id: uid(), title: "泥作整平，空間基石", type: "舊屋翻新・2025", image: "/images/construction/portfolio/construction-project-03.jpg" },
      { id: uid(), title: "專業電工紀實", type: "局部工程・2024", image: "/images/construction/portfolio/construction-project-04.jpg" },
      { id: uid(), title: "嚴謹的高空作業", type: "全室裝修・2025", image: "/images/construction/portfolio/construction-project-05.jpg" },
    ] as PortfolioItem[],
    testimonials: [
      { id: uid(), quote: "工班師傅很專業，每天收工前都會清理現場，整個工程過程完全不用擔心。", name: "黃先生", info: "全室裝修・台中北區・2024" },
      { id: uid(), quote: "報價單寫得很詳細，哪個項目多少錢一清二楚，完工後完全沒有追加費用。", name: "蔡太太", info: "老屋翻新・台中西屯・2023" },
      { id: uid(), quote: "工程進度比預期還快，品質也很好。監工人員很負責，有問題馬上回應。", name: "林先生", info: "商業空間・台中南區・2023" },
    ] as TestimonialItem[],
    contact: {
      address: "台中市北屯區瀋陽北路73號",
      phone: "04-2247-9068",
      email: "yulun83417215@gmail.com",
      hours: "週一至週五  09:00 — 18:00",
    } as ContactInfo,
  },
  cafe: {
    hero: {
      subtitle: "Specialty Coffee",
      title: "一杯咖啡 千種連結",
      description: "在同齊，咖啡是空間的媒介，連結著人與人之間的對話。我們提供自家烘焙的精品咖啡豆，並在舒適的空間中創造不限時的寧靜時刻。無論是尋求靈感的商務洽公，或是好友聚會，同齊咖啡都是你生活中最溫暖的交匯點。",
      image: "",
    } as HeroContent,
    features: [
      { id: uid(), title: "不限時深夜咖啡", desc: "營業至深夜，提供舒適的空間讓你不受時間限制，盡情享受每一刻的寧靜。" },
      { id: uid(), title: "自烘咖啡豆", desc: "嚴選產區生豆，自家烘焙，以專業的烘豆技術呈現每一支豆子最完美的風味。" },
      { id: uid(), title: "場地租賃", desc: "提供多功能場地租借服務，適合商務洽公、讀書會、小型聚會等各種用途。" },
    ],
    stores: [
      { id: uid(), name: "北屯旗艦店", address: "台中市北屯區熱河路二段226號" },
      { id: uid(), name: "西區精忠店", address: "台中市西區精忠街36號" },
      { id: uid(), name: "南區忠明店", address: "台中市南區忠明南路576號" },
      { id: uid(), name: "花蓮創始店", address: "花蓮市建國路23號2樓" },
    ] as StoreItem[],
    hours: "週一至週日  09:00 — 18:00",
  },
}

// ─── Sub-Components ──────────────────────────────────────────────

function ImageUploader({ currentImage, onImageChange, label }: {
  currentImage: string; onImageChange: (url: string) => void; label?: string
}) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)
  const [preview, setPreview] = useState(currentImage)

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const url = e.target?.result as string
      setPreview(url)
      onImageChange(url)
    }
    reader.readAsDataURL(file)
  }, [onImageChange])

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault(); setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [handleFile])

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }, [handleFile])

  return (
    <div className="space-y-2">
      {label && <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</label>}
      <div
        className={`relative border-2 border-dashed rounded-lg transition-colors cursor-pointer ${dragOver ? "border-amber-500 bg-amber-50" : "border-gray-200 hover:border-gray-300"}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
      >
        {preview ? (
          <div className="relative group">
            <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
              <Upload className="h-5 w-5 text-white" />
              <span className="text-white text-sm">更換圖片</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 gap-2 text-gray-400">
            <ImageIcon className="h-10 w-10" />
            <p className="text-sm">拖拉圖片或點擊上傳</p>
            <p className="text-xs text-gray-300">支援 JPG, PNG, WebP</p>
          </div>
        )}
      </div>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
    </div>
  )
}

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-emerald-600 text-white pl-4 pr-3 py-3 rounded-lg shadow-xl animate-slide-up">
      <Check className="h-5 w-5 shrink-0" />
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 hover:bg-white/20 rounded p-1 transition-colors">
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────────

const pages: { key: PageKey; label: string; icon: typeof Home }[] = [
  { key: "home", label: "首頁", icon: Home },
  { key: "design", label: "空房子設計", icon: Paintbrush },
  { key: "construction", label: "裕綸裝修", icon: Hammer },
  { key: "cafe", label: "同齊咖啡", icon: Coffee },
]

export default function AdminPage() {
  const [activePage, setActivePage] = useState<PageKey>("home")
  const [data, setData] = useState(initialData)
  const [toast, setToast] = useState<string | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const handleSave = () => {
    // In the future this will POST to Supabase
    showToast("儲存成功！內容已更新。")
  }

  // ─── Updaters ────────────────────────────────────────────────
  const updateField = (page: PageKey, section: string, field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      [page]: {
        ...prev[page],
        [section]: {
          ...(prev[page] as Record<string, unknown>)[section] as Record<string, unknown>,
          [field]: value,
        },
      },
    }))
  }

  const updateListItem = (page: PageKey, section: string, id: string, field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      [page]: {
        ...prev[page],
        [section]: ((prev[page] as Record<string, unknown>)[section] as Array<Record<string, unknown>>).map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        ),
      },
    }))
  }

  const addListItem = (page: PageKey, section: string, template: Record<string, unknown>) => {
    setData((prev) => ({
      ...prev,
      [page]: {
        ...prev[page],
        [section]: [
          ...((prev[page] as Record<string, unknown>)[section] as Array<Record<string, unknown>>),
          { ...template, id: uid() },
        ],
      },
    }))
  }

  const removeListItem = (page: PageKey, section: string, id: string) => {
    setData((prev) => ({
      ...prev,
      [page]: {
        ...prev[page],
        [section]: ((prev[page] as Record<string, unknown>)[section] as Array<Record<string, unknown>>).filter((item) => item.id !== id),
      },
    }))
  }

  // ─── Renderers ───────────────────────────────────────────────

  const renderHomePage = () => {
    const d = data.home
    return (
      <div className="space-y-10">
        {/* Hero */}
        <Section title="首頁橫幅" subtitle="Hero Section">
          <Field label="副標題" value={d.hero.subtitle} onChange={(v) => updateField("home", "hero", "subtitle", v)} />
          <Field label="主標題" value={d.hero.title} onChange={(v) => updateField("home", "hero", "title", v)} />
          <TextArea label="說明文字" value={d.hero.description} onChange={(v) => updateField("home", "hero", "description", v)} />
          <ImageUploader label="背景圖片" currentImage={d.hero.image} onImageChange={(v) => updateField("home", "hero", "image", v)} />
        </Section>

        {/* Brand Cards */}
        <Section title="品牌卡片 — 空房子設計" subtitle="Brand Card: Design">
          <Field label="標題" value={d.brandDesign.title} onChange={(v) => updateField("home", "brandDesign", "title", v)} />
          <Field label="副標題" value={d.brandDesign.subtitle} onChange={(v) => updateField("home", "brandDesign", "subtitle", v)} />
          <TextArea label="說明" value={d.brandDesign.description} onChange={(v) => updateField("home", "brandDesign", "description", v)} />
          <ImageUploader label="卡片圖片" currentImage={d.brandDesign.image} onImageChange={(v) => updateField("home", "brandDesign", "image", v)} />
        </Section>

        <Section title="品牌卡片 — 裕綸裝修" subtitle="Brand Card: Construction">
          <Field label="標題" value={d.brandConstruction.title} onChange={(v) => updateField("home", "brandConstruction", "title", v)} />
          <Field label="副標題" value={d.brandConstruction.subtitle} onChange={(v) => updateField("home", "brandConstruction", "subtitle", v)} />
          <TextArea label="說明" value={d.brandConstruction.description} onChange={(v) => updateField("home", "brandConstruction", "description", v)} />
          <ImageUploader label="卡片圖片" currentImage={d.brandConstruction.image} onImageChange={(v) => updateField("home", "brandConstruction", "image", v)} />
        </Section>

        {/* Strengths */}
        <Section title="集團實力" subtitle="Strengths">
          {d.strengths.map((s) => (
            <Card key={s.id} onDelete={() => {
              setData((prev) => ({
                ...prev,
                home: { ...prev.home, strengths: prev.home.strengths.filter((x) => x.id !== s.id) },
              }))
            }}>
              <Field label="標題" value={s.title} onChange={(v) => {
                setData((prev) => ({
                  ...prev,
                  home: { ...prev.home, strengths: prev.home.strengths.map((x) => x.id === s.id ? { ...x, title: v } : x) },
                }))
              }} />
              <TextArea label="描述" value={s.description} onChange={(v) => {
                setData((prev) => ({
                  ...prev,
                  home: { ...prev.home, strengths: prev.home.strengths.map((x) => x.id === s.id ? { ...x, description: v } : x) },
                }))
              }} />
            </Card>
          ))}
          <AddButton label="新增實力項目" onClick={() => {
            setData((prev) => ({
              ...prev,
              home: { ...prev.home, strengths: [...prev.home.strengths, { id: uid(), title: "", description: "" }] },
            }))
          }} />
        </Section>

        {/* Portfolio */}
        <Section title="精選作品" subtitle="Portfolio">
          {d.portfolio.map((p) => (
            <Card key={p.id} onDelete={() => removeListItem("home", "portfolio", p.id)}>
              <Field label="作品名稱" value={p.title} onChange={(v) => updateListItem("home", "portfolio", p.id, "title", v)} />
              <Field label="年份" value={p.type || ""} onChange={(v) => updateListItem("home", "portfolio", p.id, "type", v)} />
              <ImageUploader label="作品圖片" currentImage={p.image} onImageChange={(v) => updateListItem("home", "portfolio", p.id, "image", v)} />
            </Card>
          ))}
          <AddButton label="新增作品" onClick={() => addListItem("home", "portfolio", { title: "", type: "", image: "" })} />
        </Section>

        {/* Testimonials */}
        <Section title="客戶評語" subtitle="Testimonials">
          {d.testimonials.map((t) => (
            <Card key={t.id} onDelete={() => removeListItem("home", "testimonials", t.id)}>
              <TextArea label="評語" value={t.quote} onChange={(v) => updateListItem("home", "testimonials", t.id, "quote", v)} />
              <div className="grid grid-cols-2 gap-4">
                <Field label="客戶名稱" value={t.name} onChange={(v) => updateListItem("home", "testimonials", t.id, "name", v)} />
                <Field label="附加資訊" value={t.info} onChange={(v) => updateListItem("home", "testimonials", t.id, "info", v)} />
              </div>
            </Card>
          ))}
          <AddButton label="新增評語" onClick={() => addListItem("home", "testimonials", { quote: "", name: "", info: "" })} />
        </Section>

        {/* Contact */}
        <Section title="聯絡資訊" subtitle="Contact">
          <Field label="地址" value={d.contact.address} onChange={(v) => updateField("home", "contact", "address", v)} />
          <Field label="電話" value={d.contact.phone} onChange={(v) => updateField("home", "contact", "phone", v)} />
          <Field label="Email" value={d.contact.email} onChange={(v) => updateField("home", "contact", "email", v)} />
          <Field label="營業時間" value={d.contact.hours} onChange={(v) => updateField("home", "contact", "hours", v)} />
        </Section>
      </div>
    )
  }

  const renderDesignPage = () => {
    const d = data.design
    return (
      <div className="space-y-10">
        <Section title="首頁橫幅" subtitle="Hero">
          <Field label="副標題" value={d.hero.subtitle} onChange={(v) => updateField("design", "hero", "subtitle", v)} />
          <Field label="主標題" value={d.hero.title} onChange={(v) => updateField("design", "hero", "title", v)} />
          <TextArea label="說明文字" value={d.hero.description} onChange={(v) => updateField("design", "hero", "description", v)} />
          <ImageUploader label="Hero 圖片" currentImage={d.hero.image} onImageChange={(v) => updateField("design", "hero", "image", v)} />
        </Section>

        <Section title="關於我們" subtitle="About">
          <Field label="引言" value={d.about.quote} onChange={(v) => updateField("design", "about", "quote", v)} />
          <TextArea label="描述" value={d.about.description} onChange={(v) => updateField("design", "about", "description", v)} />
          <div className="grid grid-cols-3 gap-4">
            {d.about.stats.map((s, i) => (
              <div key={i} className="space-y-2 rounded-lg border border-gray-100 p-3">
                <Field label="數字" value={s.num} onChange={(v) => {
                  setData((prev) => {
                    const stats = [...prev.design.about.stats]
                    stats[i] = { ...stats[i], num: v }
                    return { ...prev, design: { ...prev.design, about: { ...prev.design.about, stats } } }
                  })
                }} />
                <Field label="標籤" value={s.label} onChange={(v) => {
                  setData((prev) => {
                    const stats = [...prev.design.about.stats]
                    stats[i] = { ...stats[i], label: v }
                    return { ...prev, design: { ...prev.design, about: { ...prev.design.about, stats } } }
                  })
                }} />
              </div>
            ))}
          </div>
        </Section>

        <Section title="服務項目" subtitle="Services">
          {d.services.map((s) => (
            <Card key={s.id} onDelete={() => removeListItem("design", "services", s.id)}>
              <div className="grid grid-cols-[80px_1fr] gap-4">
                <Field label="編號" value={s.num} onChange={(v) => updateListItem("design", "services", s.id, "num", v)} />
                <Field label="服務名稱" value={s.name} onChange={(v) => updateListItem("design", "services", s.id, "name", v)} />
              </div>
              <TextArea label="描述" value={s.desc} onChange={(v) => updateListItem("design", "services", s.id, "desc", v)} />
            </Card>
          ))}
          <AddButton label="新增服務" onClick={() => addListItem("design", "services", { num: String(d.services.length + 1).padStart(2, "0"), name: "", desc: "" })} />
        </Section>

        <Section title="精選作品" subtitle="Portfolio">
          {d.portfolio.map((p) => (
            <Card key={p.id} onDelete={() => removeListItem("design", "portfolio", p.id)}>
              <Field label="作品名稱" value={p.title} onChange={(v) => updateListItem("design", "portfolio", p.id, "title", v)} />
              <ImageUploader label="作品圖片" currentImage={p.image} onImageChange={(v) => updateListItem("design", "portfolio", p.id, "image", v)} />
            </Card>
          ))}
          <AddButton label="新增作品" onClick={() => addListItem("design", "portfolio", { title: "", image: "" })} />
        </Section>

        <Section title="客戶評語" subtitle="Testimonials">
          {d.testimonials.map((t) => (
            <Card key={t.id} onDelete={() => removeListItem("design", "testimonials", t.id)}>
              <TextArea label="評語" value={t.quote} onChange={(v) => updateListItem("design", "testimonials", t.id, "quote", v)} />
              <div className="grid grid-cols-2 gap-4">
                <Field label="客戶名稱" value={t.name} onChange={(v) => updateListItem("design", "testimonials", t.id, "name", v)} />
                <Field label="附加資訊" value={t.info} onChange={(v) => updateListItem("design", "testimonials", t.id, "info", v)} />
              </div>
            </Card>
          ))}
          <AddButton label="新增評語" onClick={() => addListItem("design", "testimonials", { quote: "", name: "", info: "" })} />
        </Section>

        <Section title="聯絡資訊" subtitle="Contact">
          <Field label="地址" value={d.contact.address} onChange={(v) => updateField("design", "contact", "address", v)} />
          <Field label="電話" value={d.contact.phone} onChange={(v) => updateField("design", "contact", "phone", v)} />
          <Field label="Email" value={d.contact.email} onChange={(v) => updateField("design", "contact", "email", v)} />
          <Field label="營業時間" value={d.contact.hours} onChange={(v) => updateField("design", "contact", "hours", v)} />
        </Section>
      </div>
    )
  }

  const renderConstructionPage = () => {
    const d = data.construction
    return (
      <div className="space-y-10">
        <Section title="首頁橫幅" subtitle="Hero">
          <Field label="副標題" value={d.hero.subtitle} onChange={(v) => updateField("construction", "hero", "subtitle", v)} />
          <Field label="主標題" value={d.hero.title} onChange={(v) => updateField("construction", "hero", "title", v)} />
          <TextArea label="說明文字" value={d.hero.description} onChange={(v) => updateField("construction", "hero", "description", v)} />
          <ImageUploader label="Hero 圖片" currentImage={d.hero.image} onImageChange={(v) => updateField("construction", "hero", "image", v)} />
        </Section>

        <Section title="我們的優勢" subtitle="Strengths">
          {d.strengths.map((s) => (
            <Card key={s.id} onDelete={() => {
              setData((prev) => ({
                ...prev,
                construction: { ...prev.construction, strengths: prev.construction.strengths.filter((x) => x.id !== s.id) },
              }))
            }}>
              <Field label="標題" value={s.title} onChange={(v) => {
                setData((prev) => ({
                  ...prev,
                  construction: { ...prev.construction, strengths: prev.construction.strengths.map((x) => x.id === s.id ? { ...x, title: v } : x) },
                }))
              }} />
              <TextArea label="描述" value={s.description} onChange={(v) => {
                setData((prev) => ({
                  ...prev,
                  construction: { ...prev.construction, strengths: prev.construction.strengths.map((x) => x.id === s.id ? { ...x, description: v } : x) },
                }))
              }} />
            </Card>
          ))}
          <AddButton label="新增優勢" onClick={() => {
            setData((prev) => ({
              ...prev,
              construction: { ...prev.construction, strengths: [...prev.construction.strengths, { id: uid(), title: "", description: "" }] },
            }))
          }} />
        </Section>

        <Section title="服務項目" subtitle="Services">
          {d.services.map((s) => (
            <Card key={s.id} onDelete={() => removeListItem("construction", "services", s.id)}>
              <div className="grid grid-cols-[80px_1fr] gap-4">
                <Field label="編號" value={s.num} onChange={(v) => updateListItem("construction", "services", s.id, "num", v)} />
                <Field label="服務名稱" value={s.name} onChange={(v) => updateListItem("construction", "services", s.id, "name", v)} />
              </div>
              <TextArea label="描述" value={s.desc} onChange={(v) => updateListItem("construction", "services", s.id, "desc", v)} />
            </Card>
          ))}
          <AddButton label="新增服務" onClick={() => addListItem("construction", "services", { num: String(d.services.length + 1).padStart(2, "0"), name: "", desc: "" })} />
        </Section>

        <Section title="施工案例" subtitle="Projects">
          {d.portfolio.map((p) => (
            <Card key={p.id} onDelete={() => removeListItem("construction", "portfolio", p.id)}>
              <Field label="案例名稱" value={p.title} onChange={(v) => updateListItem("construction", "portfolio", p.id, "title", v)} />
              <Field label="案例類型" value={p.type || ""} onChange={(v) => updateListItem("construction", "portfolio", p.id, "type", v)} />
              <ImageUploader label="案例圖片" currentImage={p.image} onImageChange={(v) => updateListItem("construction", "portfolio", p.id, "image", v)} />
            </Card>
          ))}
          <AddButton label="新增案例" onClick={() => addListItem("construction", "portfolio", { title: "", type: "", image: "" })} />
        </Section>

        <Section title="客戶評語" subtitle="Testimonials">
          {d.testimonials.map((t) => (
            <Card key={t.id} onDelete={() => removeListItem("construction", "testimonials", t.id)}>
              <TextArea label="評語" value={t.quote} onChange={(v) => updateListItem("construction", "testimonials", t.id, "quote", v)} />
              <div className="grid grid-cols-2 gap-4">
                <Field label="客戶名稱" value={t.name} onChange={(v) => updateListItem("construction", "testimonials", t.id, "name", v)} />
                <Field label="附加資訊" value={t.info} onChange={(v) => updateListItem("construction", "testimonials", t.id, "info", v)} />
              </div>
            </Card>
          ))}
          <AddButton label="新增評語" onClick={() => addListItem("construction", "testimonials", { quote: "", name: "", info: "" })} />
        </Section>

        <Section title="聯絡資訊" subtitle="Contact">
          <Field label="地址" value={d.contact.address} onChange={(v) => updateField("construction", "contact", "address", v)} />
          <Field label="電話" value={d.contact.phone} onChange={(v) => updateField("construction", "contact", "phone", v)} />
          <Field label="Email" value={d.contact.email} onChange={(v) => updateField("construction", "contact", "email", v)} />
          <Field label="營業時間" value={d.contact.hours} onChange={(v) => updateField("construction", "contact", "hours", v)} />
        </Section>
      </div>
    )
  }

  const renderCafePage = () => {
    const d = data.cafe
    return (
      <div className="space-y-10">
        <Section title="首頁橫幅" subtitle="Hero">
          <Field label="副標題" value={d.hero.subtitle} onChange={(v) => updateField("cafe", "hero", "subtitle", v)} />
          <Field label="主標題" value={d.hero.title} onChange={(v) => updateField("cafe", "hero", "title", v)} />
          <TextArea label="說明文字" value={d.hero.description} onChange={(v) => updateField("cafe", "hero", "description", v)} />
          <ImageUploader label="Hero 圖片" currentImage={d.hero.image} onImageChange={(v) => updateField("cafe", "hero", "image", v)} />
        </Section>

        <Section title="品牌特色" subtitle="Features">
          {d.features.map((f) => (
            <Card key={f.id} onDelete={() => {
              setData((prev) => ({
                ...prev,
                cafe: { ...prev.cafe, features: prev.cafe.features.filter((x) => x.id !== f.id) },
              }))
            }}>
              <Field label="標題" value={f.title} onChange={(v) => {
                setData((prev) => ({
                  ...prev,
                  cafe: { ...prev.cafe, features: prev.cafe.features.map((x) => x.id === f.id ? { ...x, title: v } : x) },
                }))
              }} />
              <TextArea label="描述" value={f.desc} onChange={(v) => {
                setData((prev) => ({
                  ...prev,
                  cafe: { ...prev.cafe, features: prev.cafe.features.map((x) => x.id === f.id ? { ...x, desc: v } : x) },
                }))
              }} />
            </Card>
          ))}
          <AddButton label="新增特色" onClick={() => {
            setData((prev) => ({
              ...prev,
              cafe: { ...prev.cafe, features: [...prev.cafe.features, { id: uid(), title: "", desc: "" }] },
            }))
          }} />
        </Section>

        <Section title="門市資訊" subtitle="Stores">
          {d.stores.map((s) => (
            <Card key={s.id} onDelete={() => {
              setData((prev) => ({
                ...prev,
                cafe: { ...prev.cafe, stores: prev.cafe.stores.filter((x) => x.id !== s.id) },
              }))
            }}>
              <div className="grid grid-cols-[1fr_2fr] gap-4">
                <Field label="店名" value={s.name} onChange={(v) => {
                  setData((prev) => ({
                    ...prev,
                    cafe: { ...prev.cafe, stores: prev.cafe.stores.map((x) => x.id === s.id ? { ...x, name: v } : x) },
                  }))
                }} />
                <Field label="地址" value={s.address} onChange={(v) => {
                  setData((prev) => ({
                    ...prev,
                    cafe: { ...prev.cafe, stores: prev.cafe.stores.map((x) => x.id === s.id ? { ...x, address: v } : x) },
                  }))
                }} />
              </div>
            </Card>
          ))}
          <AddButton label="新增門市" onClick={() => {
            setData((prev) => ({
              ...prev,
              cafe: { ...prev.cafe, stores: [...prev.cafe.stores, { id: uid(), name: "", address: "" }] },
            }))
          }} />
        </Section>

        <Section title="營業時間" subtitle="Hours">
          <Field label="營業時間" value={d.hours} onChange={(v) => {
            setData((prev) => ({ ...prev, cafe: { ...prev.cafe, hours: v } }))
          }} />
        </Section>
      </div>
    )
  }

  const renderContent = () => {
    switch (activePage) {
      case "home": return renderHomePage()
      case "design": return renderDesignPage()
      case "construction": return renderConstructionPage()
      case "cafe": return renderCafePage()
    }
  }

  const currentPageLabel = pages.find((p) => p.key === activePage)?.label || ""

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
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-gray-100 px-4">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-700 text-white text-xs font-bold">裕</div>
              <span className="text-sm font-semibold text-gray-800 tracking-wide">裕綸 CMS</span>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <ChevronRight className={`h-4 w-4 transition-transform ${sidebarCollapsed ? "" : "rotate-180"}`} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 p-3">
          {!sidebarCollapsed && (
            <p className="mb-2 px-3 text-[10px] font-medium uppercase tracking-widest text-gray-400">頁面管理</p>
          )}
          {pages.map((page) => {
            const Icon = page.icon
            const active = activePage === page.key
            return (
              <button
                key={page.key}
                onClick={() => setActivePage(page.key)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
                  active
                    ? "bg-amber-50 text-amber-800 font-medium"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                }`}
                title={sidebarCollapsed ? page.label : undefined}
              >
                <Icon className={`h-[18px] w-[18px] shrink-0 ${active ? "text-amber-700" : ""}`} />
                {!sidebarCollapsed && <span>{page.label}</span>}
              </button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-100 p-3">
          <a
            href="/"
            target="_blank"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
            title={sidebarCollapsed ? "預覽網站" : undefined}
          >
            <Eye className="h-[18px] w-[18px] shrink-0" />
            {!sidebarCollapsed && <span>預覽網站</span>}
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-8">
          <div>
            <h1 className="text-lg font-semibold text-gray-800">{currentPageLabel}</h1>
            <p className="text-xs text-gray-400">編輯頁面內容</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs text-amber-700 font-medium">
              純前端模式
            </span>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 rounded-lg bg-amber-700 px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-amber-800"
            >
              <Save className="h-4 w-4" />
              儲存變更
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="mx-auto max-w-3xl">
            {renderContent()}
          </div>
        </div>
      </main>

      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
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
        <button
          onClick={onDelete}
          className="rounded p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
          title="刪除"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      {children}
    </div>
  )
}

function Field({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || label}
        className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-300 outline-none transition-colors focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
      />
    </div>
  )
}

function TextArea({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || label}
        rows={3}
        className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-300 outline-none transition-colors focus:border-amber-400 focus:ring-2 focus:ring-amber-100 resize-none"
      />
    </div>
  )
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-200 py-3 text-sm text-gray-400 transition-colors hover:border-amber-300 hover:text-amber-600"
    >
      <Plus className="h-4 w-4" />
      {label}
    </button>
  )
}
