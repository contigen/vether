'use client'

import { ButtonGold } from '@/components/ui/button-gold'
import { CardContent } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { connectWallet } from '@/lib/wallet'
import { BotMessageSquare } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { toast } from 'sonner'

export function ConnectWalletInterface() {
  const [address, setAddress] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [riskScore, setRiskScore] = useState(0)

  async function handleConnect() {
    setIsConnecting(true)
    const result = await connectWallet()
    setIsConnecting(false)
    if (result) {
      const { address } = result
      setAddress(address)
      setRiskScore(1)
      await signIn('credentials', { walletAddress: address })
      toast.success('Wallet Connected', {
        description: 'Successfully connected Wallet',
      })
    } else {
      toast.error('Failed to connect wallet')
    }
  }

  return (
    <CardContent>
      {!address ? (
        <div className='flex flex-col items-center py-8'>
          <section className='flex items-center justify-center mb-6'>
            <span className='font-pixel font-semibold text-7xl md:text-8xl lg:text-9xl'>
              0x
            </span>
            <BotMessageSquare className='size-14 text-muted-foreground self-end' />
          </section>
          <ButtonGold
            size='lg'
            className='w-full'
            onClick={handleConnect}
            disabled={isConnecting}
          >
            {isConnecting ? (
              <>
                <Spinner />
                Connecting...
              </>
            ) : (
              'Connect Account'
            )}
          </ButtonGold>
        </div>
      ) : (
        <div className='space-y-6'>
          <div className='p-4 rounded-lg bg-secondary'>
            <div className='mb-1 text-sm text-muted-foreground'>
              Connected Wallet
            </div>
            <div className='font-mono text-sm break-all'>
              <span className='text-6xl font-bold font-pixel text-gold'>
                0x
              </span>
              {address.slice(2)}
            </div>
          </div>

          {riskScore ? (
            <div className='flex flex-col items-center'>
              <div className='mb-4 trust-score-ring'>
                <div className='trust-score-content'>
                  <span className='text-4xl font-bold'>{riskScore}</span>
                  <span className='text-xs text-muted-foreground'>
                    RISK SCORE
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <p className='py-4 text-muted-foreground text-center text-sm'>
              No Risk Score found for this wallet
            </p>
          )}
        </div>
      )}
    </CardContent>
  )
}
