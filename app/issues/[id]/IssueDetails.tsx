import ReactMarkdown from 'react-markdown'
import {IssueStatusBadge} from '@/app/components'
import {Card, Flex, Heading, Text} from '@radix-ui/themes'
import type {Issue} from '@/app/api/issues/schema'

type IssueDetailsProps = {
  readonly issue: Issue
}

export default function IssueDetails({issue}: IssueDetailsProps) {
  return (
    <>
      <Heading data-cy="issue-details-comp">{issue.title}</Heading>
      <Flex className="gap-3" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt?.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  )
}
