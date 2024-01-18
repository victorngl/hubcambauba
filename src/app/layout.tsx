import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { UserProvider } from '../contexts/useCurrentUser'

import ResponsibleLayout from '../components/Responsible/components/layout/ResponsibleLayout'

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
        <UserProvider>
          <ResponsibleLayout>
            {children}
          </ResponsibleLayout>
        </UserProvider>
      </body>
    </html>
  )
}

