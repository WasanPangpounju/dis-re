'use client'

import { useState, useEffect, useCallback } from 'react'
import AdminCard from '@/components/admin/AdminCard'
import AdminInput from '@/components/admin/AdminInput'
import AdminTextarea from '@/components/admin/AdminTextarea'
import AdminButton from '@/components/admin/AdminButton'
import AdminToast from '@/components/admin/AdminToast'

interface GeneralData {
  company: {
    name: string; shortName: string; tagline: string; description: string
    registrationNumber: string; address: string; phone: string; email: string
    accessibilityHotline: string; socialMedia: { facebook: string; line: string; youtube: string }
  }
  stats: { number: string; label: string }[]
}

const EMPTY: GeneralData = {
  company: { name: '', shortName: '', tagline: '', description: '', registrationNumber: '', address: '', phone: '', email: '', accessibilityHotline: '', socialMedia: { facebook: '', line: '', youtube: '' } },
  stats: [{ number: '', label: '' }, { number: '', label: '' }, { number: '', label: '' }],
}

export default function GeneralPage() {
  const [data, setData] = useState<GeneralData>(EMPTY)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    fetch('/api/admin/general').then(r => r.json()).then(d => { setData(d); setLoading(false) })
  }, [])

  const closeToast = useCallback(() => setToast(null), [])

  function setCompany(field: string, value: string) {
    setData(prev => ({ ...prev, company: { ...prev.company, [field]: value } }))
  }
  function setSocial(field: string, value: string) {
    setData(prev => ({ ...prev, company: { ...prev.company, socialMedia: { ...prev.company.socialMedia, [field]: value } } }))
  }
  function setStat(i: number, field: 'number' | 'label', value: string) {
    setData(prev => { const s = [...prev.stats]; s[i] = { ...s[i], [field]: value }; return { ...prev, stats: s } })
  }

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/general', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      if (res.ok) setToast({ msg: 'บันทึกสำเร็จ', type: 'success' })
      else setToast({ msg: 'เกิดข้อผิดพลาด', type: 'error' })
    } catch { setToast({ msg: 'เกิดข้อผิดพลาด', type: 'error' }) }
    finally { setSaving(false) }
  }

  if (loading) return <div style={{ padding: '40px', fontFamily: 'var(--font-sarabun)' }}>กำลังโหลด...</div>

  return (
    <div style={{ minWidth: 0 }}>
      <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#111827', marginBottom: '24px', fontFamily: 'var(--font-kanit)' }}>ข้อมูลทั่วไป</h1>

      <AdminCard title="ข้อมูลบริษัท">
        <AdminInput label="ชื่อบริษัท" value={data.company.name} onChange={v => setCompany('name', v)} required />
        <AdminInput label="ชื่อย่อ" value={data.company.shortName} onChange={v => setCompany('shortName', v)} />
        <AdminInput label="Tagline" value={data.company.tagline} onChange={v => setCompany('tagline', v)} />
        <AdminTextarea label="คำอธิบาย" value={data.company.description} onChange={v => setCompany('description', v)} />
        <AdminInput label="เลขทะเบียน" value={data.company.registrationNumber} onChange={v => setCompany('registrationNumber', v)} />
        <AdminTextarea label="ที่อยู่" value={data.company.address} onChange={v => setCompany('address', v)} rows={3} />
        <AdminInput label="โทรศัพท์" value={data.company.phone} onChange={v => setCompany('phone', v)} />
        <AdminInput label="อีเมล" value={data.company.email} onChange={v => setCompany('email', v)} type="email" />
      </AdminCard>

      <AdminCard title="สถิติ">
        {data.stats.map((stat, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px', marginBottom: '12px' }}>
            <AdminInput label={`ตัวเลขที่ ${i + 1}`} value={stat.number} onChange={v => setStat(i, 'number', v)} placeholder="50+" />
            <AdminInput label={`คำอธิบาย`} value={stat.label} onChange={v => setStat(i, 'label', v)} placeholder="โครงการวิจัย" />
          </div>
        ))}
      </AdminCard>

      <AdminCard title="โซเชียลมีเดีย">
        <AdminInput label="Facebook URL" value={data.company.socialMedia.facebook} onChange={v => setSocial('facebook', v)} />
        <AdminInput label="Line URL" value={data.company.socialMedia.line} onChange={v => setSocial('line', v)} />
        <AdminInput label="YouTube URL" value={data.company.socialMedia.youtube} onChange={v => setSocial('youtube', v)} />
      </AdminCard>

      <AdminButton type="button" onClick={handleSave} loading={saving}>บันทึก</AdminButton>

      {toast && <AdminToast message={toast.msg} type={toast.type} onClose={closeToast} />}
    </div>
  )
}
