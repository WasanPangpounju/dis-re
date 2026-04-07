import type { ButtonHTMLAttributes } from 'react'
import Link from 'next/link'

type ButtonVariant = 'primary' | 'outline' | 'gold' | 'ghost'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: ButtonVariant
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  href?: string
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: 'linear-gradient(135deg, #1B7E6A, #2DA88E)',
    color: 'white',
    border: 'none',
  },
  outline: {
    background: 'transparent',
    color: 'white',
    border: '2px solid rgba(255,255,255,0.5)',
  },
  gold: {
    background: 'linear-gradient(135deg, #D4A843, #F0C96B)',
    color: '#0D2B45',
    border: 'none',
  },
  ghost: {
    background: 'transparent',
    color: '#1B7E6A',
    border: '2px solid #1B7E6A',
  },
}

const sizeStyles: Record<string, React.CSSProperties> = {
  sm: { padding: '8px 16px', fontSize: '15px' },
  md: { padding: '12px 24px', fontSize: '17px' },
  lg: { padding: '16px 32px', fontSize: '18px' },
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  href,
  style,
  ...rest
}: ButtonProps) {
  const baseStyle: React.CSSProperties = {
    ...variantStyles[variant],
    ...sizeStyles[size],
    borderRadius: '10px',
    fontFamily: 'var(--font-sarabun)',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    textDecoration: 'none',
    transition: 'opacity 0.2s, transform 0.2s',
    lineHeight: 1,
    ...style,
  }

  if (href) {
    return (
      <Link
        href={href}
        style={baseStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '0.9'
          e.currentTarget.style.transform = 'translateY(-1px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '1'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      style={baseStyle}
      {...rest}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = '0.9'
        e.currentTarget.style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '1'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {children}
    </button>
  )
}
