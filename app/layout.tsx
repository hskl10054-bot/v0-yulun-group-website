import type { Metadata, Viewport } from 'next'
import { Noto_Sans_TC, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { MetaPixel } from '@/components/analytics/meta-pixel'
import { GoogleAnalytics } from '@/components/analytics/google-analytics'
import { FloatingContact } from '@/components/floating-contact'
import './globals.css'

const _notoSansTC = Noto_Sans_TC({ subsets: ["latin"], weight: ["300", "400", "500", "700", "900"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.yulungroup.com'),
  title: '裕綸集團 Yulun Group',
  description: '裕綸集團｜台中室內設計與裝修的一站式服務。整合空房子室內設計、裕綸室內裝修與同齊咖啡，以職人精神為您構築理想生活空間。',
  generator: 'v0.app',
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    siteName: '裕綸集團 Yulun Group',
    title: '裕綸集團 Yulun Group｜台中室內設計與裝修',
    description: '裕綸集團｜台中室內設計與裝修一站式服務。整合空房子室內設計、裕綸室內裝修與同齊咖啡，以職人精神為您構築理想生活空間。',
    images: [{ url: '/images/hero-bg.jpg', width: 1567, height: 1045, alt: '裕綸集團｜台中室內設計與裝修' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '裕綸集團 Yulun Group｜台中室內設計與裝修',
    description: '台中室內設計與裝修一站式服務，整合空房子室內設計與裕綸室內裝修，自有工班、透明報價。',
    images: ['/images/hero-bg.jpg'],
  },
  verification: {
    google: 'eHkHM583xYYXD8Wau3j9VH4cWoARVF0X4RblXAKR81s',
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <FloatingContact />
        <MetaPixel />
        <GoogleAnalytics />
        <Analytics />
      </body>
    </html>
  )
}
