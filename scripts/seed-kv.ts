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
