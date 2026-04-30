'use client'

import Link from 'next/link'
import { STATS } from '@/lib/constants'
import type { Stat } from '@/lib/types'

const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
    <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/>
  </svg>
)

export default function HeroSection({ stats: statsProp }: { stats?: Stat[] } = {}) {
  const stats = statsProp ?? STATS
  return (
    <section
      aria-label="แบนเนอร์หลัก"
      className="flex flex-col-reverse lg:flex-row"
      style={{ paddingTop: '70px'}}
    >
      {/* Top/Left — text */}
      <div
        className="w-full lg:w-[45%] flex flex-col justify-center px-8 py-12 lg:px-12 lg:py-16"
        style={{
          background: 'linear-gradient(135deg, #0D2B45 0%, #1B7E6A 100%)',
           boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
        }}
      >
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
            alignSelf: 'flex-start',
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
            fontSize: 'clamp(32px, 4vw, 60px)',
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
            fontSize: '18px',
            color: 'rgba(255,255,255,0.8)',
            lineHeight: 1.8,
            marginBottom: '36px',
          }}
        >
          วิสาหกิจเพื่อสังคมที่มุ่งสร้างนวัตกรรม เพื่อยกระดับคุณภาพชีวิตคนพิการในประเทศไทยอย่างยั่งยืน
        </p>

        {/* CTA Buttons */}
        <div
          className="hero-buttons"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '10px',
          }}
        >
          {[
            { href: '/portfolio/activities', label: 'กิจกรรมที่ผ่านมา', primary: true },
            { href: '/services',  label: 'บริการของเรา',      primary: false },
            { href: '/products/blind-help',  label: 'Blind Help',         primary: false },
          ].map((btn) => (
            <Link
              key={btn.href}
              href={btn.href}
              style={{
                padding: '12px 22px',
                borderRadius: '12px',
                background: btn.primary ? 'linear-gradient(135deg, #1B7E6A, #2DA88E)' : 'transparent',
                color: 'white',
                textDecoration: 'none',
                fontFamily: 'var(--font-sarabun)',
                fontWeight: 700,
                fontSize: '16px',
                border: btn.primary ? 'none' : '2px solid rgba(255,255,255,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                transition: 'opacity 0.2s, transform 0.2s',
              }}
            >
              {btn.label}
            </Link>
          ))}
          <Link
            href="/#chatbot"
            style={{
              padding: '12px 22px',
              borderRadius: '12px',
              background: 'transparent',
              color: 'white',
              textDecoration: 'none',
              fontFamily: 'var(--font-sarabun)',
              fontWeight: 700,
              fontSize: '16px',
              border: '2px solid rgba(255,255,255,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'border-color 0.2s, transform 0.2s',
            }}
          >
            <ChatIcon /> ถามเรื่องสุขภาพ
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
          {stats.map((stat) => (
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

      {/* Bottom/Right — image */}
      <div
        className="w-full lg:w-[55%]"
        style={{
          overflow: 'hidden',
          backgroundImage: "url('/1.jpg')",
           boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#fff',
          minHeight: '500px',
        }}
        aria-hidden="true"
      />
    </section>
  )
}
