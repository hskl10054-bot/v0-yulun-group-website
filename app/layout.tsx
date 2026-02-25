import type { Metadata, Viewport } from 'next'
import { Noto_Sans_TC, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _notoSansTC = Noto_Sans_TC({ subsets: ["latin"], weight: ["300", "400", "500", "700", "900"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: '裕綸集團 Yulun Group｜從空間美學到精準工程',
  description: '裕綸集團提供一站式居住解決方案，旗下「空房子室內設計」與「裕綸室內裝修工程」兩大品牌，從美學規劃到精準施工，打造您的理想空間。',
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
