/* eslint-disable cypress/unsafe-to-chain-command */
import '../support/commands/api-issue'
import {createRandomIssue} from '@support/utils'

describe('Delete an issue', () => {
  const issue = createRandomIssue()
  const {title} = issue
  let issueId: string

  beforeEach(() => {
    cy.createIssue(issue)
      .its('body.id')
      .then(id => {
        issueId = id
        cy.visit(`/issues/${id}`)
      })
  })

  it('should pass', () => {
    cy.getByCy('delete-issue-comp').click()
    cy.intercept('DELETE', `/api/issues/${issueId}`).as('delete-issue')
    cy.getByCy('delete-issue-confirm').click()
    cy.wait('@delete-issue').its('response.statusCode').should('eq', 200)

    cy.location('pathname').should('eq', '/issues/list')
    cy.contains(title).should('not.exist')
  })

  // this is better for a component test, but we have next.js & cyct related issues there
  it('should show error', () => {
    cy.getByCy('delete-issue-comp').click()
    cy.intercept('DELETE', `/api/issues/${issueId}`, {
      statusCode: 400,
      delay: 100,
    }).as('delete-issue')

    cy.getByCy('delete-issue-confirm').click()
    cy.getByCy('spinner').should('be.visible').and('have.length', 2)
    cy.getByCy('error-modal').should('be.visible')
    cy.getByCy('ok-button').click()
    cy.getByCy('error-modal').should('not.exist')

    cy.log('cleanup')
    cy.deleteIssue(issueId)
  })
})
