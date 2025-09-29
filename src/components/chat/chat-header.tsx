import { ArrowLeft, Bot } from 'lucide-react'
import Link from 'next/link'
import { UserRole } from '@/types'

export function ChatHeader({ userRole }: { userRole?: UserRole | null }) {
  return (
    <header className='border-b border-border/40 backdrop-blur-sm'>
      <div className='container flex items-center justify-between py-4'>
        <div className='flex items-center gap-4'>
          <Link
            href='/'
            className='flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors'
          >
            <ArrowLeft className='size-4' />
            <span className='text-sm'>Back to Agents</span>
          </Link>
          <div className='flex items-center gap-2'>
            <div className='size-8 rounded-lg bg-gold/10 flex items-center justify-center'>
              <Bot className='size-5 text-gold' />
            </div>
            <div>
              <span className='text-xl font-bold'>vether</span>
              <div className='text-xs text-muted-foreground'>
                Real Estate Risk & Legal AI
                {userRole && (
                  <span className='ml-2 text-gold'>
                    • {userRole.displayName}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
