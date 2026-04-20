'use client'

interface Option { value: string; label: string }

interface AdminSelectProps {
  label: string
  value: string
  onChange: (v: string) => void
  options: Option[]
  required?: boolean
}

export default function AdminSelect({ label, value, onChange, options, required }: AdminSelectProps) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
        {label}{required && <span style={{ color: '#ef4444', marginLeft: '4px' }}>*</span>}
      </label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        style={{
          width: '100%',
          padding: '10px 12px',
          border: '1px solid #d1d5db',
          borderRadius: '8px',
          fontSize: '15px',
          outline: 'none',
          boxSizing: 'border-box',
          fontFamily: 'var(--font-sarabun)',
          background: 'white',
          cursor: 'pointer',
        }}
      >
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  )
}
