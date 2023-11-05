import React from 'react'
import IssuesPageCore from './pageCore'
import jsonData from '../../cypress/fixtures/issues.json'
import type {Issue} from '../api/issues/schema'

// A function to map the JSON data to the Issue type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformIssueData(rawData: any[]): Issue[] {
  return rawData.map(data => ({
    id: data.id,
    title: data.title,
    description: data.description,
    status: data.status,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  }))
}

const issues = transformIssueData(jsonData)

describe('<IssuesPageCore />', () => {
  it('should list issues and their data', () => {
    cy.mount(<IssuesPageCore issues={issues} />)
    cy.getByCy('new-issue').should('be.visible')
    cy.contains('Status')
    cy.contains('Created')

    issues.forEach(issue => {
      cy.getByCy(`issue-title`).contains(issue.title)
      cy.getByCy(`issue-status`).contains(issue.status)
      // @ts-expect-error for testing
      cy.getByCy(`issue-createdAt`).contains(issue.createdAt?.toDateString())
    })
  })
})
