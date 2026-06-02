// AUTO-GENERATED from scripts/KongFangZi_Pages.slim.jsx via scripts/gen-cases.mjs
// 空房子室內設計 — 合作流程 + 案例資料。要新增/修改案子，改這裡即可。
// 照片為 Cloudinary（cloud name: dfvmjmwb7）網址，public id 規則：
//   kfz/<enName slug>-hero、kfz/<enName slug>-1、-2…

export const RESIDENTIAL = "住宅設計" as const;
export const COMMERCIAL = "商業空間" as const;
export const TODO = "〔待補〕";

export type CaseCategory = typeof RESIDENTIAL | typeof COMMERCIAL;

export interface GalleryItem {
  src: string;
  caption: string;
}

export interface CaseStudy {
  cat: CaseCategory;
  zhName: string;
  enName: string;
  tagline: string;
  hero: string;
  meta: string[];
  story: string;
  problem: string;
  solution: string;
  highlights: string[];
  gallery: GalleryItem[];
}

export interface ProcessStep {
  no: string;
  title: string;
  time: string;
  desc: string;
  prep: string;
  get: string;
  stage?: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface IconItem {
  icon: string;
  name?: string;
  t?: string;
  d?: string;
}

export const PROCESS_INTRO = {
  kicker: "WORKFLOW", title: "與我們合作，會是什麼樣子？",
  lead: "裝修一個家，是一筆大的決定。我們把整個過程攤開給你看——每一步做什麼、要多久、你要準備什麼，全部透明。設計與工程分兩階段簽約：你先確認設計、滿意了，才進到工程報價。每一步你都做得了主。",
};

export const PROCESS_STEPS: ProcessStep[] = [
  { no: "01", title: "免費初談", time: "約 30 分鐘", desc: "坐下來聊你的空間、生活習慣、想解決的問題。完全免費，不用先準備設計概念。", prep: "房屋現況、預算想法、生活痛點", get: "案子可行性與量級的初步判斷" },
  { no: "02", title: "現場會勘與丈量", time: "到府 1–2 小時", desc: "實際丈量、拍照、記錄管線結構。所有規劃都從真實尺寸出發，不憑空想像。", prep: "讓我們進得了現場", get: "精準現況資料" },
  { no: "03", title: "設計提案", time: "約 7 個工作天", desc: "把需求轉成平面配置、設計概念、風格方向，用提案簡報說明。你第一次看見未來的家。", prep: "對提案誠實的回饋", get: "平面圖、概念說明、初步預算範圍" },
  { no: "04", title: "簽訂設計合約", time: "階段一", desc: "方向滿意了，先簽設計合約，進入細部圖面繪製。這階段只談設計，工程的錢還沒進場。", prep: "細讀合約、問到懂", get: "完整施工圖、明確設計費與付款節點", stage: "設計階段" },
  { no: "05", title: "工程估價", time: "依圖估", desc: "設計定案後，依施工圖逐項估價、排定時程。按圖估，每筆花在哪都看得到，不會先簽再追加。", prep: "一起檢視估價單", get: "透明工程估價單、預計工期" },
  { no: "06", title: "簽訂工程合約・施工", time: "階段二", desc: "估價確認後再簽工程合約，自有工班進場。設計施工同一團隊，進度與工地照持續同步。", prep: "放心交給我們", get: "定期進度回報、工地照、隨時可問的窗口", stage: "工程階段" },
  { no: "07", title: "完工驗收交屋", time: "完工後", desc: "陪你逐項驗收，確認每個細節符合設計與期待。需調整的現場列清單、處理到好。", prep: "仔細看、提出在意處", get: "驗收清單、一個真正能住的家" },
  { no: "08", title: "兩年保固與售後", time: "交屋後 2 年", desc: "交屋不是結束。兩年內工程相關問題持續負責。我們希望你住得安心，而不是收完尾款就消失。", prep: "發現問題隨時聯絡", get: "兩年保固承諾、長期關係" },
];

export const PROCESS_FAQ: FaqItem[] = [
  { q: "我還在規劃階段，現在來談會不會太早？", a: "不會。初談就是幫你釐清方向用的，越早聊，預算與期待越抓得準。" },
  { q: "為什麼要簽兩次約？這樣會不會比較麻煩？", a: "分兩次是為了保護你。先把設計確認到滿意、看到完整施工圖，才進工程報價與簽約——不會在沒看清楚全貌時就被工程款綁住，每一步都能喊停。" },
  { q: "我完全不懂設計，能跟你們溝通嗎？", a: "完全沒問題。你只要描述生活——幾個人住、怎麼用空間、最在意什麼，翻譯成設計是我們的工作。" },
  { q: "設計和施工是分開找人，還是你們一起做？", a: "設計＋施工一條龍、同一個自有工班。分兩次簽的是合約不是團隊，細節不會在施工時走樣。" },
];

export const SERVICES: IconItem[] = [
  { icon: "home", name: "住宅設計" }, { icon: "store", name: "商業空間" },
  { icon: "reno", name: "老屋翻新" }, { icon: "build", name: "裝潢工程" },
  { icon: "sofa", name: "軟裝佈置" }, { icon: "plan", name: "空間規劃" },
];

export const VALUE_ADDS: IconItem[] = [
  { icon: "star", t: "打造專屬風格", d: "從你的生活與故事出發" },
  { icon: "album", t: "線上施工相簿", d: "隨時掌握工地進度" },
  { icon: "list", t: "條列式報價", d: "施作前看清每一筆花費" },
  { icon: "team", t: "自有工班", d: "設計施工同一團隊不脫節" },
  { icon: "shield", t: "保固兩年", d: "設計與工程，交屋後持續負責" },
  { icon: "camera", t: "完工專業拍攝", d: "為你的空間留下紀錄" },
];

export const CASES: CaseStudy[] = [
  {
    cat: RESIDENTIAL, zhName: "墨石", enName: "Smoke & Stone", tagline: "沉穩的質感，是每天回家的踏實",
    hero: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/smoke-and-stone-hero",
    meta: ["建案改造", "低調奢華", "極簡風", "台中・沙鹿"],
    story: "位於沙鹿的這個家，屋主要的不是一眼驚豔的華麗，而是一種沉得住、住得久的質感。比起跟風的設計，他更在意每天回到家時，空間能不能讓人安定下來。我們以生活為核心，為他量身打造這個沉穩的家。",
    problem: "客廳有一道因窗戶位置而來的穿堂風——氣流直穿，坐起來不安定，風水上也是忌諱。同時屋主有不少想展示的收藏，需要既能陳列、又能把雜物收得乾淨俐落的空間。",
    solution: "以深灰／黑色霧面烤漆、大理石拼接、煙燻玻璃鋪陳出低調而有層次的奢華。客廳櫃體巧妙增生出一道量體，順勢化解穿堂風，風水與生活舒適一次兼顧。機能上分成三區：右側玻璃櫃展示收藏，中段平台可放電視或藝術品，左側收納櫃把物品藏起來。隱藏收納、間接照明、曲面櫃門，每個細節都同時顧到美感與功能。",
    highlights: ["一道量體同時化解穿堂風，風水與生活舒適一起顧到", "展示、影音、收納三區分明，收藏有面子、雜物有裡子"],
    gallery: [
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/smoke-and-stone-1", caption: "客廳量體化解穿堂風，落地窗引入採光" },
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/smoke-and-stone-2", caption: "曲面櫃門與黑色霧面，從玄關就定調" },
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/smoke-and-stone-3", caption: "多功能空間，胡桃木質帶來溫度" },
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/smoke-and-stone-4", caption: "木紋檯面與霧面抽屜的細膩銜接" },
    ],
  },
  {
    cat: RESIDENTIAL, zhName: "常日", enName: "Everyday", tagline: "家的樣子，是最貼近日常的剛剛好",
    hero: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/everyday-hero",
    meta: ["建案整體設計", "日式溫潤", "梧棲・大毅建案", "台中"],
    story: "這是為梧棲大毅建案屋主做的整體設計。屋主要的不是樣品屋式的展示，而是一個貼近日常、住起來剛剛好的家。我們從圖面構思一路陪到現場落地，讓完工那刻的模樣，就是當初想像的樣子。",
    problem: "建案交屋時像一張白紙，格局、收納、動線都還沒有屬於這個家的答案。如何把屋主的生活習慣準確地裝進這個空間，是整個設計的核心。",
    solution: "以日式溫潤為基調，用木質、白與柔和的紙燈光線鋪陳全室。從玄關的收納與端景、客廳的中島檯面、臥室的木作衣櫃，到開放與隱藏並存的廚房收納，我們用整體設計串連材質、光線與動線，讓每個區域都剛剛好。家的樣子沒有標準答案，只有最貼近屋主日常的那一種。",
    highlights: ["木質與白的溫潤基調，紙燈柔光貫穿全室", "玄關、客廳、廚房、臥室整體設計，動線一氣呵成"],
    gallery: [
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/everyday-1", caption: "開闊的客廳與紙燈柔光，是日常的一隅" },
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/everyday-2", caption: "臥室木作衣櫃，霧面玻璃拉門透著柔光" },
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/everyday-3", caption: "白與木的廚房，開放層架點出溫度" },
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/everyday-4", caption: "衣櫃內部：吊掛與抽屜，收納一目了然" },
    ],
  },
  {
    cat: RESIDENTIAL, zhName: "無痕", enName: "Seamless", tagline: "收納與門，都隱進牆面裡",
    hero: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/seamless-hero",
    meta: ["大面收納", "隱藏門設計", "清水", "台中"],
    story: "清水這個家，屋主希望空間看起來乾淨、不被櫃子和門切得零碎。生活要用的收納一樣都不能少，但不想讓它們搶走空間的安靜。我們的任務，是把大量的收納藏進牆裡，讓家維持整面的完整與留白。",
    problem: "原本的格局有外露的柱子與多道門，視覺被切得破碎，收納也不足。如何在不犧牲機能的前提下，讓空間看起來更完整、更寬，是設計的核心。",
    solution: "我們以隱藏式推門將柱子與牆體融為一體，門關上時就是一整面乾淨的牆，空間不再被切割。微水泥質感的整面收納櫃從玄關延伸到客廳，搭配木質地台與玻璃展示櫃，把生活用品、收藏與雜物分層收好。臥室則用直紋推拉門衣櫃與獨立更衣間，吊掛、層板、抽屜分區明確，收納大、卻不顯重。",
    highlights: ["隱藏式推門讓柱與牆融為一體，關上即是完整的牆面", "從玄關到臥室整面收納，機能藏起、留白留下"],
    gallery: [
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/seamless-1", caption: "直紋推拉門衣櫃，光影斜落在櫃面" },
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/seamless-2", caption: "衣櫃內部：吊掛、層板、抽屜分區明確" },
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/seamless-3", caption: "獨立更衣間，鏡面與木質放大空間" },
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/seamless-4", caption: "主臥整面收納，順勢連到後方更衣動線" },
    ],
  },
  {
    cat: RESIDENTIAL, zhName: "長案", enName: "The Long Table", tagline: "沙發背後一道長桌，讓客廳能工作也能生活",
    hero: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/the-long-table-hero",
    meta: ["客廳複合機能", "長桌書桌", "調光簾採光", "清水・台中"],
    story: "清水這個家坪數不大，屋主不希望客廳只有「看電視」一種用途。他想要一個能工作、能閱讀、能放下樂器、也能和家人一起坐下來的空間。我們把這些日常，收進一道長桌裡。",
    problem: "不大的客廳如果只擺沙發與電視，機能單一，也浪費了採光最好的位置。如何讓同一個空間身兼客廳、書房與生活角落，是這次設計要解的題。",
    solution: "我們在沙發背後設置一道吧台高度的木質長桌，它同時是書桌、吧台與工作檯，活化了原本只能放沙發的客廳。搭配弧形長虹玻璃屏風界定餐廚、又讓光線穿透；調光簾濾進的波光灑在桌面與地坪上。以自然材質與低碳綠建築的理念鋪陳，讓這個複合機能的空間，依然溫暖、明亮、自在。",
    highlights: ["沙發背後一道長桌，客廳同時是書房與生活角落", "弧形長虹玻璃與調光簾，引光入室、界定不阻斷"],
    gallery: [
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/the-long-table-1", caption: "沙發背後的長桌，是書桌，也是生活的角落" },
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/the-long-table-2", caption: "長桌延伸，串起客廳、餐廚與收納" },
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/the-long-table-3", caption: "弧形長虹玻璃屏風，引光也輕輕分界" },
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/the-long-table-4", caption: "調光簾濾進的光，落在餐桌一隅" },
    ],
  },
  {
    cat: RESIDENTIAL, zhName: "留白", enName: "Negative Space", tagline: "極簡不是少，是留白裡的呼吸與溫度",
    hero: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/negative-space-hero",
    meta: ["極簡留白", "減法生活", "北屯・台中"],
    story: "北屯的這個家，屋主想要的很簡單——一個回來能卸下疲憊、讓心安靜下來的地方。不要過多的裝飾與色彩，只要乾淨、溫潤、能好好呼吸的空間。",
    problem: "極簡最難的，是「少」之後還要有溫度，不能變得冷清空洞。如何在大量留白裡，仍讓人感到安心、被包覆，是設計要拿捏的分寸。",
    solution: "我們以留白為主軸，用米白、灰藍與木質鋪陳層次，把收納整合進一整面白色櫃體、藏起雜物，只留下乾淨的牆面與光。低台度的電視櫃、灰藍主牆、純白紗簾濾進的日光，再加上一盞玻璃吊燈的暖光，讓減法的空間依然有溫度。回到這裡，生活自然慢下來。",
    highlights: ["大量留白裡用木質與暖光留住溫度，簡而不冷", "整面白色收納藏起雜物，只留乾淨的牆與光"],
    gallery: [
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/negative-space-1", caption: "米色皮沙發面向陽台，紗簾濾入柔光" },
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/negative-space-2", caption: "餐廳整面白色收納，留一格放對講機與隨手小物" },
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/negative-space-3", caption: "大理石餐桌與玻璃吊燈，是留白中的一點溫度" },
    ],
  },
  {
    cat: RESIDENTIAL, zhName: "木格", enName: "Lattice", tagline: "讓視線延伸，空間簡約而舒緩",
    hero: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/lattice-hero",
    meta: ["簡約大方", "格柵電視牆", "日式無印", "台中"],
    story: "屋主想要的是一個簡單、開闊、能放鬆的家——不被多餘的裝飾與雜物佔據，讓視線和心情都能慢慢延展開來。我們以簡約大方為方向，把空間的線條拉長、把感受放鬆。",
    problem: "空間最怕被切得零碎、被櫃子和雜物塞滿，視覺一卡住就顯得擁擠。如何讓視線一路延伸、空間感被拉長，同時保有溫度，是這次的設計重點。",
    solution: "我們把收納整合進一整面系統櫃、收得乾淨俐落，讓牆面平整、視線一路延伸不被打斷，空間感自然被拉長。客廳以木格柵電視牆搭配石材，做出沉穩的視覺重心；廚房用黑框玻璃隔間，區隔油煙又保留通透與採光。木質與暖光鋪陳全室，讓開闊的空間依然溫潤、舒緩。",
    highlights: ["整面系統櫃收得乾淨平整，讓視線延伸、空間被拉長", "木格柵電視牆與石材，為開闊空間定下沉穩重心"],
    gallery: [
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/lattice-1", caption: "暖光下的客餐廳，紅白吊燈點出生活感" },
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/lattice-2", caption: "黑框玻璃隔間廚房，擋油煙也保留通透" },
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/lattice-3", caption: "從玄關延伸的整面系統櫃，收納藏於牆面" },
    ],
  },
  {
    cat: RESIDENTIAL, zhName: "摩卡", enName: "Mocha", tagline: "摩卡色的溫暖，讓家成為最安定的所在",
    hero: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/mocha-hero",
    meta: ["摩卡色系", "簡約風", "黑框玻璃廚房", "台中"],
    story: "屋主希望一進門就能感到安定、放鬆——不是冷調的極簡，而是帶著溫度、讓人想久待的家。我們從色彩出發，為這個家定下摩卡色的基調。",
    problem: "全室如果用太冷的灰白，會顯得理性卻少了暖意；但暖色用過頭又容易顯舊。如何用一個顏色把「溫暖」與「高級感」同時做到，是這次的關鍵。",
    solution: "我們以摩卡色作為全室主調——溫潤的大地色系帶來安心與穩定，也是近年精品與高級住宅偏愛的質感色。從電視牆、整面系統櫃到餐邊櫃都統一在這個色階裡，再用黑框玻璃隔間界定餐廚、以玻璃展示櫃與間接照明提亮層次。色彩、格局與光線一起，讓家成為讓人放鬆、充滿暖意的所在。",
    highlights: ["以摩卡大地色統一全室，溫暖又帶精品質感", "黑框玻璃隔間與展示櫃，劃分餐廚也保留通透"],
    gallery: [
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/mocha-1", caption: "黑框玻璃隔間界定餐廚，霧鏡吊燈點出層次" },
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/mocha-2", caption: "摩卡色餐邊櫃，鏡面背牆放大空間" },
    ],
  },
  {
    cat: RESIDENTIAL, zhName: "曜", enName: "Onyx", tagline: "黑白灰之間，低調而優雅的輕奢",
    hero: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/onyx-hero",
    meta: ["現代風", "黑白灰輕奢", "大理石", "台中"],
    story: "屋主嚮往的是一種低調卻有份量的居家——不喧嘩、不繁複，但每個細節都看得到質感。我們以黑、白、灰為主調，為這個家定下現代輕奢的語彙。",
    problem: "輕奢最怕流於浮誇。如何用最克制的黑白灰，做出層次與高級感，而不是一味堆砌昂貴材質，是這次設計的關鍵。",
    solution: "我們以簡潔的線條收齊空間，用黑框玻璃展示櫃、大理石與花崗岩中島堆疊出層次；深色木質電視牆沉穩內斂，間接照明把材質的紋理輕輕托出。不張揚，卻處處是質感——在低調之中展現優雅，於簡約之內藏著個性。",
    highlights: ["以黑白灰與細緻建材堆疊層次，輕奢而不浮誇", "黑框玻璃展示櫃與石材中島，低調中見份量"],
    gallery: [
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/onyx-1", caption: "餐廚與黑玻展示櫃相鄰，白色廚房在後通透延伸" },
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/onyx-2", caption: "深色木質電視牆，沉穩內斂的視覺重心" },
    ],
  },
  {
    cat: RESIDENTIAL, zhName: "悠流", enName: "Flow", tagline: "開放通透，讓光與生活自在流動",
    hero: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/flow-hero",
    meta: ["北歐無印", "開放式設計", "大書牆", "台中"],
    story: "屋主想要一個開放、通透、住起來輕盈自在的家——不要太多隔間把空間切死，讓光線和家人的動線都能自由流動。我們在設計階段就用 3D 圖把這份「流動感」模擬到位，再一比一落地。",
    problem: "原本的隔間讓公共區顯得零碎、採光也被擋住。如何打開格局、讓客廳、餐廳到後方一氣呵成，同時保留足夠的收納，是這次設計的核心。",
    solution: "我們以開放式布局打開公共區，客廳、餐廳與廚房之間不做滿牆，讓視線與光影一路流轉、空間更顯通透輕盈。一整面格子書牆兼顧收納與展示，木質家具與灰綠牆面帶來北歐的溫潤；成排吊燈界定餐桌、卻不阻斷視線。家，於是有了呼吸的節奏。",
    highlights: ["開放式布局打開公共區，光與動線自在流動", "整面格子書牆，收納與展示一次到位"],
    gallery: [
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/flow-1", caption: "米色沙發與木質家具，客廳溫潤放鬆" },
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/flow-2", caption: "餐廳串連客廳與廚房，動線開放流暢" },
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/flow-3", caption: "整面格子書牆，收納與展示一次到位" },
    ],
  },
  {
    cat: RESIDENTIAL, zhName: "歇", enName: "Repose", tagline: "奶茶色裡，把臥室留給安靜的休息",
    hero: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/repose-hero",
    meta: ["奶茶色", "侘寂簡約", "主臥設計", "台中"],
    story: "延續公共區的奶茶色調，臥室要的是更純粹的安靜——一個下班後能徹底放鬆、好好休息的角落。我們把機能收進牆面，讓睡眠的空間回到最單純的樣子。",
    problem: "臥室坪數有限，又要塞進衣櫃、書桌、床頭收納。如何在不犧牲收納的前提下，維持視覺的乾淨與放鬆感，是設計的重點。",
    solution: "以奶茶與米灰鋪陳柔和的底色，床頭整合收納層板、轉角結合衣櫃與書桌，把機能藏進簡潔的線條裡。深色懸浮層板與黑陶擺件，為一室的溫柔加上一點重量，帶出侘寂的安靜質感。",
    highlights: ["床頭、衣櫃、書桌整合進牆面，機能藏於簡潔", "奶茶色搭深色擺件，柔和中見侘寂的沉靜"],
    gallery: [
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/repose-1", caption: "床頭收納整合層板，黑色擺件點出侘寂感" },
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/repose-2", caption: "轉角結合衣櫃與書桌，機能藏在簡潔線條裡" },
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/repose-3", caption: "頂天衣櫃與抽屜，收納量足卻不顯壓迫" },
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/repose-4", caption: "深色層板與黑陶擺件，奶茶色裡的一點重量" },
    ],
  },
  {
    cat: RESIDENTIAL, zhName: "光格", enName: "Lightframe", tagline: "光影落在層架之間，鋪出溫柔的日常",
    hero: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/lightframe-hero",
    meta: ["現代簡約", "灰階木質", "發光展示層架", "豐原・台中"],
    story: "為豐原的屋主打造的家，是一份屬於未來的生活提案。屋主重視細節與質感，希望空間不只是好看，更能在每天的光影流轉裡，慢慢長出屬於自己的溫度。",
    problem: "現代風格容易做得冷硬。如何用灰階與俐落線條撐起現代感，又透過木質與光影留住生活的溫柔，是這個家要拿捏的平衡。",
    solution: "我們從光影配置與材質紋理著手：以灰階為基調，搭配木質餐桌、黑大理石量體與發光的開放層架，讓現代俐落裡有層次也有溫度。黑框玻璃拉門界定書房與公共區、又保留通透。每一處細節，都是為這位屋主量身鋪陳的日常想像。",
    highlights: ["灰階線條搭木質與發光層架，現代俐落而不冷硬", "黑框玻璃拉門界定書房，通透又獨立"],
    gallery: [
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/lightframe-1", caption: "發光開放層架界定客餐廳，材質紋理在光影中浮現" },
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/lightframe-2", caption: "多功能室以整面層板與收納，留白而有餘裕" },
    ],
  },
  {
    cat: RESIDENTIAL, zhName: "新生", enName: "Renewal", tagline: "老屋翻新，讓每一間都重新被好好生活",
    hero: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/renewal-hero",
    meta: ["老屋翻新", "套房規劃", "北歐簡約", "康樂街・台中"],
    story: "康樂街的這棟老屋，要翻新成一間間能獨立生活的套房。屋主希望每一間雖然坪數不大，卻都能採光明亮、機能完整，讓租客一住進來，就覺得這裡是個能好好生活的家。",
    problem: "老屋格局零碎，採光與管線都是挑戰。如何在有限坪數裡，把睡眠、收納、迷你廚房與獨立衛浴通通安排妥當，又不顯擁擠，是這次翻新的關鍵。",
    solution: "我們以北歐簡約為基調，灰木地板搭配白牆與黑框窗，讓每間套房都明亮通透。頂天衣櫃結合開放層板、床尾整合書桌、轉角配置迷你廚房與獨立衛浴，把機能塞得剛剛好。弧形天花與間接照明則為小空間添了一分柔和，住起來舒服，也好出租。",
    highlights: ["小坪數塞進睡眠、收納、廚房、衛浴，機能完整不擁擠", "灰木地板＋白牆＋黑框窗，每間都明亮好整理"],
    gallery: [
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/renewal-1", caption: "整面採光配書桌與迷你廚房，一個人住明亮舒適" },
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/renewal-2", caption: "頂天衣櫃結合開放層板，小坪數也有充足收納" },
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/renewal-3", caption: "床尾結合書桌與滑門衣櫃，動線俐落不佔空間" },
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/renewal-4", caption: "迷你廚房、衣櫃、衛浴一應俱全，一個人住剛剛好" },
    ],
  },
  {
    cat: RESIDENTIAL, zhName: "恰好", enName: "Just Right", tagline: "不多不少，剛好是你想要的生活",
    hero: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/just-right-hero",
    meta: ["現代輕奢", "微水泥・木質", "大理石電視牆", "太平・台中"],
    story: "太平的這間新成屋，屋主想要的不是華麗的堆疊，而是一種「恰恰好」的舒服——現代、有質感，卻又能讓人徹底放鬆。就像案名說的，櫻花開得恰恰好，生活也該如此。",
    problem: "新成屋的格局方正，但白牆與制式建材少了點個性。如何在不大動格局的前提下，用材質與光線堆出層次與溫度，讓每個空間都有記憶點，是設計的方向。",
    solution: "公共區以大理石電視牆與木質懸浮櫃體拉出大器的第一眼，弧形木格柵展示櫃則柔化線條。臥室改用微水泥牆搭木皮與深色系統櫃，嵌入燈帶讓光暈包覆睡眠區，沉穩而溫暖。多功能房以架高地板整合書桌與收納，把坪效拉到最滿。現代輕奢的底子裡，藏的是剛剛好的生活溫度。",
    highlights: ["大理石電視牆＋弧形木格柵櫃，公共區大器又柔和", "臥室微水泥嵌燈帶，光暈包覆出沉穩睡眠氛圍"],
    gallery: [
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/just-right-1", caption: "大理石電視牆鋪滿整面，搭木質懸浮櫃體俐落大器" },
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/just-right-2", caption: "主臥以微水泥、木皮與深色衣櫃，鋪出沉穩的暖度" },
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/just-right-3", caption: "床頭微水泥牆嵌燈帶，柔和光暈包覆睡眠區" },
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/just-right-4", caption: "架高地板結合書桌與收納，多功能房一坪都不浪費" },
    ],
  },
  {
    cat: RESIDENTIAL, zhName: "預見", enName: "Preview", tagline: "在動工之前，先看見家的樣子",
    hero: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/preview-hero",
    meta: ["3D 設計渲染", "現代簡約", "奶茶色・微水泥", "台中"],
    story: "還沒動工，就想先看見家完成後的樣子嗎？這個案子，我們用 3D 擬真渲染把設計提案一比一呈現出來——從家具配置到燈光氛圍，讓屋主在施工前就能身歷其境地確認每個細節。",
    problem: "平面圖很難想像實際住起來的感覺。色彩、材質、光線與家具比例，光看 2D 圖容易有落差，等做出來才發現不對，往往為時已晚。",
    solution: "我們以奶茶色與微水泥鋪陳溫潤的現代簡約：微水泥電視牆搭木地板、開放式餐廚整合電器收納櫃、灰布沙發配圓几與球形吊燈。透過 3D 渲染，這些細節在動工前就能反覆討論、修正到滿意，把「做出來不如預期」的風險降到最低。",
    highlights: ["3D 擬真渲染，動工前先確認材質、光線與家具配置", "奶茶色＋微水泥的現代簡約，溫潤而耐看"],
    gallery: [
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/preview-1", caption: "灰布沙發面向採光，客廳留出開闊的活動尺度" },
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/preview-2", caption: "微水泥電視牆搭懸浮木質櫃，溫潤又俐落" },
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/preview-3", caption: "開放式餐廚整合電器收納，圓桌串起餐廳與廚房" },
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/preview-4", caption: "電器收納櫃內嵌咖啡機與微波爐，機能藏得剛好" },
    ],
  },
  {
    cat: COMMERCIAL, zhName: "酵境", enName: "Catalyst", tagline: "把酵素科學，變成走得進去的空間",
    hero: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/catalyst-hero",
    meta: ["商業空間", "餐飲店舖", "壹偲 OnlyEase", "新竹竹科"],
    story: "壹偲 OnlyEase 是主打無加糖酵素保健的手搖飲品牌，從台中起家，這次要在新竹竹科開第二家店。品牌想說的不是「又一家手搖飲」，而是「喝的保養品」——所以空間要讓人一走進來，就感覺到專業、乾淨，跟健康有關。",
    problem: "手搖飲在多數人印象裡熱鬧、平價、同質性高。但壹偲的定位是保健酵素，訴求與客單都更高；若照一般手搖店的視覺去做，反而會稀釋品牌的專業感與信任。",
    solution: "我們把「酵素科學」直接變成空間語言。以黃白品牌色為基調，六角分子幾何貫穿取餐窗、嵌入層架，並做成一整面酵素分子結構壓花牆；檯面與桌腳採不鏽鋼，飲品以錐形瓶、量杯盛裝，把實驗室的乾淨與精密帶進日常。深灰主牆襯托品牌主張 Refresh, Revive, Rejoice，讓每位走進來的人，先感覺到「這是喝的保養品」。",
    highlights: ["六角分子幾何貫穿全店，把酵素科學變成可感知的空間語言", "黃白品牌色＋不鏽鋼實驗室質感，建立保健飲品的專業信任感"],
    gallery: [
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/catalyst-1", caption: "圓柱展示台以不鏽鋼飾帶收邊，搭配六角壁龕陳列 001 ENZYME 酵素產品，延續分子與實驗室語彙" },
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/catalyst-2", caption: "整面酵素分子結構壓花牆，把化學式變成低調的藝術" },
      { src: "https://res.cloudinary.com/dfvmjmwb7/image/upload/kfz/catalyst-3", caption: "錐形瓶、量杯盛裝飲品，延續實驗室的精密與乾淨" },
    ],
  },
];

const PRESENT_CATS = [...new Set(CASES.map((c) => c.cat))];
export const CATS: string[] = ["全部", ...[RESIDENTIAL, COMMERCIAL].filter((c) => PRESENT_CATS.includes(c))];

/** enName -> url slug. Keeps "&" as "and". e.g. "Smoke & Stone" -> "smoke-and-stone" */
export function slugify(enName: string): string {
  return enName
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const caseSlugs = CASES.map((c) => slugify(c.enName));

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return CASES.find((c) => slugify(c.enName) === slug);
}
