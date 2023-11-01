import {faker} from '@faker-js/faker'
import type {Issue} from '@/app/api/issues/schema'

export const createRandomIssue = (): Issue => ({
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(),
  status: 'OPEN',
})
