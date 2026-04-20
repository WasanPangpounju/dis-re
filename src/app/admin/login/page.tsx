'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'เกิดข้อผิดพลาด')
      } else {
        router.push('/admin/general')
      }
    } catch {
      setError('ไม่สามารถเชื่อมต่อได้')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#f9fafb',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px',
    }}>
      <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.1)', padding: '48px', width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '40px', marginBottom: '8px' }}>🔐</div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', fontFamily: 'var(--font-kanit)' }}>Admin Panel</h1>
          <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px', fontFamily: 'var(--font-sarabun)' }}>การวิจัยนวัตกรรมเพื่อคนพิการ</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px', fontFamily: 'var(--font-sarabun)' }}>
              รหัสผ่าน
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="ใส่รหัสผ่าน"
              required
              autoFocus
              style={{
                width: '100%', padding: '12px 14px',
                border: `1px solid ${error ? '#ef4444' : '#d1d5db'}`,
                borderRadius: '10px', fontSize: '16px', outline: 'none',
                boxSizing: 'border-box', fontFamily: 'var(--font-sarabun)',
              }}
            />
          </div>

          {error && (
            <div style={{ background: '#fee2e2', color: '#dc2626', padding: '10px 14px', borderRadius: '8px', fontSize: '14px', marginBottom: '16px', fontFamily: 'var(--font-sarabun)' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '13px',
              background: loading ? '#a5b4fc' : '#4f46e5',
              color: 'white', border: 'none',
              borderRadius: '10px', fontSize: '16px',
              fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--font-sarabun)',
              transition: 'background 0.2s',
            }}
          >
            {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </button>
        </form>
      </div>
    </div>
  )
}
