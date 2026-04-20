'use client'

interface DynamicListProps {
  label: string
  items: string[]
  onChange: (items: string[]) => void
  placeholder?: string
  addLabel?: string
}

export default function DynamicList({ label, items, onChange, placeholder = 'รายการ', addLabel = '+ เพิ่ม' }: DynamicListProps) {
  const update = (i: number, v: string) => {
    const next = [...items]
    next[i] = v
    onChange(next)
  }

  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i))

  const add = () => onChange([...items, ''])

  const move = (i: number, dir: -1 | 1) => {
    const next = [...items]
    const j = i + dir
    if (j < 0 || j >= next.length) return
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
  }

  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
        {label}
      </label>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: '6px', marginBottom: '6px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <button type="button" onClick={() => move(i, -1)} disabled={i === 0}
              style={{ padding: '2px 6px', border: '1px solid #d1d5db', borderRadius: '4px', background: 'white', cursor: 'pointer', fontSize: '12px', opacity: i === 0 ? 0.3 : 1 }}>▲</button>
            <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1}
              style={{ padding: '2px 6px', border: '1px solid #d1d5db', borderRadius: '4px', background: 'white', cursor: 'pointer', fontSize: '12px', opacity: i === items.length - 1 ? 0.3 : 1 }}>▼</button>
          </div>
          <input
            value={item}
            onChange={e => update(i, e.target.value)}
            placeholder={placeholder}
            style={{
              flex: 1,
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              fontFamily: 'var(--font-sarabun)',
              outline: 'none',
            }}
          />
          <button type="button" onClick={() => remove(i)}
            style={{ padding: '8px 12px', background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 700 }}>
            ✕
          </button>
        </div>
      ))}
      <button type="button" onClick={add}
        style={{ padding: '8px 16px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-sarabun)' }}>
        {addLabel}
      </button>
    </div>
  )
}
