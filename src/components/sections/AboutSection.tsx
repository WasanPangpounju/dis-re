import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHeader from '@/components/ui/SectionHeader'

const values = [
  {
    icon: '🎯',
    title: 'พันธกิจ',
    description:
      'วิจัยและพัฒนานวัตกรรมที่ตอบสนองความต้องการของคนพิการในประเทศไทย โดยยึดผู้ใช้เป็นศูนย์กลาง',
  },
  {
    icon: '🔭',
    title: 'วิสัยทัศน์',
    description:
      'สังคมไทยที่คนพิการทุกคนสามารถดำรงชีวิตอย่างมีคุณภาพ เท่าเทียม และเต็มศักยภาพ',
  },
  {
    icon: '💎',
    title: 'คุณค่าหลัก',
    description:
      'ความเท่าเทียม ความครอบคลุม ความโปร่งใส และการพัฒนาอย่างยั่งยืนเพื่อสังคม',
  },
]

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      style={{ padding: '100px 24px', background: 'white' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <RevealOnScroll>
          <SectionHeader
            label="เกี่ยวกับเรา"
            title="วิสาหกิจเพื่อสังคมที่"
            highlight="ขับเคลื่อนด้วยงานวิจัย"
            description="เราเชื่อว่านวัตกรรมและงานวิจัยที่ดีสามารถเปลี่ยนแปลงชีวิตคนพิการได้อย่างแท้จริง ด้วยทีมนักวิจัย นักออกแบบ และผู้เชี่ยวชาญที่มีประสบการณ์มากกว่า 10 ปี"
          />
        </RevealOnScroll>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '28px',
            marginBottom: '60px',
          }}
        >
          {values.map((value, i) => (
            <RevealOnScroll key={value.title} delay={i * 100}>
              <div
                style={{
                  padding: '32px',
                  borderRadius: '16px',
                  background: 'var(--cream)',
                  border: '1px solid var(--border)',
                  height: '100%',
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '14px',
                    background: 'var(--teal-pale)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    marginBottom: '16px',
                  }}
                  aria-hidden="true"
                >
                  {value.icon}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-kanit)',
                    fontWeight: 700,
                    fontSize: '22px',
                    color: 'var(--navy)',
                    marginBottom: '10px',
                  }}
                >
                  {value.title}
                </h3>
                <p style={{ fontSize: '17px', color: 'var(--text-mid)', lineHeight: 1.8, margin: 0 }}>
                  {value.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll>
          <div
            style={{
              padding: '40px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, var(--navy), var(--navy-mid))',
              color: 'white',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '32px',
              alignItems: 'center',
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-kanit)',
                  fontWeight: 700,
                  fontSize: '24px',
                  marginBottom: '12px',
                }}
              >
                จดทะเบียนในฐานะ
                <br />
                <span style={{ color: '#2DA88E' }}>วิสาหกิจเพื่อสังคม</span>
              </h3>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, margin: 0 }}>
                ภายใต้การกำกับของสำนักงานส่งเสริมวิสาหกิจเพื่อสังคม (สวส.) กระทรวงการพัฒนาสังคมและความมั่นคงของมนุษย์
              </p>
            </div>
            {[
              { icon: '📋', text: 'กำไรส่วนใหญ่นำกลับสู่สังคม' },
              { icon: '🏛️', text: 'โปร่งใส ตรวจสอบได้' },
              { icon: '🤝', text: 'เป็นพาร์ตเนอร์กับ 20+ องค์กร' },
            ].map((item) => (
              <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '28px' }} aria-hidden="true">{item.icon}</span>
                <span style={{ fontSize: '17px', color: 'rgba(255,255,255,0.85)' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
