import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { content } from '@/lib/content'

export async function GET() {
  const auth = await requireAuth()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const data = await content.general.get()
  return NextResponse.json(data)
}

export async function PUT(req: NextRequest) {
  const auth = await requireAuth()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const data = await req.json()
  await content.general.set(data)
  return NextResponse.json({ ok: true })
}
