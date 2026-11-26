import type { Metadata } from "next"
import { HomePageClient } from "@/components/home-page-client"
import { LatestArticles } from "@/components/latest-articles"
import { FAQS } from "@/data/faqs"
import { getHeroImagesServer } from "@/lib/home-server"

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": "https://www.yulungroup.com/#localbusiness",
  name: "裕綸集團",
  alternateName: ["Yulun Group", "空房子室內設計", "裕綸室內裝修"],
  description:
    "台中室內設計與裝修一站式服務，整合空房子室內設計與裕綸室內裝修，自有工班、透明報價。",
  url: "https://www.yulungroup.com/",
  logo: "https://www.yulungroup.com/icon-512.png",
  image: "https://www.yulungroup.com/images/hero-bg.jpg",
  telephone: "+886-4-2247-9068",
  email: "yulun83417215@gmail.com",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "瀋陽北路73號",
    addressLocality: "北屯區",
    addressRegion: "台中市",
    postalCode: "406",
    addressCountry: "TW",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "24.177687",
    longitude: "120.672438",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  areaServed: [
    { "@type": "City", name: "台中市" },
    { "@type": "AdministrativeArea", name: "北屯區" },
    { "@type": "AdministrativeArea", name: "南屯區" },
    { "@type": "AdministrativeArea", name: "西屯區" },
    { "@type": "AdministrativeArea", name: "太平區" },
    { "@type": "AdministrativeArea", name: "豐原區" },
    { "@type": "AdministrativeArea", name: "沙鹿區" },
    { "@type": "AdministrativeArea", name: "清水區" },
    { "@type": "AdministrativeArea", name: "梧棲區" },
  ],
  sameAs: [
    "https://www.facebook.com/p/%E7%A9%BA%E6%88%BF%E5%AD%90%E8%A8%AD%E8%A8%88-61564720748448/",
    "https://www.instagram.com/human_design.space/",
    "https://www.youtube.com/@%E5%A5%87%E5%A5%87%E5%A6%99%E5%A6%99%E5%B1%8B",
  ],
  subOrganization: [
    { "@type": "Organization", "@id": "https://www.yulungroup.com/design#org", name: "空房子室內設計", url: "https://www.yulungroup.com/design" },
    { "@type": "Organization", "@id": "https://www.yulungroup.com/construction#org", name: "裕綸室內裝修", url: "https://www.yulungroup.com/construction" },
    { "@type": "CafeOrCoffeeShop", name: "同齊咖啡", url: "https://www.yulungroup.com/cafe" },
  ],
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
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
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

// 每 10 分鐘重新驗證，讓後台改圖會反映，同時保持靜態般的速度。
export const revalidate = 600

export default async function Home() {
  const heroImages = await getHeroImagesServer()
  return (
    <>
      {/* 預先載入首圖，改善行動版 LCP */}
      {heroImages[0] && (
        <link rel="preload" as="image" href={heroImages[0]} fetchPriority="high" />
      )}
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
      <HomePageClient initialHero={heroImages} journal={<LatestArticles />} />
    </>
  )
}
