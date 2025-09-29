import NextAuth, { type DefaultSession } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { NextResponse } from 'next/server'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { JWT } from 'next-auth/jwt'
declare module 'next-auth/jwt' {
  interface JWT {
    id?: string
    walletAddress?: string
    role?: string
    replicaUuid?: string
    knowledgeBaseID?: number
  }
}

declare module 'next-auth' {
  interface Session {
    user: {
      walletAddress?: string
      role?: 'BUYER' | 'AGENT'
      replicaUuid?: string
      knowledgeBaseID?: number
    } & DefaultSession['user']
  }
}

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        walletAddress: {},
      },
      async authorize(credentials) {
        const { walletAddress } = credentials || {}
        if (!walletAddress) return null
        return {
          id: crypto.randomUUID(),
          walletAddress: walletAddress as string,
          role: 'BUYER',
        }
      },
    }),
    Credentials({
      id: 'agent',
      credentials: {
        id: {},
        email: {},
        name: {},
        replicaUuid: {},
      },
      async authorize(credentials) {
        const { id, email, name, replicaUuid } = credentials
        return {
          id: id as string,
          name: name as string,
          email: email as string,
          role: 'AGENT',
          replicaUuid: replicaUuid as string,
        }
      },
    }),
  ],

  callbacks: {
    async authorized({ request: req, auth }) {
      const PUBLIC_ROUTES = [`/`, `/connect`, `/onboarding`]
      const { pathname } = req.nextUrl
      const isLoggedIn = !!auth?.user
      const isBuyer = auth?.user?.role === 'BUYER'
      const isAgent = auth?.user?.role === 'AGENT'
      const hasKnowledgeBaseID = !!auth?.user?.knowledgeBaseID
      const isAPublicRoute = PUBLIC_ROUTES.some(route => route === pathname)
      if (isBuyer && isAPublicRoute) {
        return NextResponse.redirect(new URL(`/agents`, req.url))
      }
      // if (isAgent && isAPublicRoute && !hasKnowledgeBaseID) {
      //   return NextResponse.redirect(new URL(`/onboarding`, req.url))
      // }

      if (isAPublicRoute) {
        return true
      }
      return isLoggedIn
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token = { ...token, ...user }
      }
      if (trigger === 'update' && session?.user) {
        token.knowledgeBaseID = session.user.knowledgeBaseID
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          walletAddress: token.walletAddress,
          role: token.role,
          replicaUuid: token.replicaUuid,
          knowledgeBaseID: token.knowledgeBaseID,
        },
      }
    },
  },
  pages: {
    signIn: `/onboarding`,
    newUser: `/agents`,
    signOut: `/`,
    error: `/onboarding`,
  },
})
