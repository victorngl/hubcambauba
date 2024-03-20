import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { UserProvider } from '../contexts/useCurrentUser'
import { Suspense } from 'react'

import ResponsibleLayout from '../components/Responsible/components/layout/ResponsibleLayout'
import Loading from '@/components/ui/utils/loading'
import AppLayout from '@/components/ui/utils/layout/app-layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hub Cambaúba',
  description: '',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          <UserProvider>
            <AppLayout>
              {children}
            </AppLayout>
          </UserProvider>
        </Suspense>
      </body>
    </html>
  )
}

