# CLAUDE_CMS.md — ระบบ Admin CMS สำหรับ disability-research

> สั่ง Claude Code: "อ่าน CLAUDE_CMS.md และสร้างระบบ CMS ตามที่ระบุไว้ทั้งหมด"

---

## สรุปสิ่งที่ต้องทำ

โปรเจกต์ปัจจุบันเก็บ content ทั้งหมดไว้ใน `src/lib/constants.ts` เป็น hardcode
เป้าหมายคือสร้างระบบ Admin Panel ที่:

1. แก้ไข content ได้ผ่าน UI (ไม่ต้องแตะโค้ด)
2. บันทึกลง JSON files (ไม่ต้อง database)
3. Login ด้วย password (ไม่ต้อง OAuth)
4. ทีมงานที่ไม่ใช่ developer ใช้ได้
5. ฟรี 100% deploy บน Vercel

---

## Architecture ที่เลือก

```
ข้อมูล content → JSON files ใน /data/*.json  (แทน constants.ts)
Admin UI       → /admin/* pages (Next.js App Router)
Auth           → Iron Session (JWT ใน cookie, ไม่ต้อง DB)
บันทึกข้อมูล   → API Routes เขียน/อ่านไฟล์ JSON
Deploy         → Vercel (อ่านได้, เขียนผ่าน Git push หรือ Vercel KV)
```

> **หมายเหตุสำคัญเรื่อง Vercel Filesystem:**
> Vercel เป็น serverless — ไม่สามารถเขียนไฟล์ลง disk ได้ถาวร
> **Solution:** ใช้ **Vercel KV (Redis)** สำหรับเก็บ content (free tier 30MB เพียงพอ)
> สำหรับ dev local ใช้ JSON files ปกติ

---

## โครงสร้างไฟล์ที่ต้องสร้างทั้งหมด

```
src/
├── app/
│   └── admin/
│       ├── layout.tsx              ← Admin shell (sidebar + auth guard)
│       ├── page.tsx                ← Dashboard (redirect to /admin/general)
│       ├── login/
│       │   └── page.tsx            ← Login form
│       ├── general/
│       │   └── page.tsx            ← แก้ไข COMPANY + STATS
│       ├── portfolio/
│       │   ├── page.tsx            ← รายการผลงาน
│       │   ├── new/page.tsx        ← เพิ่มผลงานใหม่
│       │   └── [id]/page.tsx       ← แก้ไขผลงาน
│       ├── services/
│       │   ├── page.tsx            ← รายการบริการ
│       │   └── [id]/page.tsx       ← แก้ไขบริการ
│       ├── products/
│       │   ├── page.tsx            ← รายการผลิตภัณฑ์
│       │   └── [id]/page.tsx       ← แก้ไขผลิตภัณฑ์
│       └── chatbot/
│           └── page.tsx            ← แก้ไข System Prompt + model config
│
├── app/api/
│   └── admin/
│       ├── auth/
│       │   ├── login/route.ts      ← POST login → set cookie
│       │   └── logout/route.ts     ← POST logout → clear cookie
│       ├── general/route.ts        ← GET/PUT COMPANY + STATS
│       ├── portfolio/route.ts      ← GET all / POST new
│       ├── portfolio/[id]/route.ts ← GET one / PUT / DELETE
│       ├── services/route.ts       ← GET all / POST new
│       ├── services/[id]/route.ts  ← GET one / PUT / DELETE
│       ├── products/route.ts       ← GET all / POST new
│       ├── products/[id]/route.ts  ← GET one / PUT / DELETE
│       └── chatbot/route.ts        ← GET/PUT system prompt config
│
├── lib/
│   ├── auth.ts                     ← Iron Session config + helpers
│   ├── content.ts                  ← อ่าน/เขียน content (KV หรือ JSON)
│   └── constants.ts                ← (คงเดิม เป็น fallback default values)
│
└── middleware.ts                   ← Protect /admin/* routes

data/                               ← สำหรับ local dev เท่านั้น
├── general.json
├── portfolio.json
├── services.json
├── products.json
└── chatbot.json
```

