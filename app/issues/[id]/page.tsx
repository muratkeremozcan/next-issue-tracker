import {prisma} from '@/prisma/client'
import {notFound} from 'next/navigation'
import IssueDetailPageCore from './pageIssueDetailPageCore'
import type {Issue} from '@/app/api/issues/schema'
// import {getServerSession} from 'next-auth'
// import authOptions from '@/app/auth/authOptions'

type IssueDetailPageProps = {
  readonly params: {id: string}
}

export default async function IssueDetailPage({params}: IssueDetailPageProps) {
  // securing the app (6.10)
  // for auth... but we can't get it work nicely with cy and next-auth, yet
  // when it does, pass this value to IssueDetailPageCore
  // and display Edit and Delete Box only if there's a session
  // Don't forget to add the middleware file in the readme
  // const session = await getServerSession(authOptions)

  const issue = (await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  })) as Issue

  if (!issue) return notFound()
  return IssueDetailPageCore({issue})
}
