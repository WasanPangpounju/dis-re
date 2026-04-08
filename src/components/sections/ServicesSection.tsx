'use client'

import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHeader from '@/components/ui/SectionHeader'
import { SERVICES } from '@/lib/constants'
import { SERVICE_ICONS } from '@/components/ui/Icons'

export default function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      style={{ padding: '100px 24px', background: 'white' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <RevealOnScroll>
          <SectionHeader
            label="บริการของเรา"
            title="บริการ"
            highlight="ครบวงจร"
            description="ให้บริการวิจัย ออกแบบ พัฒนา และให้คำปรึกษาด้านนวัตกรรมสำหรับคนพิการ ครบทุกขั้นตอน"
          />
        </RevealOnScroll>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {SERVICES.map((service, i) => (
            <RevealOnScroll key={service.id} delay={i * 80}>
              <div
                className="service-card"
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  border: '1px solid var(--border)',
                  padding: '32px',
                  height: '100%',
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
                    width: '60px',
                    height: '60px',
                    borderRadius: '14px',
                    background: 'var(--teal-pale)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--teal)',
                    marginBottom: '20px',
                  }}
                  aria-hidden="true"
                >
                  {SERVICE_ICONS[service.icon]}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-kanit)',
                    fontWeight: 700,
                    fontSize: '21px',
                    color: 'var(--navy)',
                    marginBottom: '12px',
                  }}
                >
                  {service.title}
                </h3>
                <p style={{ fontSize: '17px', color: 'var(--text-mid)', lineHeight: 1.8, marginBottom: '20px' }}>
                  {service.description}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        marginBottom: '8px',
                        fontSize: '16px',
                        color: 'var(--text-dark)',
                      }}
                    >
                      <span style={{ color: 'var(--teal)', fontWeight: 700, flexShrink: 0 }} aria-hidden="true">
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
