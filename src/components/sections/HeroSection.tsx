'use client'

import Link from 'next/link'
import { STATS } from '@/lib/constants'
import type { Stat } from '@/lib/types'

const MicroscopeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
    <path d="M200-120v-80h200v-80q-83 0-141.5-58.5T200-480q0-61 33.5-111t90.5-73q8-34 35.5-55t62.5-21l-22-62 38-14-14-36 76-28 12 38 38-14 110 300-38 14 14 38-76 28-12-38-38 14-24-66q-15 14-34.5 21t-39.5 5q-22-2-41-13.5T338-582q-27 16-42.5 43T280-480q0 50 35 85t85 35h320v80H520v80h240v80H200Zm346-458 36-14-68-188-38 14 70 188Zm-97.5-33.5Q460-623 460-640t-11.5-28.5Q437-680 420-680t-28.5 11.5Q380-657 380-640t11.5 28.5Q403-600 420-600t28.5-11.5ZM546-578Zm-126-62Zm0 0Z"/>
  </svg>
)

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
            <MicroscopeIcon /> ดูผลงานวิจัย
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
