interface BadgeProps {
  children: React.ReactNode
  color?: 'teal' | 'gold' | 'navy' | 'gray'
}

const colorStyles = {
  teal: { background: 'var(--teal-pale)', color: 'var(--teal)' },
  gold: { background: '#FFF8E6', color: '#B8860B' },
  navy: { background: 'rgba(13,43,69,0.08)', color: 'var(--navy-mid)' },
  gray: { background: '#F0F4F8', color: 'var(--text-soft)' },
}

export default function Badge({ children, color = 'teal' }: BadgeProps) {
  return (
    <span
      style={{
        ...colorStyles[color],
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: 600,
        fontFamily: 'var(--font-sarabun)',
        display: 'inline-block',
        lineHeight: 1.5,
      }}
    >
      {children}
    </span>
  )
}
