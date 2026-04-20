import { NextResponse } from 'next/server'
import { content } from '@/lib/content'

export async function GET() {
  return NextResponse.json(await content.services.get())
}
