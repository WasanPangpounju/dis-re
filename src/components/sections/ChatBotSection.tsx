'use client'

import { useState } from 'react'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHeader from '@/components/ui/SectionHeader'
import { useChat } from '@/hooks/useChat'
import ChatMessage from '@/components/chat/ChatMessage'

const features = [
  { icon: '⚕️', title: 'สุขภาพคนพิการ', desc: 'ข้อมูลสุขภาพเฉพาะทางสำหรับทุกประเภท' },
  { icon: '⚖️', title: 'สิทธิ์ตามกฎหมาย', desc: 'พ.ร.บ. คนพิการ พ.ศ. 2550 และสิทธิต่างๆ' },
  { icon: '🤖', title: 'เทคโนโลยี Assistive', desc: 'แนะนำอุปกรณ์ช่วยเหลือที่มีในไทย' },
  { icon: '🏥', title: 'บริการสุขภาพ', desc: 'แหล่งบริการและทรัพยากรสำหรับคนพิการ' },
]

export default function ChatBotSection() {
  const { messages, isLoading, error, sendMessage } = useChat()
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    sendMessage(input)
    setInput('')
  }

  const demoMessages = messages.length === 0
    ? [
        { id: 'demo-1', role: 'assistant' as const, content: 'สวัสดีครับ! ผมเป็น AI ผู้ช่วยด้านสุขภาพและสิทธิ์คนพิการ ถามได้เลยครับ', timestamp: new Date() },
        { id: 'demo-2', role: 'user' as const, content: 'อยากทราบว่าคนพิการมีสิทธิ์อะไรบ้างตามกฎหมายไทย?', timestamp: new Date() },
        { id: 'demo-3', role: 'assistant' as const, content: 'ตามพ.ร.บ.ส่งเสริมและพัฒนาคุณภาพชีวิตคนพิการ พ.ศ. 2550 คนพิการมีสิทธิ์หลายด้าน เช่น สิทธิ์รับบริการฟื้นฟูสมรรถภาพ สิทธิ์เข้าถึงการศึกษา สิทธิ์การจ้างงาน และสิทธิ์รับเงินสนับสนุนครับ', timestamp: new Date() },
      ]
    : messages

  return (
    <section
      id="chatbot"
      aria-labelledby="chatbot-heading"
      style={{
        padding: '100px 24px',
        background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <RevealOnScroll>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
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
              AI Chat Bot
            </span>
            <h2
              id="chatbot-heading"
              style={{
                fontFamily: 'var(--font-kanit)',
                fontWeight: 700,
                fontSize: 'clamp(28px, 4vw, 42px)',
                color: 'white',
                margin: '0 0 16px',
              }}
            >
              ถามเรื่อง<span style={{ color: '#2DA88E' }}>สุขภาพและสิทธิ์</span>
              <br />ได้เลย ทันที 24 ชั่วโมง
            </h2>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.75)', maxWidth: '560px', margin: '0 auto' }}>
              AI ของเราพร้อมตอบทุกคำถามเกี่ยวกับสุขภาพคนพิการ สิทธิ์ตามกฎหมาย และเทคโนโลยีช่วยเหลือ
            </p>
          </div>
        </RevealOnScroll>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '48px', alignItems: 'start' }}>
          {/* Info */}
          <RevealOnScroll>
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-kanit)',
                  fontWeight: 700,
                  fontSize: '24px',
                  color: 'white',
                  marginBottom: '28px',
                }}
              >
                AI ช่วยคุณได้เรื่อง
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {features.map((f) => (
                  <div
                    key={f.title}
                    style={{
                      display: 'flex',
                      gap: '16px',
                      alignItems: 'flex-start',
                      padding: '20px',
                      borderRadius: '14px',
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        background: 'rgba(45,168,142,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '22px',
                        flexShrink: 0,
                      }}
                      aria-hidden="true"
                    >
                      {f.icon}
                    </div>
                    <div>
                      <h4 style={{ color: 'white', fontFamily: 'var(--font-kanit)', fontWeight: 600, fontSize: '18px', marginBottom: '4px' }}>
                        {f.title}
                      </h4>
                      <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px', margin: 0 }}>
                        {f.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Chat Window */}
          <RevealOnScroll delay={150}>
            <div
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column',
                height: '480px',
              }}
            >
              {/* Header */}
              <div
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(10px)',
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #1B7E6A, #2DA88E)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                  }}
                  aria-hidden="true"
                >
                  🤖
                </div>
                <div>
                  <p style={{ color: 'white', fontWeight: 600, fontSize: '16px', margin: 0 }}>ผู้ช่วย AI</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span
                      style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2DA88E', display: 'inline-block' }}
                      className="animate-pulse-dot"
                      aria-hidden="true"
                    />
                    <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>ออนไลน์</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div
                role="log"
                aria-live="polite"
                aria-label="ตัวอย่างการสนทนา"
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: '16px',
                  background: '#F8FAFB',
                }}
              >
                {demoMessages.map((m) => (
                  <ChatMessage key={m.id} message={m} />
                ))}
                {isLoading && (
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #1B7E6A, #2DA88E)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                      }}
                    >
                      🤖
                    </div>
                    <div
                      style={{
                        background: 'white',
                        border: '1px solid var(--border)',
                        borderRadius: '12px',
                        padding: '10px 14px',
                        display: 'flex',
                        gap: '4px',
                      }}
                    >
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="typing-dot"
                          style={{
                            width: '7px',
                            height: '7px',
                            borderRadius: '50%',
                            background: 'var(--text-soft)',
                            display: 'inline-block',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {error && (
                  <div role="alert" style={{ color: 'red', fontSize: '14px', padding: '8px' }}>
                    {error}
                  </div>
                )}
              </div>

              {/* Disclaimer */}
              <div style={{ padding: '6px 16px', background: '#FFFBEB', fontSize: '12px', color: '#92400E', textAlign: 'center', borderTop: '1px solid #FDE68A' }}>
                ⚠️ ข้อมูลจาก AI เป็นเพียงข้อมูลเบื้องต้น ควรปรึกษาแพทย์
              </div>

              {/* Input */}
              <form
                onSubmit={handleSubmit}
                style={{
                  padding: '12px 14px',
                  background: 'white',
                  borderTop: '1px solid var(--border)',
                  display: 'flex',
                  gap: '8px',
                }}
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="พิมพ์คำถามของคุณที่นี่..."
                  disabled={isLoading}
                  aria-label="พิมพ์คำถาม"
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    fontSize: '16px',
                    fontFamily: 'var(--font-sarabun)',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  aria-label="ส่งคำถาม"
                  style={{
                    padding: '10px 16px',
                    borderRadius: '8px',
                    background:
                      isLoading || !input.trim()
                        ? '#E5E7EB'
                        : 'linear-gradient(135deg, #1B7E6A, #2DA88E)',
                    border: 'none',
                    color: isLoading || !input.trim() ? '#9CA3AF' : 'white',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
                    fontFamily: 'var(--font-sarabun)',
                    transition: 'background 0.2s',
                  }}
                >
                  ส่ง
                </button>
              </form>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
