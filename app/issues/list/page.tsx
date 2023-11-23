import {prisma} from '@/prisma/client'
import IssuesPageCore from './pageIssuesPageCore'
import type {Issue} from '../../api/issues/schema'

// server cache workaround to see issues we added / updated:
// issues page is served from cache, that is why we do not see the new issue we add
// therefore we opt out of caching with the below
export const dynamic = 'force-dynamic'
// export const revalidate = 0 // same thing (output has to be revalidated every 0 seconds)

export default async function IssuesPage() {
  // @ts-expect-error zod to prisma
  const issues: Issue[] = await prisma.issue.findMany()

  return <IssuesPageCore issues={issues} />
}
