import Pagination from '@/app/components/Pagination'
import {prisma} from '@/prisma/client'
import {statusOptions, type Issue} from '../../api/issues/schema'
import IssueActions from '../_components/IssueActions'
import type {IssueQuery} from '../types'
import IssuesPageCore from './pageIssuesPageCore'
import {Flex} from '@radix-ui/themes'

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
  const statuses = Object.values(statusOptions)
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

  const currentPage = parseInt(searchParams.page) || 1
  const pageSize = 10
  const where = {status}

  // @ts-expect-error zod to prisma
  const issues: Issue[] = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  })

  // need the total number of issues for pagination component
  const issueCount = await prisma.issue.count({where})

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssuesPageCore issues={issues} searchParams={searchParams} />
      <Pagination
        pageSize={pageSize}
        currentPage={currentPage}
        itemCount={issueCount}
      />
    </Flex>
  )
}
