'use client'

import {Select} from '@radix-ui/themes'
import type {Status} from '../types'
import {useRouter} from 'next/navigation'

const statuses: {label: string; value?: Status}[] = [
  {label: 'All'},
  {label: 'Open', value: 'OPEN'},
  {label: 'In progress', value: 'IN_PROGRESS'},
  {label: 'Done', value: 'DONE'},
  {label: 'Unassigned', value: 'UNASSIGNED'},
]

export default function IssueStatusFilter() {
  // const router = useRouter()

  // const handleValueChange = (status: Status | 'unassigned') => {
  //   const query = status !== 'unassigned' ? `?status=${status}` : ''
  //   router.push(`/issues/list${query}`)
  // }
  return (
    <Select.Root>
      {/* <Select.Root onValueChange={handleValueChange}> */}
      <Select.Trigger
        placeholder="Filter by status..."
        data-cy="filter-by-status"
      />
      <Select.Content>
        {statuses.map(({value, label}, index) => (
          <Select.Item
            key={value ? value : `UNASSIGNED-${index}`}
            value={value || 'UNASSIGNED'}
            data-cy={`status-${value}`}
          >
            {label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}
