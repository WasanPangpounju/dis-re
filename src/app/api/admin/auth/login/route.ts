import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const { password } = await req.json()

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'รหัสผ่านไม่ถูกต้อง' }, { status: 401 })
  }

  const session = await getSession()
  session.isLoggedIn = true
  session.loginAt = new Date().toISOString()
  await session.save()

  return NextResponse.json({ ok: true })
}
