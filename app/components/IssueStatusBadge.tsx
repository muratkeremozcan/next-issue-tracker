'use client'

import {Badge} from '@radix-ui/themes'

type Status = 'OPEN' | 'IN_PROGRESS' | 'DONE'

const statusMap: Record<
  Status,
  {label: string; color: 'red' | 'violet' | 'green'}
> = {
  OPEN: {label: 'Open', color: 'red'},
  IN_PROGRESS: {label: 'In progress', color: 'violet'},
  DONE: {label: 'Done', color: 'green'},
}

type IssueStatusBadgeProps = {
  status: Status
}

export default function IssueStatusBadge({status}: IssueStatusBadgeProps) {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  )
}
