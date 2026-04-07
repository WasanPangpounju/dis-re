import type { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  hover?: boolean
}

export default function Card({ children, hover = true, style, ...rest }: CardProps) {
  return (
    <div
      style={{
        background: 'white',
        borderRadius: '16px',
        border: '1px solid var(--border)',
        overflow: 'hidden',
        transition: hover ? 'transform 0.25s ease, box-shadow 0.25s ease' : undefined,
        ...style,
      }}
      onMouseEnter={
        hover
          ? (e) => {
              e.currentTarget.style.transform = 'translateY(-6px)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(13,43,69,0.15)'
            }
          : undefined
      }
      onMouseLeave={
        hover
          ? (e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }
          : undefined
      }
      {...rest}
    >
      {children}
    </div>
  )
}
