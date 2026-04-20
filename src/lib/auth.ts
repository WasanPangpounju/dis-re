import { getIronSession, SessionOptions } from 'iron-session'
import { cookies } from 'next/headers'

export interface AdminSession {
  isLoggedIn: boolean
  loginAt?: string
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: 'admin_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 8,
  },
}

export async function getSession() {
  const session = await getIronSession<AdminSession>(
    await cookies(),
    sessionOptions
  )
  return session
}

export async function requireAuth() {
  const session = await getSession()
  if (!session.isLoggedIn) {
    return null
  }
  return session
}
