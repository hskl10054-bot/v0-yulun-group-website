import type { Metadata } from "next"
import CafeClient from "./cafe-client"

export const metadata: Metadata = {
  title: "同齊咖啡 tâng tsê｜台中咖啡廳空間設計案例－裕綸集團",
  description:
    "同齊咖啡由裕綸集團打造，從品牌精神到空間細節的商業空間設計實例。了解裕綸如何為餐飲與商業品牌，規劃兼具美學與營運機能的台中咖啡廳空間。",
  alternates: { canonical: "https://www.yulungroup.com/cafe" },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "https://www.yulungroup.com/cafe",
    siteName: "裕綸集團 Yulun Group",
    title: "同齊咖啡 tâng tsê｜台中咖啡廳空間設計案例－裕綸集團",
    description:
      "同齊咖啡由裕綸集團打造，兼具美學與營運機能的台中咖啡廳商業空間設計實例。",
  },
}

export default function Page() {
  return <CafeClient />
}
