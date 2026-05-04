'use client'

import Link from 'next/link'
import { NAV_LINKS, COMPANY } from '@/lib/constants'
import type { GeneralContent } from '@/lib/content'

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="currentColor" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}>
    <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T381-381q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T664-384l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12Z" />
  </svg>
)

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="currentColor" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}>
    <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
  </svg>
)

const AccessibilityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" fill="currentColor" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '2px', marginBottom: '2px' }}>
    <path d="M423.5-743.5Q400-767 400-800t23.5-56.5Q447-880 480-880t56.5 23.5Q560-833 560-800t-23.5 56.5Q513-720 480-720t-56.5-23.5ZM680-80v-200H480q-33 0-56.5-23.5T400-360v-240q0-33 23.5-56.5T480-680q24 0 41.5 10.5T559-636q55 66 99.5 90.5T760-520v80q-53 0-107-23t-93-55v138h120q33 0 56.5 23.5T760-300v220h-80Zm-280 0q-83 0-141.5-58.5T200-280q0-72 45.5-127T360-476v82q-35 14-57.5 44.5T280-280q0 50 35 85t85 35q39 0 69.5-22.5T514-240h82q-14 69-69 114.5T400-80Z" />
  </svg>
)

type CompanyData = GeneralContent['company']

export default function Footer({ company = COMPANY }: { company?: CompanyData }) {
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
              <img
                src="/2.png"
                alt=""
                aria-hidden="true"
                style={{ width: '44px', height: '44px', borderRadius: '12px', objectFit: 'cover' }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-kanit)',
                  fontWeight: 700,
                  color: 'white',
                  fontSize: '15px',
                  lineHeight: 1.4,
                }}
              >
                {company.shortName}
              </span>
            </div>
            <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(255,255,255,0.65)', marginBottom: '20px' }}>
              {company.description}
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { href: company.socialMedia.facebook, label: 'Facebook', icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                )},
                { href: company.socialMedia.line, label: 'Line', icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.952 12.417c0-4.322-4.335-7.833-9.663-7.833S.625 8.095.625 12.417c0 3.874 3.434 7.117 8.075 7.731.314.068.742.207.851.476.097.244.063.626.031.872l-.138.826c-.042.244-.194.957.838.521 1.033-.435 5.566-3.277 7.595-5.609 1.4-1.538 2.075-3.095 2.075-4.817z"/>
                  </svg>
                )},
                { href: company.socialMedia.youtube, label: 'YouTube', icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
                  </svg>
                )},
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
                {company.address}
              </p>
              <a
                href={`tel:${company.phone}`}
                style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '16px' }}
              >
                <PhoneIcon />{company.phone}
              </a>
              <a
                href={`mailto:${company.email}`}
                style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '16px' }}
              >
                <EmailIcon />{company.email}
              </a>
            
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
            © 2567 {company.name} ทะเบียนเลขที่ {company.registrationNumber}
          </p>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>
            ออกแบบเพื่อ <AccessibilityIcon /> ทุกคน · WCAG 2.1 AA
          </p>
        </div>
      </div>
    </footer>
  )
}
