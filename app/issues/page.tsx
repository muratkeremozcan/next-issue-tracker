import {prisma} from '@/prisma/client'
import IssuesPageCore from './pageIssuesPageCore'
import type {Issue} from '../api/issues/schema'

export default async function IssuesPage() {
  // @ts-expect-error zod to prisma
  const issues: Issue[] = await prisma.issue.findMany()

  return <IssuesPageCore issues={issues} />
}
