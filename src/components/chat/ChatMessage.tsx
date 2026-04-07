import type { Message } from '@/lib/types'

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: '12px',
        gap: '8px',
        alignItems: 'flex-end',
      }}
    >
      {!isUser && (
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1B7E6A, #2DA88E)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          🤖
        </div>
      )}
      <div
        style={{
          maxWidth: '80%',
          padding: '12px 16px',
          borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
          background: isUser
            ? 'linear-gradient(135deg, #1B7E6A, #2DA88E)'
            : 'white',
          color: isUser ? 'white' : 'var(--text-dark)',
          fontSize: '16px',
          lineHeight: 1.7,
          boxShadow: isUser ? 'none' : '0 2px 8px rgba(0,0,0,0.08)',
          border: isUser ? 'none' : '1px solid var(--border)',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {message.content}
      </div>
    </div>
  )
}
