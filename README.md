# Vether - AI-Powered Real Estate Assistant

**Vether** is a revolutionary AI-powered real estate platform that transforms traditional property analysis through intelligent, component-based chat interactions. Instead of static text responses, Vether delivers rich, interactive dashboards and visualizations that make complex real estate data accessible and actionable.

## Key Innovation

### Component-Based AI Responses

Unlike traditional chatbots that return plain text, Vether's AI intelligently determines when to return interactive React components:

- **Risk Dashboard** - Visual risk assessment with scores and categories
- **Property Snapshot** - Comprehensive property overview with key metrics
- **Trust Panel** - Verification status and compliance tracking
- **Compliance Alerts** - Real-time fraud detection and regulatory alerts
- **Legal Analysis** - Contract review and legal risk assessment

## Technical Architecture

### Two-Layer AI System

1. **Main AI** (Gemini 2.5 Flash) - Handles general queries with Google Search integration
2. **Augmentation AI** (Gemini 2.5 Flash ) - Uses custom tools to generate structured component data

### Tool-Based Component Generation

```typescript
// Custom tools for each component type
const tools = {
  trustAndVerification: verificationTool,
  compliance: complianceTool,
  risk: riskTool,
  legal: legalTool,
  property: propertyTool,
}
```

### Smart Component Rendering

The system automatically maps tool results to React components:

```typescript
const COMPONENT_REGISTRY = {
  trustAndVerification: TrustPanel,
  risk: RiskDashboard,
  property: PropertySnapshot,
  compliance: ComplianceAlerts,
  legal: LegalAnalysisCard,
}
```

## Problem Solved

**Traditional Real Estate Analysis:**

- Static text responses
- Manual data interpretation
- Disconnected information sources
- Time-consuming research

**Vether's Solution:**

- Interactive visual dashboards
- AI-powered data synthesis
- Real-time component rendering
- Contextual, actionable insights

## Tech Stack

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS
- **AI:** Google Gemini 2.5 Flash, AI SDK
- **Backend:** Sensay API, Custom tool system
- **UI Components:** shadcn/ui, Lucide React
- **Authentication:** NextAuth.js

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

## Features

### For Real Estate Agents

- **Multi-property Analysis** - Compare multiple properties side-by-side
- **Client Management** - Generate personalized reports
- **Risk Assessment** - Identify potential issues before they become problems
- **Compliance Tracking** - Stay updated with regulatory requirements

### For Property Buyers

- **Property Insights** - Comprehensive property analysis
- **Risk Evaluation** - Understand potential investment risks
- **Legal Review** - Contract analysis and legal guidance
- **Market Analysis** - Current market trends and predictions

## Technical Highlights

### Avoiding Tool Conflicts

- **Problem:** "Cannot mix function tools with provider-defined tools"
- **Solution:** Separate AI layers with custom tool system
- **Result:** Seamless integration of Google Search + custom tools

### Dynamic Component Rendering

- **AI determines** which component to render based on user query
- **Tool results** provide structured data for components
- **Type-safe** component rendering with TypeScript

### Scalable Architecture

- **Modular design** - Easy to add new component types
- **Tool-based** - Extensible tool system for new features
- **Component registry** - Centralized component management

### Technical Excellence

- **Clean architecture** with separation of concerns
- **Type safety** throughout the entire stack
- **Performance optimized** with efficient rendering

### User Experience

- **Intuitive** interface that anyone can use
- **Actionable insights** instead of raw data
- **Professional-grade** tools for real estate professionals

## Demo Scenarios

1. **"Analyze the risks for 123 Main Street"** → Risk Dashboard component
2. **"Show me property details for 456 Oak Ave"** → Property Snapshot component
3. **"Check compliance for this transaction"** → Compliance Alerts component
4. **"Review this contract for legal issues"** → Legal Analysis component

.
