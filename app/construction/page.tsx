import type { Metadata } from "next"
import ConstructionClient from "./construction-client"

export const metadata: Metadata = {
  title: "台中室內裝修統包工程｜自有工班、透明報價－裕綸室內裝修",
  description:
    "裕綸室內裝修提供台中室內裝修工程，自有工班不外包、標準化 SOP 施工、工程保固一年、逐項清單透明報價。從拆除到完工一站到位，立即預約現場勘估。",
  alternates: { canonical: "https://www.yulungroup.com/construction" },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "https://www.yulungroup.com/construction",
    siteName: "裕綸集團 Yulun Group",
    title: "台中室內裝修統包工程｜自有工班、透明報價－裕綸室內裝修",
    description:
      "台中室內裝修工程，自有工班不外包、標準化 SOP 施工、工程保固一年、透明報價，從拆除到完工一站到位。",
    images: [{ url: "/images/hero-bg.jpg", width: 1567, height: 1045, alt: "裕綸室內裝修｜台中室內裝修工程" }],
  },
}

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.yulungroup.com/construction#org",
  name: "裕綸室內裝修",
  url: "https://www.yulungroup.com/construction",
  parentOrganization: { "@id": "https://www.yulungroup.com/#localbusiness" },
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.yulungroup.com/construction#service",
  name: "台中室內裝修工程",
  serviceType: "室內裝修統包",
  provider: { "@id": "https://www.yulungroup.com/construction#org" },
  areaServed: { "@type": "City", name: "台中市" },
  description: "自有工班、標準化 SOP 施工的台中室內裝修統包工程，從拆除到完工一站到位，逐項清單透明報價、工程保固一年。",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "室內裝修工程",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "拆除與結構補強" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "水電系統" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "防水隔音" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "木作" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "系統家具" } },
    ],
  },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "首頁", item: "https://www.yulungroup.com/" },
    { "@type": "ListItem", position: 2, name: "台中室內裝修", item: "https://www.yulungroup.com/construction" },
  ],
}

export default function Page() {
  return (
    <>
      {[orgSchema, serviceSchema, breadcrumbSchema].map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s).replace(/</g, "\\u003c") }} />
      ))}
      <ConstructionClient />
    </>
  )
}
