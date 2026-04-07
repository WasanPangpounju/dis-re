'use client'

import Link from 'next/link'
import { STATS } from '@/lib/constants'

export default function HeroSection() {
  return (
    <section
      aria-label="แบนเนอร์หลัก"
      style={{
        minHeight: '100vh',
        background: `radial-gradient(ellipse at 70% 50%, rgba(27,126,106,0.25) 0%, transparent 60%),
                     radial-gradient(ellipse at 10% 80%, rgba(212,168,67,0.15) 0%, transparent 50%),
                     #0D2B45`,
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '70px',
      }}
    >
      {/* Diagonal pattern */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0, rgba(255,255,255,0.02) 1px, transparent 0, transparent 50%)',
          backgroundSize: '30px 30px',
        }}
      />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '80px 24px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '60px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Left content */}
        <div>
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(45,168,142,0.15)',
              border: '1px solid rgba(45,168,142,0.3)',
              borderRadius: '24px',
              padding: '8px 18px',
              marginBottom: '28px',
            }}
          >
            <span
              aria-hidden="true"
              className="animate-pulse-dot"
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#2DA88E',
                display: 'inline-block',
              }}
            />
            <span style={{ color: '#2DA88E', fontSize: '15px', fontWeight: 600 }}>
              วิสาหกิจเพื่อสังคม จดทะเบียนแล้ว
            </span>
          </div>

          {/* H1 */}
          <h1
            style={{
              fontFamily: 'var(--font-kanit)',
              fontWeight: 700,
              fontSize: 'clamp(36px, 5vw, 64px)',
              color: 'white',
              lineHeight: 1.25,
              margin: '0 0 24px',
            }}
          >
            นวัตกรรมเพื่อ
            <br />
            <span style={{ color: '#D4A843' }}>คนพิการ</span>ทุกคน
          </h1>

          <p
            style={{
              fontSize: '20px',
              color: 'rgba(255,255,255,0.8)',
              lineHeight: 1.8,
              marginBottom: '36px',
              maxWidth: '540px',
            }}
          >
            วิสาหกิจเพื่อสังคมที่มุ่งสร้างนวัตกรรมและงานวิจัย เพื่อยกระดับคุณภาพชีวิตคนพิการในประเทศไทย
            ด้วยเทคโนโลยีและการออกแบบที่ครอบคลุมทุกคน
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link
              href="/portfolio"
              style={{
                padding: '16px 32px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #1B7E6A, #2DA88E)',
                color: 'white',
                textDecoration: 'none',
                fontFamily: 'var(--font-sarabun)',
                fontWeight: 700,
                fontSize: '18px',
                transition: 'opacity 0.2s, transform 0.2s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.9'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              🔬 ดูผลงานวิจัย
            </Link>
            <Link
              href="/#chatbot"
              style={{
                padding: '16px 32px',
                borderRadius: '12px',
                background: 'transparent',
                color: 'white',
                textDecoration: 'none',
                fontFamily: 'var(--font-sarabun)',
                fontWeight: 700,
                fontSize: '18px',
                border: '2px solid rgba(255,255,255,0.4)',
                transition: 'border-color 0.2s, transform 0.2s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              💬 ถามเรื่องสุขภาพ
            </Link>
          </div>

          {/* Stats */}
          <div
            style={{
              display: 'flex',
              gap: '32px',
              marginTop: '52px',
              paddingTop: '32px',
              borderTop: '1px solid rgba(255,255,255,0.15)',
              flexWrap: 'wrap',
            }}
          >
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div
                  style={{
                    fontFamily: 'var(--font-kanit)',
                    fontWeight: 700,
                    fontSize: '36px',
                    color: '#D4A843',
                    lineHeight: 1,
                  }}
                >
                  {stat.number}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', marginTop: '4px' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Orbit visual */}
        <div
          aria-hidden="true"
          className="hidden lg:flex"
          style={{
            width: '420px',
            height: '420px',
            position: 'relative',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Center */}
          <div
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #1B7E6A, #2DA88E)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              zIndex: 2,
              position: 'relative',
              boxShadow: '0 0 40px rgba(45,168,142,0.4)',
            }}
          >
            ♿
          </div>

          {/* Orbit 1 */}
          <div
            className="animate-orbit"
            style={{
              position: 'absolute',
              width: '240px',
              height: '240px',
              borderRadius: '50%',
              border: '1px solid rgba(45,168,142,0.3)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-18px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(27,126,106,0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
              }}
            >
              👁️
            </div>
          </div>

          {/* Orbit 2 */}
          <div
            className="animate-orbit-reverse"
            style={{
              position: 'absolute',
              width: '340px',
              height: '340px',
              borderRadius: '50%',
              border: '1px solid rgba(212,168,67,0.2)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-18px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(212,168,67,0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
              }}
            >
              👂
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '-18px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(212,168,67,0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
              }}
            >
              🤝
            </div>
          </div>

          {/* Orbit 3 */}
          <div
            style={{
              position: 'absolute',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              border: '1px dashed rgba(255,255,255,0.08)',
            }}
          />
        </div>
      </div>
    </section>
  )
}
