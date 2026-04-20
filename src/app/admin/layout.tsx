'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'

const NAV = [
  { href: '/admin/general', label: 'ข้อมูลทั่วไป', icon: '⚙️' },
  { href: '/admin/portfolio', label: 'ผลงาน', icon: '🗂' },
  { href: '/admin/services', label: 'บริการ', icon: '🛠' },
  { href: '/admin/products', label: 'ผลิตภัณฑ์', icon: '📦' },
  { href: '/admin/chatbot', label: 'Chat Bot', icon: '🤖' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  if (pathname === '/admin/login') return <>{children}</>

  async function handleLogout() {
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const sidebarContent = (
    <>
      <div style={{ padding: '24px 20px', borderBottom: '1px solid #f3f4f6' }}>
        <div style={{ fontSize: '20px', fontWeight: 700, color: '#111827', fontFamily: 'var(--font-kanit)' }}>⚙️ Admin Panel</div>
        <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px', fontFamily: 'var(--font-sarabun)' }}>การวิจัยนวัตกรรมเพื่อคนพิการ</div>
      </div>

      <nav style={{ padding: '16px 12px', flex: 1 }}>
        {NAV.map(item => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '11px 14px', borderRadius: '10px', marginBottom: '4px',
                background: active ? '#eef2ff' : 'transparent',
                color: active ? '#4f46e5' : '#374151',
                textDecoration: 'none', fontSize: '15px',
                fontWeight: active ? 700 : 400,
                fontFamily: 'var(--font-sarabun)',
                transition: 'background 0.15s',
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div style={{ padding: '16px 12px', borderTop: '1px solid #f3f4f6' }}>
        <Link href="/" target="_blank"
          style={{ display: 'block', padding: '10px 14px', color: '#6b7280', textDecoration: 'none', fontSize: '14px', fontFamily: 'var(--font-sarabun)', marginBottom: '4px' }}>
          ← ดูหน้าเว็บหลัก
        </Link>
        <button
          onClick={handleLogout}
          style={{
            width: '100%', padding: '11px 14px', borderRadius: '10px',
            background: '#fee2e2', color: '#ef4444', border: 'none',
            cursor: 'pointer', fontSize: '15px', fontWeight: 600,
            fontFamily: 'var(--font-sarabun)', textAlign: 'left',
          }}
        >
          🚪 ออกจากระบบ
        </button>
      </div>
    </>
  )

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f9fafb' }}>
      {/* Desktop sidebar */}
      <aside style={{
        width: '240px', background: 'white', borderRight: '1px solid #e5e7eb',
        display: 'flex', flexDirection: 'column', position: 'fixed',
        top: 0, left: 0, bottom: 0, zIndex: 100,
      }}
        className="admin-sidebar-desktop"
      >
        {sidebarContent}
      </aside>

      {/* Mobile hamburger */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '56px', background: 'white', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', padding: '0 16px', zIndex: 200 }}
        className="admin-mobile-header"
      >
        <button onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', marginRight: '12px' }}>
          ☰
        </button>
        <span style={{ fontWeight: 700, fontFamily: 'var(--font-kanit)', fontSize: '16px' }}>Admin Panel</span>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <>
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 150 }} onClick={() => setMenuOpen(false)} />
          <aside style={{
            position: 'fixed', top: 0, left: 0, bottom: 0, width: '280px',
            background: 'white', zIndex: 200, display: 'flex', flexDirection: 'column',
            boxShadow: '4px 0 20px rgba(0,0,0,0.15)',
          }}>
            {sidebarContent}
          </aside>
        </>
      )}

      <main style={{ marginLeft: '240px', flex: 1, padding: '32px' }} className="admin-main">
        {children}
      </main>

      <style>{`
        @media (max-width: 768px) {
          .admin-sidebar-desktop { display: none !important; }
          .admin-main { margin-left: 0 !important; padding-top: 72px !important; }
        }
        @media (min-width: 769px) {
          .admin-mobile-header { display: none !important; }
        }
      `}</style>
    </div>
  )
}
