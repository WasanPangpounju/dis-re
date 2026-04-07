import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHeader from '@/components/ui/SectionHeader'
import { ACCESSIBILITY_FEATURES } from '@/lib/constants'

export default function AccessibilitySection() {
  return (
    <section
      id="accessibility"
      aria-labelledby="accessibility-heading"
      style={{ padding: '100px 24px', background: 'var(--cream)' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <RevealOnScroll>
          <SectionHeader
            label="การเข้าถึง"
            title="เว็บไซต์นี้"
            highlight="ออกแบบเพื่อทุกคน"
            description="เราปฏิบัติตามมาตรฐาน WCAG 2.1 ระดับ AA เพื่อให้ทุกคนสามารถใช้งานเว็บไซต์ได้อย่างเต็มประสิทธิภาพ"
          />
        </RevealOnScroll>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
          }}
        >
          {ACCESSIBILITY_FEATURES.map((feature, i) => (
            <RevealOnScroll key={feature.title} delay={i * 80}>
              <div
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  border: '1px solid var(--border)',
                  padding: '28px 24px',
                  textAlign: 'center',
                  height: '100%',
                }}
              >
                <div
                  style={{ fontSize: '36px', marginBottom: '14px' }}
                  aria-hidden="true"
                >
                  {feature.icon}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-kanit)',
                    fontWeight: 700,
                    fontSize: '18px',
                    color: 'var(--navy)',
                    marginBottom: '10px',
                  }}
                >
                  {feature.title}
                </h3>
                <p style={{ fontSize: '16px', color: 'var(--text-mid)', lineHeight: 1.7, margin: 0 }}>
                  {feature.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll>
          <div
            style={{
              marginTop: '48px',
              padding: '28px 32px',
              borderRadius: '16px',
              background: 'rgba(27,126,106,0.08)',
              border: '1px solid rgba(27,126,106,0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              flexWrap: 'wrap',
            }}
          >
            <span style={{ fontSize: '32px' }} aria-hidden="true">♿</span>
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-kanit)',
                  fontWeight: 700,
                  fontSize: '20px',
                  color: 'var(--navy)',
                  marginBottom: '6px',
                }}
              >
                พบปัญหาการเข้าถึง? แจ้งเราได้เลย
              </h3>
              <p style={{ fontSize: '16px', color: 'var(--text-mid)', margin: 0 }}>
                เราพร้อมรับฟังและปรับปรุงเพื่อให้ทุกคนใช้งานได้ ติดต่อ:{' '}
                <a
                  href="mailto:accessibility@disabilityresearch.co.th"
                  style={{ color: 'var(--teal)', fontWeight: 600 }}
                >
                  accessibility@disabilityresearch.co.th
                </a>
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
