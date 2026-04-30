import { Suspense } from 'react'
import type { Metadata } from 'next'
import PortfolioContent from '@/components/portfolio/PortfolioContent'

export const metadata: Metadata = {
  title: 'ผลงาน',
  description: 'ผลงานทั้งหมดที่เราภูมิใจนำเสนอ ตั้งแต่งานวิจัยพื้นฐานถึงผลิตภัณฑ์ที่ใช้งานได้จริง',
}

export default function PortfolioPage() {
  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh' }}>
      {/* Hero */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--navy), var(--navy-mid))',
          padding: '80px 24px',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            background: 'rgba(45,168,142,0.2)',
            color: '#2DA88E',
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '15px',
            fontWeight: 600,
            marginBottom: '16px',
          }}
        >
          ผลงานทั้งหมด
        </span>
        <h1
          style={{
            fontFamily: 'var(--font-kanit)',
            fontWeight: 700,
            fontSize: 'clamp(32px, 5vw, 52px)',
            color: 'white',
            margin: '0 0 16px',
          }}
        >
          โครงการและ<span style={{ color: '#2DA88E' }}>ผลงานวิจัย</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '560px', margin: '0 auto' }}>
          ผลงานทั้งหมดที่เราภูมิใจนำเสนอ ตั้งแต่งานวิจัยพื้นฐานถึงผลิตภัณฑ์ที่ใช้งานได้จริง
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px' }}>
        <Suspense fallback={null}>
          <PortfolioContent />
        </Suspense>
      </div>
    </div>
  )
}
