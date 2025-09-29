export type Message = {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  files?: UploadedFile[]
  componentType: string
  componentData?: unknown
}

export type UploadedFile = {
  id: string
  name: string
  size: number
  type: string
  url: string
  uploadProgress?: number
}

export type RiskData = {
  category: string
  score: number
  status: 'low' | 'medium' | 'high'
  issues: number
}

export type LegalSummary = {
  plain: string
  detailed: string
}

export type QuickAction = {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  message: string
  color: 'gold' | 'blue' | 'emerald' | 'purple'
}

export type TrustPanelItem = {
  id: string
  title: string
  status: 'verified' | 'pending' | 'error'
  lastUpdated: string
  confidence?: number
  description?: string
}

export type PropertyData = {
  address: string
  type: string
  squareFeet: number
  yearBuilt: number
  currentValue: string
  growthRate: string
  daysOnMarket: number
  ownershipHistory: number
  lastSale: string
  propertyTax: string
}

export type ComplianceAlert = {
  id: string
  type: 'success' | 'warning' | 'info'
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

export type CollaborationItem = {
  id: string
  type: 'thread' | 'document'
  title: string
  participants?: number
  files?: number
  icon: React.ComponentType<{ className?: string }>
  color: string
}

export type UserRole = {
  type: 'buyer' | 'agent'
  displayName: string
}
