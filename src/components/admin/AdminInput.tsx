'use client'

interface AdminInputProps {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  placeholder?: string
  required?: boolean
  error?: string
}

export default function AdminInput({
  label, value, onChange, type = 'text', placeholder, required, error
}: AdminInputProps) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
        {label}{required && <span style={{ color: '#ef4444', marginLeft: '4px' }}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        style={{
          width: '100%',
          padding: '10px 12px',
          border: `1px solid ${error ? '#ef4444' : '#d1d5db'}`,
          borderRadius: '8px',
          fontSize: '15px',
          outline: 'none',
          boxSizing: 'border-box',
          fontFamily: 'var(--font-sarabun)',
        }}
      />
      {error && <p style={{ fontSize: '13px', color: '#ef4444', marginTop: '4px' }}>{error}</p>}
    </div>
  )
}
