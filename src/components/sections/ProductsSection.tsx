'use client'

import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHeader from '@/components/ui/SectionHeader'
import { PRODUCTS } from '@/lib/constants'

export default function ProductsSection() {
  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      style={{ padding: '100px 24px', background: 'var(--cream)' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <RevealOnScroll>
          <SectionHeader
            label="ผลิตภัณฑ์"
            title="นวัตกรรม"
            highlight="ที่ใช้งานได้จริง"
            description="ผลิตภัณฑ์และแพลตฟอร์มที่พัฒนาขึ้นจากงานวิจัย สำหรับคนพิการทุกประเภท"
          />
        </RevealOnScroll>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '24px',
          }}
        >
          {PRODUCTS.map((product, i) => (
            <RevealOnScroll key={product.id} delay={i * 80}>
              <div
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  border: '1px solid var(--border)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)'
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(13,43,69,0.12)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Header */}
                <div
                  style={{
                    background: 'linear-gradient(135deg, var(--navy), var(--navy-mid))',
                    padding: '28px 24px',
                    position: 'relative',
                  }}
                >
                  {/* Badge */}
                  <span
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      background:
                        product.statusColor === 'gold'
                          ? 'rgba(212,168,67,0.25)'
                          : 'rgba(45,168,142,0.25)',
                      color: product.statusColor === 'gold' ? '#F0C96B' : '#2DA88E',
                      border: `1px solid ${product.statusColor === 'gold' ? 'rgba(212,168,67,0.4)' : 'rgba(45,168,142,0.4)'}`,
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontWeight: 600,
                    }}
                  >
                    {product.badge}
                  </span>
                  <div style={{ fontSize: '40px', marginBottom: '12px' }} aria-hidden="true">
                    {product.icon}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-kanit)',
                      fontWeight: 700,
                      fontSize: '22px',
                      color: 'white',
                      margin: '0 0 4px',
                    }}
                  >
                    {product.title}
                  </h3>
                  <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', margin: 0 }}>
                    {product.subtitle}
                  </p>
                </div>

                {/* Body */}
                <div style={{ padding: '24px', flex: 1 }}>
                  <p style={{ fontSize: '16px', color: 'var(--text-mid)', lineHeight: 1.8, marginBottom: '16px' }}>
                    {product.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: 'var(--cream)',
                          color: 'var(--text-soft)',
                          border: '1px solid var(--border)',
                          padding: '4px 10px',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: 500,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div
                  style={{
                    padding: '16px 24px',
                    borderTop: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      className="animate-pulse-dot"
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: product.statusColor === 'gold' ? '#D4A843' : '#1B7E6A',
                        display: 'inline-block',
                      }}
                      aria-hidden="true"
                    />
                    <span style={{ fontSize: '14px', color: 'var(--text-soft)' }}>{product.status}</span>
                  </div>
                  <button
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      background: 'var(--teal-pale)',
                      color: 'var(--teal)',
                      border: 'none',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--teal)'
                      e.currentTarget.style.color = 'white'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'var(--teal-pale)'
                      e.currentTarget.style.color = 'var(--teal)'
                    }}
                    aria-label={`ดูรายละเอียด ${product.title}`}
                  >
                    ดูรายละเอียด
                  </button>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
