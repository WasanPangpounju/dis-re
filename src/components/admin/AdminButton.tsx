'use client'

interface AdminButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
  loading?: boolean
}

export default function AdminButton({
  children, onClick, type = 'button', variant = 'primary', disabled, loading
}: AdminButtonProps) {
  const styles: Record<string, React.CSSProperties> = {
    primary: { background: '#4f46e5', color: 'white', border: 'none' },
    secondary: { background: 'white', color: '#374151', border: '1px solid #d1d5db' },
    danger: { background: '#ef4444', color: 'white', border: 'none' },
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        ...styles[variant],
        padding: '10px 20px',
        borderRadius: '8px',
        fontSize: '15px',
        fontWeight: 600,
        fontFamily: 'var(--font-sarabun)',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled || loading ? 0.6 : 1,
        transition: 'opacity 0.15s',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
      }}
    >
      {loading ? 'กำลังบันทึก...' : children}
    </button>
  )
}
