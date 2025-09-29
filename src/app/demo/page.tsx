'use client'

import { Button } from '@/components/ui/button'
import {
  createUserFromSensay,
  listKnowledgeBases,
  getReplicas,
  getUsersFromSensay,
} from '@/actions'

export default function DemoPage() {
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-semibold'>Demo Page</h1>

      <div className='my-4 flex gap-2 flex-col w-fit'>
        <Button onClick={() => getReplicas()}>Add Agent Training</Button>
        <Button onClick={() => getUsersFromSensay()}>
          Get Users from Sensay
        </Button>
        <Button onClick={() => createUserFromSensay()}>
          Create User from Sensay
        </Button>
        <Button onClick={() => listKnowledgeBases()}>
          List all knowledge bases
        </Button>
      </div>
    </div>
  )
}
