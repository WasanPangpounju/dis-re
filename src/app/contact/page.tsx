import type { Metadata } from 'next'
import ContactSection from '@/components/sections/ContactSection'
import { COMPANY } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'ติดต่อเรา',
  description: 'ติดต่อทีมผู้เชี่ยวชาญของเราสำหรับคำปรึกษา ความร่วมมือ หรือสอบถามข้อมูลเพิ่มเติม',
}

export default function ContactPage() {
  return (
    <div style={{ paddingTop: '30px', minHeight: '100vh' }}>
      <ContactSection />
    </div>
  )
}