---

## ขั้นตอนที่ 1 — ติดตั้ง Dependencies

```bash
npm install iron-session
npm install @vercel/kv
npm install uuid
npm install @types/uuid --save-dev
```

---

## ขั้นตอนที่ 2 — Environment Variables

เพิ่มใน `.env.local` และ `.env.example`:

```env
# Admin Auth
ADMIN_PASSWORD=ตั้งรหัสผ่านที่แข็งแกร่ง
SESSION_SECRET=random-secret-32-chars-minimum-here

# Vercel KV (สำหรับ production — ไปเปิดใน Vercel Dashboard > Storage > KV)
KV_REST_API_URL=
KV_REST_API_TOKEN=

# Environment
NODE_ENV=development
```

---

## ขั้นตอนที่ 3 — สร้าง `src/lib/auth.ts`

```typescript
// src/lib/auth.ts
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
    maxAge: 60 * 60 * 8, // 8 ชั่วโมง
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
```

---

## ขั้นตอนที่ 4 — สร้าง `src/lib/content.ts`

ไฟล์นี้จัดการอ่าน/เขียน content โดย:
- **Local dev** → อ่าน/เขียน `data/*.json`
- **Production (Vercel)** → ใช้ Vercel KV

```typescript
// src/lib/content.ts
import { COMPANY, STATS, PORTFOLIO_ITEMS, SERVICES, PRODUCTS } from './constants'

// ============================================================
// Types
// ============================================================
export type ContentKey = 'general' | 'portfolio' | 'services' | 'products' | 'chatbot'

export interface GeneralContent {
  company: typeof COMPANY
  stats: typeof STATS
}

export interface ChatbotConfig {
  systemPrompt: string
  model: string
  maxTokens: number
  welcomeMessage: string
}

// ============================================================
// Default values (fallback จาก constants.ts)
// ============================================================
const DEFAULTS: Record<ContentKey, unknown> = {
  general: {
    company: COMPANY,
    stats: STATS,
  },
  portfolio: PORTFOLIO_ITEMS,
  services: SERVICES,
  products: PRODUCTS,
  chatbot: {
    model: 'claude-sonnet-4-6',
    maxTokens: 1000,
    welcomeMessage: 'สวัสดีครับ! ผมเป็นผู้ช่วย AI เฉพาะทางด้านสุขภาพและสิทธิ์ของคนพิการ สามารถถามเรื่องสุขภาพ การดูแลตัวเอง บริการของรัฐ หรือสิทธิ์ต่างๆ ได้เลยครับ 😊',
    systemPrompt: `คุณเป็นผู้ช่วย AI เฉพาะทางด้านสุขภาพและสิทธิ์ของคนพิการ
ทำงานให้กับ บริษัท การวิจัยนวัตกรรมเพื่อคนพิการ วิสาหกิจเพื่อสังคม จำกัด

หน้าที่ของคุณ:
- ตอบคำถามเกี่ยวกับสุขภาพของคนพิการทุกประเภท
- อธิบายสิทธิ์ตามกฎหมายคนพิการของไทย (พ.ร.บ.ส่งเสริมและพัฒนาคุณภาพชีวิตคนพิการ พ.ศ. 2550)
- แนะนำบริการและทรัพยากรสำหรับคนพิการ
- ตอบคำถามด้านสุขภาพสำหรับผู้พิการทางสายตา (ตาบอด สายตาเลือนราง)
- แนะนำการดูแลตัวเอง การออกกำลังกาย และโภชนาการสำหรับคนพิการ
- อธิบายเทคโนโลยี Assistive ที่มีในประเทศไทย

