import type { Metadata } from "next"
import DesignClient from "./design-client"

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
  },
}

export default function Page() {
  return <DesignClient />
}
