import type { CSSProperties } from "react"

// 手繪風精緻建築平面圖（純線稿，無文字雜訊）— 作為裝修頁「為什麼選擇我們」的底圖。
// stroke 使用 currentColor，顏色與淡化由外層控制。
export function FloorPlanArt({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 1200 780"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* 外牆（雙線） */}
      <g strokeWidth="8">
        <path d="M60 70 H1140 V710 H60 Z" />
      </g>
      <g strokeWidth="1.4">
        <path d="M74 84 H1126 V696 H74 Z" />
      </g>

      {/* 隔間牆（留門洞） */}
      <g strokeWidth="4.5">
        {/* 左中直牆 x=470 */}
        <path d="M470 70 V250" />
        <path d="M470 330 V430" />
        <path d="M470 560 V710" />
        {/* 中右直牆 x=830 */}
        <path d="M830 70 V210" />
        <path d="M830 290 V560" />
        <path d="M830 640 V710" />
        {/* 中央橫牆 y=430（餐廳/玄關） */}
        <path d="M470 430 H620" />
        <path d="M720 430 H830" />
        {/* 右側橫牆 y=390（主臥/衛浴） */}
        <path d="M830 390 H1010" />
        {/* 衛浴牆 */}
        <path d="M1010 390 V520" />
        <path d="M1010 600 V710" />
        <path d="M1010 520 H1140" />
      </g>

      {/* 門扇開闔弧線 */}
      <g strokeWidth="1.4">
        <path d="M470 250 A80 80 0 0 1 550 330" /><path d="M470 250 V330" opacity="0" />
        <path d="M830 210 A80 80 0 0 0 750 290" />
        <path d="M830 560 A80 80 0 0 1 750 640" />
        <path d="M620 430 A80 80 0 0 1 700 510" />
        <path d="M1010 520 A70 70 0 0 1 940 590" />
        {/* 大門（下方外牆開口 + 弧） */}
        <path d="M560 710 A90 90 0 0 1 650 620" />
      </g>

      {/* 窗（外牆三平行線） */}
      <g strokeWidth="1.2">
        <path d="M200 70 H340 M200 76 H340 M200 82 H340" />
        <path d="M900 70 H1050 M900 76 H1050 M900 82 H1050" />
        <path d="M60 250 V380 M66 250 V380 M72 250 V380" />
        <path d="M1140 200 V320 M1134 200 V320 M1128 200 V320" />
        <path d="M1140 560 V660 M1134 560 V660 M1128 560 V660" />
      </g>

      {/* 家具與設備（細線） */}
      <g strokeWidth="1.6">
        {/* 廚房：檯面＋水槽＋爐 */}
        <path d="M84 92 H430 V150 H84 Z" />
        <rect x="150" y="104" width="70" height="34" rx="4" />
        <circle cx="300" cy="121" r="15" /><circle cx="350" cy="121" r="15" />
        {/* 中島 */}
        <rect x="150" y="250" width="180" height="72" rx="6" />

        {/* 客廳：沙發＋茶几＋電視 */}
        <path d="M110 616 h250 a10 10 0 0 1 10 10 v54 h-270 v-54 a10 10 0 0 1 10 -10 Z" />
        <path d="M110 640 H370" />
        <rect x="175" y="548" width="120" height="46" rx="6" />
        <rect x="70" y="520" width="7" height="110" />
        {/* 單椅 */}
        <rect x="300" y="500" width="60" height="60" rx="10" />

        {/* 餐廳：圓桌＋座椅 */}
        <circle cx="650" cy="235" r="72" />
        <circle cx="650" cy="235" r="6" />
        {[0,60,120,180,240,300].map((a)=>{const r=(a*Math.PI)/180;const cx=650+Math.cos(r)*100;const cy=235+Math.sin(r)*100;return <rect key={a} x={cx-16} y={cy-16} width="32" height="32" rx="8" />})}

        {/* 玄關：鞋櫃＋端景 */}
        <rect x="484" y="560" width="130" height="30" rx="3" />
        <rect x="640" y="640" width="60" height="60" rx="4" />

        {/* 主臥：雙人床＋衣櫃＋床頭櫃 */}
        <path d="M960 110 h120 a8 8 0 0 1 8 8 v170 h-136 v-170 a8 8 0 0 1 8 -8 Z" />
        <rect x="972" y="122" width="44" height="30" rx="4" /><rect x="1024" y="122" width="44" height="30" rx="4" />
        <path d="M936 116 v176" />
        <rect x="850" y="96" width="40" height="180" rx="3" /><path d="M870 96 V276" strokeWidth="1" />
        <rect x="1096" y="120" width="30" height="30" rx="3" />

        {/* 次臥：單／雙床＋衣櫃 */}
        <path d="M856 470 h100 a8 8 0 0 1 8 8 v150 h-116 v-150 a8 8 0 0 1 8 -8 Z" />
        <rect x="868" y="482" width="76" height="26" rx="4" />
        <rect x="856" y="650" width="120" height="34" rx="3" /><path d="M916 650 V684" strokeWidth="1" />

        {/* 衛浴：馬桶＋面盆＋浴缸 */}
        <path d="M1030 548 q0 -22 22 -22 q22 0 22 22 v28 h-44 Z" />
        <rect x="1092" y="536" width="40" height="26" rx="4" /><circle cx="1112" cy="549" r="8" />
        <rect x="1028" y="612" width="104" height="72" rx="12" /><circle cx="1116" cy="648" r="6" />

        {/* 電梯／樓梯（右下角意象） */}
        <rect x="720" y="470" width="96" height="120" />
        <path d="M720 490 H816 M720 510 H816 M720 530 H816 M720 550 H816 M720 570 H816" strokeWidth="1" />
      </g>

      {/* 尺寸標註 */}
      <g strokeWidth="1">
        <path d="M60 42 H1140" />
        <path d="M60 34 V50 M470 34 V50 M830 34 V50 M1140 34 V50" />
        <path d="M42 70 V710" />
        <path d="M34 70 H50 M34 390 H50 M34 710 H50" />
      </g>
    </svg>
  )
}
