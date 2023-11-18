/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client'
import {Avatar, Box, DropdownMenu, Text} from '@radix-ui/themes'
import {useSession} from 'next-auth/react'
import Link from 'next/link'

export default function AuthStatus() {
  const {status, data: session} = useSession()

  if (status === 'loading') return null

  if (status === 'unauthenticated') {
    return (
      <Link data-cy="login" href="/api/auth/signin" className="nav-link">
        Login
      </Link>
    )
  }

  return (
    <Box data-cy="auth-status-comp">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            // @ts-expect-error yes
            src={session.user ? session.user.image : '?'}
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer"
            data-cy="avatar"
            referrer="no-referrer"
          ></Avatar>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <Text size="2">
            <DropdownMenu.Label>
              {session!.user ? session!.user.email : '?'}
            </DropdownMenu.Label>
          </Text>
          <DropdownMenu.Item>
            <Link data-cy="logout" href="/api/auth/signout">
              Log out
            </Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  )
}
