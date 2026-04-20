import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { content } from '@/lib/content'
import { v4 as uuidv4 } from 'uuid'

export async function GET() {
  const auth = await requireAuth()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return NextResponse.json(await content.services.get())
}

export async function POST(req: NextRequest) {
  const auth = await requireAuth()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const items = await content.services.get()
  const newItem = { ...body, id: uuidv4() }
  await content.services.set([...items, newItem])
  return NextResponse.json(newItem, { status: 201 })
}
