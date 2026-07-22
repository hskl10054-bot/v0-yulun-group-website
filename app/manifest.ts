import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "裕綸集團 Yulun Group",
    short_name: "裕綸集團",
    description:
      "裕綸集團｜台中室內設計與裝修一站式服務。整合空房子室內設計與裕綸室內裝修，提供新成屋、預售屋客變、老屋翻新及商業空間設計施工。",
    lang: "zh-TW",
    start_url: "/",
    display: "standalone",
    background_color: "#F5EFE6",
    theme_color: "#2F2F2F",
    icons: [
      { src: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  }
}
