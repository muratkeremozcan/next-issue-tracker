import {prisma} from '@/prisma/client'
import {notFound} from 'next/navigation'
import IssueDetailPageCore from './pageIssueDetailPageCore'
import type {Issue} from '@/app/api/issues/schema'
// import {getServerSession} from 'next-auth'
// import authOptions from '@/app/auth/authOptions'

type IssueDetailPageProps = {
  readonly params: {id: string}
}

const findIssue = (id: string) =>
  prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  })

export default async function IssueDetailPage({params}: IssueDetailPageProps) {
  // securing the app (6.10)
  // for auth... but we can't get it work nicely with cy and next-auth, yet
  // when it does, pass this value to IssueDetailPageCore
  // and display Edit and Delete Box only if there's a session
  // Don't forget to add the middleware file in the readme
  // const session = await getServerSession(authOptions)

  const id = parseInt(params.id, 10)
  if (isNaN(id)) return notFound()

  const issue = (await findIssue(params.id)) as Issue

  if (!issue) return notFound()
  return <IssueDetailPageCore issue={issue} />
}

export async function generateMetadata({params}: IssueDetailPageProps) {
  const issue = (await findIssue(params.id)) as Issue

  return {
    title: `Issue Details - ${issue.title}`,
    description: `Details of issue ${issue.id}`,
  }
}