กฎที่ต้องปฏิบัติ:
- ตอบเป็นภาษาไทยเสมอ เว้นแต่ผู้ใช้ถามภาษาอังกฤษ
- ใช้ภาษาที่เข้าใจง่าย ไม่ใช้ศัพท์แพทย์ยากเกินไป
- ถ้าเป็นคำถามที่ต้องการวินิจฉัยโรค ให้แนะนำพบแพทย์เสมอ
- ห้ามตอบนอกขอบเขตด้านสุขภาพและสิทธิ์คนพิการ
- ถ้าถามเรื่องอื่น ให้สุภาพแจ้งว่าอยู่นอกขอบเขตที่ตอบได้`,
  } satisfies ChatbotConfig,
}

// ============================================================
// Storage adapter — สลับระหว่าง KV กับ JSON file อัตโนมัติ
// ============================================================
async function readContent<T>(key: ContentKey): Promise<T> {
  try {
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      // Production: Vercel KV
      const { kv } = await import('@vercel/kv')
      const data = await kv.get<T>(`content:${key}`)
      if (data) return data
    } else {
      // Local dev: JSON file
      const { readFile } = await import('fs/promises')
      const { join } = await import('path')
      const filePath = join(process.cwd(), 'data', `${key}.json`)
      const raw = await readFile(filePath, 'utf-8')
      return JSON.parse(raw) as T
    }
  } catch {
    // ไม่มีไฟล์หรือ KV ยังไม่ได้ตั้งค่า → ใช้ default
  }
  return DEFAULTS[key] as T
}

async function writeContent<T>(key: ContentKey, data: T): Promise<void> {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    // Production: Vercel KV
    const { kv } = await import('@vercel/kv')
    await kv.set(`content:${key}`, data)
  } else {
    // Local dev: JSON file
    const { writeFile, mkdir } = await import('fs/promises')
    const { join } = await import('path')
    const dir = join(process.cwd(), 'data')
    await mkdir(dir, { recursive: true })
    await writeFile(
      join(dir, `${key}.json`),
      JSON.stringify(data, null, 2),
      'utf-8'
    )
  }
}

// ============================================================
// Public API — ใช้ใน components และ API routes
// ============================================================
export const content = {
  general: {
    get: () => readContent<GeneralContent>('general'),
    set: (data: GeneralContent) => writeContent('general', data),
  },
  portfolio: {
    get: () => readContent<typeof PORTFOLIO_ITEMS>('portfolio'),
    set: (data: typeof PORTFOLIO_ITEMS) => writeContent('portfolio', data),
  },
  services: {
    get: () => readContent<typeof SERVICES>('services'),
    set: (data: typeof SERVICES) => writeContent('services', data),
  },
  products: {
    get: () => readContent<typeof PRODUCTS>('products'),
    set: (data: typeof PRODUCTS) => writeContent('products', data),
  },
  chatbot: {
    get: () => readContent<ChatbotConfig>('chatbot'),
    set: (data: ChatbotConfig) => writeContent('chatbot', data),
  },
}
```

---

## ขั้นตอนที่ 5 — สร้าง `src/middleware.ts`

```typescript
// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ไม่ต้อง protect login page
  if (pathname === '/admin/login') return NextResponse.next()

  // ตรวจ session cookie
  const sessionCookie = request.cookies.get('admin_session')
  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
```

---

## ขั้นตอนที่ 6 — API Routes

### `src/app/api/admin/auth/login/route.ts`

```typescript
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
```

### `src/app/api/admin/auth/logout/route.ts`

```typescript
import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'

export async function POST() {
  const session = await getSession()
  session.destroy()
  return NextResponse.json({ ok: true })
}
```

### `src/app/api/admin/general/route.ts`

```typescript
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
```

### `src/app/api/admin/portfolio/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { content } from '@/lib/content'
import { v4 as uuidv4 } from 'uuid'

export async function GET() {
  const auth = await requireAuth()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return NextResponse.json(await content.portfolio.get())
}

