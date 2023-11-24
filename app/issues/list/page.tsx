import {prisma} from '@/prisma/client'
import IssuesPageCore from './pageIssuesPageCore'
import type {Issue} from '../../api/issues/schema'
import type {IssueQuery} from '../types'

// server cache workaround to see issues we added / updated:
// issues page is served from cache, that is why we do not see the new issue we add
// therefore we opt out of caching with the below
export const dynamic = 'force-dynamic'
// export const revalidate = 0 // same thing (output has to be revalidated every 0 seconds)

type IssuesPageProps = {
  readonly searchParams: IssueQuery
}

export default async function IssuesPage({searchParams}: IssuesPageProps) {
  // if an invalid issue is passed, we want prisma to return everything using undefined
  const statuses = Object.values(['OPEN', 'IN_PROGRESS', 'DONE'])
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined

  const validOrderDirections = ['asc', 'desc']
  const validColumnValues = ['title', 'status', 'createdAt']

  const orderDirection = validOrderDirections.includes(
    searchParams.orderDirection,
  )
    ? searchParams.orderDirection
    : undefined

  const orderBy = validColumnValues.includes(searchParams.orderBy)
    ? {[searchParams.orderBy]: orderDirection}
    : {}

  // @ts-expect-error zod to prisma
  const issues: Issue[] = await prisma.issue.findMany({
    where: {status},
    orderBy,
  })

  return <IssuesPageCore issues={issues} searchParams={searchParams} />
}
