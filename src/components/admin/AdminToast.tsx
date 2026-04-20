'use client'

import { useEffect } from 'react'

interface AdminToastProps {
  message: string
  type: 'success' | 'error'
  onClose: () => void
}

export default function AdminToast({ message, type, onClose }: AdminToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      padding: '14px 20px',
      borderRadius: '10px',
      background: type === 'success' ? '#10b981' : '#ef4444',
      color: 'white',
      fontFamily: 'var(--font-sarabun)',
      fontSize: '15px',
      fontWeight: 600,
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    }}>
      <span>{type === 'success' ? '✓' : '✕'}</span>
      {message}
    </div>
  )
}
