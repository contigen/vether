'use client'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, MessageCircle, MapPin, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import type { Agent } from '@/lib/db-queries'

export function AgentsView({ agents }: { agents: Agent }) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredAgents = agents?.filter(agent => {
    return (
      searchQuery === '' ||
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500'
      case 'busy':
        return 'bg-yellow-500'
      case 'offline':
        return 'bg-gray-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Available'
      case 'busy':
        return 'Busy'
      case 'offline':
        return 'Offline'
      default:
        return 'Unknown'
    }
  }

  return (
    <div className='max-w-4xl mx-auto space-y-8 p-6'>
      <div className='text-center space-y-2'>
        <h1 className='text-2xl font-medium tracking-tight text-foreground'>
          Available Experts
        </h1>
        <p className='text-sm text-muted-foreground'>
          Connect with specialized real estate professionals
        </p>
      </div>

      <div className='relative max-w-md mx-auto'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground' />
        <Input
          placeholder='Search experts...'
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className='pl-10 border-border/20 bg-background/50 backdrop-blur-sm'
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {filteredAgents?.map(agent => {
          const avatar = agent.name
            .split(' ')
            .map(name => name[0])
            .join('')

          return (
            <Card
              key={agent.id}
              className='group relative overflow-hidden border-border/10 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm hover:border-gold/20 transition-all duration-300'
            >
              <CardContent className='p-6'>
                <div className='flex items-start gap-4 mb-4'>
                  <div className='relative'>
                    <div className='size-12 rounded-full bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/10 flex items-center justify-center text-sm font-medium text-gold'>
                      {avatar}
                    </div>
                    <div
                      className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(
                        'available'
                      )}`}
                    />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2 mb-1'>
                      <h3 className='font-medium text-foreground truncate'>
                        {agent.name}
                      </h3>
                      <CheckCircle className='size-3 text-blue-400 flex-shrink-0' />
                    </div>
                    <div className='flex items-center gap-1 mb-2'>
                      <MapPin className='size-3 text-muted-foreground' />
                      <p className='text-sm text-muted-foreground'>
                        {agent.location}
                      </p>
                    </div>
                    <p className='text-xs text-muted-foreground/80 leading-relaxed line-clamp-2'>
                      {agent.description}
                    </p>
                  </div>
                </div>

                <div className='flex items-center justify-between mb-4'>
                  <Badge
                    variant='secondary'
                    className={`text-xs px-2 py-1 ${
                      'available' === 'available'
                        ? 'bg-green-500/10 text-green-400 border-green-500/20'
                        : 'busy' === 'busy'
                        ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                        : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
                    }`}
                  >
                    {getStatusText('available')}
                  </Badge>
                </div>

                <Link href={`/chat/${agent.replicaUuid}`}>
                  <Button className='w-full bg-gradient-to-r from-gold to-gold/90 hover:from-gold/90 hover:to-gold/80 text-black border-0 shadow-none'>
                    <MessageCircle className='size-4 mr-2' />
                    Start Conversation
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredAgents?.length === 0 && (
        <div className='text-center py-12'>
          <p className='text-muted-foreground'>No experts match your search</p>
        </div>
      )}
    </div>
  )
}
