import type { Metadata } from "next"
import ConstructionClient from "./construction-client"

export const metadata: Metadata = {
  title: "裕綸室內裝修｜台中室內裝修工程｜自有工班、透明報價",
  description:
    "裕綸室內裝修提供台中室內裝修工程，自有工班不外包、標準化 SOP 施工、工程保固一年、逐項清單透明報價。從拆除到完工一站到位，立即預約現場勘估。",
  alternates: { canonical: "https://www.yulungroup.com/construction" },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "https://www.yulungroup.com/construction",
    siteName: "裕綸集團 Yulun Group",
    title: "裕綸室內裝修｜台中室內裝修工程｜自有工班、透明報價",
    description:
      "台中室內裝修工程，自有工班不外包、標準化 SOP 施工、工程保固一年、透明報價，從拆除到完工一站到位。",
  },
}

export default function Page() {
  return <ConstructionClient />
}
