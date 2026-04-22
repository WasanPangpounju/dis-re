'use client'

import { useState, useCallback } from 'react'
import type { Message, ChatResponse } from '@/lib/types'

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)
    setError(null)

    try {
      const conversationHistory = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }))

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

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'เกิดข้อผิดพลาด'
      setError(msg)
    } finally {
      setIsLoading(false)
    }
  }, [messages, isLoading])

  const clearMessages = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  return { messages, isLoading, error, sendMessage, clearMessages }
}
