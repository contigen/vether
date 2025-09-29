import {
  Building,
  FileText,
  Scale,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Shield,
} from 'lucide-react'
import {
  QuickAction,
  RiskData,
  LegalSummary,
  TrustPanelItem,
  PropertyData,
  ComplianceAlert,
} from '@/types'

export const VALID_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
  'image/gif',
  'text/plain',
] as const

export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export const QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'analyze-property',
    title: 'Analyze Property',
    description: 'Risk assessment',
    icon: Building,
    message:
      'I want to get a property risk assessment for 123 Main Street. Can you help me evaluate potential issues?',
    color: 'gold',
  },
  {
    id: 'review-contract',
    title: 'Review Contract',
    description: 'Legal analysis',
    icon: FileText,
    message:
      'I have a real estate contract that needs legal review. Can you help me check for potential issues?',
    color: 'blue',
  },
  {
    id: 'compliance-check',
    title: 'Compliance Check',
    description: 'Regulatory review',
    icon: Scale,
    message:
      'I need to check compliance and fraud indicators for my property transaction.',
    color: 'emerald',
  },
  {
    id: 'book-consultation',
    title: 'Book Consultation',
    description: 'Expert advice',
    icon: Calendar,
    message:
      "I'd like to schedule a consultation with a real estate legal expert to discuss my specific situation.",
    color: 'purple',
  },
]

export const DEFAULT_RISK_DATA: RiskData[] = [
  { category: 'Legal', score: 85, status: 'low', issues: 2 },
  { category: 'Compliance', score: 72, status: 'medium', issues: 4 },
  { category: 'Financial', score: 91, status: 'low', issues: 1 },
]

export const DEFAULT_LEGAL_SUMMARY: LegalSummary = {
  plain:
    'This property has clear title with no major legal issues. Standard due diligence recommended.',
  detailed:
    'Property title search reveals no liens, encumbrances, or legal disputes. Zoning compliance verified. Environmental assessments show no contamination. Recommend standard purchase agreement with 30-day due diligence period.',
}

export const TRUST_PANEL_ITEMS: TrustPanelItem[] = [
  {
    id: 'county-records',
    title: 'County Records Database',
    status: 'verified',
    lastUpdated: '2 hours ago',
    confidence: 98,
  },
  {
    id: 'mls-data',
    title: 'MLS Property Data',
    status: 'verified',
    lastUpdated: '1 day ago',
    confidence: 95,
  },
  {
    id: 'environmental-reports',
    title: 'Environmental Reports',
    status: 'pending',
    lastUpdated: 'ETA: 3 days',
    description: 'Awaiting Phase I assessment',
  },
]

export const SUGGESTION_MESSAGES = [
  'Analyze this property address: 123 Main Street, analyzing for investment risks and legal compliance',
  'Review purchase agreement for legal issues, compliance requirements, and potential risks',
  'Check zoning compliance for my property development project and local regulations',
] as const

export const DEFAULT_PROPERTY_DATA: PropertyData = {
  address: '123 Main Street',
  type: 'Single Family Home',
  squareFeet: 2450,
  yearBuilt: 1998,
  currentValue: '$485K',
  growthRate: '+12%',
  daysOnMarket: 45,
  ownershipHistory: 3,
  lastSale: 'March 2019 - $425K',
  propertyTax: '$4,850/year',
}

export const COMPLIANCE_ALERTS: ComplianceAlert[] = [
  {
    id: 'zoning-compliance',
    type: 'success',
    title: 'Zoning Compliance Verified',
    description: 'Property meets all local zoning requirements',
    icon: CheckCircle,
  },
  {
    id: 'environmental-review',
    type: 'warning',
    title: 'Environmental Review Pending',
    description: 'EPA database check in progress',
    icon: AlertTriangle,
  },
  {
    id: 'fraud-check',
    type: 'info',
    title: 'No Fraud Indicators Detected',
    description: 'Property and seller verified through multiple databases',
    icon: Shield,
  },
]

export const ENHANCED_TRUST_PANEL_ITEMS: TrustPanelItem[] = [
  {
    id: 'county-records',
    title: 'County Records Database',
    status: 'verified',
    lastUpdated: '2 minutes ago',
    confidence: 98,
  },
  {
    id: 'state-legal',
    title: 'State Legal Registry',
    status: 'verified',
    lastUpdated: '5 minutes ago',
    confidence: 95,
  },
  {
    id: 'federal-compliance',
    title: 'Federal Compliance Database',
    status: 'verified',
    lastUpdated: '1 minute ago',
    confidence: 99,
  },
]
