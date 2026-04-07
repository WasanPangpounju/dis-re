import type { Metadata } from 'next'
import { COMPANY, STATS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'เกี่ยวกับเรา',
  description: 'เรียนรู้เกี่ยวกับ บริษัท การวิจัยนวัตกรรมเพื่อคนพิการ วิสาหกิจเพื่อสังคม',
}

export default function AboutPage() {
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
        <h1
          style={{
            fontFamily: 'var(--font-kanit)',
            fontWeight: 700,
            fontSize: 'clamp(28px, 4vw, 48px)',
            color: 'white',
            margin: '0 0 16px',
            lineHeight: 1.3,
          }}
        >
          {COMPANY.name}
        </h1>
        <p style={{ color: '#2DA88E', fontSize: '20px', fontWeight: 600 }}>
          {COMPANY.tagline}
        </p>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 24px' }}>
        {/* Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            marginBottom: '60px',
            padding: '40px',
            borderRadius: '20px',
            background: 'var(--cream)',
            border: '1px solid var(--border)',
          }}
        >
          {STATS.map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: 'var(--font-kanit)',
                  fontWeight: 700,
                  fontSize: '42px',
                  color: 'var(--teal)',
                }}
              >
                {stat.number}
              </div>
              <div style={{ fontSize: '17px', color: 'var(--text-mid)' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Description */}
        <section aria-labelledby="about-mission">
          <h2
            id="about-mission"
            style={{
              fontFamily: 'var(--font-kanit)',
              fontWeight: 700,
              fontSize: '28px',
              color: 'var(--navy)',
              marginBottom: '16px',
            }}
          >
            พันธกิจของเรา
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--text-mid)', lineHeight: 1.9, marginBottom: '32px' }}>
            {COMPANY.description} เราทำงานร่วมกับคนพิการ นักวิจัย นักออกแบบ และผู้กำหนดนโยบาย เพื่อสร้างสังคมที่ทุกคนสามารถมีส่วนร่วมได้อย่างเท่าเทียม
          </p>
        </section>

        <section aria-labelledby="about-values">
          <h2
            id="about-values"
            style={{
              fontFamily: 'var(--font-kanit)',
              fontWeight: 700,
              fontSize: '28px',
              color: 'var(--navy)',
              marginBottom: '24px',
            }}
          >
            คุณค่าที่เราเชื่อ
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {[
              { icon: '🤝', title: 'ความเท่าเทียม', desc: 'ทุกคนมีสิทธิ์เข้าถึงทรัพยากรและโอกาสอย่างเท่าเทียม' },
              { icon: '🔬', title: 'หลักฐานเชิงประจักษ์', desc: 'การตัดสินใจบนพื้นฐานงานวิจัยและข้อมูลที่น่าเชื่อถือ' },
              { icon: '♿', title: 'ออกแบบเพื่อทุกคน', desc: 'Universal Design ที่รองรับความต้องการที่หลากหลาย' },
              { icon: '🌱', title: 'ยั่งยืน', desc: 'สร้างผลกระทบที่ยั่งยืนต่อสังคมและสิ่งแวดล้อม' },
            ].map((v) => (
              <div
                key={v.title}
                style={{
                  padding: '24px',
                  borderRadius: '14px',
                  background: 'var(--cream)',
                  border: '1px solid var(--border)',
                }}
              >
                <div style={{ fontSize: '28px', marginBottom: '12px' }} aria-hidden="true">{v.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-kanit)', fontWeight: 700, fontSize: '19px', color: 'var(--navy)', marginBottom: '8px' }}>
                  {v.title}
                </h3>
                <p style={{ fontSize: '16px', color: 'var(--text-mid)', lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Registration info */}
        <div
          style={{
            marginTop: '48px',
            padding: '32px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, var(--navy), var(--navy-mid))',
            color: 'white',
          }}
        >
          <h2 style={{ fontFamily: 'var(--font-kanit)', fontWeight: 700, fontSize: '22px', marginBottom: '16px' }}>
            ข้อมูลองค์กร
          </h2>
          <dl style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 24px', fontSize: '17px' }}>
            <dt style={{ color: 'rgba(255,255,255,0.6)' }}>ชื่อบริษัท</dt>
            <dd style={{ margin: 0 }}>{COMPANY.name}</dd>
            <dt style={{ color: 'rgba(255,255,255,0.6)' }}>ทะเบียนเลขที่</dt>
            <dd style={{ margin: 0 }}>{COMPANY.registrationNumber}</dd>
            <dt style={{ color: 'rgba(255,255,255,0.6)' }}>ที่อยู่</dt>
            <dd style={{ margin: 0 }}>{COMPANY.address}</dd>
            <dt style={{ color: 'rgba(255,255,255,0.6)' }}>โทรศัพท์</dt>
            <dd style={{ margin: 0 }}>
              <a href={`tel:${COMPANY.phone}`} style={{ color: '#2DA88E' }}>{COMPANY.phone}</a>
            </dd>
            <dt style={{ color: 'rgba(255,255,255,0.6)' }}>อีเมล</dt>
            <dd style={{ margin: 0 }}>
              <a href={`mailto:${COMPANY.email}`} style={{ color: '#2DA88E' }}>{COMPANY.email}</a>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  )
}
