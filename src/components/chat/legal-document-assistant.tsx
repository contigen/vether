import {
  FileText,
  Scale,
  Home,
  Shield,
  CheckCircle,
  AlertTriangle,
  Clock,
  Download,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function LegalDocumentAssistant() {
  return (
    <Card className='relative overflow-hidden bg-gradient-to-br from-background via-background to-purple-500/12 border-purple-500/20'>
      <div className='absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/8 to-purple-500/15' />
      <CardHeader className='relative z-10'>
        <CardTitle className='flex items-center gap-2 text-purple-400'>
          <FileText className='size-5' />
          Legal Document Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className='relative z-10 space-y-4'>
        <div className='grid grid-cols-2 gap-3'>
          <Button
            variant='outline'
            size='sm'
            className='justify-start bg-transparent'
          >
            <FileText className='size-3 mr-2' />
            Generate Purchase Agreement
          </Button>
          <Button
            variant='outline'
            size='sm'
            className='justify-start bg-transparent'
          >
            <Scale className='size-3 mr-2' />
            Create NDA
          </Button>
          <Button
            variant='outline'
            size='sm'
            className='justify-start bg-transparent'
          >
            <Home className='size-3 mr-2' />
            Draft Lease Agreement
          </Button>
          <Button
            variant='outline'
            size='sm'
            className='justify-start bg-transparent'
          >
            <Shield className='size-3 mr-2' />
            Compliance Checklist
          </Button>
        </div>

        <Tabs defaultValue='analysis' className='w-full'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='analysis'>Contract Analysis</TabsTrigger>
            <TabsTrigger value='generation'>Document Generation</TabsTrigger>
          </TabsList>
          <TabsContent value='analysis' className='space-y-3'>
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
          <TabsContent value='generation' className='space-y-3'>
            <div className='text-sm space-y-2'>
              <p>
                <strong>Available Templates:</strong>
              </p>
              <ul className='space-y-1 text-muted-foreground'>
                <li>• Residential Purchase Agreement (State-specific)</li>
                <li>• Commercial Lease Template</li>
                <li>• Property Management Agreement</li>
                <li>• Disclosure Forms & Addendums</li>
              </ul>
            </div>
            <div className='flex gap-2'>
              <Button
                size='sm'
                className='bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border-purple-500/30'
              >
                <Download className='size-3 mr-1' />
                Generate Document
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