export async function POST(req: NextRequest) {
  const auth = await requireAuth()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const items = await content.portfolio.get()
  const newItem = { ...body, id: uuidv4() }
  await content.portfolio.set([...items, newItem])
  return NextResponse.json(newItem, { status: 201 })
}
```

### `src/app/api/admin/portfolio/[id]/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { content } from '@/lib/content'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  const items = await content.portfolio.get()
  const updated = items.map(item => item.id === id ? { ...item, ...body } : item)
  await content.portfolio.set(updated)
  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const items = await content.portfolio.get()
  await content.portfolio.set(items.filter(item => item.id !== id))
  return NextResponse.json({ ok: true })
}
```

> สร้าง pattern เดียวกันนี้สำหรับ `/api/admin/services/[id]` และ `/api/admin/products/[id]`

### `src/app/api/admin/chatbot/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { content } from '@/lib/content'

export async function GET() {
  const auth = await requireAuth()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return NextResponse.json(await content.chatbot.get())
}

export async function PUT(req: NextRequest) {
  const auth = await requireAuth()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const data = await req.json()
  await content.chatbot.set(data)
  return NextResponse.json({ ok: true })
}
```

---

## ขั้นตอนที่ 7 — อัปเดต `src/app/api/chat/route.ts`

แก้ไขให้ดึง system prompt จาก content แทน hardcode:

```typescript
// เปลี่ยนจาก hardcode system prompt
// เป็นดึงจาก content.chatbot.get() ทุกครั้งที่มี request

import { content } from '@/lib/content'

// ใน POST handler:
const chatbotConfig = await content.chatbot.get()

const stream = await anthropic.messages.stream({
  model: chatbotConfig.model,
  max_tokens: chatbotConfig.maxTokens,
  system: chatbotConfig.systemPrompt,
  messages: conversationMessages,
})
```

---

## ขั้นตอนที่ 8 — อัปเดต Sections ให้ดึง content จาก API

แก้ไข sections ทั้งหมดให้เป็น Server Components ที่ดึง content ตอน build/request:

### ตัวอย่าง `src/components/sections/PortfolioSection.tsx`

```typescript
// เปลี่ยนจาก:
import { PORTFOLIO_ITEMS } from '@/lib/constants'

// เป็น:
import { content } from '@/lib/content'

// และเพิ่ม async:
export default async function PortfolioSection() {
  const items = await content.portfolio.get()
  // ... render เหมือนเดิม แต่ใช้ items แทน PORTFOLIO_ITEMS
}
```

> ทำแบบเดียวกันกับ: ServicesSection, ProductsSection, HeroSection (สำหรับ STATS), AboutSection, Footer, Navbar

---

## ขั้นตอนที่ 9 — Admin UI Pages

### Design System ของ Admin Panel

ใช้ Tailwind ล้วน สไตล์ clean/minimal แตกต่างจากหน้าหลัก (navy/teal/gold):
- **Admin bg**: `bg-gray-50`
- **Sidebar**: `bg-white border-r border-gray-200` ความกว้าง 240px
- **Primary color**: `indigo-600` (แยกชัดจาก teal ของ front-end)
- **Font**: ใช้ font เดิม (Sarabun)

### `src/app/admin/login/page.tsx`

```
- หน้าว่างเปล่า centered
- Card ขาว: ชื่อ "Admin Panel", ชื่อบริษัท, password input, ปุ่ม Login
- ไม่ต้องมี username — password อย่างเดียวพอ
- Error message เมื่อผิด
- redirect ไป /admin/general เมื่อสำเร็จ
- 'use client' — ใช้ useState + fetch POST /api/admin/auth/login
```

### `src/app/admin/layout.tsx`

```
- Auth guard: ถ้าไม่ได้ login → redirect /admin/login
- Layout: Sidebar (ซ้าย 240px) + Main content (ขวา)
- Sidebar มี:
  - โลโก้/ชื่อ "Admin Panel" บนสุด
  - Nav links พร้อม icon:
    ⚙️  ข้อมูลทั่วไป       → /admin/general
    🗂  ผลงาน             → /admin/portfolio
    🛠  บริการ             → /admin/services
    📦  ผลิตภัณฑ์          → /admin/products
    🤖  Chat Bot          → /admin/chatbot
  - ปุ่ม Logout ล่างสุด (POST /api/admin/auth/logout แล้ว redirect /admin/login)
