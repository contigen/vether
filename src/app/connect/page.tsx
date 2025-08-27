import Link from 'next/link'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import { ConnectWalletInterface } from '@/components/connnect-wallet-interface'
import { Logo } from '@/components/ui/logo'

export default function Page() {
  return (
    <div className='min-h-screen flex flex-col bg-slate-950 relative overflow-hidden'>
      <header className='container flex items-center py-6 relative z-10'>
        <Logo />
      </header>

      <main className='flex-1 container py-12 max-w-md mx-auto relative z-10'>
        <Link
          href='/'
          className='inline-flex items-center text-sm text-slate-400 hover:text-white mb-8 transition-colors'
        >
          <ArrowLeft className='mr-2 h-4 w-4' />
          Back to home
        </Link>

        <Card className='bg-slate-900/50 backdrop-blur-xl border-slate-800/50 shadow-2xl relative overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-br from-gold/8 via-transparent to-emerald-500/8 pointer-events-none'></div>

          <div className='relative z-10'>
            <CardHeader>
              <CardTitle className='text-2xl text-white'>
                Connect Your Account
              </CardTitle>
              <CardDescription className='text-slate-400'>
                Connect your account to access AI-powered property risk analysis
                and legal compliance tools
              </CardDescription>
            </CardHeader>
            <ConnectWalletInterface />
            <CardFooter className='flex justify-center border-t border-slate-800/50 pt-6'>
              <p className='text-xs text-center text-slate-500'>
                Vether protects your data with enterprise-grade security and
                only analyzes publicly available property records
              </p>
            </CardFooter>
          </div>
        </Card>
      </main>
    </div>
  )
}
