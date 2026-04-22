import { NextRequest, NextResponse } from 'next/server'
import { content } from '@/lib/content'

// Rate limit (in-memory)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 1000
  const maxRequests = 20
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs })
    return true
  }
  if (entry.count >= maxRequests) return false
  entry.count++
  return true
}

async function callRagApi(question: string, topK = 3): Promise<{
  answer: string
  contexts: Array<{ title: string; text: string; score: number }>
  model: string
}> {
  const ragUrl = process.env.RAG_API_URL ?? 'https://api.friendlydev.net'

  const res = await fetch(`${ragUrl}/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, top_k: topK }),
    signal: AbortSignal.timeout(60000),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`RAG API error ${res.status}: ${err}`)
  }

  return res.json()
}

async function callClaudeDirect(
  messages: Array<{ role: string; content: string }>,
  systemPrompt: string,
  model: string,
  maxTokens: number
): Promise<string> {
  const { anthropic } = await import('@/lib/claude')

  const response = await anthropic.messages.create({
    model,
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: messages.map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    })),
  })

  return response.content
    .filter((b) => b.type === 'text')
    .map((b) => (b as { type: 'text'; text: string }).text)
    .join('')
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    '127.0.0.1'

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'ส่งคำถามบ่อยเกินไป กรุณารอสักครู่' },
      { status: 429 }
    )
  }

  try {
    const { messages, overrideSystemPrompt } = await request.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'ข้อมูลไม่ถูกต้อง' }, { status: 400 })
    }

    const lastUserMessage = [...messages]
      .reverse()
      .find((m: { role: string }) => m.role === 'user')
    const question = lastUserMessage?.content ?? ''

    const useRag = process.env.RAG_API_ENABLED === 'true' && !overrideSystemPrompt

    if (useRag) {
      try {
        const ragResult = await callRagApi(question, 3)

        return NextResponse.json({
          text: ragResult.answer,
          contexts: ragResult.contexts,
          model: ragResult.model,
          mode: 'rag',
        })
      } catch (ragError) {
        console.error('RAG API failed, falling back to Claude direct:', ragError)
      }
    }

    const chatbotConfig = await content.chatbot.get()
    const systemPrompt = overrideSystemPrompt ?? chatbotConfig.systemPrompt

    const text = await callClaudeDirect(
      messages,
      systemPrompt,
      chatbotConfig.model,
      chatbotConfig.maxTokens
    )

    return NextResponse.json({ text, mode: 'direct' })

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง' },
      { status: 500 }
    )
  }
}
