import { auth } from '@/auth'
import { OnboardingView } from './onboarding-view'

export default async function OnboardingPage() {
  const session = await auth()
  const isLoggedIn = !!session?.user
  return (
    <OnboardingView
      key={isLoggedIn ? 'logged-in' : 'logged-out'}
      isLoggedIn={isLoggedIn}
    />
  )
}
