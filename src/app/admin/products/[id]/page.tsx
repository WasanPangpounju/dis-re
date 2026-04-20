'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import AdminCard from '@/components/admin/AdminCard'
import AdminInput from '@/components/admin/AdminInput'
import AdminTextarea from '@/components/admin/AdminTextarea'
import AdminSelect from '@/components/admin/AdminSelect'
import AdminButton from '@/components/admin/AdminButton'
import AdminToast from '@/components/admin/AdminToast'
import DynamicList from '@/components/admin/DynamicList'

interface ProductForm {
  id: string; icon: string; title: string; subtitle: string; description: string
  tags: string[]; status: string; statusColor: string; badge: string
}

const EMPTY: ProductForm = { id: '', icon: '📦', title: '', subtitle: '', description: '', tags: [], status: '', statusColor: 'teal', badge: '' }

const STATUS_COLORS = [
  { value: 'teal', label: 'Teal (เปิดใช้งาน/กำลังดำเนินการ)' },
  { value: 'gold', label: 'Gold (กำลังพัฒนา/เร็วๆ นี้)' },
]

export default function ProductEditPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const isNew = params.id === 'new'
  const [form, setForm] = useState<ProductForm>(EMPTY)
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/admin/products/${params.id}`).then(r => r.json()).then(d => { setForm(d); setLoading(false) })
    }
  }, [params.id, isNew])

  const set = (k: keyof ProductForm, v: string | string[]) => setForm(p => ({ ...p, [k]: v }))

  async function handleSave() {
    setSaving(true)
    try {
      let res
      if (isNew) {
        res = await fetch('/api/admin/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      } else {
        res = await fetch(`/api/admin/products/${params.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      }
      if (res.ok) {
        setToast({ msg: 'บันทึกสำเร็จ', type: 'success' })
        if (isNew) setTimeout(() => router.push('/admin/products'), 1000)
      } else setToast({ msg: 'เกิดข้อผิดพลาด', type: 'error' })
    } catch { setToast({ msg: 'เกิดข้อผิดพลาด', type: 'error' }) }
    finally { setSaving(false) }
  }

  if (loading) return <div style={{ fontFamily: 'var(--font-sarabun)' }}>กำลังโหลด...</div>

  return (
    <div style={{ maxWidth: '700px' }}>
      <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#111827', marginBottom: '24px', fontFamily: 'var(--font-kanit)' }}>
        {isNew ? 'เพิ่มผลิตภัณฑ์ใหม่' : 'แก้ไขผลิตภัณฑ์'}
      </h1>

      <AdminCard>
        <AdminInput label="Icon Emoji" value={form.icon} onChange={v => set('icon', v)} />
        <AdminInput label="ชื่อ" value={form.title} onChange={v => set('title', v)} required />
        <AdminInput label="Subtitle" value={form.subtitle} onChange={v => set('subtitle', v)} />
        <AdminTextarea label="คำอธิบาย" value={form.description} onChange={v => set('description', v)} required />
        <DynamicList label="Tags" items={form.tags} onChange={v => set('tags', v)} placeholder="เช่น AI, iOS" addLabel="+ เพิ่ม Tag" />
        <AdminInput label="สถานะ" value={form.status} onChange={v => set('status', v)} />
        <AdminSelect label="สี Status" value={form.statusColor} onChange={v => set('statusColor', v)} options={STATUS_COLORS} />
        <AdminInput label="Badge Text" value={form.badge} onChange={v => set('badge', v)} placeholder="พร้อมใช้งาน" />
      </AdminCard>

      <div style={{ display: 'flex', gap: '12px' }}>
        <AdminButton onClick={handleSave} loading={saving}>บันทึก</AdminButton>
        <AdminButton variant="secondary" onClick={() => router.push('/admin/products')}>ยกเลิก</AdminButton>
      </div>

      {toast && <AdminToast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
