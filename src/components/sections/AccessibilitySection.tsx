import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHeader from '@/components/ui/SectionHeader'
import { ACCESSIBILITY_FEATURES } from '@/lib/constants'
import { ACCESSIBILITY_ICONS } from '@/components/ui/Icons'

const AccessibilityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="56px" viewBox="0 -960 960 960" width="56px" fill="currentColor">
    <path d="M423.5-743.5Q400-767 400-800t23.5-56.5Q447-880 480-880t56.5 23.5Q560-833 560-800t-23.5 56.5Q513-720 480-720t-56.5-23.5ZM680-80v-200H480q-33 0-56.5-23.5T400-360v-240q0-33 23.5-56.5T480-680q24 0 41.5 10.5T559-636q55 66 99.5 90.5T760-520v80q-53 0-107-23t-93-55v138h120q33 0 56.5 23.5T760-300v220h-80Zm-280 0q-83 0-141.5-58.5T200-280q0-72 45.5-127T360-476v82q-35 14-57.5 44.5T280-280q0 50 35 85t85 35q39 0 69.5-22.5T514-240h82q-14 69-69 114.5T400-80Z"/>
  </svg>
)
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
                  style={{ marginBottom: '14px', color: 'var(--teal)' }}
                  aria-hidden="true"
                >
                  {ACCESSIBILITY_ICONS[feature.icon]}
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
            <span style={{ fontSize: '32px' }} aria-hidden="true"><AccessibilityIcon/></span>
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
