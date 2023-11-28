import type {Issue} from '@/app/api/issues/schema'
import {IssueStatusBadge, Link} from '@/app/components'
import {Table} from '@radix-ui/themes'
import NextLink from 'next/link'
import IssueActions from '../_components/IssueActions'
import type {IssueQuery} from '../types'
import {ArrowDownIcon, ArrowUpIcon} from '@radix-ui/react-icons'
import Pagination from '@/app/components/Pagination'

type IssuesPageCoreProps = {
  readonly issues: Issue[]
  readonly searchParams?: IssueQuery
  readonly pageSize: number
  readonly currentPage: number
  readonly issueCount: number
}

export default function IssuesPageCore({
  issues,
  searchParams,
  pageSize,
  currentPage,
  issueCount,
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
      searchParams &&
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
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  data-cy={`column-header-${column.value}`}
                  href={{
                    query: handleColumnClick(column.value),
                  }}
                >
                  {column.label}
                </NextLink>
                {searchParams &&
                  column.value === searchParams.orderBy &&
                  (searchParams.orderDirection === 'asc' ? (
                    <ArrowUpIcon data-cy="sort-asc" className="inline" />
                  ) : (
                    <ArrowDownIcon data-cy="sort-desc" className="inline" />
                  ))}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(({id, title, status, createdAt}) => (
            <Table.Row key={id} data-cy={`issue-row-${title}`}>
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
      <Pagination
        pageSize={pageSize}
        currentPage={currentPage}
        itemCount={issueCount}
      />
    </div>
  )
}