- Active link highlight (usePathname)
- Mobile: sidebar collapse เป็น hamburger
```

### `src/app/admin/general/page.tsx`

```
'use client' — ดึง GET /api/admin/general แล้วแสดง form

Form fields:
ส่วน "ข้อมูลบริษัท":
  - ชื่อบริษัท (text)
  - ชื่อย่อ (text)
  - Tagline (text)
  - คำอธิบาย (textarea)
  - เลขทะเบียน (text)
  - ที่อยู่ (textarea)
  - โทรศัพท์ (text)
  - อีเมล (text)
  - สายด่วน Accessibility (text)

ส่วน "สถิติ" (3 ชุด):
  - ตัวเลข (text) เช่น "50+"
  - คำอธิบาย (text) เช่น "โครงการวิจัย"

ส่วน "โซเชียลมีเดีย":
  - Facebook URL
  - Line URL
  - YouTube URL

ปุ่ม "บันทึก" → PUT /api/admin/general
แสดง toast "บันทึกสำเร็จ" เมื่อ save
```

### `src/app/admin/portfolio/page.tsx`

```
'use client'

- ดึง GET /api/admin/portfolio
- แสดง table/list พร้อม:
  - emoji, ชื่อ, หมวดหมู่, ปี
  - ปุ่ม แก้ไข → /admin/portfolio/[id]
  - ปุ่ม ลบ → DELETE /api/admin/portfolio/[id] (confirm ก่อน)
- ปุ่ม "+ เพิ่มผลงานใหม่" → /admin/portfolio/new
- Drag-to-reorder (ใช้ HTML5 drag API พื้นฐาน ไม่ต้องติดตั้ง library)
```

### `src/app/admin/portfolio/new/page.tsx` และ `src/app/admin/portfolio/[id]/page.tsx`

```
'use client' — Form แก้ไขผลงาน

Fields:
  - Emoji (text, 1 ตัวอักษร) พร้อม preview
  - หมวดหมู่ (select: research | product | community | award)
  - ชื่อผลงาน (text, required)
  - คำอธิบาย (textarea, required)
  - สีพื้นหลัง (select หรือ color picker แบบง่าย)
  - ปี (text)
  - ทีมงาน (text)
  - รางวัล (text, optional)
  - จำนวนผู้ได้รับประโยชน์ (text, optional)
  - สถานะ (text, optional)

ปุ่ม "บันทึก" → POST (new) หรือ PUT (edit)
ปุ่ม "ยกเลิก" → กลับ /admin/portfolio
```

### `src/app/admin/services/[id]/page.tsx`

```
Form แก้ไขบริการ:
  - Icon emoji
  - ชื่อบริการ (text)
  - คำอธิบาย (textarea)
  - Features (dynamic list — เพิ่ม/ลบ/เรียงลำดับได้)
    แต่ละ feature เป็น text input + ปุ่มลบ
    ปุ่ม "+ เพิ่ม feature"
```

### `src/app/admin/products/[id]/page.tsx`

```
Form แก้ไขผลิตภัณฑ์:
  - Icon emoji
  - ชื่อ (text)
  - Subtitle (text)
  - คำอธิบาย (textarea)
  - Tags (dynamic list — เพิ่ม/ลบได้, แต่ละอันเป็น text input)
  - สถานะ (text)
  - Status color (select: teal | gold)
  - Badge text (text)
```

### `src/app/admin/chatbot/page.tsx` ← สำคัญที่สุด

```
'use client' — ดึง GET /api/admin/chatbot

