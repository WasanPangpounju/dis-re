'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import AdminCard from '@/components/admin/AdminCard'
import AdminInput from '@/components/admin/AdminInput'
import AdminTextarea from '@/components/admin/AdminTextarea'
import AdminButton from '@/components/admin/AdminButton'
import AdminToast from '@/components/admin/AdminToast'
import DynamicList from '@/components/admin/DynamicList'

interface ServiceForm { id: string; icon: string; title: string; description: string; features: string[] }

const EMPTY: ServiceForm = { id: '', icon: '🛠', title: '', description: '', features: [] }

export default function ServiceEditPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const isNew = params.id === 'new'
  const [form, setForm] = useState<ServiceForm>(EMPTY)
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/admin/services/${params.id}`).then(r => r.json()).then(d => { setForm(d); setLoading(false) })
    }
  }, [params.id, isNew])

  const set = (k: keyof ServiceForm, v: string | string[]) => setForm(p => ({ ...p, [k]: v }))

  async function handleSave() {
    setSaving(true)
    try {
      let res
      if (isNew) {
        res = await fetch('/api/admin/services', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      } else {
        res = await fetch(`/api/admin/services/${params.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      }
      if (res.ok) {
        setToast({ msg: 'บันทึกสำเร็จ', type: 'success' })
        if (isNew) setTimeout(() => router.push('/admin/services'), 1000)
      } else setToast({ msg: 'เกิดข้อผิดพลาด', type: 'error' })
    } catch { setToast({ msg: 'เกิดข้อผิดพลาด', type: 'error' }) }
    finally { setSaving(false) }
  }

  if (loading) return <div style={{ fontFamily: 'var(--font-sarabun)' }}>กำลังโหลด...</div>

  return (
    <div style={{ maxWidth: '700px' }}>
      <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#111827', marginBottom: '24px', fontFamily: 'var(--font-kanit)' }}>
        {isNew ? 'เพิ่มบริการใหม่' : 'แก้ไขบริการ'}
      </h1>

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
