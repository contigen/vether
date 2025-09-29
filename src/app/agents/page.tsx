import { AgentsView } from './agents-view'
import { getCachedAgents, getUserSession } from '@/actions'

export default async function AgentsPage() {
  await getUserSession()
  const agents = await getCachedAgents()
  return <AgentsView agents={agents} />
}
