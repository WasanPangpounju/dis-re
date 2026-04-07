'use client'

import { useState } from 'react'
import Link from 'next/link'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHeader from '@/components/ui/SectionHeader'
import { PORTFOLIO_ITEMS } from '@/lib/constants'

const FILTERS = [
  { value: 'all', label: 'ทั้งหมด' },
  { value: 'research', label: 'วิจัย' },
  { value: 'product', label: 'ผลิตภัณฑ์' },
  { value: 'community', label: 'ชุมชน' },
  { value: 'award', label: 'รางวัล' },
]

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered =
    activeFilter === 'all'
      ? PORTFOLIO_ITEMS.slice(0, 6)
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeFilter).slice(0, 6)

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      style={{ padding: '100px 24px', background: 'var(--cream)' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <RevealOnScroll>
          <SectionHeader
            label="ผลงานของเรา"
            title="โครงการและ"
            highlight="ผลงานวิจัย"
            description="ผลงานที่สร้างการเปลี่ยนแปลงให้คนพิการในประเทศไทย ตั้งแต่งานวิจัยพื้นฐานถึงผลิตภัณฑ์จริง"
          />
        </RevealOnScroll>

        {/* Filter */}
        <RevealOnScroll>
          <div
            role="group"
            aria-label="ตัวกรองผลงาน"
            style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '40px',
            }}
          >
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter.value
              return (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  aria-pressed={isActive}
                  style={{
                    padding: '10px 22px',
                    borderRadius: '24px',
                    border: isActive ? 'none' : '1px solid var(--border)',
                    background: isActive
                      ? 'linear-gradient(135deg, #1B7E6A, #2DA88E)'
                      : 'white',
                    color: isActive ? 'white' : 'var(--text-mid)',
                    fontSize: '16px',
                    fontFamily: 'var(--font-sarabun)',
                    fontWeight: isActive ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {filter.label}
                </button>
              )
            })}
          </div>
        </RevealOnScroll>

        {/* Grid */}
        <ul
          role="list"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
            listStyle: 'none',
            padding: 0,
            margin: '0 0 48px',
          }}
        >
          {filtered.map((item, i) => (
            <li key={item.id} role="listitem">
              <RevealOnScroll delay={i * 80}>
                <article
                  tabIndex={0}
                  aria-label={item.title}
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    border: '1px solid var(--border)',
                    overflow: 'hidden',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                    cursor: 'default',
                    height: '100%',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)'
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(13,43,69,0.12)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)'
                    e.currentTarget.style.boxShadow = '0 0 0 3px var(--gold)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {/* Card header */}
                  <div
                    className={`bg-gradient-to-br ${item.bgColor}`}
                    style={{
                      padding: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '52px',
                      minHeight: '120px',
                    }}
                    aria-hidden="true"
                  >
                    {item.emoji}
                  </div>

                  <div style={{ padding: '24px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        background: 'var(--teal-pale)',
                        color: 'var(--teal)',
                        padding: '3px 10px',
                        borderRadius: '12px',
                        fontSize: '13px',
                        fontWeight: 600,
                        marginBottom: '10px',
                      }}
                    >
                      {item.categoryLabel}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-kanit)',
                        fontWeight: 700,
                        fontSize: '19px',
                        color: 'var(--navy)',
                        marginBottom: '10px',
                        lineHeight: 1.4,
                      }}
                    >
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '16px', color: 'var(--text-mid)', lineHeight: 1.7, marginBottom: '16px' }}>
                      {item.description}
                    </p>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: 'var(--text-soft)' }}>
                      <span>📅 {item.year}</span>
                      {item.team && <span>👥 {item.team}</span>}
                      {item.award && <span>🏆 {item.award}</span>}
                      {item.reach && <span>👥 {item.reach}</span>}
                      {item.status && <span>✓ {item.status}</span>}
                    </div>
                  </div>
                </article>
              </RevealOnScroll>
            </li>
          ))}
        </ul>

        <div style={{ textAlign: 'center' }}>
          <Link
            href="/portfolio"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 32px',
              borderRadius: '12px',
              border: '2px solid var(--teal)',
              color: 'var(--teal)',
              textDecoration: 'none',
              fontFamily: 'var(--font-sarabun)',
              fontWeight: 700,
              fontSize: '18px',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--teal)'
              e.currentTarget.style.color = 'white'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--teal)'
            }}
          >
            ดูผลงานทั้งหมด →
          </Link>
        </div>
      </div>
    </section>
  )
}