Form:
  - Model (select):
      claude-sonnet-4-6 (แนะนำ)
      claude-opus-4-6
      claude-haiku-4-5-20251001
  - Max Tokens (number input: 100–4000)
  - Welcome Message (textarea)
    → ข้อความแรกที่ Bot ส่งให้ผู้ใช้
  - System Prompt (textarea ขนาดใหญ่, font-mono, min-height 400px)
    → มี character count แสดง
    → มี helper text: "System Prompt กำหนดบุคลิกและขอบเขตของ Bot"

Section "ทดสอบ Bot":
  - มี mini chat window ด้านล่าง form
  - พิมพ์ถามได้เลยโดยใช้ config ที่กำลัง edit อยู่ (ยังไม่ต้อง save)
  - ส่งไปที่ /api/chat พร้อม override system prompt ชั่วคราว
  - ช่วยให้ทดสอบ prompt ก่อน save จริง

ปุ่ม "บันทึก" → PUT /api/admin/chatbot
แสดง "บันทึกสำเร็จ — Bot จะใช้ config ใหม่ทันที"
```

---

## ขั้นตอนที่ 10 — Reusable Admin UI Components

สร้างไว้ใน `src/components/admin/`:

```
AdminInput.tsx      ← label + input + error message
AdminTextarea.tsx   ← label + textarea + char count
AdminSelect.tsx     ← label + select
AdminCard.tsx       ← card wrapper (bg-white rounded-lg shadow-sm p-6)
AdminButton.tsx     ← primary (indigo) + secondary + danger
AdminToast.tsx      ← success/error toast notification (auto-hide 3s)
DynamicList.tsx     ← list ที่เพิ่ม/ลบ/เรียงลำดับได้ (สำหรับ features/tags)
ConfirmDialog.tsx   ← dialog ยืนยันก่อนลบ
```

---

## ขั้นตอนที่ 11 — อัปเดต `src/app/api/chat/route.ts`

เพิ่ม support ให้รับ `overrideSystemPrompt` สำหรับ test mode:

```typescript
export async function POST(req: NextRequest) {
  // ... rate limit เดิม ...

  const { messages, overrideSystemPrompt } = await req.json()

  // ถ้า override และ request มาจาก /admin เท่านั้น
  const chatbotConfig = await content.chatbot.get()
  const systemPrompt = overrideSystemPrompt ?? chatbotConfig.systemPrompt

  const stream = await anthropic.messages.stream({
    model: chatbotConfig.model,
    max_tokens: chatbotConfig.maxTokens,
    system: systemPrompt,
    messages,
  })

  // ... streaming response เดิม ...
}
```

---

## ขั้นตอนที่ 12 — ลำดับการสร้าง (Build Order)

```
1.  npm install iron-session @vercel/kv uuid @types/uuid
2.  เพิ่ม env vars ใน .env.local และ .env.example
3.  src/lib/auth.ts
4.  src/lib/content.ts
5.  src/middleware.ts
6.  สร้างโฟลเดอร์ data/ พร้อม JSON เริ่มต้นจาก constants.ts ปัจจุบัน:
      data/general.json
      data/portfolio.json
      data/services.json
      data/products.json
      data/chatbot.json
