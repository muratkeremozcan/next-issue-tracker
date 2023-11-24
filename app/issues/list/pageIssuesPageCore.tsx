import type {Issue} from '@/app/api/issues/schema'
import {IssueStatusBadge, Link} from '@/app/components'
import {Table} from '@radix-ui/themes'
import NextLink from 'next/link'
import IssueActions from '../_components/IssueActions'
import type {IssueQuery} from '../types'
import {ArrowDownIcon, ArrowUpIcon} from '@radix-ui/react-icons'

type IssuesPageCoreProps = {
  readonly issues: Issue[]
  readonly searchParams: IssueQuery
}

export default function IssuesPageCore({
  issues,
  searchParams,
}: IssuesPageCoreProps) {
  const columns: {label: string; value: keyof Issue; className?: string}[] = [
    {label: 'Issue', value: 'title'},
    {label: 'Status', value: 'status', className: 'hidden md:table-cell'},
    {label: 'Created', value: 'createdAt', className: 'hidden md:table-cell'},
  ]

  const handleColumnClick = (columnValue: keyof Issue) => ({
    ...searchParams,
    orderBy: columnValue,
    orderDirection:
      searchParams.orderBy === columnValue &&
      searchParams.orderDirection === 'asc'
        ? 'desc'
        : 'asc',
  })

  return (
    <div data-cy="issues-page-core-comp">
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map(column => (
              <Table.ColumnHeaderCell key={column.value}>
                <NextLink
                  href={{
                    query: handleColumnClick(column.value),
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy &&
                  (searchParams.orderDirection === 'asc' ? (
                    <ArrowUpIcon className="inline" />
                  ) : (
                    <ArrowDownIcon className="inline" />
                  ))}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(({id, title, status, createdAt}) => (
            <Table.Row key={id}>
              <Table.Cell data-cy="issue-title">
                <Link data-cy={`issue-id-${id}`} href={`/issues/${id}`}>
                  {title}
                </Link>
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
