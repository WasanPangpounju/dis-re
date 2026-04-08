'use client'

import Link from 'next/link'
import { STATS } from '@/lib/constants'

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

const AccessibilityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="56px" viewBox="0 -960 960 960" width="56px" fill="white">
    <path d="M423.5-743.5Q400-767 400-800t23.5-56.5Q447-880 480-880t56.5 23.5Q560-833 560-800t-23.5 56.5Q513-720 480-720t-56.5-23.5ZM680-80v-200H480q-33 0-56.5-23.5T400-360v-240q0-33 23.5-56.5T480-680q24 0 41.5 10.5T559-636q55 66 99.5 90.5T760-520v80q-53 0-107-23t-93-55v138h120q33 0 56.5 23.5T760-300v220h-80Zm-280 0q-83 0-141.5-58.5T200-280q0-72 45.5-127T360-476v82q-35 14-57.5 44.5T280-280q0 50 35 85t85 35q39 0 69.5-22.5T514-240h82q-14 69-69 114.5T400-80Z"/>
  </svg>
)

const VisibilityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
    <path d="M607.5-372.5Q660-425 660-500t-52.5-127.5Q555-680 480-680t-127.5 52.5Q300-575 300-500t52.5 127.5Q405-320 480-320t127.5-52.5Zm-204-51Q372-455 372-500t31.5-76.5Q435-608 480-608t76.5 31.5Q588-545 588-500t-31.5 76.5Q525-392 480-392t-76.5-31.5ZM214-281.5Q94-363 40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200q-146 0-266-81.5ZM480-500Zm207.5 160.5Q782-399 832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280q113 0 207.5-59.5Z"/>
  </svg>
)

const HearingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 0 1-7 0"/>
    <path d="M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 0 4 0"/>
  </svg>
)

const GroupIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
    <path d="M475-160q4 0 8-2t6-4l328-328q12-12 17.5-27t5.5-30q0-16-5.5-30.5T817-607L647-777q-11-12-25.5-17.5T591-800q-15 0-30 5.5T534-777l-11 11 74 75q15 14 22 32t7 38q0 42-28.5 70.5T527-522q-20 0-38.5-7T456-550l-75-74-175 175q-3 3-4.5 6.5T200-435q0 8 6 14.5t14 6.5q4 0 8-2t6-4l136-136 56 56-135 136q-3 3-4.5 6.5T285-350q0 8 6 14t14 6q4 0 8-2t6-4l136-135 56 56-135 136q-3 2-4.5 6t-1.5 8q0 8 6 14t14 6q4 0 7.5-1.5t6.5-4.5l136-135 56 56-136 136q-3 3-4.5 6.5T454-180q0 8 6.5 14t14.5 6Zm-1 80q-37 0-65.5-24.5T375-166q-34-5-57-28t-28-57q-34-5-56.5-28.5T206-336q-38-5-62-33t-24-66q0-20 7.5-38.5T149-506l232-231 131 131q2 3 6 4.5t8 1.5q9 0 15-5.5t6-14.5q0-4-1.5-8t-4.5-6L398-777q-11-12-25.5-17.5T342-800q-15 0-30 5.5T285-777L144-635q-9 9-15 21t-8 24q-2 12 0 24.5t8 23.5l-58 58q-17-23-25-50.5T40-590q2-28 14-54.5T87-692l141-141q24-23 53.5-35t60.5-12q31 0 60.5 12t52.5 35l11 11 11-11q24-23 53.5-35t60.5-12q31 0 60.5 12t52.5 35l169 169q23 23 35 53t12 61q0 31-12 60.5T873-437L545-110q-14 14-32.5 22T474-80Zm-99-560Z"/>
  </svg>
)


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
              <MicroscopeIcon/> ดูผลงานวิจัย
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
              <ChatIcon/> ถามเรื่องสุขภาพ
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
              zIndex: 2,
              position: 'relative',
              boxShadow: '0 0 40px rgba(45,168,142,0.4)',
            }}
          >
            <AccessibilityIcon/>
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
              <VisibilityIcon/>
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
                color: 'white',
              }}
            >
              <HearingIcon/>
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
              <GroupIcon/>
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
