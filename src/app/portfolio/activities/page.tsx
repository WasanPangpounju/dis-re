'use client'

import { useState, useEffect } from 'react'
import { ACTIVITIES } from '@/lib/constants'
import type { Activity } from '@/lib/types'

const CalendarEmptyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="currentColor">
    <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Z" />
  </svg>
)

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="currentColor" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '3px' }}>
    <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Z" />
  </svg>
)

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="currentColor" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '3px' }}>
    <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-560q0-109-69.5-184.5T480-820q-101 0-170.5 75.5T240-560q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-560q0-150 96.5-245T480-900q127 0 223.5 95T800-560q0 110-79.5 227.5T480-80Zm0-480Z" />
  </svg>
)

export default function ActivitiesPage() {
  const [items, setItems] = useState<Activity[]>(ACTIVITIES)

  useEffect(() => {
    fetch('/api/content/activities')
      .then((r) => r.json())
      .then(setItems)
      .catch(() => {})
  }, [])

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
          กิจกรรมทั้งหมด
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
          <span style={{ color: '#2DA88E' }}>กิจกรรม</span>ที่ผ่านมา
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '560px', margin: '0 auto' }}>
          กิจกรรมและงานที่เราเข้าร่วมหรือจัดขึ้น
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px' }}>
        {items.length === 0 ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '80px 24px',
              color: 'var(--text-mid)',
              textAlign: 'center',
            }}
          >
            <div style={{ marginBottom: '20px', opacity: 0.4 }}>
              <CalendarEmptyIcon />
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-kanit)',
                fontWeight: 700,
                fontSize: '22px',
                color: 'var(--navy)',
                margin: '0 0 8px',
              }}
            >
              ยังไม่มีกิจกรรม
            </h2>
            <p style={{ fontSize: '16px', margin: 0 }}>กิจกรรมที่ผ่านมาจะแสดงที่นี่</p>
          </div>
        ) : (
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
            {items.map((item) => (
              <li key={item.id} role="listitem">
                <article
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
                >
                  {item.image && (
                    <div style={{ height: '180px', overflow: 'hidden' }} aria-hidden="true">
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </div>
                  )}
                  <div style={{ padding: '24px' }}>
                    {item.categoryLabel && (
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
                    )}
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
                      <span><CalendarIcon /> {item.date}</span>
                      {item.location && <span><LocationIcon /> {item.location}</span>}
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
