import type {Issue} from '@/app/api/issues/schema'
import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import {Card, Flex, Heading, Text} from '@radix-ui/themes'
import ReactMarkdown from 'react-markdown'

type IssueDetailPageCoreProps = {
  readonly issue: Issue
}

export default function IssueDetailPageCore({issue}: IssueDetailPageCoreProps) {
  return (
    <div data-cy="issue-detail-page-core-comp">
      <Heading>{issue.title}</Heading>
      <Flex className="gap-3" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt?.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  )
}
