import type { Metadata, Viewport } from 'next'
import { Noto_Sans_TC, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _notoSansTC = Noto_Sans_TC({ subsets: ["latin"], weight: ["300", "400", "500", "700", "900"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: '裕綸室內裝修有限公司｜打造有溫度的生活空間',
  description: '裕綸集團（Yulun Group）旗下的「空房子室內設計」成立於台中，專注於住宅與商業空間的整體規劃。品牌核心理念是拒絕複製，強調從屋主的生活習慣與夢想出發，打造獨一無二的空間故事。具備 8 年品牌經驗與超過 200 個完成案例，並提供從設計、軟裝到工程統籌的一條龍服務。',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#2F2F2F',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-TW">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
