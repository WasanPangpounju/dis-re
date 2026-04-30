import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'กิจกรรมที่ผ่านมา',
  description: 'กิจกรรมและงานที่เราเข้าร่วมหรือจัดขึ้น',
}

const CalendarEmptyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="currentColor">
    <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Z" />
  </svg>
)

export default function ActivitiesPage() {
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

      {/* Empty state */}
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
    </div>
  )
}
