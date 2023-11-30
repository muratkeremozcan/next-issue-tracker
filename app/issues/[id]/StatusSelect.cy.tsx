import React from 'react'
import StatusSelect from './StatusSelect'
import {transformIssueData} from '@/cypress/support/utils'
import jsonData from '@/cypress/fixtures/issues.json'

const issues = transformIssueData(jsonData)
const issueIndex = 1
const issue = issues[issueIndex]

// TODO: need support for next/navigation (router) in cyct

describe.skip('<StatusSelect />', () => {
  it('should update the status of the issue', () => {
    cy.wrappedMount(<StatusSelect issue={issue} />)
    cy.getByCy('status-select').contains('OPEN')
    cy.getByCy('status-select').click()

    cy.intercept('PUT', `/api/issues/${issueIndex + 1}`, {statusCode: 200}).as(
      'updateStatus',
    )
    cy.getByCy(`status-DONE`).click()
    cy.wait('@updateStatus').its('request.body.status').should('eq', 'DONE')
  })
})
