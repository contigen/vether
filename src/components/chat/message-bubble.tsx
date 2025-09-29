import { Bot, FileText, UserRound } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Message, UploadedFile, UserRole } from '@/types'
import type {
  RiskData,
  PropertyData,
  ComplianceAlert,
  LegalSummary,
} from '@/lib/schema'
import { formatFileSize } from '@/lib/utils'
import { QUICK_ACTIONS } from '@/lib/constants'
import { QuickActionsCard } from '@/components/chat'
import { RiskDashboard } from '@/components/chat/risk-dashboard'
import { PropertySnapshot } from '@/components/chat/property-snapshot'
// import { TrustPanel } from '@/components/chat/trust-panel'
import { ComplianceAlerts } from '@/components/chat/compliance-alerts'
import { LegalAnalysisCard } from '@/components/chat/legal-analysis-card'

type MessageBubbleProps = {
  message: Message
  onQuickAction?: (message: string) => void
  userRole?: UserRole | null
}

// Component registry for future use
// const COMPONENT_REGISTRY = {
//   trustAndVerification: TrustPanel,
//   risk: RiskDashboard,
//   property: PropertySnapshot,
//   compliance: ComplianceAlerts,
//   legal: LegalAnalysisCard,
// }

export function MessageBubble({ message, onQuickAction }: MessageBubbleProps) {
  const isUser = message.type === 'user'

  const shouldShowQuickActions = !isUser && message.id == '1' && onQuickAction

  // Component registry for future use
  // const Component = COMPONENT_REGISTRY[message.componentType as keyof typeof COMPONENT_REGISTRY]

  return (
    <div className={`flex gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className='size-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 mt-1'>
          <Bot className='size-4 text-gold' />
        </div>
      )}
      <div className={`max-w-[80%] space-y-3 ${isUser ? 'order-first' : ''}`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-gradient-to-br from-slate-800 to-slate-700 text-foreground ml-auto border border-border/20'
              : 'bg-muted/50 border border-border/40'
          }`}
        >
          <p className='text-sm leading-relaxed'>{message.content}</p>
          <div className='text-xs opacity-70 mt-2'>
            {message.timestamp.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>

        {message.files && message.files.length > 0 && (
          <div className='space-y-2'>
            {message.files.map(file => (
              <FileAttachment key={file.id} file={file} />
            ))}
          </div>
        )}

        {shouldShowQuickActions && (
          <QuickActionsCard
            actions={QUICK_ACTIONS}
            onActionClick={onQuickAction}
          />
        )}

        {message.componentType === 'risk' && (
          <RiskDashboard riskData={message.componentData as RiskData} />
        )}

        {message.componentType === 'property' && (
          <PropertySnapshot
            propertyData={message.componentData as PropertyData}
          />
        )}

        {message.componentType === 'compliance' && (
          <ComplianceAlerts alerts={message.componentData as ComplianceAlert} />
        )}

        {message.componentType === 'legal' && (
          <LegalAnalysisCard
            legalSummary={message.componentData as LegalSummary}
          />
        )}
      </div>
      {isUser && (
        <div className='size-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 mt-1'>
          <UserRound className='size-4' />
        </div>
      )}
    </div>
  )
}

function FileAttachment({ file }: { file: UploadedFile }) {
  return (
    <div className='flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/20'>
      <FileText className='size-4 text-muted-foreground flex-shrink-0' />
      <div className='flex-1 min-w-0'>
        <div className='text-sm font-medium truncate'>{file.name}</div>
        <div className='text-xs text-muted-foreground'>
          {formatFileSize(file.size)}
        </div>
        {file.uploadProgress !== undefined && file.uploadProgress < 100 && (
          <Progress value={file.uploadProgress} className='mt-1 h-1' />
        )}
      </div>
    </div>
  )
}
