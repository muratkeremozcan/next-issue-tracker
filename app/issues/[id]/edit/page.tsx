import {prisma} from '@/prisma/client'
import {notFound} from 'next/navigation'
import IssueFormSkeleton from './loading'
import dynamic from 'next/dynamic'
import type {Issue} from '@/app/api/issues/schema'
const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
})

type EditIssuePageProps = {
  readonly params: {id: string}
}

export default async function EditIssuePage({params}: EditIssuePageProps) {
  // @ts-expect-error zod to prisma
  const issue: Issue = await prisma.issue.findUnique({
    where: {id: parseInt(params.id)},
  })

  if (!issue) notFound()

  return <IssueForm issue={issue} />
}
