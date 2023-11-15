'use client'
import {SessionProvider} from 'next-auth/react'

export default function AuthProvider({
  children,
}: {
  readonly children: React.ReactNode
}) {
  return <SessionProvider>{children}</SessionProvider>
}
