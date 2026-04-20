'use client'

interface ConfirmDialogProps {
  message: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({ message, onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999,
    }}>
      <div style={{ background: 'white', borderRadius: '12px', padding: '28px', maxWidth: '400px', width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
        <p style={{ fontSize: '16px', color: '#111827', marginBottom: '20px', fontFamily: 'var(--font-sarabun)' }}>{message}</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button onClick={onCancel}
            style={{ padding: '10px 20px', border: '1px solid #d1d5db', borderRadius: '8px', background: 'white', cursor: 'pointer', fontFamily: 'var(--font-sarabun)', fontSize: '15px' }}>
            ยกเลิก
          </button>
          <button onClick={onConfirm}
            style={{ padding: '10px 20px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'var(--font-sarabun)', fontSize: '15px', fontWeight: 600 }}>
            ลบ
          </button>
        </div>
      </div>
    </div>
  )
}
