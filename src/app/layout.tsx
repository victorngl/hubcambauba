import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { UserProvider } from '../contexts/useCurrentUser'
import { Suspense } from 'react'

import ResponsibleLayout from '../components/Responsible/components/layout/ResponsibleLayout'
import { Loading } from '@/components/utils/Loading'

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
            <ResponsibleLayout>
              {children}
            </ResponsibleLayout>
          </UserProvider>
        </Suspense>
      </body>
    </html>
  )
}

