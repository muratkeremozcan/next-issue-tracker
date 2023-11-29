import {Avatar, Card, Flex, Heading, Link, Table} from '@radix-ui/themes'
import type {Issue} from '@/app/api/issues/schema'
import {IssueStatusBadge} from './components'

type LatestIssuesCoreProps = {
  readonly issues: Issue[]
}

export default function LatestIssuesCore({issues}: LatestIssuesCoreProps) {
  return (
    <Card>
      <Heading size="4" mb="5">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map(({id, title, status, assignedToUser}) => (
            <Table.Row key={id} data-cy={`issue-row-${id}`}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/issues/${id}`}>{title}</Link>
                    <IssueStatusBadge status={status} />
                  </Flex>
                  {assignedToUser && (
                    <Avatar
                      src={assignedToUser.image!}
                      fallback="?"
                      size="2"
                      radius="full"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  )
}
