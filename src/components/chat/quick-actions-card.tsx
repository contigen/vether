import { Shield } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { QuickAction } from '@/types'

type QuickActionsCardProps = {
  actions: QuickAction[]
  onActionClick: (message: string) => void
}

export function QuickActionsCard({
  actions,
  onActionClick,
}: QuickActionsCardProps) {
  const getColorClasses = (color: QuickAction['color']) => {
    const colorMap = {
      gold: 'hover:from-gold/0.1 hover:to-gold/0.05 hover:border-gold/0.4 hover:shadow-gold/0.1',
      blue: 'hover:from-blue-500/10 hover:to-blue-500/5 hover:border-blue-500/40 hover:shadow-blue-500/10',
      emerald:
        'hover:from-emerald-500/10 hover:to-emerald-500/5 hover:border-emerald-500/40 hover:shadow-emerald-500/10',
      purple:
        'hover:from-purple-500/10 hover:to-purple-500/5 hover:border-purple-500/40 hover:shadow-purple-500/10',
    }
    return colorMap[color]
  }

  return (
    <Card className='relative overflow-hidden bg-gradient-to-br from-background via-background to-gold/5 border-gold/0.2'>
      <div className='absolute inset-0 bg-gradient-to-br from-transparent via-gold/0.03 to-gold/0.08' />
      <CardHeader className='relative z-10'>
        <CardTitle className='flex items-center gap-2 text-gold'>
          <Shield className='size-5' />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className='relative z-10 grid grid-cols-2 gap-3'>
        {actions.map(action => {
          const Icon = action.icon
          return (
            <Button
              key={action.id}
              variant='outline'
              className={`justify-start h-auto p-4 border-gold/0.2 hover:bg-gradient-to-br bg-transparent transition-all duration-300 hover:shadow-lg ${getColorClasses(
                action.color
              )}`}
              onClick={() => onActionClick(action.message)}
            >
              <Icon className='size-4 mr-2' />
              <div className='text-left'>
                <div className='font-medium'>{action.title}</div>
                <div className='text-xs text-muted-foreground'>
                  {action.description}
                </div>
              </div>
            </Button>
          )
        })}
      </CardContent>
    </Card>
  )
}
