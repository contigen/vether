import z from 'zod'

export const onboardingSchema = z.object({
  email: z
    .string('Email is required')
    .trim()
    .min(1, `Email is required`)
    .pipe(z.email(`Invalid email`)),
  name: z.string('Name is required').trim().min(1, `Name is required`),
  location: z
    .string('Location is required')
    .trim()
    .min(1, `Location is required`),
  description: z.string().trim().min(1, `Description is required`),
})

export const trustPanelSchema = z.array(
  z.object({
    id: z.enum(['county-records', 'state-legal', 'federal-compliance']),
    title: z.string(),
    status: z.enum(['verified', 'pending', 'error']),
    lastUpdated: z.string(),
    confidence: z.number(),
  })
)

export type TrustPanel = z.infer<typeof trustPanelSchema>

export const riskSchema = z.array(
  z.object({
    category: z.string(),
    score: z.number(),
    status: z.enum(['low', 'medium', 'high']),
    issues: z.number(),
  })
)

export type RiskData = z.infer<typeof riskSchema>

export const propertySnapshotSchema = z.object({
  address: z.string(),
  type: z.string(),
  squareFeet: z.number(),
  yearBuilt: z.number(),
  currentValue: z.string(),
  growthRate: z.string(),
  daysOnMarket: z.number(),
  ownershipHistory: z.number(),
  lastSale: z.string(),
  propertyTax: z.string(),
})

export type PropertyData = z.infer<typeof propertySnapshotSchema>

export const legalSummarySchema = z.object({
  plain: z.string(),
  detailed: z.string(),
})

export type LegalSummary = z.infer<typeof legalSummarySchema>

export const complianceAlertSchema = z.array(
  z.object({
    id: z.enum(['zoning-compliance', 'environmental-review', 'fraud-check']),
    type: z.enum(['success', 'warning', 'info']),
    title: z.string(),
    description: z.string(),
  })
)

export type ComplianceAlert = z.infer<typeof complianceAlertSchema>
