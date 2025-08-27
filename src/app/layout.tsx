import type React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import { Pixelify_Sans } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'

const pixelify = Pixelify_Sans({
  subsets: ['latin'],
  variable: '--font-pixelify',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Vether | Real Estate Risk & Legal AI Agent',
  description:
    'AI-powered real estate risk assessment and legal analysis for property transactions, compliance, and due diligence',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`min-h-screen bg-background font-sans antialiased ${pixelify.variable}`}
      >
        {children}
        <Toaster duration={3000} closeButton />
      </body>
    </html>
  )
}
