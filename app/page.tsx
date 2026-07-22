import type { Metadata } from "next"
import { HomePageClient } from "@/components/home-page-client"

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.yulungroup.com/#localbusiness",
  name: "裕綸集團",
  alternateName: "Yulun Group",
  url: "https://www.yulungroup.com/",
  logo: "https://www.yulungroup.com/icon-512.png",
  image: "https://www.yulungroup.com/images/hero-bg.jpg",
  telephone: "+886-4-2247-9068",
  email: "yulun83417215@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "瀋陽北路73號",
    addressLocality: "北屯區",
    addressRegion: "台中市",
    addressCountry: "TW",
  },
  areaServed: {
    "@type": "City",
    name: "台中市",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "室內設計與裝修服務",
    itemListElement: [
      "新成屋室內設計",
      "預售屋客變",
      "老屋翻新",
      "商業空間設計",
      "室內裝修工程",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name,
        areaServed: "台中市",
      },
    })),
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "台中室內設計費用？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "台中室內設計費用依坪數、格局與需求而定。空房子室內設計全估裝修 88 萬起、包套全裝每坪最低 5 萬起，歡迎預約免費諮詢取得專屬報價。",
      },
    },
    {
      "@type": "Question",
      name: "設計到完工多久？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "一般 15–25 坪約 2 個月完工、26–40 坪約 3 個月交屋，實際依施工項目調整。裕綸自有工班、標準化 SOP 管理，進度全程可追蹤。",
      },
    },
    {
      "@type": "Question",
      name: "如何預約免費的空間格局諮詢？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "可透過官網預約表單或 Facebook Messenger 私訊，留下坪數與需求，專人將與您聯繫安排免費的空間格局諮詢。",
      },
    },
    {
      "@type": "Question",
      name: "請問裝修預算與進度怎麼做到透明？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "裕綸室內裝修採逐項清單報價、標準化 SOP 工程管理，自有工班不外包、工程保固一年，預算與進度全程公開可追蹤。",
      },
    },
  ],
}

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
    images: [{ url: "/images/hero-bg.jpg", width: 1567, height: 1045, alt: "裕綸集團｜台中室內設計與裝修" }],
  },
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />
      <HomePageClient />
    </>
  )
}
