import { NextRequest, NextResponse } from 'next/server'
import type { ContactFormData } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()

    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json({ error: 'กรุณากรอกข้อมูลให้ครบถ้วน' }, { status: 400 })
    }

    // Log the contact form submission
    console.log('Contact form submission:', {
      name: body.name,
      email: body.email,
      phone: body.phone || '-',
      organization: body.organization || '-',
      subject: body.subject,
      message: body.message,
      timestamp: new Date().toISOString(),
    })

    // TODO: Send email via Resend or SendGrid
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({...})

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' }, { status: 500 })
  }
}
