import { AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { RiskData } from '@/lib/schema'
import { getStatusColor, getStatusVariant } from '@/lib/utils'

export function RiskDashboard({ riskData }: { riskData: RiskData }) {
  return (
    <Card className='relative overflow-hidden bg-gradient-to-br from-background via-background to-red-500/12 border-red-500/20'>
      <div className='absolute inset-0 bg-gradient-to-br from-transparent via-red-500/8 to-red-500/15' />
      <CardHeader className='relative z-10'>
        <CardTitle className='flex items-center gap-2 text-red-400'>
          <AlertTriangle className='size-5' />
          Risk Assessment Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent className='relative z-10 space-y-4'>
        <div className='grid grid-cols-3 gap-4'>
          <div className='text-center'>
            <div className='text-2xl font-bold text-red-400'>High</div>
            <div className='text-sm text-muted-foreground'>Legal Risk</div>
            <Progress value={75} className='mt-2 h-2' />
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-yellow-400'>Medium</div>
            <div className='text-sm text-muted-foreground'>Financial Risk</div>
            <Progress value={45} className='mt-2 h-2' />
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-green-400'>Low</div>
            <div className='text-sm text-muted-foreground'>Compliance Risk</div>
            <Progress value={20} className='mt-2 h-2' />
          </div>
        </div>
        <div className='flex gap-2 flex-wrap'>
          <Badge variant='destructive'>Title Issues</Badge>
          <Badge variant='secondary'>Zoning Concerns</Badge>
          <Badge variant='outline'>Environmental Clear</Badge>
        </div>
      </CardContent>
      <CardContent>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
          {riskData.map((risk, index) => (
            <div key={index} className='p-4 bg-secondary rounded-lg'>
              <div className='flex items-center justify-between mb-2'>
                <span className='text-sm font-medium'>{risk.category}</span>
                <Badge variant={getStatusVariant(risk.status)}>
                  {risk.status}
                </Badge>
              </div>
              <div
                className={`text-2xl font-bold mb-1 ${getStatusColor(
                  risk.status
                )}`}
              >
                {risk.score}/100
              </div>
              <Progress value={risk.score} className='h-2 mb-2' />
              <div className='text-xs text-muted-foreground'>
                {risk.issues} issues found
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
