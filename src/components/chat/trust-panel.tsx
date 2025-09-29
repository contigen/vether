import { Shield } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { TrustPanel } from '@/lib/schema'

export function TrustPanel({ items }: { items: TrustPanel }) {
  const getStatusVariant = (status: TrustPanel[number]['status']) => {
    switch (status) {
      case 'verified':
        return 'default'
      case 'pending':
        return 'secondary'
      case 'error':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  const getStatusColor = (status: TrustPanel[number]['status']) => {
    switch (status) {
      case 'verified':
        return 'text-gold'
      case 'pending':
        return 'text-muted-foreground'
      case 'error':
        return 'text-red-400'
      default:
        return 'text-muted-foreground'
    }
  }

  return (
    <Card className='relative overflow-hidden bg-gradient-to-br from-background via-background to-gold/0.12 border-gold/0.2'>
      <div className='absolute inset-0 bg-gradient-to-br from-transparent via-gold/0.08 to-gold/0.15' />
      <CardHeader className='relative z-10'>
        <CardTitle className='flex items-center gap-2 text-gold'>
          <Shield className='size-5' />
          Trust & Verification Panel
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {items.map(item => (
            <div key={item.id} className='p-3 bg-secondary rounded-lg'>
              <div className='flex items-center justify-between mb-2'>
                <span className='text-sm font-medium'>{item.title}</span>
                <Badge
                  variant={getStatusVariant(item.status)}
                  className={getStatusColor(item.status)}
                >
                  {item.status}
                </Badge>
              </div>
              <p className='text-xs text-muted-foreground'>
                Last updated: {item.lastUpdated}
                {item.confidence && ` • Confidence: ${item.confidence}%`}
              </p>
            </div>
          ))}
        </div>

        <div className='mt-4 pt-4 border-t border-border'>
          <div className='flex items-center gap-2 text-xs text-muted-foreground'>
            <Shield className='size-3' />
            <span>
              All data sources comply with industry standards and regulations
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
