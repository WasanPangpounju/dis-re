import { NextRequest, NextResponse } from 'next/server'
import { anthropic } from '@/lib/claude'
import { content } from '@/lib/content'

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 1000
  const maxRequests = 10

  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs })
    return true
  }

  if (entry.count >= maxRequests) return false
  entry.count++
  return true
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown'

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'คำขอมากเกินไป กรุณารอสักครู่แล้วลองใหม่' },
      { status: 429 }
    )
  }

  try {
    const { messages, overrideSystemPrompt } = await request.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'ข้อมูลไม่ถูกต้อง' }, { status: 400 })
    }

    const chatbotConfig = await content.chatbot.get()
    const systemPrompt = overrideSystemPrompt ?? chatbotConfig.systemPrompt

    const stream = await anthropic.messages.stream({
      model: chatbotConfig.model,
      max_tokens: chatbotConfig.maxTokens,
      system: systemPrompt,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    })

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (
              chunk.type === 'content_block_delta' &&
              chunk.delta.type === 'text_delta'
            ) {
              controller.enqueue(new TextEncoder().encode(chunk.delta.text))
            }
          }
          controller.close()
        } catch (err) {
          controller.error(err)
        }
      },
    })

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (err) {
    console.error('Chat API error:', err)
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง' },
      { status: 500 }
    )
  }
}
