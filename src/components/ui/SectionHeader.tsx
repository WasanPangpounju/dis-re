interface SectionHeaderProps {
  label?: string
  title: string
  highlight?: string
  description?: string
  center?: boolean
}

export default function SectionHeader({
  label,
  title,
  highlight,
  description,
  center = true,
}: SectionHeaderProps) {
  const titleParts = highlight ? title.split(highlight) : [title]

  return (
    <div style={{ textAlign: center ? 'center' : 'left', marginBottom: '48px' }}>
      {label && (
        <span
          style={{
            display: 'inline-block',
            background: 'var(--teal-pale)',
            color: 'var(--teal)',
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '15px',
            fontWeight: 600,
            marginBottom: '16px',
            fontFamily: 'var(--font-sarabun)',
          }}
        >
          {label}
        </span>
      )}
      <h2
        style={{
          fontFamily: 'var(--font-kanit)',
          fontWeight: 700,
          fontSize: 'clamp(28px, 4vw, 42px)',
          color: 'var(--navy)',
          margin: '0 0 16px',
          lineHeight: 1.3,
        }}
      >
        {highlight ? (
          <>
            {titleParts[0]}
            <span style={{ color: 'var(--teal)' }}>{highlight}</span>
            {titleParts[1]}
          </>
        ) : (
          title
        )}
      </h2>
      {description && (
        <p
          style={{
            fontSize: '18px',
            color: 'var(--text-mid)',
            maxWidth: center ? '640px' : 'none',
            margin: center ? '0 auto' : 0,
            lineHeight: 1.8,
          }}
        >
          {description}
        </p>
      )}
    </div>
  )
}
