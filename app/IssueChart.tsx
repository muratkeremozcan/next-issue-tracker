'use client'

import {Card} from '@radix-ui/themes'
import {ResponsiveContainer, BarChart, XAxis, YAxis, Bar} from 'recharts'

type IssueChartProps = {
  readonly open: number
  readonly inProgress: number
  readonly closed: number
}

export default function IssueChart({
  open,
  inProgress,
  closed,
}: IssueChartProps) {
  const data = [
    {label: 'Open', value: open},
    {label: 'In-progress', value: inProgress},
    {label: 'Closed', value: closed},
  ]

  return (
    <Card data-cy="issue-cart-comp">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis tickFormatter={value => Math.round(value).toString()} />
          <Bar dataKey="value" barSize={60} style={{fill: 'var(--accent-9)'}} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
