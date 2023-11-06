import {Table} from '@radix-ui/themes'
import type {Issue} from '@/app/api/issues/schema'
import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import IssueActions from './IssueActions'

type IssuesPageCoreProps = {
  issues: Issue[]
}

export default function IssuesPageCore({issues}: IssuesPageCoreProps) {
  return (
    <div data-cy="issues-page-core-comp">
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(({id, title, status, createdAt}) => (
            <Table.Row key={id}>
              <Table.Cell data-cy="issue-title">
                {title}
                <div className="block md:hidden">
                  <IssueStatusBadge status={status} />
                </div>
              </Table.Cell>
              <Table.Cell
                data-cy="issue-status"
                className="hidden md:table-cell"
              >
                <IssueStatusBadge status={status} />
              </Table.Cell>
              <Table.Cell
                data-cy="issue-createdAt"
                className="hidden md:table-cell"
              >
                {createdAt?.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}
