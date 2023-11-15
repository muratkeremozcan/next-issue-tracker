'use client'
import Link from 'next/link'
import {useSession} from 'next-auth/react'
import {AiFillBug} from 'react-icons/ai'
import {usePathname} from 'next/navigation'
import classnames from 'classnames'
import {Box} from '@radix-ui/themes'

export default function NavBar() {
  const {status, data: session} = useSession()
  // we want to highlight the active link, so we need usePathname
  const currentPath = usePathname()

  const links = [
    {label: 'Dashboard', href: '/dashboard'},
    {label: 'Issues', href: '/issues'},
  ]
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
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
      <Box>
        {status === 'authenticated' && (
          <Link data-cy="logout" href="/api/auth/signout">
            Log out
          </Link>
        )}
        {status === 'unauthenticated' && (
          <Link data-cy="login" href="/api/auth/signin">
            Login
          </Link>
        )}
      </Box>
    </nav>
  )
}
