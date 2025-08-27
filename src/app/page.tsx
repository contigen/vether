import { Button } from '@/components/ui/button'
import { ButtonGold } from '@/components/ui/button-gold'
import { Card } from '@/components/ui/card'
import { FileText, ArrowRight, Bot } from 'lucide-react'
import Link from 'next/link'
import { Logo } from '@/components/ui/logo'

export default function Home() {
  return (
    <div>
      <header className='border-b border-border/40 backdrop-blur-sm sticky top-0 z-50'>
        <div className='container flex items-center justify-between py-4'>
          <Logo />
          <div className='flex items-center gap-2'>
            <Button variant='ghost' size='sm'>
              <Link href='/connect'>Connect Wallet</Link>
            </Button>
            <ButtonGold size='sm'>
              <Link href='/chat'>Try Vether</Link>
            </ButtonGold>
          </div>
        </div>
      </header>

      <section className='container py-24 md:py-32 relative'>
        <div className='max-w-4xl mx-auto text-center'>
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/[0.1] border border-gold/[0.2] mb-8 backdrop-blur-sm'>
            <span className='text-sm font-medium'>
              AI-Powered Property Risk Detection
            </span>
          </div>

          <h1 className='text-4xl md:text-6xl font-bold mb-6 text-balance'>
            Trust Properties.
            <br />
            <span className='text-gold'>Detect Risks.</span>
          </h1>

          <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(234,179,8,0.15),transparent_50%)]' />

          <p className='text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed text-pretty'>
            AI-powered property risk scoring and legal compliance detection for
            real estate professionals, investors, and legal teams.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center mb-16'>
            <Link href='/chat'>
              <ButtonGold size='lg' className='flex items-center gap-2 px-8'>
                Analyze Property
                <ArrowRight className='size-4' />
              </ButtonGold>
            </Link>
            <Button
              size='lg'
              variant='outline'
              className='flex items-center gap-2 bg-transparent px-8'
            >
              Explore Reports
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='flex items-center gap-2 bg-transparent px-8'
            >
              Book Consultation
            </Button>
          </div>

          <div className='max-w-4xl mx-auto mb-16'>
            <div className='mt-16 relative'>
              <div className='absolute inset-0 bg-gradient-to-b from-transparent to-background z-10' />

              <Card className='p-8 bg-gradient-to-br from-card/50 via-card/50 to-gold/[0.05] backdrop-blur-sm border-border/50 relative overflow-hidden'>
                <div className='absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gold/[0.03] pointer-events-none' />
                <div className='top-4 right-4 flex gap-2 absolute z-10'>
                  <div className='px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium'>
                    Low Risk
                  </div>
                  <div className='px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium'>
                    Commercial
                  </div>
                </div>

                <div className='flex items-start gap-6 relative z-10 flex-col'>
                  <div className='flex items-center gap-3'>
                    <div className='size-12 rounded-lg bg-gold/[0.1] border border-gold/[0.2] flex items-center justify-center'>
                      <FileText className='size-6 text-gold' />
                    </div>
                    <div>
                      <div className='font-semibold'>Property</div>
                      <div className='text-sm text-muted-foreground'>
                        123 Main St, Downtown
                      </div>
                    </div>
                  </div>

                  <div className='flex-1'>
                    <div className='flex items-center gap-8 mb-6'>
                      <div className='flex-shrink-0 flex items-center justify-center'>
                        <div className='trust-score-ring'>
                          <div className='trust-score-content'>
                            <span className='text-4xl font-bold'>85</span>
                            <span className='text-xs text-muted-foreground'>
                              RISK SCORE
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className='flex-1'>
                        <h3 className='font-semibold mb-2'>AI Analysis</h3>
                        <p className='text-sm text-muted-foreground mb-4'>
                          This property shows excellent legal compliance and low
                          financial risk across multiple assessment criteria.
                          The title history, zoning compliance, and market
                          indicators all suggest a secure investment
                          opportunity.
                        </p>

                        <div className='grid grid-cols-2 gap-4'>
                          <div className='bg-secondary rounded-lg p-3'>
                            <p className='text-xs text-muted-foreground'>
                              Legal Compliance
                            </p>
                            <span className='font-bold'>
                              92
                              <span className='text-muted-foreground'>
                                /100
                              </span>
                            </span>
                          </div>
                          <div className='bg-secondary rounded-lg p-3'>
                            <p className='text-xs text-muted-foreground'>
                              Financial Risk
                            </p>
                            <span className='font-bold'>
                              8
                              <span className='text-muted-foreground'>
                                /100
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className='container py-24'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-semibold mb-4 tracking-tight'>
              Comprehensive Real Estate Intelligence
            </h2>
            <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
              From risk assessment to legal compliance, Vether provides the
              insights you need for every property decision.
            </p>
          </div>
        </div>
      </section>

      <section className='container py-24 bg-card/30'>
        <div className='max-w-4xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>
              How Vether Works
            </h2>
            <p className='text-xl text-muted-foreground'>
              Get comprehensive property analysis in three simple steps
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[
              {
                step: '01',
                title: 'Input Property Details',
                description:
                  'Share property address, documents, or ask specific questions about real estate risks and legal requirements.',
              },
              {
                step: '02',
                title: 'AI Analysis',
                description:
                  'Our AI analyzes multiple data sources including legal records, market data, and compliance databases in real-time.',
              },
              {
                step: '03',
                title: 'Get Insights',
                description:
                  'Receive detailed risk assessments, legal summaries, and actionable recommendations with expert consultation options.',
              },
            ].map((item, index) => (
              <div key={index} className='text-center'>
                <div className='w-16 h-16 rounded-full bg-[hsl(var(--gold))/0.1] border-2 border-[hsl(var(--gold))/0.3] flex items-center justify-center mx-auto mb-6'>
                  <span className='text-xl font-bold text-[hsl(var(--gold))]'>
                    {item.step}
                  </span>
                </div>
                <h3 className='text-xl font-semibold mb-3'>{item.title}</h3>
                <p className='text-muted-foreground leading-relaxed'>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='container py-24'>
        <div className='max-w-4xl mx-auto text-center'>
          <Card className='p-12 bg-gradient-to-br from-card via-card/80 to-gold/[0.08] border-gold/[0.2] relative overflow-hidden'>
            <div className='relative z-10'>
              <div className='flex items-center justify-center mb-6'>
                <Bot className='size-10 text-gold' />
              </div>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                Ready to Secure Your Real Estate Experience?
              </h2>
              <p className='text-xl text-muted-foreground mb-8 max-w-2xl mx-auto'>
                Connect your property now to get your risk score and start
                protecting yourself from legal and financial complications.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <Link href='/chat'>
                  <ButtonGold
                    size='lg'
                    className='flex items-center gap-2 px-8'
                  >
                    Analyse Property
                    <ArrowRight className='size-4' />
                  </ButtonGold>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
