'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminCard from '@/components/admin/AdminCard'
import AdminInput from '@/components/admin/AdminInput'
import AdminTextarea from '@/components/admin/AdminTextarea'
import AdminSelect from '@/components/admin/AdminSelect'
import AdminButton from '@/components/admin/AdminButton'
import AdminToast from '@/components/admin/AdminToast'
import DynamicList from '@/components/admin/DynamicList'

const STATUS_COLORS = [
  { value: 'teal', label: 'Teal (เปิดใช้งาน/กำลังดำเนินการ)' },
  { value: 'gold', label: 'Gold (กำลังพัฒนา/เร็วๆ นี้)' },
]

export default function ProductNewPage() {
  const router = useRouter()
  const [form, setForm] = useState({ icon: '📦', title: '', subtitle: '', description: '', tags: [] as string[], status: '', statusColor: 'teal', badge: '' })
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  const set = (k: string, v: string | string[]) => setForm(p => ({ ...p, [k]: v }))

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (res.ok) { router.push('/admin/products') }
      else setToast({ msg: 'เกิดข้อผิดพลาด', type: 'error' })
    } catch { setToast({ msg: 'เกิดข้อผิดพลาด', type: 'error' }) }
    finally { setSaving(false) }
  }

  return (
    <div style={{ minWidth: 0 }}>
      <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#111827', marginBottom: '24px', fontFamily: 'var(--font-kanit)' }}>เพิ่มผลิตภัณฑ์ใหม่</h1>

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
