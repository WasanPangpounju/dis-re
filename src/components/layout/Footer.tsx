'use client'

import Link from 'next/link'
import { COMPANY, NAV_LINKS } from '@/lib/constants'

export default function Footer() {
  return (
    <footer
      style={{ background: '#0a2035', color: 'rgba(255,255,255,0.8)', paddingTop: '60px' }}
      aria-label="ส่วนท้ายเว็บไซต์"
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            paddingBottom: '48px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #1B7E6A, #2DA88E)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                  fontFamily: 'var(--font-kanit)',
                  fontWeight: 700,
                  color: 'white',
                }}
                aria-hidden="true"
              >
                ค
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-kanit)',
                  fontWeight: 700,
                  color: 'white',
                  fontSize: '15px',
                  lineHeight: 1.4,
                }}
              >
                {COMPANY.shortName}
              </span>
            </div>
            <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(255,255,255,0.65)', marginBottom: '20px' }}>
              {COMPANY.description}
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { href: COMPANY.socialMedia.facebook, label: 'Facebook', icon: 'f' },
                { href: COMPANY.socialMedia.line, label: 'Line', icon: 'L' },
                { href: COMPANY.socialMedia.youtube, label: 'YouTube', icon: '▶' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={`ติดตามเราบน ${social.label}`}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(45,168,142,0.4)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="ลิงก์หน้าเว็บ">
            <h3
              style={{
                fontFamily: 'var(--font-kanit)',
                fontWeight: 700,
                color: 'white',
                fontSize: '17px',
                marginBottom: '16px',
              }}
            >
              หน้าเว็บไซต์
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {NAV_LINKS.map((link) => (
                <li key={link.href} style={{ marginBottom: '10px' }}>
                  <Link
                    href={link.href}
                    style={{
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none',
                      fontSize: '16px',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#2DA88E')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <address style={{ fontStyle: 'normal' }}>
            <h3
              style={{
                fontFamily: 'var(--font-kanit)',
                fontWeight: 700,
                color: 'white',
                fontSize: '17px',
                marginBottom: '16px',
              }}
            >
              ติดต่อเรา
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.6 }}>
                {COMPANY.address}
              </p>
              <a
                href={`tel:${COMPANY.phone}`}
                style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '16px' }}
              >
                📞 {COMPANY.phone}
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '16px' }}
              >
                ✉️ {COMPANY.email}
              </a>
              <div
                style={{
                  marginTop: '8px',
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'rgba(45,168,142,0.15)',
                  border: '1px solid rgba(45,168,142,0.3)',
                }}
              >
                <p style={{ fontSize: '15px', color: '#2DA88E', margin: 0, fontWeight: 600 }}>
                  สายด่วนความพิการ
                </p>
                <a
                  href={`tel:${COMPANY.accessibilityHotline}`}
                  style={{ color: 'white', textDecoration: 'none', fontSize: '18px', fontWeight: 700 }}
                >
                  {COMPANY.accessibilityHotline}
                </a>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', margin: '4px 0 0' }}>
                  บริการฟรี ทุกวัน 08:00–20:00
                </p>
              </div>
            </div>
          </address>
        </div>

        {/* Bottom */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '24px 0',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>
            © 2567 {COMPANY.name} ทะเบียนเลขที่ {COMPANY.registrationNumber}
          </p>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>
            ออกแบบเพื่อ ♿ ทุกคน · WCAG 2.1 AA
          </p>
        </div>
      </div>
    </footer>
  )
}
