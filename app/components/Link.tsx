import NextLink from 'next/link'
import {Link as RadixLink} from '@radix-ui/themes'

type LinkProps = {
  readonly href: string
  readonly children: string
}

/** Custom Link component that has the utility of next link and styles of radix ui link */
export default function Link({href, children}: LinkProps) {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  )
}
