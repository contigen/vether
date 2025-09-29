import { AlertCircle, CheckCircle, AlertTriangle, Shield } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ComplianceAlert } from '@/lib/schema'

export function ComplianceAlerts({ alerts }: { alerts: ComplianceAlert }) {
  const ICONS = {
    'zoning-compliance': CheckCircle,
    'environmental-review': AlertTriangle,
    'fraud-check': Shield,
  }
  const getAlertStyles = (type: ComplianceAlert[number]['type']) => {
    switch (type) {
      case 'success':
        return {
          container: 'bg-green-500/10 border-green-500/20',
          icon: 'text-green-400',
          title: 'text-green-400',
        }
      case 'warning':
        return {
          container: 'bg-yellow-500/10 border-yellow-500/20',
          icon: 'text-yellow-400',
          title: 'text-yellow-400',
        }
      case 'info':
        return {
          container: 'bg-blue-500/10 border-blue-500/20',
          icon: 'text-blue-400',
          title: 'text-blue-400',
        }
      default:
        return {
          container: 'bg-gray-500/10 border-gray-500/20',
          icon: 'text-gray-400',
          title: 'text-gray-400',
        }
    }
  }

  return (
    <Card className='relative overflow-hidden bg-gradient-to-br from-background via-background to-orange-500/12 border-orange-500/20'>
      <div className='absolute inset-0 bg-gradient-to-br from-transparent via-orange-500/8 to-orange-500/15' />
      <CardHeader className='relative z-10'>
        <CardTitle className='flex items-center gap-2 text-orange-400'>
          <AlertCircle className='size-5' />
          Compliance & Fraud Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className='relative z-10 space-y-4'>
        <div className='space-y-3'>
          {alerts.map(alert => {
            const Icon = ICONS[alert.id]
            const styles = getAlertStyles(alert.type)

            return (
              <div
                key={alert.id}
                className={`flex items-start gap-3 p-3 rounded-lg border ${styles.container}`}
              >
                <Icon
                  className={`size-4 mt-0.5 flex-shrink-0 ${styles.icon}`}
                />
                <div>
                  <p className={`font-medium ${styles.title}`}>{alert.title}</p>
                  <span className='text-sm text-muted-foreground'>
                    {alert.description}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
