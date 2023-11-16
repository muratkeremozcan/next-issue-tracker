'use client'
import Link from 'next/link'
import {useSession} from 'next-auth/react'
import {AiFillBug} from 'react-icons/ai'
import {usePathname} from 'next/navigation'
import classnames from 'classnames'
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from '@radix-ui/themes'

export default function NavBar() {
  const {status, data: session} = useSession()
  // we want to highlight the active link, so we need usePathname
  const currentPath = usePathname()

  const links = [
    {label: 'Dashboard', href: '/dashboard'},
    {label: 'Issues', href: '/issues'},
  ]
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>

            <ul className="flex space-x-6">
              {links.map(({label, href}) => (
                <li key={label}>
                  <Link
                    href={href}
                    className={classnames({
                      'text-zinc-900': href === currentPath,
                      'text-zinc-500': href !== currentPath,
                      'hover:text-zinc-800 transition-colors': true, // always there
                    })}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === 'authenticated' && (
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
                  ></Avatar>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <Text size="2">
                    <DropdownMenu.Label>
                      {session.user ? session.user.email : '?'}
                    </DropdownMenu.Label>
                  </Text>
                  <DropdownMenu.Item>
                    <Link data-cy="logout" href="/api/auth/signout">
                      Log out
                    </Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === 'unauthenticated' && (
              <Link data-cy="login" href="/api/auth/signin">
                Login
              </Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  )
}
