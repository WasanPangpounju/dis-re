import type { Message } from '@/lib/types'

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  const TechIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
      <path d="M160-360q-50 0-85-35t-35-85q0-50 35-85t85-35v-80q0-33 23.5-56.5T240-760h120q0-50 35-85t85-35q50 0 85 35t35 85h120q33 0 56.5 23.5T800-680v80q50 0 85 35t35 85q0 50-35 85t-85 35v160q0 33-23.5 56.5T720-120H240q-33 0-56.5-23.5T160-200v-160Zm242.5-97.5Q420-475 420-500t-17.5-42.5Q385-560 360-560t-42.5 17.5Q300-525 300-500t17.5 42.5Q335-440 360-440t42.5-17.5Zm240 0Q660-475 660-500t-17.5-42.5Q625-560 600-560t-42.5 17.5Q540-525 540-500t17.5 42.5Q575-440 600-440t42.5-17.5ZM320-280h320v-80H320v80Zm-80 80h480v-480H240v480Zm240-240Z" />
    </svg>
  )
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
          <TechIcon/>
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
