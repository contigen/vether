import { Bot } from 'lucide-react'
import Link from 'next/link'

export function Logo() {
  return (
    <div className='flex items-center gap-2'>
      <Bot className='size-5 text-gold' />
      <Link href='/' className='text-xl font-bold'>
        vether
      </Link>
    </div>
  )
}
