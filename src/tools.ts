import { tool as createTool } from 'ai'
import {
  complianceAlertSchema,
  legalSummarySchema,
  propertySnapshotSchema,
  riskSchema,
  trustPanelSchema,
} from './lib/schema'

const verificationTool = createTool({
  description: 'A tool to do trust and verification of property',
  inputSchema: trustPanelSchema,
  outputSchema: trustPanelSchema,

  execute: async result => {
    return result
  },
})

const complianceTool = createTool({
  description: 'A tool to do compliance check of property',
  inputSchema: complianceAlertSchema,
  outputSchema: complianceAlertSchema,
  execute: async result => {
    return result
  },
})

const riskTool = createTool({
  description: 'A tool to do risk analysis of property',
  inputSchema: riskSchema,
  outputSchema: riskSchema,
  execute: async result => {
    return result
  },
})

const legalTool = createTool({
  description: 'A tool to do legal analysis of property',
  inputSchema: legalSummarySchema,
  outputSchema: legalSummarySchema,
  execute: async result => {
    return result
  },
})

const propertyTool = createTool({
  description: 'A tool to do property analysis of property',
  inputSchema: propertySnapshotSchema,
  outputSchema: propertySnapshotSchema,
  execute: async result => {
    return result
  },
})

export const tools = {
  trustAndVerification: verificationTool,
  compliance: complianceTool,
  risk: riskTool,
  legal: legalTool,
  property: propertyTool,
}
