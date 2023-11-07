import {prisma} from '@/prisma/client'
import {notFound} from 'next/navigation'
import IssueDetailPageCore from './pageIssueDetailPageCore'
import type {Issue} from '@/app/api/issues/schema'

type IssueDetailPageProps = {
  readonly params: {id: string}
}

export default async function IssueDetailPage({params}: IssueDetailPageProps) {
  const issue = (await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  })) as Issue

  if (!issue) return notFound()
  return IssueDetailPageCore({issue})
}
