import {prisma} from '@/prisma/client'
import IssueForm from '../../_components/IssueForm'
import {notFound} from 'next/navigation'

type EditIssuePageProps = {
  params: {id: string}
}

export default async function EditIssuePage({params}: EditIssuePageProps) {
  // @ts-expect-error zod to prisma
  const issue: Issue = prisma.issue.findUnique({
    where: {id: parseInt(params.id)},
  })

  if (!issue) notFound()

  return <IssueForm issue={issue} />
}
