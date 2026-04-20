interface AdminCardProps {
  title?: string
  children: React.ReactNode
}

export default function AdminCard({ title, children }: AdminCardProps) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      padding: '24px',
      marginBottom: '24px',
    }}>
      {title && (
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #f3f4f6' }}>
          {title}
        </h2>
      )}
      {children}
    </div>
  )
}
