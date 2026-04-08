import type { Metadata } from 'next'
import { COMPANY, STATS } from '@/lib/constants'

const HandshakeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="currentColor">
    <path d="M475-160q4 0 8-2t6-4l328-328q12-12 17.5-27t5.5-30q0-16-5.5-30.5T817-607L647-777q-11-12-25.5-17.5T591-800q-15 0-30 5.5T534-777l-11 11 74 75q15 14 22 32t7 38q0 42-28.5 70.5T527-522q-20 0-38.5-7T456-550l-75-74-175 175q-3 3-4.5 6.5T200-435q0 8 6 14.5t14 6.5q4 0 8-2t6-4l136-136 56 56-135 136q-3 3-4.5 6.5T285-350q0 8 6 14t14 6q4 0 8-2t6-4l136-135 56 56-135 136q-3 2-4.5 6t-1.5 8q0 8 6 14t14 6q4 0 7.5-1.5t6.5-4.5l136-135 56 56-136 136q-3 3-4.5 6.5T454-180q0 8 6.5 14t14.5 6Zm-1 80q-37 0-65.5-24.5T375-166q-34-5-57-28t-28-57q-34-5-56.5-28.5T206-336q-38-5-62-33t-24-66q0-20 7.5-38.5T149-506l232-231 131 131q2 3 6 4.5t8 1.5q9 0 15-5.5t6-14.5q0-4-1.5-8t-4.5-6L398-777q-11-12-25.5-17.5T342-800q-15 0-30 5.5T285-777L144-635q-9 9-15 21t-8 24q-2 12 0 24.5t8 23.5l-58 58q-17-23-25-50.5T40-590q2-28 14-54.5T87-692l141-141q24-23 53.5-35t60.5-12q31 0 60.5 12t52.5 35l11 11 11-11q24-23 53.5-35t60.5-12q31 0 60.5 12t52.5 35l169 169q23 23 35 53t12 61q0 31-12 60.5T873-437L545-110q-14 14-32.5 22T474-80Z"/>
  </svg>
)

const MicroscopeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="currentColor">
    <path d="M200-120v-80h200v-80q-83 0-141.5-58.5T200-480q0-61 33.5-111t90.5-73q8-34 35.5-55t62.5-21l-22-62 38-14-14-36 76-28 12 38 38-14 110 300-38 14 14 38-76 28-12-38-38 14-24-66q-15 14-34.5 21t-39.5 5q-22-2-41-13.5T338-582q-27 16-42.5 43T280-480q0 50 35 85t85 35h320v80H520v80h240v80H200Z"/>
  </svg>
)

const AccessibilityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="currentColor">
    <path d="M480-720q-33 0-56.5-23.5T400-800q0-33 23.5-56.5T480-880q33 0 56.5 23.5T560-800q0 33-23.5 56.5T480-720ZM360-80v-480q-60-5-122-15t-118-25l20-80q75 20 150.5 30T480-640q67 0 142.5-10T773-680l20 80q-56 15-118 25t-115 15v480h-80v-200h-80v200h-80Z"/>
  </svg>
)

const LeafIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="currentColor">
    <path d="M160-120q17-106 59-200.5T329-487q-50 10-101.5 37.5T124-383q9-111 59.5-204.5T326-745q79-61 175-88t196-9q12 96-6.5 189T633-481q-53 56-120.5 90T360-341q21-3 41-10.5t39-17.5q122-75 173-167.5T660-760q-11 142-87.5 244T360-360q-20 100 1 193t81 167H360q-83 0-141.5-58.5T160-200v-80Z"/>
  </svg>
)

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
              { icon: <HandshakeIcon />, title: 'ความเท่าเทียม', desc: 'ทุกคนมีสิทธิ์เข้าถึงทรัพยากรและโอกาสอย่างเท่าเทียม' },
              { icon: <MicroscopeIcon />, title: 'หลักฐานเชิงประจักษ์', desc: 'การตัดสินใจบนพื้นฐานงานวิจัยและข้อมูลที่น่าเชื่อถือ' },
              { icon: <AccessibilityIcon />, title: 'ออกแบบเพื่อทุกคน', desc: 'Universal Design ที่รองรับความต้องการที่หลากหลาย' },
              { icon: <LeafIcon />, title: 'ยั่งยืน', desc: 'สร้างผลกระทบที่ยั่งยืนต่อสังคมและสิ่งแวดล้อม' },
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
                <div style={{ marginBottom: '12px', color: 'var(--teal)' }} aria-hidden="true">{v.icon}</div>
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
