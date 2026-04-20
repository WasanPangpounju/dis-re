'use client'

interface AdminTextareaProps {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  required?: boolean
  rows?: number
  showCharCount?: boolean
  mono?: boolean
  minHeight?: number
  helperText?: string
}

export default function AdminTextarea({
  label, value, onChange, placeholder, required, rows = 4, showCharCount, mono, minHeight, helperText
}: AdminTextareaProps) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
        {label}{required && <span style={{ color: '#ef4444', marginLeft: '4px' }}>*</span>}
      </label>
      {helperText && <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '6px' }}>{helperText}</p>}
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={rows}
        style={{
          width: '100%',
          padding: '10px 12px',
          border: '1px solid #d1d5db',
          borderRadius: '8px',
          fontSize: '14px',
          outline: 'none',
          boxSizing: 'border-box',
          fontFamily: mono ? 'monospace' : 'var(--font-sarabun)',
          resize: 'vertical',
          minHeight: minHeight ? `${minHeight}px` : undefined,
        }}
      />
      {showCharCount && (
        <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px', textAlign: 'right' }}>
          {value.length} ตัวอักษร
        </p>
      )}
    </div>
  )
}
