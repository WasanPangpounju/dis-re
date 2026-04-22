# CLAUDE_RAG_INTEGRATION.md — เชื่อม RAG API กับ Chat Bot บนเว็บ

> สั่ง Claude Code: "อ่าน CLAUDE_RAG_INTEGRATION.md และแก้ไขตามที่ระบุ"

---

## สถาปัตยกรรมใหม่

```
ผู้ใช้พิมพ์คำถาม
      ↓
Chat Widget (browser)
      ↓
POST /api/chat  (Next.js API Route)
      ↓
POST https://api.friendlydev.net/query  (RAG API — Python + Claude)
      ↓
{ answer, contexts, model }
      ↓
แสดงคำตอบ + แหล่งอ้างอิง
```

---

## แก้ไขที่ 1 — เพิ่ม RAG_API_URL ใน .env.local

เพิ่มบรรทัดนี้ใน `.env.local` และ `.env.example`:

```env
# RAG API (Python backend)
RAG_API_URL=https://api.friendlydev.net
RAG_API_ENABLED=true
```

---

## แก้ไขที่ 2 — แก้ไข `src/app/api/chat/route.ts`

เขียนใหม่ทั้งไฟล์ให้รองรับ 2 mode:
- ถ้า `RAG_API_ENABLED=true` → เรียก RAG API
- ถ้าไม่มี → fallback เรียก Claude โดยตรง (เหมือนเดิม)

```typescript
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

// เรียก RAG API
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
    // timeout 60 วินาที
    signal: AbortSignal.timeout(60000),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`RAG API error ${res.status}: ${err}`)
  }

  return res.json()
}

// Fallback: เรียก Claude โดยตรง
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

    // ดึงคำถามล่าสุดจาก user
    const lastUserMessage = [...messages]
      .reverse()
      .find((m: { role: string }) => m.role === 'user')
    const question = lastUserMessage?.content ?? ''

    const useRag = process.env.RAG_API_ENABLED === 'true' && !overrideSystemPrompt

    if (useRag) {
      // MODE 1: ใช้ RAG API
      try {
        const ragResult = await callRagApi(question, 3)

        return NextResponse.json({
          text: ragResult.answer,
          // ส่ง contexts กลับมาด้วย เพื่อแสดงแหล่งอ้างอิง
          contexts: ragResult.contexts,
          model: ragResult.model,
          mode: 'rag',
        })
      } catch (ragError) {
        console.error('RAG API failed, falling back to Claude direct:', ragError)
        // ถ้า RAG ล้ม → fallback ไป Claude โดยตรง
      }
    }

    // MODE 2: Claude โดยตรง (fallback หรือ override)
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
```

---

## แก้ไขที่ 3 — เพิ่ม Type สำหรับ Context

เพิ่มใน `src/lib/types.ts`:

```typescript
export interface RagContext {
  title: string
  text: string
  score: number
  doc_id?: string
  chunk_id?: string
}

export interface ChatResponse {
  text: string
  contexts?: RagContext[]
  model?: string
  mode?: 'rag' | 'direct'
  error?: string
}
```

---

## แก้ไขที่ 4 — แก้ `src/hooks/useChat.ts`

เพิ่มการรับ `contexts` จาก response และเก็บไว้ใน message:

```typescript
// เพิ่ม contexts ใน Message type
export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  contexts?: RagContext[]  // แหล่งอ้างอิงจาก RAG
  mode?: 'rag' | 'direct'
}

// ใน sendMessage — เปลี่ยนการอ่าน response:
const res = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: conversationHistory,
    overrideSystemPrompt: undefined,
  }),
})

if (!res.ok) {
  const err = await res.json().catch(() => ({ error: 'เกิดข้อผิดพลาด' }))
  throw new Error(err.error ?? 'เกิดข้อผิดพลาด')
}

const data: ChatResponse = await res.json()

const assistantMessage: Message = {
  id: crypto.randomUUID(),
  role: 'assistant',
  content: data.text ?? '',
  timestamp: new Date(),
  contexts: data.contexts,
  mode: data.mode,
}
```

---

## แก้ไขที่ 5 — แสดง Context (แหล่งอ้างอิง) ใน ChatMessage.tsx

แก้ไข `src/components/chat/ChatMessage.tsx` ให้แสดง contexts เมื่อ mode เป็น 'rag':

```tsx
// เพิ่มส่วนแสดงแหล่งอ้างอิงด้านล่างข้อความ
{message.contexts && message.contexts.length > 0 && (
  <div style={{
    marginTop: '8px',
    paddingTop: '8px',
    borderTop: '1px solid rgba(255,255,255,0.15)',
  }}>
    <p style={{
      fontSize: '11px',
      color: 'rgba(255,255,255,0.5)',
      margin: '0 0 6px',
    }}>
      📚 แหล่งข้อมูล:
    </p>
    {message.contexts.slice(0, 2).map((ctx, i) => (
      <div key={i} style={{
        fontSize: '11px',
        color: 'rgba(255,255,255,0.6)',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '6px',
        padding: '4px 8px',
        marginBottom: '4px',
      }}>
        {ctx.title}
      </div>
    ))}
  </div>
)}
```

---

## แก้ไขที่ 6 — CORS บน RAG API (ถ้าจำเป็น)

ถ้าเว็บเรียก RAG API แล้วติด CORS ให้แก้ไขฝั่ง Python:

```python
# ใน main.py ของ RAG API
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://indis-se.org",
        "https://www.indis-se.org",
        "http://localhost:3000",
        "http://localhost:3001",
    ],
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["Content-Type"],
)
```

แต่เนื่องจากเรียกจาก **Next.js API Route (server-side)** ไม่ใช่ browser โดยตรง
CORS จึงไม่เป็นปัญหา ไม่ต้องแก้ฝั่ง Python

---

## ลำดับการรัน Claude Code

```
1. เพิ่ม RAG_API_URL และ RAG_API_ENABLED ใน .env.local
2. แก้ไข src/lib/types.ts — เพิ่ม RagContext และ ChatResponse
3. เขียน src/app/api/chat/route.ts ใหม่ตาม spec
4. แก้ src/hooks/useChat.ts — รองรับ contexts
5. แก้ src/components/chat/ChatMessage.tsx — แสดง contexts
6. npm run build
7. pm2 restart (ชื่อ app ที่ใช้)
8. ทดสอบ:
   curl -X POST https://indis-se.org/api/chat \
     -H "Content-Type: application/json" \
     -d '{"messages":[{"role":"user","content":"บัตรคนพิการ"}]}'
   ต้องได้: {"text":"...","contexts":[...],"mode":"rag"}
```

---

## ทดสอบหลัง Deploy

เปิด Chat Bot บนเว็บแล้วถามว่า **"บัตรคนพิการคืออะไร"**

คาดหวัง:
- ✅ ตอบได้จากฐานข้อมูล RAG
- ✅ แสดงแหล่งอ้างอิงด้านล่างคำตอบ
- ✅ ถ้า RAG API ล่ม → fallback ตอบด้วย Claude โดยตรงอัตโนมัติ

---

## ต่อยอดในอนาคต

```
/admin/chatbot  → เพิ่ม toggle: ใช้ RAG / ใช้ Claude โดยตรง
RAG API         → เพิ่มเอกสารใหม่ได้ผ่าน admin
Analytics       → เก็บคำถามยอดนิยม เพื่อปรับปรุงฐานข้อมูล
```
