import {prisma} from '@/prisma/client'
import LatestIssuesCore from './LatestIssuesCore'

export default async function LatestIssues() {
  // @ts-expect-error zod to prisma
  const issues: Issue[] = await prisma.issue.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
    include: {
      assignedToUser: true,
    },
  })

  return <LatestIssuesCore issues={issues} />
}
