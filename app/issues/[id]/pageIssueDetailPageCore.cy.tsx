import React from 'react'
import jsonData from '@/cypress/fixtures/issues.json'
import IssueDetailPageCore from './pageIssueDetailPageCore'
import {transformIssueData} from '@/cypress/support/utils'

const issues = transformIssueData(jsonData)
const issue = issues[2]

describe('<IssueDetailPageCore />', () => {
  it('should render the two children', () => {
    cy.mount(<IssueDetailPageCore issue={issue} />)
    cy.getByCy('issue-details-comp').should('be.visible')
    cy.getByCy('edit-issue-comp').should('be.visible')
  })
})
