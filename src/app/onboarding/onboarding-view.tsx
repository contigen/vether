'use client'

import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  createRef,
  useRef,
} from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button, ButtonWithSpinner } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  CheckCircle,
  Shield,
  FileText,
  Building,
  Upload,
  Bot,
  ExternalLink,
} from 'lucide-react'
import { toast } from 'sonner'
import { useActionState } from 'react'
import {
  addAgentTraining,
  AgentTrainingActionState,
  loginUser,
} from '@/actions'
import { RegisterActionState } from '@/actions'
import { useSession } from 'next-auth/react'

type UserRole = 'buyer' | 'agent'

export function OnboardingView({ isLoggedIn }: { isLoggedIn: boolean }) {
  const router = useRouter()
  const { data: session } = useSession()
  const role = session?.user?.role
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(
    role?.toLowerCase() as UserRole | null
  )
  const [agentTraining, setAgentTraining] = useState({
    files: [] as File[],
  })
  const [verificationStatus, setVerificationStatus] = useState({
    identity: false,
    address: false,
    funds: false,
  })
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const stepRefs = useMemo(
    () => [
      createRef<HTMLDivElement>(),
      createRef<HTMLDivElement>(),
      createRef<HTMLDivElement>(),
      createRef<HTMLDivElement>(),
    ],
    []
  )

  const roles = [
    {
      id: 'buyer' as UserRole,
      title: 'Property Buyer',
      description: 'Looking to purchase residential or commercial property',
      features: ['Property search', 'Risk analysis', 'Contract review'],
      disabled: true,
      connectLink: true,
    },
    {
      id: 'agent' as UserRole,
      title: 'Real Estate Agent',
      description: 'Professional real estate agent or broker',
      features: [
        'Client management',
        'Multi-property analysis',
        'Advanced tools',
      ],
      disabled: false,
      connectLink: false,
    },
  ]

  const scrollToStep = useCallback(
    (stepIndex: number) => {
      stepRefs[stepIndex]?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    },
    [stepRefs]
  )

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role)
    setCurrentStep(1)
    scrollToStep(1)
  }

  const handleProfileSubmit = () => {
    setCurrentStep(2)
    scrollToStep(2)
  }

  const handleAgentTrainingSubmit = () => {
    setCurrentStep(3)
    scrollToStep(3)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setAgentTraining(prev => ({ ...prev, files: [...prev.files, ...files] }))
  }

  const simulateVerification = (type: keyof typeof verificationStatus) => {
    setTimeout(() => {
      setVerificationStatus(prev => ({ ...prev, [type]: true }))
    }, 2000)
  }

  const handleComplete = () => {
    router.push('/agents')
  }

  const initialState: RegisterActionState = {
    message: '',
  }

  const initialAgentTrainingState: AgentTrainingActionState = {
    message: '',
  }

  const [state, formAction, pending] = useActionState(loginUser, initialState)
  const [agentTrainingState, agentTrainingAction, agentTrainingPending] =
    useActionState(addAgentTraining, initialAgentTrainingState)

  useEffect(() => {
    if (state.message === `invalid data`) {
      toast.warning(`Invalid form data`)
    } else if (state.message === `user created`) {
      router.refresh()
      toast.success(`Your are signed in`)
    } else if (state.message === `user logged in`) {
      router.refresh()
      toast.info(`You are logged in`)
    } else if (state.message === `failed to create replica user`) {
      toast.error(`Failed to create replica account`)
    } else if (state.message === `failed to create user`) {
      toast.error(`Failed to create account`)
    }
  }, [router, state])

  useEffect(() => {
    if (agentTrainingState.message === `file not found`) {
      toast.warning(`File not found`)
    } else if (agentTrainingState.message === `training added`) {
      router.refresh()
      toast.success(`Training added`)
    } else if (agentTrainingState.message === `failed to add training`) {
      toast.error(`Failed to add training`)
    }
  }, [router, agentTrainingState.message])

  useEffect(() => {
    if (isLoggedIn) {
      setCurrentStep(1)
      setCurrentStep(2)
      scrollToStep(2)
    }
  }, [isLoggedIn, scrollToStep])

  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-8 max-w-2xl'>
        <div className='text-center mb-12'>
          <h1 className='text-3xl font-semibold mb-2 tracking-tight'>
            Welcome to Vether
          </h1>
          <p className='text-muted-foreground'>
            Let&apos;s set up your account to get started
          </p>
        </div>

        <div className='space-y-8'>
          <div ref={stepRefs[0]} className='scroll-mt-8'>
            <Card className='bg-gradient-to-br from-background to-muted/20 border-border/40 backdrop-blur-sm'>
              <CardHeader>
                <CardTitle>Choose Your Role</CardTitle>
                <CardDescription>
                  Select how you want to use Vether
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                {roles.map(role => {
                  return (
                    <Card
                      key={role.id}
                      className={`transition-all duration-300 ${
                        role.disabled
                          ? 'opacity-60 cursor-not-allowed bg-muted/30'
                          : `cursor-pointer ${
                              selectedRole === role.id
                                ? 'ring-1 ring-gold bg-gradient-to-br from-gold/[0.15] to-gold/[0.08]'
                                : 'hover:bg-muted/50'
                            }`
                      }`}
                      onClick={() =>
                        !role.disabled && handleRoleSelect(role.id)
                      }
                    >
                      <CardContent className='p-6'>
                        <div className='flex items-start space-x-4'>
                          <div className='flex-1'>
                            <div className='flex items-center justify-between mb-2'>
                              <h3 className='font-semibold'>{role.title}</h3>
                              {role.disabled && role.connectLink && (
                                <Link href='/connect'>
                                  <Button
                                    variant='outline'
                                    size='sm'
                                    className='text-xs bg-transparent'
                                  >
                                    <ExternalLink className='size-3 mr-1' />
                                    Connect Wallet
                                  </Button>
                                </Link>
                              )}
                            </div>
                            <p className='text-sm text-muted-foreground mb-3'>
                              {role.description}
                            </p>
                            {role.disabled && (
                              <p className='text-xs text-muted-foreground mb-3 italic'>
                                Connect your wallet first to access buyer
                                features
                              </p>
                            )}
                            <div className='flex flex-wrap gap-2'>
                              {role.features.map(feature => (
                                <Badge
                                  key={feature}
                                  variant='secondary'
                                  className='text-xs'
                                >
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {currentStep >= 1 && (
            <div ref={stepRefs[1]} className='scroll-mt-8'>
              <Card className='bg-gradient-to-br from-background to-muted/20 border-border/40 backdrop-blur-sm'>
                <CardHeader>
                  <CardTitle>Profile Setup</CardTitle>
                  <CardDescription>
                    Basic information and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoggedIn ? (
                    <h3 className='flex items-center gap-2 font-semibold text-2xl tracking-tight'>
                      <CheckCircle className='size-5 text-green-500' />
                      Profile setup complete
                    </h3>
                  ) : (
                    <form action={formAction}>
                      <fieldset disabled={pending} className='space-y-4'>
                        <div className='space-y-2'>
                          <Label htmlFor='name'>Full Name</Label>
                          <Input
                            id='name'
                            name='name'
                            placeholder='Enter your full name'
                          />
                        </div>
                        <div className='space-y-2'>
                          <Label htmlFor='email'>Email Address</Label>
                          <Input
                            id='email'
                            type='email'
                            name='email'
                            placeholder='Enter your email address'
                          />
                        </div>
                        <div className='space-y-2'>
                          <Label htmlFor='location'>Location</Label>
                          <Input
                            id='location'
                            name='location'
                            placeholder='Enter your city/region'
                          />
                        </div>
                        <div className='space-y-2'>
                          <Label htmlFor='description'>
                            Describe Your Expertise
                          </Label>
                          <Textarea
                            id='description'
                            name='description'
                            placeholder="Tell us about your specialties, market areas, client types, and any specific knowledge you'd like the AI to learn from..."
                            className='min-h-[120px] resize-none'
                          />
                        </div>
                        <div className='flex justify-end'>
                          <ButtonWithSpinner
                            onClick={handleProfileSubmit}
                            pending={pending}
                            className='bg-gold hover:bg-gold/90 text-black'
                          >
                            Continue
                          </ButtonWithSpinner>
                        </div>
                      </fieldset>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {currentStep >= 2 && selectedRole === 'agent' && (
            <div ref={stepRefs[2]} className='scroll-mt-8'>
              <Card className='bg-gradient-to-br from-background to-muted/20 border-border/40 backdrop-blur-sm'>
                <CardHeader>
                  <CardTitle className='flex items-center space-x-2'>
                    <Bot className='size-5 text-gold' />
                    <span>Train Your AI Assistant</span>
                  </CardTitle>
                  <CardDescription>
                    Help us customize the AI to your specific needs and
                    expertise
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-6'>
                  <form action={agentTrainingAction}>
                    <fieldset
                      className='space-y-4'
                      disabled={agentTrainingPending}
                    >
                      <div className='space-y-2'>
                        <Label>Upload Training Materials</Label>
                        <div className='mt-2'>
                          <div className='border-2 border-dashed border-border/40 rounded-lg p-6 text-center hover:border-gold/40 transition-colors'>
                            <Upload className='size-8 mx-auto mb-2 text-muted-foreground' />
                            <p className='text-sm text-muted-foreground mb-2'>
                              Upload documents, contracts, or materials to train
                              your AI
                            </p>
                            <input
                              type='file'
                              name='file'
                              multiple
                              accept='.pdf,.doc,.docx,.txt'
                              onChange={handleFileUpload}
                              className='hidden'
                              ref={fileInputRef}
                            />
                            <Button
                              type='button'
                              variant='outline'
                              onClick={() => fileInputRef.current?.click()}
                              className='text-sm'
                            >
                              Choose Files
                            </Button>
                          </div>
                          {agentTraining.files.length > 0 && (
                            <div className='mt-4 space-y-2'>
                              {agentTraining.files.map((file, index) => (
                                <div
                                  key={index}
                                  className='flex items-center space-x-2 text-sm bg-muted/30 rounded p-2'
                                >
                                  <FileText className='size-4 text-gold' />
                                  <span>{file.name}</span>
                                  <Badge
                                    variant='secondary'
                                    className='text-xs'
                                  >
                                    {(file.size / 1024 / 1024).toFixed(1)} MB
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className='flex justify-end'>
                        <ButtonWithSpinner
                          onClick={handleAgentTrainingSubmit}
                          pending={agentTrainingPending}
                          className='bg-gold hover:bg-gold/90 text-black'
                        >
                          Complete Training
                        </ButtonWithSpinner>
                      </div>
                    </fieldset>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}

          {currentStep >= 3 && (
            <div ref={stepRefs[3]} className='scroll-mt-8'>
              <Card className='bg-gradient-to-br from-background to-muted/20 border-border/40 backdrop-blur-sm'>
                <CardHeader className='text-center'>
                  <Shield className='size-12 mx-auto mb-4 text-gold' />
                  <CardTitle>Identity Verification</CardTitle>
                  <CardDescription>
                    Secure your account with automated verification
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='grid gap-4 md:grid-cols-2'>
                    <Card className='bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20'>
                      <CardContent className='p-4 text-center'>
                        <FileText className='size-8 mx-auto mb-3 text-blue-400' />
                        <h4 className='font-medium mb-2'>Identity Document</h4>
                        <p className='text-xs text-muted-foreground mb-3'>
                          Government-issued ID
                        </p>
                        {verificationStatus.identity ? (
                          <Badge className='bg-emerald-500/20 text-emerald-400 border-emerald-500/30'>
                            <CheckCircle className='size-3 mr-1' />
                            Verified
                          </Badge>
                        ) : (
                          <Button
                            size='sm'
                            onClick={() => simulateVerification('identity')}
                            className='bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-500/30 w-full'
                          >
                            Verify
                          </Button>
                        )}
                      </CardContent>
                    </Card>

                    <Card className='bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20'>
                      <CardContent className='p-4 text-center'>
                        <Building className='size-8 mx-auto mb-3 text-emerald-400' />
                        <h4 className='font-medium mb-2'>
                          Address Verification
                        </h4>
                        <p className='text-xs text-muted-foreground mb-3'>
                          Proof of residence
                        </p>
                        {verificationStatus.address ? (
                          <Badge className='bg-emerald-500/20 text-emerald-400 border-emerald-500/30'>
                            <CheckCircle className='size-3 mr-1' />
                            Verified
                          </Badge>
                        ) : (
                          <Button
                            size='sm'
                            onClick={() => simulateVerification('address')}
                            className='bg-emerald-500/20 hover:emerald-500/30 text-emerald-400 border-emerald-500/30 w-full'
                          >
                            Verify
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  <div className='pt-4'>
                    <Button
                      onClick={handleComplete}
                      disabled={
                        !verificationStatus.identity ||
                        !verificationStatus.address
                      }
                      className='w-full bg-gold hover:bg-gold/90 text-black'
                      size='lg'
                    >
                      <CheckCircle className='size-4 mr-2' />
                      Complete Setup & Start Using Vether
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
