import type { Metadata } from 'next'
import { Sarabun, Kanit } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SkipLink from '@/components/layout/SkipLink'
import ChatWidget from '@/components/chat/ChatWidget'

const sarabun = Sarabun({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sarabun',
  display: 'swap',
})

const kanit = Kanit({
  subsets: ['thai', 'latin'],
  weight: ['300', '500', '700'],
  variable: '--font-kanit',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'การวิจัยนวัตกรรมเพื่อคนพิการ | วิสาหกิจเพื่อสังคม',
    template: '%s | การวิจัยนวัตกรรมเพื่อคนพิการ',
  },
  description:
    'วิสาหกิจเพื่อสังคมที่มุ่งสร้างนวัตกรรมและงานวิจัย เพื่อยกระดับคุณภาพชีวิตคนพิการในประเทศไทยอย่างยั่งยืน',
  keywords: [
    'คนพิการ',
    'นวัตกรรม',
    'วิจัย',
    'วิสาหกิจเพื่อสังคม',
    'assistive technology',
    'accessibility',
    'WCAG',
  ],
  authors: [{ name: 'บริษัท การวิจัยนวัตกรรมเพื่อคนพิการ วิสาหกิจเพื่อสังคม จำกัด' }],
  openGraph: {
    title: 'การวิจัยนวัตกรรมเพื่อคนพิการ | วิสาหกิจเพื่อสังคม',
    description:
      'วิสาหกิจเพื่อสังคมที่มุ่งสร้างนวัตกรรมและงานวิจัย เพื่อยกระดับคุณภาพชีวิตคนพิการในประเทศไทยอย่างยั่งยืน',
    locale: 'th_TH',
    type: 'website',
    siteName: 'การวิจัยนวัตกรรมเพื่อคนพิการ',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'การวิจัยนวัตกรรมเพื่อคนพิการ วิสาหกิจเพื่อสังคม',
      },
    ],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="th" className={`${sarabun.variable} ${kanit.variable}`}>
      <body>
        <SkipLink />
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <ChatWidget />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`,
              }}
            />
          </>
        )}
      </body>
    </html>
  )
}
