import { redirect } from 'next/navigation'
import { Chat } from '../chat'
import { getCachedAgents, getUserSession } from '@/actions'

export default async function Page(props: PageProps<'/chat/[id]'>) {
  await getUserSession()
  const { id } = await props.params
  const agents = await getCachedAgents()
  if (!id || !agents?.find(agent => agent.replicaUuid === id)) {
    redirect('/agents?message=invalid_id')
  }
  return <Chat id={id} />
}
