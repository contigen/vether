import { MapPin, CheckCircle, Eye, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PropertyData } from '@/lib/schema'

export function PropertySnapshot({
  propertyData,
}: {
  propertyData: PropertyData
}) {
  return (
    <Card className='relative overflow-hidden bg-gradient-to-br from-background via-background to-blue-500/12 border-blue-500/20'>
      <div className='absolute inset-0 bg-gradient-to-br from-transparent via-blue-500/8 to-blue-500/15' />
      <CardHeader className='relative z-10'>
        <CardTitle className='flex items-center gap-2 text-blue-400'>
          <MapPin className='w-5 h-5' />
          Property Snapshot
        </CardTitle>
      </CardHeader>
      <CardContent className='relative z-10 space-y-4'>
        <div className='flex items-start justify-between'>
          <div>
            <h3 className='font-semibold text-lg'>{propertyData.address}</h3>
            <p className='text-sm text-muted-foreground'>
              {propertyData.type} • {propertyData.squareFeet.toLocaleString()}{' '}
              sq ft • Built {propertyData.yearBuilt}
            </p>
          </div>
          <Badge className='bg-emerald-500/20 text-emerald-400 border-emerald-500/30'>
            <CheckCircle className='w-3 h-3 mr-1' />
            Verified
          </Badge>
        </div>

        <div className='grid grid-cols-3 gap-4'>
          <div className='text-center'>
            <div className='text-xl font-bold text-[hsl(var(--gold))]'>
              {propertyData.currentValue}
            </div>
            <div className='text-xs text-muted-foreground'>Current Value</div>
          </div>
          <div className='text-center'>
            <div className='text-xl font-bold text-green-400'>
              {propertyData.growthRate}
            </div>
            <div className='text-xs text-muted-foreground'>5yr Growth</div>
          </div>
          <div className='text-center'>
            <div className='text-xl font-bold text-blue-400'>
              {propertyData.daysOnMarket}
            </div>
            <div className='text-xs text-muted-foreground'>Days on Market</div>
          </div>
        </div>

        <div className='space-y-2'>
          <div className='flex items-center justify-between text-sm'>
            <span>Ownership History</span>
            <span className='text-muted-foreground'>
              {propertyData.ownershipHistory} previous owners
            </span>
          </div>
          <div className='flex items-center justify-between text-sm'>
            <span>Last Sale</span>
            <span className='text-muted-foreground'>
              {propertyData.lastSale}
            </span>
          </div>
          <div className='flex items-center justify-between text-sm'>
            <span>Property Tax</span>
            <span className='text-muted-foreground'>
              {propertyData.propertyTax}
            </span>
          </div>
        </div>

        <div className='flex gap-2'>
          <Button size='sm' variant='outline' className='flex-1 bg-transparent'>
            <Eye className='w-3 h-3 mr-1' />
            View Details
          </Button>
          <Button size='sm' variant='outline' className='flex-1 bg-transparent'>
            <TrendingUp className='w-3 h-3 mr-1' />
            Market Analysis
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
