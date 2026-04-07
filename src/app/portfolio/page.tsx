'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import SectionHeader from '@/components/ui/SectionHeader'
import { PORTFOLIO_ITEMS } from '@/lib/constants'

const FILTERS = [
  { value: 'all', label: 'ทั้งหมด' },
  { value: 'research', label: 'วิจัย' },
  { value: 'product', label: 'ผลิตภัณฑ์' },
  { value: 'community', label: 'ชุมชน' },
  { value: 'award', label: 'รางวัล' },
]

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered =
    activeFilter === 'all'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeFilter)

  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh' }}>
      {/* Hero */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--navy), var(--navy-mid))',
          padding: '80px 24px',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            background: 'rgba(45,168,142,0.2)',
            color: '#2DA88E',
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '15px',
            fontWeight: 600,
            marginBottom: '16px',
          }}
        >
          ผลงานทั้งหมด
        </span>
        <h1
          style={{
            fontFamily: 'var(--font-kanit)',
            fontWeight: 700,
            fontSize: 'clamp(32px, 5vw, 52px)',
            color: 'white',
            margin: '0 0 16px',
          }}
        >
          โครงการและ<span style={{ color: '#2DA88E' }}>ผลงานวิจัย</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '560px', margin: '0 auto' }}>
          ผลงานทั้งหมดที่เราภูมิใจนำเสนอ ตั้งแต่งานวิจัยพื้นฐานถึงผลิตภัณฑ์ที่ใช้งานได้จริง
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px' }}>
        {/* Filters */}
        <div
          role="group"
          aria-label="ตัวกรองผลงาน"
          style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px', justifyContent: 'center' }}
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
                  background: isActive ? 'linear-gradient(135deg, #1B7E6A, #2DA88E)' : 'white',
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

        <ul
          role="list"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}
        >
          {filtered.map((item) => (
            <li key={item.id} role="listitem">
              <article
                tabIndex={0}
                aria-label={item.title}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  border: '1px solid var(--border)',
                  overflow: 'hidden',
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
                onFocus={(e) => {
                  e.currentTarget.style.outline = '3px solid var(--gold)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.outline = 'none'
                }}
              >
                <div
                  className={`bg-gradient-to-br ${item.bgColor}`}
                  style={{ padding: '32px', textAlign: 'center', fontSize: '52px' }}
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
                  <h2
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
                  </h2>
                  <p style={{ fontSize: '16px', color: 'var(--text-mid)', lineHeight: 1.7, marginBottom: '16px' }}>
                    {item.description}
                  </p>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: 'var(--text-soft)', flexWrap: 'wrap' }}>
                    <span>📅 {item.year}</span>
                    {item.team && <span>👥 {item.team}</span>}
                    {item.award && <span>🏆 {item.award}</span>}
                    {item.reach && <span>👤 {item.reach}</span>}
                    {item.status && <span>✓ {item.status}</span>}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
