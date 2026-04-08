'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_LINKS } from '@/lib/constants'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header
      role="banner"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'background 0.3s ease, box-shadow 0.3s ease',
        background: scrolled
          ? 'rgba(13,43,69,0.97)'
          : 'rgba(13,43,69,0.85)',
        backdropFilter: 'blur(12px)',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '70px',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="กลับหน้าแรก - การวิจัยนวัตกรรมเพื่อคนพิการ"
          style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #1B7E6A, #2DA88E)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              fontFamily: 'var(--font-kanit)',
              fontWeight: 700,
              color: 'white',
              flexShrink: 0,
            }}
            aria-hidden="true"
          >
            logo
          </div>
          <span
            style={{
              fontFamily: 'var(--font-kanit)',
              fontWeight: 700,
              color: 'white',
              fontSize: '16px',
              lineHeight: 1.3,
            }}
          >
            <span style={{ color: '#2DA88E' }}>นวัตกรรม</span>
            <br />
            <span style={{ fontSize: '13px', fontWeight: 400, color: 'rgba(255,255,255,0.8)' }}>
              เพื่อคนพิการ
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav role="navigation" aria-label="การนำทางหลัก" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <ul
            className="hidden md:flex"
            style={{ listStyle: 'none', margin: 0, padding: 0, gap: '4px', display: 'flex', alignItems: 'center' }}
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? 'page' : undefined}
                    style={{
                      color: isActive ? '#2DA88E' : 'rgba(255,255,255,0.85)',
                      textDecoration: 'none',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontFamily: 'var(--font-sarabun)',
                      fontWeight: isActive ? 600 : 400,
                      transition: 'color 0.2s, background 0.2s',
                      background: isActive ? 'rgba(45,168,142,0.1)' : 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = '#2DA88E'
                        e.currentTarget.style.background = 'rgba(45,168,142,0.08)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.85)'
                        e.currentTarget.style.background = 'transparent'
                      }
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* CTA Button */}
          <Link
            href="/contact"
            className="hidden md:inline-flex"
            style={{
              marginLeft: '12px',
              padding: '10px 20px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #D4A843, #F0C96B)',
              color: '#0D2B45',
              fontFamily: 'var(--font-sarabun)',
              fontWeight: 700,
              fontSize: '15px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'opacity 0.2s, transform 0.2s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
            aria-label="ถามผู้เชี่ยวชาญ ไปที่หน้าติดต่อ"
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor" aria-hidden="true"><path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" /></svg> ถามผู้เชี่ยวชาญ
          </Link>

          {/* Hamburger */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'ปิดเมนู' : 'เปิดเมนู'}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '24px',
                  height: '2px',
                  background: 'white',
                  borderRadius: '2px',
                  transition: 'transform 0.3s, opacity 0.3s',
                  transform:
                    isOpen
                      ? i === 0
                        ? 'rotate(45deg) translate(5px, 5px)'
                        : i === 1
                          ? 'scaleX(0)'
                          : 'rotate(-45deg) translate(5px, -5px)'
                      : 'none',
                  opacity: isOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        role="navigation"
        aria-label="เมนูมือถือ"
        style={{
          display: isOpen ? 'block' : 'none',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          padding: '16px 24px',
          background: 'rgba(13,43,69,0.98)',
        }}
      >
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                style={{
                  display: 'block',
                  color: 'rgba(255,255,255,0.9)',
                  textDecoration: 'none',
                  padding: '12px 0',
                  fontSize: '18px',
                  fontFamily: 'var(--font-sarabun)',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li style={{ marginTop: '16px' }}>
            <Link
              href="/contact"
              style={{
                display: 'flex',         
                alignItems: 'center',      
                justifyContent: 'center', 
                gap: '8px',
                padding: '12px 20px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #D4A843, #F0C96B)',
                color: '#0D2B45',
                fontWeight: 700,
                fontSize: '18px',
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" style={{ marginTop:'2px'}} height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor" aria-hidden="true">
                <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
              </svg> ถามผู้เชี่ยวชาญ
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}
