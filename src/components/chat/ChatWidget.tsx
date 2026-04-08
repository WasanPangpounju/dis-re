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
  
  const TechIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
      <path d="M160-360q-50 0-85-35t-35-85q0-50 35-85t85-35v-80q0-33 23.5-56.5T240-760h120q0-50 35-85t85-35q50 0 85 35t35 85h120q33 0 56.5 23.5T800-680v80q50 0 85 35t35 85q0 50-35 85t-85 35v160q0 33-23.5 56.5T720-120H240q-33 0-56.5-23.5T160-200v-160Zm242.5-97.5Q420-475 420-500t-17.5-42.5Q385-560 360-560t-42.5 17.5Q300-525 300-500t17.5 42.5Q335-440 360-440t42.5-17.5Zm240 0Q660-475 660-500t-17.5-42.5Q625-560 600-560t-42.5 17.5Q540-525 540-500t17.5 42.5Q575-440 600-440t42.5-17.5ZM320-280h320v-80H320v80Zm-80 80h480v-480H240v480Zm240-240Z" />
    </svg>
  )

  const ChatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ margin: 0, display: 'inline', verticalAlign: 'middle' }} height="18px" viewBox="0 -960 960 960" width="18px" fill="#1f1f1f">
      <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/>
    </svg>
  )
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
            <ChatIcon/> ถามเรื่องสุขภาพ
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
          {isOpen ? '✕' : <TechIcon/> }
        </button>
      </div>
    </div>
  )
}
