import IssuesPageCore from './pageIssuesPageCore'
import jsonData from '@/cypress/fixtures/issues.json'
import {transformIssueData} from '@/cypress/support/utils'

const issues = transformIssueData(jsonData)

describe('<IssuesPageCore />', () => {
  it('should list issues and their data', () => {
    cy.wrappedMount(<IssuesPageCore issues={issues} />)
    cy.getByCy('issue-actions-comp').should('be.visible')

    issues.forEach(issue => {
      cy.getByCy(`issue-title`)
        .contains(issue.title)
        .should('have.attr', 'href', `/issues/${issue.id}`)
      cy.getByCy(`issue-status`).contains(
        Cypress._.capitalize(issue.status).replace(/_/g, ' '),
      )
      // @ts-expect-error for testing
      cy.getByCy(`issue-createdAt`).contains(issue.createdAt?.toDateString())
    })
  })
})
