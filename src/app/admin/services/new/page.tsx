'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminCard from '@/components/admin/AdminCard'
import AdminInput from '@/components/admin/AdminInput'
import AdminTextarea from '@/components/admin/AdminTextarea'
import AdminButton from '@/components/admin/AdminButton'
import AdminToast from '@/components/admin/AdminToast'
import DynamicList from '@/components/admin/DynamicList'

export default function ServiceNewPage() {
  const router = useRouter()
  const [form, setForm] = useState({ icon: '🛠', title: '', description: '', features: [] as string[] })
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  const set = (k: string, v: string | string[]) => setForm(p => ({ ...p, [k]: v }))

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/services', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (res.ok) { router.push('/admin/services') }
      else setToast({ msg: 'เกิดข้อผิดพลาด', type: 'error' })
    } catch { setToast({ msg: 'เกิดข้อผิดพลาด', type: 'error' }) }
    finally { setSaving(false) }
  }

  return (
    <div style={{ minWidth: 0 }}>
      <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#111827', marginBottom: '24px', fontFamily: 'var(--font-kanit)' }}>เพิ่มบริการใหม่</h1>

      <AdminCard>
        <AdminInput label="Icon Emoji" value={form.icon} onChange={v => set('icon', v)} />
        <AdminInput label="ชื่อบริการ" value={form.title} onChange={v => set('title', v)} required />
        <AdminTextarea label="คำอธิบาย" value={form.description} onChange={v => set('description', v)} required />
        <DynamicList label="Features" items={form.features} onChange={v => set('features', v)} placeholder="เพิ่ม feature" addLabel="+ เพิ่ม Feature" />
      </AdminCard>

      <div style={{ display: 'flex', gap: '12px' }}>
        <AdminButton onClick={handleSave} loading={saving}>บันทึก</AdminButton>
        <AdminButton variant="secondary" onClick={() => router.push('/admin/services')}>ยกเลิก</AdminButton>
      </div>

      {toast && <AdminToast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
