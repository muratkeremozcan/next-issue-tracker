import {Card, Flex, Link, Text} from '@radix-ui/themes'
import type {Status} from './issues/types'

type IssueSummaryProps = {
  readonly open: number
  readonly inProgress: number
  readonly closed: number
}

export default function IssueSummary({
  open,
  inProgress,
  closed,
}: IssueSummaryProps) {
  const containers: {
    label: string
    value: number
    status: Status
  }[] = [
    {label: 'Open Issues', value: open, status: 'OPEN'},
    {label: 'In-progress Issues', value: inProgress, status: 'IN_PROGRESS'},
    {label: 'Closed Issues', value: closed, status: 'DONE'},
  ]

  return (
    <Flex gap="4" data-cy="issue-summary-component">
      {containers.map(({label, value, status}) => (
        <Card key={label} data-cy={`container-${status}`}>
          <Flex direction="column" gap="1">
            <Link
              className="text-sm font-medium"
              href={`/issues/list?status=${status}`}
            >
              {label}
            </Link>
            <Text size="5" className="font-bold" data-cy={`${label}-${value}`}>
              {value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  )
}
