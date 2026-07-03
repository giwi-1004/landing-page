import type { Metadata, Viewport } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'

import { META_PIXEL_ID } from '@/lib/fbPixelId'

import './globals.css'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-noto-sans-kr',
})

export const metadata: Metadata = {
  title: '내 보험 순환계 보장 확인 | 무료 점검',
  description: '내 보험에 순환계 보장이 빠져 있을 수 있습니다. 1분 안에 무료로 확인해보세요.',
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
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#293681',
  viewportFit: 'cover',
}

const META_PIXEL_SCRIPT =
  "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?" +
  "n.callMethod.apply(n,arguments):n.queue.push(arguments)};" +
  "if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';" +
  "n.queue=[];t=b.createElement(e);t.async=!0;" +
  "t.src=v;s=b.getElementsByTagName(e)[0];" +
  "s.parentNode.insertBefore(t,s)}(window,document,'script'," +
  "'https://connect.facebook.net/en_US/fbevents.js');" +
  "fbq('init','" +
  META_PIXEL_ID +
  "');" +
  "fbq('track','PageView');"

const GA4_MEASUREMENT_ID = 'G-ZH7ZX0FWGV'

const GA4_GTAG_SCRIPT = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA4_MEASUREMENT_ID}');`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body
        className={`${notoSansKR.variable} min-h-dvh overflow-x-hidden font-sans antialiased`}
      >
        <Script
          id="fbPixelInit"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: META_PIXEL_SCRIPT }}
        />
        <noscript>
          <img
            height={1}
            width={1}
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {GA4_GTAG_SCRIPT}
        </Script>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
