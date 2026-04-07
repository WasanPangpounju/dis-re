'use client'

import { useState } from 'react'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHeader from '@/components/ui/SectionHeader'
import { COMPANY } from '@/lib/constants'
import type { ContactFormData } from '@/lib/types'

export default function ContactSection() {
  const [form, setForm] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    organization: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', phone: '', organization: '', subject: '', message: '' })
      } else {
        throw new Error('ส่งข้อความไม่สำเร็จ')
      }
    } catch {
      setStatus('error')
      setErrorMsg('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1px solid var(--border)',
    fontSize: '17px',
    fontFamily: 'var(--font-sarabun)',
    color: 'var(--text-dark)',
    background: 'white',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      style={{ padding: '100px 24px', background: 'white' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <RevealOnScroll>
          <SectionHeader
            label="ติดต่อเรา"
            title="พร้อม"
            highlight="ให้ความช่วยเหลือ"
            description="ติดต่อทีมผู้เชี่ยวชาญของเราสำหรับคำปรึกษา ความร่วมมือ หรือสอบถามข้อมูลเพิ่มเติม"
          />
        </RevealOnScroll>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '48px', alignItems: 'start' }}>
          {/* Info */}
          <RevealOnScroll>
            <div>
              {[
                { icon: '📍', label: 'ที่อยู่', value: COMPANY.address },
                { icon: '📞', label: 'โทรศัพท์', value: COMPANY.phone, href: `tel:${COMPANY.phone}` },
                { icon: '✉️', label: 'อีเมล', value: COMPANY.email, href: `mailto:${COMPANY.email}` },
                { icon: '🆘', label: 'สายด่วนความพิการ', value: COMPANY.accessibilityHotline, href: `tel:${COMPANY.accessibilityHotline}` },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    marginBottom: '24px',
                    alignItems: 'flex-start',
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: 'var(--teal-pale)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', color: 'var(--text-soft)', marginBottom: '2px' }}>
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        style={{ fontSize: '17px', color: 'var(--teal)', fontWeight: 600, textDecoration: 'none' }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p style={{ fontSize: '17px', color: 'var(--text-dark)', margin: 0 }}>{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>

          {/* Form */}
          <RevealOnScroll delay={100}>
            <form
              onSubmit={handleSubmit}
              aria-label="แบบฟอร์มติดต่อ"
              noValidate
              style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label htmlFor="name" style={{ display: 'block', fontSize: '16px', fontWeight: 600, marginBottom: '6px' }}>
                    ชื่อ-นามสกุล <span style={{ color: 'red' }} aria-hidden="true">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    aria-required="true"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--teal)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>
                <div>
                  <label htmlFor="email" style={{ display: 'block', fontSize: '16px', fontWeight: 600, marginBottom: '6px' }}>
                    อีเมล <span style={{ color: 'red' }} aria-hidden="true">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    aria-required="true"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--teal)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label htmlFor="phone" style={{ display: 'block', fontSize: '16px', fontWeight: 600, marginBottom: '6px' }}>
                    เบอร์โทรศัพท์
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--teal)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>
                <div>
                  <label htmlFor="organization" style={{ display: 'block', fontSize: '16px', fontWeight: 600, marginBottom: '6px' }}>
                    องค์กร/หน่วยงาน
                  </label>
                  <input
                    id="organization"
                    type="text"
                    value={form.organization}
                    onChange={(e) => setForm({ ...form, organization: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--teal)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" style={{ display: 'block', fontSize: '16px', fontWeight: 600, marginBottom: '6px' }}>
                  เรื่องที่ต้องการติดต่อ <span style={{ color: 'red' }} aria-hidden="true">*</span>
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  aria-required="true"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--teal)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>

              <div>
                <label htmlFor="message" style={{ display: 'block', fontSize: '16px', fontWeight: 600, marginBottom: '6px' }}>
                  ข้อความ <span style={{ color: 'red' }} aria-hidden="true">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  aria-required="true"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ ...inputStyle, resize: 'vertical' }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--teal)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>

              {status === 'error' && (
                <div role="alert" style={{ color: 'red', fontSize: '16px' }}>
                  {errorMsg}
                </div>
              )}
              {status === 'success' && (
                <div role="alert" style={{ color: 'var(--teal)', fontSize: '16px', fontWeight: 600 }}>
                  ✓ ส่งข้อความสำเร็จแล้ว เราจะติดต่อกลับภายใน 1-2 วันทำการ
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  padding: '14px 32px',
                  borderRadius: '10px',
                  background: status === 'loading'
                    ? 'rgba(27,126,106,0.5)'
                    : 'linear-gradient(135deg, #1B7E6A, #2DA88E)',
                  color: 'white',
                  border: 'none',
                  fontSize: '18px',
                  fontFamily: 'var(--font-sarabun)',
                  fontWeight: 700,
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  transition: 'opacity 0.2s',
                }}
                aria-label={status === 'loading' ? 'กำลังส่งข้อความ...' : 'ส่งข้อความ'}
              >
                {status === 'loading' ? 'กำลังส่ง...' : 'ส่งข้อความ'}
              </button>
            </form>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
