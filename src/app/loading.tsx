import { BotMessageSquare } from 'lucide-react'

export default function Loading() {
  return (
    <div className='h-dvh grid place-items-center'>
      <div className='relative'>
        <div className='flex items-center justify-center size-16 rounded-full bg-primary/20 animate-pulse-slow'>
          <BotMessageSquare className='size-8 text-gold' />
        </div>
        <div className='absolute inset-0 size-16 border-2 rounded-full border-gold/30 animate-spin border-t-gold' />
      </div>
    </div>
  )
}
