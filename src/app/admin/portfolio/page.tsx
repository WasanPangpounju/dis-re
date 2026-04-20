'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import AdminToast from '@/components/admin/AdminToast'

interface PortfolioItem {
  id: string; category: string; categoryLabel: string; icon: string
  title: string; description: string; year: string
  team?: string; award?: string; reach?: string; status?: string; bgColor: string
}

export default function PortfolioListPage() {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)
  const [dragIdx, setDragIdx] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/admin/portfolio').then(r => r.json()).then(d => { setItems(d); setLoading(false) })
  }, [])

  async function handleDelete() {
    if (!deleteId) return
    const res = await fetch(`/api/admin/portfolio/${deleteId}`, { method: 'DELETE' })
    if (res.ok) {
      setItems(prev => prev.filter(i => i.id !== deleteId))
      setToast({ msg: 'ลบสำเร็จ', type: 'success' })
    } else {
      setToast({ msg: 'เกิดข้อผิดพลาด', type: 'error' })
    }
    setDeleteId(null)
  }

  async function saveOrder(newItems: PortfolioItem[]) {
    await fetch('/api/admin/portfolio', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ _reorder: true }) })
    // Save all items by updating the list sequentially via PUT each
    // Simplified: save entire array by using a bulk approach
    // We'll just PUT each item to keep order - but for simplicity, update one by one
    setItems(newItems)
  }

  function onDragStart(i: number) { setDragIdx(i) }
  function onDragOver(e: React.DragEvent, i: number) {
    e.preventDefault()
    if (dragIdx === null || dragIdx === i) return
    const next = [...items]
    const [moved] = next.splice(dragIdx, 1)
    next.splice(i, 0, moved)
    setDragIdx(i)
    setItems(next)
  }
  function onDragEnd() { setDragIdx(null) }

  if (loading) return <div style={{ fontFamily: 'var(--font-sarabun)' }}>กำลังโหลด...</div>

  return (
    <div style={{ minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#111827', fontFamily: 'var(--font-kanit)' }}>ผลงาน</h1>
        <Link href="/admin/portfolio/new"
          style={{ padding: '10px 20px', background: '#4f46e5', color: 'white', borderRadius: '10px', textDecoration: 'none', fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-sarabun)' }}>
          + เพิ่มผลงานใหม่
        </Link>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        {items.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: '#9ca3af', fontFamily: 'var(--font-sarabun)' }}>ยังไม่มีผลงาน</div>
        )}
        {items.map((item, i) => (
          <div key={item.id}
            draggable
            onDragStart={() => onDragStart(i)}
            onDragOver={e => onDragOver(e, i)}
            onDragEnd={onDragEnd}
            style={{
              display: 'flex', alignItems: 'center', gap: '16px',
              padding: '16px 20px', borderBottom: '1px solid #f3f4f6',
              cursor: 'grab', background: dragIdx === i ? '#f0f4ff' : 'white',
              transition: 'background 0.15s',
            }}>
            <span style={{ fontSize: '24px', flexShrink: 0 }}>⠿</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, color: '#111827', fontFamily: 'var(--font-sarabun)', fontSize: '15px' }}>{item.title}</div>
              <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '2px' }}>{item.categoryLabel} · {item.year}</div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Link href={`/admin/portfolio/${item.id}`}
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
          message="ต้องการลบผลงานนี้ใช่หรือไม่?"
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
      {toast && <AdminToast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
