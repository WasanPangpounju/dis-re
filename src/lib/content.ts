import { COMPANY, STATS, PORTFOLIO_ITEMS, SERVICES, PRODUCTS, ACTIVITIES } from './constants'

export type ContentKey = 'general' | 'portfolio' | 'services' | 'products' | 'chatbot' | 'activities'

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

const DEFAULTS: Record<ContentKey, unknown> = {
  general: {
    company: COMPANY,
    stats: STATS,
  },
  portfolio: PORTFOLIO_ITEMS,
  services: SERVICES,
  products: PRODUCTS,
  activities: ACTIVITIES,
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

async function readContent<T>(key: ContentKey): Promise<T> {
  try {
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      const { kv } = await import('@vercel/kv')
      const data = await kv.get<T>(`content:${key}`)
      if (data) return data
    } else {
      const { readFile } = await import('fs/promises')
      const { join } = await import('path')
      const filePath = join(process.cwd(), 'data', `${key}.json`)
      const raw = await readFile(filePath, 'utf-8')
      return JSON.parse(raw) as T
    }
  } catch {
    // fallback to defaults
  }
  return DEFAULTS[key] as T
}

async function writeContent<T>(key: ContentKey, data: T): Promise<void> {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    const { kv } = await import('@vercel/kv')
    await kv.set(`content:${key}`, data)
  } else {
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
  activities: {
    get: () => readContent<typeof ACTIVITIES>('activities'),
    set: (data: typeof ACTIVITIES) => writeContent('activities', data),
  },
  chatbot: {
    get: () => readContent<ChatbotConfig>('chatbot'),
    set: (data: ChatbotConfig) => writeContent('chatbot', data),
  },
}
