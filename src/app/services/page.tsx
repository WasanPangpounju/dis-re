'use client'

import { SERVICES } from '@/lib/constants'


export default function ServicesPage() {
  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh' }}>
      <div
        style={{
          background: 'linear-gradient(135deg, var(--navy), var(--navy-mid))',
          padding: '80px 24px',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-kanit)',
            fontWeight: 700,
            fontSize: 'clamp(32px, 5vw, 52px)',
            color: 'white',
            margin: '0 0 16px',
          }}
        >
          บริการ<span style={{ color: '#2DA88E' }}>ของเรา</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '560px', margin: '0 auto' }}>
          บริการครบวงจรด้านนวัตกรรมสำหรับคนพิการ ตั้งแต่วิจัย ออกแบบ พัฒนา จนถึงประเมินผล
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '28px',
          }}
        >
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="service-card"
              style={{
                background: 'white',
                borderRadius: '16px',
                border: '1px solid var(--border)',
                padding: '36px',
                transition: 'box-shadow 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(13,43,69,0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  background: 'var(--teal-pale)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '30px',
                  marginBottom: '20px',
                }}
                aria-hidden="true"
              >
                {service.icon}
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-kanit)',
                  fontWeight: 700,
                  fontSize: '22px',
                  color: 'var(--navy)',
                  marginBottom: '12px',
                }}
              >
                {service.title}
              </h2>
              <p style={{ fontSize: '17px', color: 'var(--text-mid)', lineHeight: 1.8, marginBottom: '20px' }}>
                {service.description}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    style={{
                      display: 'flex',
                      gap: '10px',
                      marginBottom: '8px',
                      fontSize: '16px',
                      color: 'var(--text-dark)',
                      alignItems: 'flex-start',
                    }}
                  >
                    <span style={{ color: 'var(--teal)', fontWeight: 700 }} aria-hidden="true">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: '60px',
            padding: '48px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, var(--navy), var(--navy-mid))',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-kanit)',
              fontWeight: 700,
              fontSize: '28px',
              color: 'white',
              marginBottom: '12px',
            }}
          >
            สนใจบริการของเรา?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', marginBottom: '28px' }}>
            ติดต่อทีมของเราเพื่อรับคำปรึกษาฟรีและใบเสนอราคา
          </p>
          <a
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 32px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #D4A843, #F0C96B)',
              color: '#0D2B45',
              textDecoration: 'none',
              fontFamily: 'var(--font-sarabun)',
              fontWeight: 700,
              fontSize: '18px',
            }}
          >
            💬 ติดต่อเรา
          </a>
        </div>
      </div>
    </div>
  )
}
