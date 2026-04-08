'use client'

import { useState } from 'react'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHeader from '@/components/ui/SectionHeader'
import { useChat } from '@/hooks/useChat'
import ChatMessage from '@/components/chat/ChatMessage'

const HealthIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
    <path d="M381-641q-41-41-41-99t41-99q41-41 99-41t99 41q41 41 41 99t-41 99q-41 41-99 41t-99-41Zm141.5-56.5Q540-715 540-740t-17.5-42.5Q505-800 480-800t-42.5 17.5Q420-765 420-740t17.5 42.5Q455-680 480-680t42.5-17.5ZM480-80 240-320q-20-20-30-45t-10-55q0-59 40.5-99.5T340-560q29 0 53.5 11t44.5 31l42 42 42-42q20-20 44.5-31t53.5-11q59 0 99.5 40.5T760-420q0 30-10 55t-30 45L480-80Zm0-114 182-182q9-9 13.5-20.5T680-420q0-24-17-42t-43-18q-12 0-21.5 3.5T580-464L480-364 380-464q-6-6-15.5-11t-24.5-5q-26 0-43 18t-17 42q0 12 5 22.5t13 19.5l182 184Zm0-546Zm0 403Z"/>
  </svg>
)

const LawIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
    <path d="M80-120v-80h360v-447q-26-9-45-28t-28-45H240l120 280q0 50-41 85t-99 35q-58 0-99-35t-41-85l120-280h-80v-80h247q12-35 43-57.5t70-22.5q39 0 70 22.5t43 57.5h247v80h-80l120 280q0 50-41 85t-99 35q-58 0-99-35t-41-85l120-280H593q-9 26-28 45t-45 28v447h360v80H80Zm585-320h150l-75-174-75 174Zm-520 0h150l-75-174-75 174Zm335-280q17 0 28.5-11.5T520-760q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760q0 17 11.5 28.5T480-720Z"/>
  </svg>
)

const TechIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
    <path d="M160-360q-50 0-85-35t-35-85q0-50 35-85t85-35v-80q0-33 23.5-56.5T240-760h120q0-50 35-85t85-35q50 0 85 35t35 85h120q33 0 56.5 23.5T800-680v80q50 0 85 35t35 85q0 50-35 85t-85 35v160q0 33-23.5 56.5T720-120H240q-33 0-56.5-23.5T160-200v-160Zm242.5-97.5Q420-475 420-500t-17.5-42.5Q385-560 360-560t-42.5 17.5Q300-525 300-500t17.5 42.5Q335-440 360-440t42.5-17.5Zm240 0Q660-475 660-500t-17.5-42.5Q625-560 600-560t-42.5 17.5Q540-525 540-500t17.5 42.5Q575-440 600-440t42.5-17.5ZM320-280h320v-80H320v80Zm-80 80h480v-480H240v480Zm240-240Z"/>
  </svg>
)

const WarningIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="currentColor" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}>
    <path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z"/>
  </svg>
)

const HospitalIcon = () =>(
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
    <path d="M420-280h120v-140h140v-120H540v-140H420v140H280v120h140v140ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/>
  </svg>
)

const features = [
  { icon: <HealthIcon/>, title: 'สุขภาพคนพิการ', desc: 'ข้อมูลสุขภาพเฉพาะทางสำหรับทุกประเภท' },
  { icon: <LawIcon/>, title: 'สิทธิ์ตามกฎหมาย', desc: 'พ.ร.บ. คนพิการ พ.ศ. 2550 และสิทธิต่างๆ' },
  { icon: <TechIcon/>, title: 'เทคโนโลยี Assistive', desc: 'แนะนำอุปกรณ์ช่วยเหลือที่มีในไทย' },
  { icon: <HospitalIcon/>, title: 'บริการสุขภาพ', desc: 'แหล่งบริการและทรัพยากรสำหรับคนพิการ' },
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
                  <TechIcon/>
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
                      <TechIcon/>
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
                <WarningIcon /> ข้อมูลจาก AI เป็นเพียงข้อมูลเบื้องต้น ควรปรึกษาแพทย์
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
