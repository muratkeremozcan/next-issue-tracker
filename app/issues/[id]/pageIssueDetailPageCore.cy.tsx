import React from 'react'
import jsonData from '@/cypress/fixtures/issues.json'
import IssueDetailPageCore from './pageIssueDetailPageCore'
import {transformIssueData} from '@/cypress/support/utils'

const issues = transformIssueData(jsonData)
const issue = issues[2]

describe('<IssueDetailPageCore />', () => {
  it('renders', () => {
    cy.mount(<IssueDetailPageCore issue={issue} />)
    cy.contains(issue.title).should('be.visible')
    cy.contains(Cypress._.capitalize(issue.status)).should('be.visible')
    cy.contains(String(issue.createdAt?.toDateString())).should('be.visible')
  })
})
