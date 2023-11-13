import React from 'react'
import jsonData from '@/cypress/fixtures/issues.json'
import IssueDetails from './IssueDetails'
import {transformIssueData} from '@/cypress/support/utils'

const issues = transformIssueData(jsonData)
const issue = issues[2]

describe('<IssueDetails />', () => {
  it('should render issue details', () => {
    cy.mount(<IssueDetails issue={issue} />)
    cy.contains(issue.title).should('be.visible')
    cy.contains(Cypress._.capitalize(issue.status)).should('be.visible')
    cy.contains(String(issue.createdAt?.toDateString())).should('be.visible')
  })
})
