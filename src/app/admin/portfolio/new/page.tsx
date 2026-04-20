'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminCard from '@/components/admin/AdminCard'
import AdminInput from '@/components/admin/AdminInput'
import AdminTextarea from '@/components/admin/AdminTextarea'
import AdminSelect from '@/components/admin/AdminSelect'
import AdminButton from '@/components/admin/AdminButton'
import AdminToast from '@/components/admin/AdminToast'

const CATEGORIES = [
  { value: 'research', label: 'วิจัย' },
  { value: 'product', label: 'ผลิตภัณฑ์' },
  { value: 'community', label: 'ชุมชน' },
  { value: 'award', label: 'รางวัล' },
]

const CATEGORY_LABELS: Record<string, string> = { research: 'วิจัย', product: 'ผลิตภัณฑ์', community: 'ชุมชน', award: 'รางวัล' }

const BG_COLORS = [
  { value: 'from-teal-50 to-teal-100', label: 'Teal' },
  { value: 'from-amber-50 to-amber-100', label: 'Amber' },
  { value: 'from-indigo-50 to-indigo-100', label: 'Indigo' },
  { value: 'from-red-50 to-red-100', label: 'Red' },
  { value: 'from-teal-50 to-emerald-100', label: 'Emerald' },
  { value: 'from-violet-50 to-indigo-100', label: 'Violet' },
]

export default function PortfolioNewPage() {
  const router = useRouter()
  const [form, setForm] = useState({ icon: '📋', category: 'research', title: '', description: '', bgColor: 'from-teal-50 to-teal-100', year: '', team: '', award: '', reach: '', status: '' })
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))

  async function handleSave() {
    if (!form.title || !form.description) { setToast({ msg: 'กรุณากรอกชื่อและคำอธิบาย', type: 'error' }); return }
    setSaving(true)
    try {
      const payload = { ...form, categoryLabel: CATEGORY_LABELS[form.category] }
      const res = await fetch('/api/admin/portfolio', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (res.ok) { router.push('/admin/portfolio') }
      else setToast({ msg: 'เกิดข้อผิดพลาด', type: 'error' })
    } catch { setToast({ msg: 'เกิดข้อผิดพลาด', type: 'error' }) }
    finally { setSaving(false) }
  }

  return (
    <div style={{ maxWidth: '700px' }}>
      <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#111827', marginBottom: '24px', fontFamily: 'var(--font-kanit)' }}>เพิ่มผลงานใหม่</h1>

      <AdminCard>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ fontSize: '48px' }}>{form.icon}</div>
          <AdminInput label="Emoji Icon" value={form.icon} onChange={v => set('icon', v)} placeholder="📋" />
        </div>
        <AdminSelect label="หมวดหมู่" value={form.category} onChange={v => set('category', v)} options={CATEGORIES} />
        <AdminInput label="ชื่อผลงาน" value={form.title} onChange={v => set('title', v)} required />
        <AdminTextarea label="คำอธิบาย" value={form.description} onChange={v => set('description', v)} required />
        <AdminSelect label="สีพื้นหลัง" value={form.bgColor} onChange={v => set('bgColor', v)} options={BG_COLORS} />
        <AdminInput label="ปี" value={form.year} onChange={v => set('year', v)} placeholder="2567" />
        <AdminInput label="ทีมงาน" value={form.team} onChange={v => set('team', v)} />
        <AdminInput label="รางวัล" value={form.award} onChange={v => set('award', v)} />
        <AdminInput label="จำนวนผู้ได้รับประโยชน์" value={form.reach} onChange={v => set('reach', v)} />
        <AdminInput label="สถานะ" value={form.status} onChange={v => set('status', v)} />
      </AdminCard>

      <div style={{ display: 'flex', gap: '12px' }}>
        <AdminButton onClick={handleSave} loading={saving}>บันทึก</AdminButton>
        <AdminButton variant="secondary" onClick={() => router.push('/admin/portfolio')}>ยกเลิก</AdminButton>
      </div>

      {toast && <AdminToast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
