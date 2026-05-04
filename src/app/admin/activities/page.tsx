'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import AdminToast from '@/components/admin/AdminToast'
import type { Activity } from '@/lib/types'

export default function ActivitiesListPage() {
  const [items, setItems] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    fetch('/api/admin/activities').then(r => r.json()).then(d => { setItems(d); setLoading(false) })
  }, [])

  async function handleDelete() {
    if (!deleteId) return
    const res = await fetch(`/api/admin/activities/${deleteId}`, { method: 'DELETE' })
    if (res.ok) {
      setItems(prev => prev.filter(i => i.id !== deleteId))
      setToast({ msg: 'ลบสำเร็จ', type: 'success' })
    } else {
      setToast({ msg: 'เกิดข้อผิดพลาด', type: 'error' })
    }
    setDeleteId(null)
  }

  if (loading) return <div style={{ fontFamily: 'var(--font-sarabun)' }}>กำลังโหลด...</div>

  return (
    <div style={{ minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#111827', fontFamily: 'var(--font-kanit)' }}>กิจกรรม</h1>
        <Link href="/admin/activities/new"
          style={{ padding: '10px 20px', background: '#4f46e5', color: 'white', borderRadius: '10px', textDecoration: 'none', fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-sarabun)' }}>
          + เพิ่มกิจกรรมใหม่
        </Link>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        {items.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: '#9ca3af', fontFamily: 'var(--font-sarabun)' }}>ยังไม่มีกิจกรรม</div>
        )}
        {items.map((item) => (
          <div key={item.id}
            style={{
              display: 'flex', alignItems: 'center', gap: '16px',
              padding: '16px 20px', borderBottom: '1px solid #f3f4f6', background: 'white',
            }}>
            {item.image && (
              <img src={item.image} alt={item.title}
                style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} />
            )}
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, color: '#111827', fontFamily: 'var(--font-sarabun)', fontSize: '15px' }}>{item.title}</div>
              <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '2px' }}>
                {item.date}{item.location ? ` · ${item.location}` : ''}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Link href={`/admin/activities/${item.id}`}
                style={{ padding: '8px 14px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-sarabun)' }}>
                แก้ไข
              </Link>
              <button onClick={() => setDeleteId(item.id)}
                style={{ padding: '8px 14px', background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-sarabun)' }}>
                ลบ
              </button>
            </div>
          </div>
        ))}
      </div>

      {deleteId && (
        <ConfirmDialog
          message="ต้องการลบกิจกรรมนี้ใช่หรือไม่?"
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
      {toast && <AdminToast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
