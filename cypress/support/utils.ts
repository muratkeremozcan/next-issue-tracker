import {faker} from '@faker-js/faker'
import type {Issue} from '@/app/api/issues/schema'

export const createRandomIssue = (): Issue => ({
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(2),
  status: 'OPEN',
})

// A function to map the JSON data to the Issue type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function transformIssueData(rawData: any[]): Issue[] {
  return rawData.map(
    ({id, title, description, status, createdAt, updatedAt}) => ({
      id,
      title,
      description,
      status: status,
      createdAt: new Date(createdAt),
      updatedAt: new Date(updatedAt),
    }),
  )
}
