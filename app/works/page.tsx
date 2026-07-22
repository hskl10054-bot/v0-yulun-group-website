import type { Metadata } from "next"
import WorksIndexPage from "./works-client"

export const metadata: Metadata = {
  title: "作品案例｜台中室內設計與裝修實績－裕綸集團",
  description:
    "瀏覽裕綸集團台中室內設計與裝修作品案例，涵蓋新成屋設計、預售屋客變、老屋翻新與商業空間。真實完工實績，見證從設計到施工的一站式品質。",
  alternates: { canonical: "https://www.yulungroup.com/works" },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "https://www.yulungroup.com/works",
    siteName: "裕綸集團 Yulun Group",
    title: "作品案例｜台中室內設計與裝修實績－裕綸集團",
    description:
      "裕綸集團台中室內設計與裝修作品案例，涵蓋新成屋、預售屋客變、老屋翻新與商業空間的真實完工實績。",
    images: [{ url: "/images/hero-bg.jpg", width: 1567, height: 1045, alt: "裕綸集團台中室內設計與裝修作品案例" }],
  },
}

export default function Page() {
  return <WorksIndexPage />
}
