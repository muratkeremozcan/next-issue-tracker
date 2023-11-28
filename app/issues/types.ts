import type {Issue} from '@/app/api/issues/schema'

export type Status = 'OPEN' | 'IN_PROGRESS' | 'DONE'

export type IssueQuery = {
  status: Status
  orderBy: keyof Issue
  orderDirection: 'asc' | 'desc'
  page: string
}
