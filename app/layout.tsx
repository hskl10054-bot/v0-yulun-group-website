import type { Metadata, Viewport } from 'next'
import { Noto_Sans_TC, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { MetaPixel } from '@/components/analytics/meta-pixel'
import { GoogleAnalytics } from '@/components/analytics/google-analytics'
import './globals.css'

const _notoSansTC = Noto_Sans_TC({ subsets: ["latin"], weight: ["300", "400", "500", "700", "900"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: '裕綸集團 Yulun Group',
  description: '裕綸集團深耕台中多年，以「空房子室內設計」注入空間美學，並由「裕綸室內裝修」提供專業嚴謹的工程保障，結合「同齊咖啡」場域連結生活溫度。我們提供從設計到工程的一站式整合服務，以穩健的經營與職人精神，為每一位客戶守護家的品質。',
  generator: 'v0.app',
  verification: {
    other: {
      'facebook-domain-verification': '9wfhkv5a1qzipvbj49wjewj5vkf7zr',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
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
        <MetaPixel />
        <GoogleAnalytics />
        <Analytics />
      </body>
    </html>
  )
}
