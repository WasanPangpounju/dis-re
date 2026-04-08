'use client'

import { useEffect, useRef, useState } from 'react'
import { useChat } from '@/hooks/useChat'
import ChatMessage from './ChatMessage'

interface ChatWindowProps {
  onClose: () => void
}

const INITIAL_MESSAGES = [
  { id: 'init-1', role: 'assistant' as const, content: 'สวัสดีครับ! ผมเป็น AI ผู้ช่วยด้านสุขภาพและสิทธิ์คนพิการ สามารถถามได้เลยครับ 😊', timestamp: new Date() },
]

export default function ChatWindow({ onClose }: ChatWindowProps) {
  const { messages, isLoading, error, sendMessage } = useChat()
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const allMessages = [...INITIAL_MESSAGES, ...messages]

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [allMessages.length, isLoading])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    sendMessage(input)
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }

  const TechIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
      <path d="M160-360q-50 0-85-35t-35-85q0-50 35-85t85-35v-80q0-33 23.5-56.5T240-760h120q0-50 35-85t85-35q50 0 85 35t35 85h120q33 0 56.5 23.5T800-680v80q50 0 85 35t35 85q0 50-35 85t-85 35v160q0 33-23.5 56.5T720-120H240q-33 0-56.5-23.5T160-200v-160Zm242.5-97.5Q420-475 420-500t-17.5-42.5Q385-560 360-560t-42.5 17.5Q300-525 300-500t17.5 42.5Q335-440 360-440t42.5-17.5Zm240 0Q660-475 660-500t-17.5-42.5Q625-560 600-560t-42.5 17.5Q540-525 540-500t17.5 42.5Q575-440 600-440t42.5-17.5ZM320-280h320v-80H320v80Zm-80 80h480v-480H240v480Zm240-240Z" />
    </svg>
  )

  const WarningIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="currentColor" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}>
      <path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z" />
    </svg>
  )
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: 'white',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(13,43,69,0.25)',
      }}
      onKeyDown={handleKeyDown}
    >
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--navy), var(--navy-mid))',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1B7E6A, #2DA88E)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          <TechIcon />
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ color: 'white', fontSize: '17px', fontFamily: 'var(--font-kanit)', fontWeight: 700, margin: 0 }}>
            ผู้ช่วย AI
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: '#2DA88E',
                display: 'inline-block',
              }}
              className="animate-pulse-dot"
              aria-hidden="true"
            />
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>ออนไลน์</span>
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="ปิดหน้าต่างแชท"
          style={{
            background: 'rgba(255,255,255,0.15)',
            border: 'none',
            color: 'white',
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.25)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div
        role="log"
        aria-live="polite"
        aria-label="ประวัติการสนทนา"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 16px',
          background: '#F8FAFB',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {allMessages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', marginBottom: '12px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #1B7E6A, #2DA88E)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
              }}
              aria-hidden="true"
            >
              <TechIcon />
            </div>
            <div
              style={{
                background: 'white',
                border: '1px solid var(--border)',
                borderRadius: '18px 18px 18px 4px',
                padding: '14px 18px',
                display: 'flex',
                gap: '5px',
                alignItems: 'center',
              }}
              aria-label="กำลังพิมพ์..."
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="typing-dot"
                  style={{
                    width: '8px',
                    height: '8px',
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
          <div
            role="alert"
            style={{
              padding: '12px 16px',
              background: '#FEF2F2',
              border: '1px solid #FECACA',
              borderRadius: '10px',
              color: '#DC2626',
              fontSize: '15px',
              marginBottom: '12px',
            }}
          >
            {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Disclaimer */}
      <div
        style={{
          padding: '8px 16px',
          background: '#FFFBEB',
          borderTop: '1px solid #FDE68A',
          fontSize: '13px',
          color: '#92400E',
          textAlign: 'center',
        }}
      >
        <WarningIcon/> ข้อมูลจาก AI เป็นเพียงข้อมูลเบื้องต้น ควรปรึกษาแพทย์
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        style={{
          padding: '12px 16px',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          gap: '10px',
          background: 'white',
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="พิมพ์คำถามของคุณ..."
          disabled={isLoading}
          aria-label="พิมพ์คำถาม"
          style={{
            flex: 1,
            padding: '10px 14px',
            borderRadius: '10px',
            border: '1px solid var(--border)',
            fontSize: '16px',
            fontFamily: 'var(--font-sarabun)',
            outline: 'none',
            background: isLoading ? '#F9FAFB' : 'white',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'var(--teal)')}
          onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          aria-label="ส่งคำถาม"
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background:
              isLoading || !input.trim()
                ? '#E5E7EB'
                : 'linear-gradient(135deg, #1B7E6A, #2DA88E)',
            border: 'none',
            color: isLoading || !input.trim() ? '#9CA3AF' : 'white',
            fontSize: '18px',
            cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'background 0.2s',
          }}
        >
          ➤
        </button>
      </form>
    </div>
  )
}
