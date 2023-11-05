import {Button, Table} from '@radix-ui/themes'
import Link from 'next/link'
import type {Issue} from '../api/issues/schema'

type IssuesPageCoreProps = {
  issues: Issue[]
}

export default function IssuesPageCore({issues}: IssuesPageCoreProps) {
  return (
    <div data-cy="issues-page-core-comp">
      <div className="mb-5">
        <Button>
          <Link data-cy="new-issue" href="/issues/new">
            New Issue
          </Link>
        </Button>
      </div>
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
                <div className="block md:hidden">{status}</div>
              </Table.Cell>
              <Table.Cell
                data-cy="issue-status"
                className="hidden md:table-cell"
              >
                {status}
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
