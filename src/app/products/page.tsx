'use client'

import { PRODUCTS } from '@/lib/constants'


export default function ProductsPage() {
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
          <span style={{ color: '#2DA88E' }}>ผลิตภัณฑ์</span>นวัตกรรม
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '560px', margin: '0 auto' }}>
          ผลิตภัณฑ์และแพลตฟอร์มที่พัฒนาจากงานวิจัย เพื่อยกระดับคุณภาพชีวิตคนพิการ
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '28px',
          }}
        >
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              style={{
                background: 'white',
                borderRadius: '20px',
                border: '1px solid var(--border)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = '0 16px 48px rgba(13,43,69,0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div
                style={{
                  background: 'linear-gradient(135deg, var(--navy), var(--navy-mid))',
                  padding: '36px 28px',
                  position: 'relative',
                }}
              >
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
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    fontWeight: 600,
                  }}
                >
                  {product.badge}
                </span>
                <div style={{ fontSize: '48px', marginBottom: '16px' }} aria-hidden="true">
                  {product.icon}
                </div>
                <h2
                  style={{
                    fontFamily: 'var(--font-kanit)',
                    fontWeight: 700,
                    fontSize: '24px',
                    color: 'white',
                    margin: '0 0 6px',
                  }}
                >
                  {product.title}
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px', margin: 0 }}>
                  {product.subtitle}
                </p>
              </div>

              <div style={{ padding: '28px', flex: 1 }}>
                <p style={{ fontSize: '17px', color: 'var(--text-mid)', lineHeight: 1.8, marginBottom: '20px' }}>
                  {product.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        background: 'var(--cream)',
                        color: 'var(--text-soft)',
                        border: '1px solid var(--border)',
                        padding: '5px 12px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: 500,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div
                style={{
                  padding: '16px 28px 24px',
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
                  <span style={{ fontSize: '15px', color: 'var(--text-soft)' }}>{product.status}</span>
                </div>
                <a
                  href="/contact"
                  style={{
                    padding: '10px 20px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #1B7E6A, #2DA88E)',
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '15px',
                    fontWeight: 700,
                    fontFamily: 'var(--font-sarabun)',
                  }}
                  aria-label={`สอบถามเกี่ยวกับ ${product.title}`}
                >
                  สอบถาม
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
