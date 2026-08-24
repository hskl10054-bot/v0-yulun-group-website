import type { Metadata } from "next"
import DesignClient from "./design-client"
import { LatestArticles } from "@/components/latest-articles"

// 每小時重新驗證，讓排程文章到期後自動出現在「延伸閱讀」
export const revalidate = 3600

export const metadata: Metadata = {
  title: "空房子室內設計｜台中室內設計｜新成屋、預售屋客變、老屋翻新",
  description:
    "空房子室內設計深耕台中，專精新成屋設計、預售屋客變、老屋翻新與商業空間規劃。以美學與機能並重的設計，為台中屋主構築理想生活空間，立即預約免費諮詢。",
  alternates: { canonical: "https://www.yulungroup.com/design" },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "https://www.yulungroup.com/design",
    siteName: "裕綸集團 Yulun Group",
    title: "空房子室內設計｜台中室內設計｜新成屋、預售屋客變、老屋翻新",
    description:
      "空房子室內設計深耕台中，專精新成屋設計、預售屋客變、老屋翻新與商業空間規劃，為台中屋主構築理想生活空間。",
    images: [{ url: "/images/hero-bg.jpg", width: 1567, height: 1045, alt: "空房子室內設計｜台中室內設計" }],
  },
}

export default function Page() {
  return <DesignClient journal={<LatestArticles bg="#F5F0E8" />} />
}
