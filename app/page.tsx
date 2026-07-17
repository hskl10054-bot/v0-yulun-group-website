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
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema).replace(/</g, "\\u003c"),
        }}
      />
      <HomePageClient />
    </>
  )
}
