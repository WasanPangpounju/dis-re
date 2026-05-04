'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import AdminCard from '@/components/admin/AdminCard'
import AdminInput from '@/components/admin/AdminInput'
import AdminTextarea from '@/components/admin/AdminTextarea'
import AdminButton from '@/components/admin/AdminButton'
import AdminToast from '@/components/admin/AdminToast'
import DynamicList from '@/components/admin/DynamicList'

interface ServiceForm { id: string; image?: string; title: string; description: string; features: string[] }

const EMPTY: ServiceForm = { id: '', image: '', title: '', description: '', features: [] }

const AddPhoto = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="#1f1f1f"
  >
    <path d="M440-440ZM120-120q-33 0-56.5-23.5T40-200v-480q0-33 23.5-56.5T120-760h126l74-80h240v80H355l-73 80H120v480h640v-360h80v360q0 33-23.5 56.5T760-120H120Zm640-560v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80ZM440-260q75 0 127.5-52.5T620-440q0-75-52.5-127.5T440-620q-75 0-127.5 52.5T260-440q0 75 52.5 127.5T440-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Z" />
  </svg>
);
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

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => set('image', reader.result as string)
    reader.readAsDataURL(file)
  }

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
    <div>
      <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#111827', marginBottom: '24px', fontFamily: 'var(--font-kanit)' }}>
        {isNew ? 'เพิ่มบริการใหม่' : 'แก้ไขบริการ'}
      </h1>

      <AdminCard>
        {/* Image upload */}
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
            รูปภาพบริการ
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {form.image ? (
              <img src={form.image} alt="preview" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #E5E7EB' }} />
            ) : (
              <div style={{ width: '80px', height: '80px', borderRadius: '10px', border: '2px dashed #D1D5DB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF', fontSize: '28px' }}>
                <AddPhoto/>
              </div>
            )}
            <div>
              <input type="file" id="service-image" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
              <label htmlFor="service-image" style={{ display: 'inline-block', padding: '8px 16px', borderRadius: '8px', background: '#F3F4F6', border: '1px solid #D1D5DB', fontSize: '14px', fontWeight: 600, color: '#374151', cursor: 'pointer' }}>
                {form.image ? 'เปลี่ยนรูป' : 'เลือกรูป'}
              </label>
              {form.image && (
                <button type="button" onClick={() => set('image', '')} style={{ marginLeft: '8px', fontSize: '13px', color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer' }}>
                  ลบ
                </button>
              )}
            </div>
          </div>
        </div>
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
