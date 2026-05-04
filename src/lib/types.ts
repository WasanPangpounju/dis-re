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

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  contexts?: RagContext[]
  mode?: 'rag' | 'direct'
}

export interface PortfolioItem {
  id: string
  category: string
  categoryLabel: string
  image?: string
  bgColor: string
  title: string
  description: string
  year?: string
  team?: string
  award?: string
  reach?: string
  status?: string
}

export interface Activity {
  id: string
  title: string
  description: string
  date: string
  location?: string
  image?: string
  category?: string
  categoryLabel?: string
}

export interface Service {
  id: string
  image?: string
  title: string
  description: string
  features: string[]
}

export interface Product {
  id: string
  icon?: string
  image?:string
  title: string
  subtitle: string
  description: string
  tags: string[]
  status: string
  statusColor: 'teal' | 'gold'
  badge: string
}

export interface AccessibilityFeature {
  icon: string
  title: string
  description: string
}

export interface Stat {
  number: string
  label: string
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  organization?: string
  subject: string
  message: string
}
