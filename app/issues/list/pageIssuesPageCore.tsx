'use client'
import type {Issue} from '@/app/api/issues/schema'
import {IssueStatusBadge, Link} from '@/app/components'
import {ArrowDownIcon, ArrowUpIcon} from '@radix-ui/react-icons'
import {Flex, Table} from '@radix-ui/themes'
import NextLink from 'next/link'
import type {IssueQuery} from '../types'
import {useState} from 'react'
import SearchInput from '../_components/SearchInput'

type IssuesPageCoreProps = {
  readonly issues: Issue[]
  readonly searchParams?: IssueQuery
}

export default function IssuesPageCore({
  issues,
  searchParams,
}: IssuesPageCoreProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredIssues = issues.filter(issue => {
    const issueIdStr = issue.id != null ? issue.id.toString() : ''
    const searchTermStr = searchTerm.toString()

    return (
      issueIdStr.includes(searchTermStr) ||
      issue.title.toLowerCase().includes(searchTermStr) ||
      issue.description.toLowerCase().includes(searchTermStr)
    )
  })

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
    <Flex direction="column" gap="2" data-cy="issues-page-core-comp">
      <SearchInput onSearchChange={setSearchTerm} />
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
          {filteredIssues.length > 0 ? (
            filteredIssues.map(({id, title, status, createdAt}) => (
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
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={columns.length}>No issues found</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </Flex>
  )
}

const columns: {label: string; value: keyof Issue; className?: string}[] = [
  {label: 'Issue', value: 'title'},
  {label: 'Status', value: 'status', className: 'hidden md:table-cell'},
  {label: 'Created', value: 'createdAt', className: 'hidden md:table-cell'},
]
