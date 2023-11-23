'use client'
import classnames from 'classnames'
import Link from 'next/link'
import {usePathname} from 'next/navigation'

export default function NavLinks() {
  // we want to highlight the active link, so we need usePathname
  const currentPath = usePathname()

  const links = [
    {label: 'Dashboard', href: '/dashboard'},
    {label: 'Issues', href: '/issues/list'},
  ]

  return (
    <ul className="flex space-x-6" data-cy="nav-links-comp">
      {links.map(({label, href}) => (
        <li key={label} data-cy={`${label.toLocaleLowerCase()}-link`}>
          <Link
            href={href}
            className={classnames({
              'nav-link': true,
              'text-zinc-900': href === currentPath,
            })}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  )
}
