/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client'

import {Select} from '@radix-ui/themes'
import type {Status} from '../types'
import {useRouter, useSearchParams} from 'next/navigation'

const allStatusesValue = 'ALL_STATUSES' // Special value to represent 'All'

const statuses: {label: string; value?: Status | typeof allStatusesValue}[] = [
  {label: 'All', value: allStatusesValue},
  {label: 'Open', value: 'OPEN'},
  {label: 'In progress', value: 'IN_PROGRESS'},
  {label: 'Done', value: 'DONE'},
]

export default function IssueStatusFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleValueChange = (status: Status | typeof allStatusesValue) => {
    const params = new URLSearchParams()
    if (status) params.append('status', status)
    if (searchParams.get('orderBy'))
      params.append('orderBy', searchParams.get('orderBy')!)

    const query = params.size ? '?' + params.toString() : ''
    router.push('/issues/list' + query)
  }

  return (
    <Select.Root
      defaultValue={searchParams.get('status') || ''}
      onValueChange={handleValueChange}
    >
      <Select.Trigger
        placeholder="Filter by status..."
        data-cy="filter-by-status"
      />
      <Select.Content>
        {statuses.map(({label, value}) => (
          <Select.Item key={value} value={value || ''}>
            {label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}
