'use client'
import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'
import SkipLink from './SkipLink'
import ChatWidget from '@/components/chat/ChatWidget'

export default function ConditionalLayout({ children, company }: { children: React.ReactNode, company: any }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')
  return (
    <>
      {!isAdmin && <SkipLink />}
      {!isAdmin && <Navbar />}
      <main id="main-content" style={{ padding: 0, margin: 0, maxWidth: 'none' }}>{children}</main>
      {!isAdmin && <Footer company={company} />}
      {!isAdmin && <ChatWidget />}
    </>
  )
}