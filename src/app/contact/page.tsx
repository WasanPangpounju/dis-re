import type { Metadata } from 'next'
import ContactSection from '@/components/sections/ContactSection'
import { COMPANY } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'ติดต่อเรา',
  description: 'ติดต่อทีมผู้เชี่ยวชาญของเราสำหรับคำปรึกษา ความร่วมมือ หรือสอบถามข้อมูลเพิ่มเติม',
}

export default function ContactPage() {
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
          <span style={{ color: '#2DA88E' }}>ติดต่อ</span>เรา
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '560px', margin: '0 0 24px auto' }}>
          ยินดีรับฟังทุกคำถาม ข้อเสนอแนะ และความร่วมมือ
        </p>
        <a
          href={`tel:${COMPANY.accessibilityHotline}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            borderRadius: '10px',
            background: 'rgba(45,168,142,0.2)',
            border: '1px solid rgba(45,168,142,0.4)',
            color: '#2DA88E',
            textDecoration: 'none',
            fontSize: '18px',
            fontWeight: 700,
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="M420-280q-33 0-56.5-23.5T340-360v-240q0-33 23.5-56.5T420-680h120q33 0 56.5 23.5T620-600v240q0 33-23.5 56.5T540-280H420Zm-380 0v-80h160v-80h-80q-33 0-56.5-23.5T40-520v-80q0-33 23.5-56.5T120-680h160v80H120v80h80q33 0 56.5 23.5T280-440v80q0 33-23.5 56.5T200-280H40Zm640 0v-80h160v-80h-80q-33 0-56.5-23.5T680-520v-80q0-33 23.5-56.5T760-680h160v80H760v80h80q33 0 56.5 23.5T920-440v80q0 33-23.5 56.5T840-280H680Zm-260-80h120v-240H420v240Z"/></svg>
          สายด่วน: {COMPANY.accessibilityHotline}
        </a>
      </div>
      <ContactSection />
    </div>
  )
}
