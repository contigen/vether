import { Scale, CheckCircle, AlertTriangle, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { LegalSummary } from '@/lib/schema'

export function LegalAnalysisCard({
  legalSummary,
}: {
  legalSummary: LegalSummary
}) {
  return (
    <Card className='relative overflow-hidden bg-gradient-to-br from-background via-background to-blue-500/12 border-blue-500/20'>
      <div className='absolute inset-0 bg-gradient-to-br from-transparent via-blue-500/8 to-blue-500/15' />
      <CardHeader className='relative z-10'>
        <CardTitle className='flex items-center gap-2 text-blue-400'>
          <Scale className='size-5' />
          Legal Analysis Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue='plain' className='w-full'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='plain'>Plain Language</TabsTrigger>
            <TabsTrigger value='detailed'>Detailed Analysis</TabsTrigger>
          </TabsList>
          <TabsContent value='plain' className='mt-4'>
            <div className='p-4 bg-secondary rounded-lg'>
              <p className='text-sm leading-relaxed'>{legalSummary.plain}</p>
            </div>
          </TabsContent>
          <TabsContent value='detailed' className='mt-4'>
            <div className='p-4 bg-secondary rounded-lg'>
              <p className='text-sm leading-relaxed'>{legalSummary.detailed}</p>
            </div>
          </TabsContent>
        </Tabs>

        <Accordion type='single' collapsible className='mt-4'>
          <AccordionItem value='title'>
            <AccordionTrigger>Title & Ownership</AccordionTrigger>
            <AccordionContent>
              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <CheckCircle className='size-4 text-green-500' />
                  <span className='text-sm'>Clear title verified</span>
                </div>
                <div className='flex items-center gap-2'>
                  <CheckCircle className='size-4 text-green-500' />
                  <span className='text-sm'>No liens or encumbrances</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='zoning'>
            <AccordionTrigger>Zoning & Compliance</AccordionTrigger>
            <AccordionContent>
              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <CheckCircle className='size-4 text-green-500' />
                  <span className='text-sm'>Zoning compliance verified</span>
                </div>
                <div className='flex items-center gap-2'>
                  <AlertTriangle className='size-4 text-yellow-500' />
                  <span className='text-sm'>
                    Permit renewal due in 6 months
                  </span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardContent className='relative z-10'>
        <Tabs defaultValue='plain'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='plain'>Plain English</TabsTrigger>
            <TabsTrigger value='detailed'>Legal Details</TabsTrigger>
          </TabsList>
          <TabsContent value='plain' className='space-y-3'>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <CheckCircle className='size-4 text-green-400' />
                <span>Property ownership is clear and transferable</span>
              </div>
              <div className='flex items-center gap-2'>
                <AlertTriangle className='size-4 text-yellow-400' />
                <span>Minor easement restrictions apply</span>
              </div>
              <div className='flex items-center gap-2'>
                <Clock className='size-4 text-blue-400' />
                <span>Closing timeline is standard (30-45 days)</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value='detailed' className='space-y-3'>
            <div className='text-sm space-y-2'>
              <p>
                <strong>Title Analysis:</strong> Fee simple absolute ownership
                with marketable title confirmed through comprehensive title
                search.
              </p>
              <p>
                <strong>Encumbrances:</strong> Utility easement recorded in Book
                1234, Page 567 affecting eastern boundary.
              </p>
              <p>
                <strong>Contingencies:</strong> Standard financing and
                inspection contingencies with 21-day periods.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
