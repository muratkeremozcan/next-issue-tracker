import {Select} from '@radix-ui/themes'

type Status = 'OPEN' | 'IN_PROGRESS' | 'DONE'

const statuses: {label: string; value?: Status}[] = [
  {label: 'All'},
  {label: 'Open', value: 'OPEN'},
  {label: 'In progress', value: 'IN_PROGRESS'},
  {label: 'Done', value: 'DONE'},
]

export default function IssueStatusFilter() {
  return (
    <Select.Root>
      <Select.Trigger
        placeholder="Filter by status..."
        data-cy="filter-by-status"
      />
      <Select.Content>
        {statuses.map(({value, label}) => (
          <Select.Item
            key={value}
            value={value || 'unassigned'}
            data-cy={`status-${value}`}
          >
            {label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}