7.  src/app/api/admin/auth/login/route.ts
8.  src/app/api/admin/auth/logout/route.ts
9.  src/app/api/admin/general/route.ts
10. src/app/api/admin/portfolio/route.ts
11. src/app/api/admin/portfolio/[id]/route.ts
12. src/app/api/admin/services/route.ts
13. src/app/api/admin/services/[id]/route.ts
14. src/app/api/admin/products/route.ts
15. src/app/api/admin/products/[id]/route.ts
16. src/app/api/admin/chatbot/route.ts
17. แก้ไข src/app/api/chat/route.ts (ดึง config จาก content.chatbot)
18. สร้าง data/*.json จาก constants.ts
19. src/components/admin/ (reusable components ทั้งหมด)
20. src/app/admin/login/page.tsx
21. src/app/admin/layout.tsx
22. src/app/admin/general/page.tsx
23. src/app/admin/portfolio/page.tsx
24. src/app/admin/portfolio/new/page.tsx
25. src/app/admin/portfolio/[id]/page.tsx
26. src/app/admin/services/page.tsx
27. src/app/admin/services/[id]/page.tsx
28. src/app/admin/products/page.tsx
29. src/app/admin/products/[id]/page.tsx
30. src/app/admin/chatbot/page.tsx
31. แก้ไข sections (PortfolioSection, ServicesSection, ProductsSection, HeroSection)
    ให้ดึงจาก content.*.get() แทน constants.ts
32. npm run build (ต้องผ่านโดยไม่มี error)
```

---

## ขั้นตอนที่ 13 — Deploy บน Vercel

```bash
# 1. เปิด Vercel KV
# ไปที่ Vercel Dashboard > Project > Storage > Connect Store > KV (Upstash)
# สร้าง KV store ฟรี → copy KV_REST_API_URL และ KV_REST_API_TOKEN

# 2. ตั้งค่า Environment Variables ใน Vercel Dashboard:
ADMIN_PASSWORD=...
SESSION_SECRET=...
KV_REST_API_URL=...
KV_REST_API_TOKEN=...
ANTHROPIC_API_KEY=...
NEXT_PUBLIC_SITE_URL=https://your-domain.co.th

# 3. Import ข้อมูลเริ่มต้นจาก JSON ไปยัง KV
# สร้าง script: scripts/seed-kv.ts
# รัน: npx tsx scripts/seed-kv.ts

# 4. Deploy
vercel --prod
```

### `scripts/seed-kv.ts` — import ข้อมูลเริ่มต้นเข้า KV

```typescript
// scripts/seed-kv.ts
// รันครั้งเดียวเพื่อ seed ข้อมูลจาก JSON ไปยัง Vercel KV
// npx tsx scripts/seed-kv.ts

import { kv } from '@vercel/kv'
import { readFile } from 'fs/promises'
import { join } from 'path'

const keys = ['general', 'portfolio', 'services', 'products', 'chatbot'] as const

async function seed() {
  for (const key of keys) {
    const filePath = join(process.cwd(), 'data', `${key}.json`)
    const raw = await readFile(filePath, 'utf-8')
    const data = JSON.parse(raw)
    await kv.set(`content:${key}`, data)
    console.log(`✅ Seeded: ${key}`)
  }
  console.log('🎉 Seed complete!')
  process.exit(0)
}

seed().catch(console.error)
```

---

## สรุป Flow การทำงาน

```
ทีมงาน (ไม่ใช่ dev) เข้า /admin/login
  → ใส่ password → session cookie
  → แก้ไขเนื้อหาผ่าน form UI
  → กด "บันทึก" → PUT /api/admin/[section]
  → content.ts เขียนลง KV (production) หรือ JSON (local)
  → หน้าเว็บหลักดึง content ใหม่ทันที (Server Component fetch)

นักพัฒนา (dev) แก้ไข code → git push → Vercel auto-deploy
  → ข้อมูลใน KV ยังคงอยู่ (ไม่หาย)
```

---

## Checklist ก่อน Test

```
□ npm run build ผ่าน
□ เข้า /admin/login ได้ → login สำเร็จ → redirect /admin/general
□ เข้า /admin/* โดยไม่ login → redirect /admin/login อัตโนมัติ
□ แก้ไขข้อมูลทั่วไป → กด save → reload หน้าหลัก → เห็นการเปลี่ยนแปลง
□ เพิ่มผลงานใหม่ → ปรากฏในหน้าหลัก
□ แก้ System Prompt → ทดสอบใน admin → กด save → Chat Bot ใช้ prompt ใหม่
□ Logout → ไม่สามารถเข้า /admin/* ได้อีก
□ local: ไฟล์ data/*.json อัปเดตหลัง save
```
