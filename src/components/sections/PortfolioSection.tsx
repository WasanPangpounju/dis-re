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

const PORTFOLIO_ICONS: Record<string, React.ReactNode> = {
  microscope: (
    <svg xmlns="http://www.w3.org/2000/svg" height="52px" viewBox="0 -960 960 960" width="52px" fill="currentColor">
      <path d="M200-120v-80h200v-80q-83 0-141.5-58.5T200-480q0-61 33.5-111t90.5-73q8-34 35.5-55t62.5-21l-22-62 38-14-14-36 76-28 12 38 38-14 110 300-38 14 14 38-76 28-12-38-38 14-24-66q-15 14-34.5 21t-39.5 5q-22-2-41-13.5T338-582q-27 16-42.5 43T280-480q0 50 35 85t85 35h320v80H520v80h240v80H200Z"/>
    </svg>
  ),
  headphone: (
    <svg xmlns="http://www.w3.org/2000/svg" height="52px" viewBox="0 -960 960 960" width="52px" fill="currentColor">
      <path d="M480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440v-40q0-150 105-255t255-105q150 0 255 105t105 255v40q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80ZM360-160h-40q-58 0-99-41t-41-99v-80q0-58 41-99t99-41h80v240q0 17-11.5 28.5T360-240v80Zm200 0v-80q-17 0-28.5-11.5T520-280v-240h80q58 0 99 41t41 99v80q0 58-41 99t-99 41h-40Z"/>
    </svg>
  ),
  community: (
    <svg xmlns="http://www.w3.org/2000/svg" height="52px" viewBox="0 -960 960 960" width="52px" fill="currentColor">
      <path d="M80-120v-80h160v-400h240v-160h320v640H80Zm560-80h80v-480h-160v80H480v400h160Zm-240 0h80v-320h-80v320Zm-160 0h80v-320h-80v320Zm240-320h80v-80h-80v80Zm0 0h80v-80h-80v80Z"/>
    </svg>
  ),
  trophy: (
    <svg xmlns="http://www.w3.org/2000/svg" height="52px" viewBox="0 -960 960 960" width="52px" fill="currentColor">
      <path d="M280-120v-80h160v-124q-49-11-87.5-41.5T296-440q-75-10-125.5-60.5T120-625v-55q0-33 23.5-56.5T200-760h80v-80h400v80h80q33 0 56.5 23.5T840-680v55q0 76-50.5 126.5T664-440q-18 49-56.5 79.5T520-324v124h160v80H280ZM200-640v120q45-9 72.5-39.5T300-640h-100Zm560 0H660q0 51 27.5 81.5T760-519v-121Z"/>
    </svg>
  ),
  brain: (
    <svg xmlns="http://www.w3.org/2000/svg" height="52px" viewBox="0 -960 960 960" width="52px" fill="currentColor">
      <path d="M620-520q25 0 42.5-17.5T680-580q0-25-17.5-42.5T620-640q-25 0-42.5 17.5T560-580q0 25 17.5 42.5T620-520ZM340-520q25 0 42.5-17.5T400-580q0-25-17.5-42.5T340-640q-25 0-42.5 17.5T280-580q0 25 17.5 42.5T340-520Zm140 200q51 0 89-27.5t57-72.5H414q19 45 57 72.5t69 27.5Zm0 240q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
    </svg>
  ),
  book: (
    <svg xmlns="http://www.w3.org/2000/svg" height="52px" viewBox="0 -960 960 960" width="52px" fill="currentColor">
      <path d="M560-564v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-600q-38 0-73 9.5T560-564Zm0 220v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-380q-38 0-73 9.5T560-344ZM260-320q47 0 91.5 10.5T440-278v-394q-41-24-87-36t-93-12q-36 0-71.5 7T120-692v396q35-12 69.5-18t70.5-6Zm260 42q44-21 88.5-31.5T700-320q36 0 70.5 6t69.5 18v-396q-33-14-68.5-21t-71.5-7q-47 0-93 12t-87 36v394Zm-40 118q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740q51-30 106.5-45T700-800q52 0 102 12t96 36q11 5 16.5 15t5.5 21v482q0 23-19.5 35T860-198q-36-17-76.5-28T700-237q-60 0-116 21t-104 59Z"/>
    </svg>
  ),
}

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered =
    activeFilter === 'all'
      ? PORTFOLIO_ITEMS.slice(0, 6)
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeFilter).slice(0, 6)


  const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="currentColor" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '3px' }}>
      <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Z" />
    </svg>
  )

  const TrophySmallIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="currentColor" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '3px' }}>
      <path d="M280-120v-80h160v-124q-49-11-87.5-41.5T296-440q-75-10-125.5-60.5T120-625v-55q0-33 23.5-56.5T200-760h80v-80h400v80h80q33 0 56.5 23.5T840-680v55q0 76-50.5 126.5T664-440q-18 49-56.5 79.5T520-324v124h160v80H280ZM200-640v120q45-9 72.5-39.5T300-640h-100Zm560 0H660q0 51 27.5 81.5T760-519v-121Z" />
    </svg>
  )

  const PepleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '3px' }}height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
      <path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM247-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47Zm466 0q-47 47-113 47-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113q0 66-47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm296.5-343.5Q440-607 440-640t-23.5-56.5Q393-720 360-720t-56.5 23.5Q280-673 280-640t23.5 56.5Q327-560 360-560t56.5-23.5ZM360-240Zm0-400Z" />
    </svg>
  )

  const PersonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '3px' }} height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
      <path d="M367-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm296.5-343.5Q560-607 560-640t-23.5-56.5Q513-720 480-720t-56.5 23.5Q400-673 400-640t23.5 56.5Q447-560 480-560t56.5-23.5ZM480-640Zm0 400Z" />
    </svg>
  )

  const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '3px' }} height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor">
      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
    </svg>
  )
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
                      color: 'var(--teal)',
                      minHeight: '120px',
                    }}
                    aria-hidden="true"
                  >
                    {PORTFOLIO_ICONS[item.icon]}
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
                      <span><CalendarIcon />{item.year}</span>
                      {item.team && <span><PepleIcon /> {item.team}</span>}
                      {item.award && <span><TrophySmallIcon />{item.award}</span>}
                      {item.reach && <span><PersonIcon /> {item.reach}</span>}
                      {item.status && <span><CheckIcon /> {item.status}</span>}
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
