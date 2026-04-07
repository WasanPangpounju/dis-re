'use client'

import { useState, useEffect, useRef } from 'react'
import ChatWindow from './ChatWindow'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const widgetRef = useRef<HTMLDivElement>(null)

  // Focus trap when open
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  return (
    <div
      ref={widgetRef}
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '12px',
      }}
    >
      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            width: 'min(380px, calc(100vw - 56px))',
            height: 'min(520px, calc(100vh - 120px))',
            animation: 'slideUp 0.3s ease',
          }}
        >
          <style>{`
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(20px) scale(0.95); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
            @media (max-width: 480px) {
              .chat-window-container {
                position: fixed !important;
                inset: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                bottom: 0 !important;
                right: 0 !important;
              }
            }
          `}</style>
          <ChatWindow onClose={() => setIsOpen(false)} />
        </div>
      )}

      {/* Label + Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {!isOpen && (
          <span
            style={{
              background: 'white',
              color: 'var(--navy)',
              padding: '8px 14px',
              borderRadius: '20px',
              fontSize: '15px',
              fontWeight: 600,
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-sarabun)',
            }}
          >
            💬 ถามเรื่องสุขภาพ
          </span>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="chat-window"
          aria-label={isOpen ? 'ปิดหน้าต่างแชท' : 'เปิดหน้าต่างแชทผู้ช่วย AI'}
          className={isOpen ? '' : 'animate-gentle-bounce'}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: isOpen
              ? 'linear-gradient(135deg, #DC2626, #EF4444)'
              : 'linear-gradient(135deg, #0D2B45, #1B7E6A)',
            border: 'none',
            cursor: 'pointer',
            fontSize: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(13,43,69,0.3)',
            transition: 'background 0.3s, transform 0.2s',
            color: 'white',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {isOpen ? '✕' : '🤖'}
        </button>
      </div>
    </div>
  )
}
