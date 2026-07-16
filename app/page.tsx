import type { Metadata } from "next"
import { HomePageClient } from "@/components/home-page-client"

export const metadata: Metadata = {
  title: "台中室內設計公司｜設計裝修一站式、自有工班－裕綸集團",
  description:
    "裕綸集團深耕台中超過14年，整合空房子室內設計與裕綸室內裝修，提供新成屋、預售屋客變、老屋翻新及商空設計施工。自有工班、透明報價，立即預約諮詢。",
  alternates: {
    canonical: "https://www.yulungroup.com/",
  },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "https://www.yulungroup.com/",
    siteName: "裕綸集團 Yulun Group",
    title: "台中室內設計公司｜設計裝修一站式、自有工班－裕綸集團",
    description:
      "裕綸集團深耕台中超過14年，整合室內設計與專業裝修工程，提供台中屋主一站式服務。",
  },
}

export default function Home() {
  return <HomePageClient />
}
