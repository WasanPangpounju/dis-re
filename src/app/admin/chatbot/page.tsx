'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import AdminCard from '@/components/admin/AdminCard'
import AdminSelect from '@/components/admin/AdminSelect'
import AdminTextarea from '@/components/admin/AdminTextarea'
import AdminButton from '@/components/admin/AdminButton'
import AdminToast from '@/components/admin/AdminToast'

interface ChatbotConfig {
  systemPrompt: string
  model: string
  maxTokens: number
  welcomeMessage: string
}

const MODELS = [
  { value: 'claude-sonnet-4-6', label: 'claude-sonnet-4-6 (แนะนำ)' },
  { value: 'claude-opus-4-7', label: 'claude-opus-4-7' },
  { value: 'claude-haiku-4-5-20251001', label: 'claude-haiku-4-5-20251001 (เร็ว/ประหยัด)' },
]

export default function ChatbotPage() {
  const [config, setConfig] = useState<ChatbotConfig>({ systemPrompt: '', model: 'claude-sonnet-4-6', maxTokens: 1000, welcomeMessage: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)
  const closeToast = useCallback(() => setToast(null), [])

  // Test chat
  const [testInput, setTestInput] = useState('')
  const [testMessages, setTestMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([])
  const [testing, setTesting] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/api/admin/chatbot').then(r => r.json()).then(d => { setConfig(d); setLoading(false) })
  }, [])

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [testMessages])

  const set = (k: keyof ChatbotConfig, v: string | number) => setConfig(p => ({ ...p, [k]: v }))

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/chatbot', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(config) })
      if (res.ok) setToast({ msg: 'บันทึกสำเร็จ — Bot จะใช้ config ใหม่ทันที', type: 'success' })
      else setToast({ msg: 'เกิดข้อผิดพลาด', type: 'error' })
    } catch { setToast({ msg: 'เกิดข้อผิดพลาด', type: 'error' }) }
    finally { setSaving(false) }
  }

  async function handleTest() {
    if (!testInput.trim()) return
    const userMsg = { role: 'user' as const, content: testInput }
    const newMessages = [...testMessages, userMsg]
    setTestMessages(newMessages)
    setTestInput('')
    setTesting(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, overrideSystemPrompt: config.systemPrompt }),
      })
      if (!res.body) return
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let assistantText = ''
      setTestMessages(prev => [...prev, { role: 'assistant', content: '' }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        assistantText += decoder.decode(value, { stream: true })
        setTestMessages(prev => {
          const updated = [...prev]
          updated[updated.length - 1] = { role: 'assistant', content: assistantText }
          return updated
        })
      }
    } catch (e) {
      console.error(e)
    } finally { setTesting(false) }
  }

  if (loading) return <div style={{ fontFamily: 'var(--font-sarabun)' }}>กำลังโหลด...</div>

  return (
    <div style={{ minWidth: 0 }}>
      <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#111827', marginBottom: '24px', fontFamily: 'var(--font-kanit)' }}>Chat Bot Configuration</h1>

      <AdminCard title="การตั้งค่า Model">
        <AdminSelect label="Model" value={config.model} onChange={v => set('model', v)} options={MODELS} />
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px', fontFamily: 'var(--font-sarabun)' }}>
            Max Tokens (100–4000)
          </label>
          <input
            type="number" min={100} max={4000} value={config.maxTokens}
            onChange={e => set('maxTokens', Number(e.target.value))}
            style={{ width: '200px', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '15px', outline: 'none', fontFamily: 'var(--font-sarabun)' }}
          />
        </div>
        <AdminTextarea
          label="Welcome Message"
          value={config.welcomeMessage}
          onChange={v => set('welcomeMessage', v)}
          helperText="ข้อความแรกที่ Bot ส่งให้ผู้ใช้"
          rows={3}
        />
      </AdminCard>

      <AdminCard title="System Prompt">
        <AdminTextarea
          label="System Prompt"
          value={config.systemPrompt}
          onChange={v => set('systemPrompt', v)}
          mono
          minHeight={400}
          showCharCount
          helperText="System Prompt กำหนดบุคลิกและขอบเขตของ Bot"
          rows={18}
        />
      </AdminCard>

      <AdminButton onClick={handleSave} loading={saving}>บันทึก</AdminButton>

      <AdminCard title="ทดสอบ Bot">
        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px', fontFamily: 'var(--font-sarabun)' }}>
          ทดสอบโดยใช้ System Prompt ด้านบน (ยังไม่ต้อง save ก็ใช้ได้)
        </p>

        <div style={{ border: '1px solid #e5e7eb', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ height: '300px', overflowY: 'auto', padding: '16px', background: '#f9fafb', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {testMessages.length === 0 && (
              <div style={{ color: '#9ca3af', fontFamily: 'var(--font-sarabun)', fontSize: '14px', textAlign: 'center', marginTop: '80px' }}>พิมพ์ข้อความเพื่อทดสอบ Bot</div>
            )}
            {testMessages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '80%', padding: '10px 14px', borderRadius: '12px',
                  background: msg.role === 'user' ? '#4f46e5' : 'white',
                  color: msg.role === 'user' ? 'white' : '#111827',
                  fontSize: '14px', fontFamily: 'var(--font-sarabun)', lineHeight: 1.6,
                  border: msg.role === 'assistant' ? '1px solid #e5e7eb' : 'none',
                  whiteSpace: 'pre-wrap',
                }}>
                  {msg.content || (testing && i === testMessages.length - 1 ? '...' : '')}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div style={{ padding: '12px', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '8px', background: 'white' }}>
            <input
              value={testInput}
              onChange={e => setTestInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleTest() } }}
              placeholder="พิมพ์ข้อความทดสอบ... (Enter เพื่อส่ง)"
              disabled={testing}
              style={{ flex: 1, padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none', fontFamily: 'var(--font-sarabun)' }}
            />
            <button onClick={handleTest} disabled={testing || !testInput.trim()}
              style={{ padding: '10px 20px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: testing ? 'not-allowed' : 'pointer', fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-sarabun)', opacity: testing ? 0.6 : 1 }}>
              ส่ง
            </button>
            <button onClick={() => setTestMessages([])}
              style={{ padding: '10px 14px', background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontFamily: 'var(--font-sarabun)' }}>
              ล้าง
            </button>
          </div>
        </div>
      </AdminCard>

      {toast && <AdminToast message={toast.msg} type={toast.type} onClose={closeToast} />}
    </div>
  )
}
