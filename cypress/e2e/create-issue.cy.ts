import '../support/commands/api'
import {createRandomIssue} from '@support/utils'

describe('Submitting an issue', () => {
  const {title, description} = createRandomIssue()
  beforeEach(() => {
    cy.visit('/issues/new')
    cy.intercept('GET', '**/cdn.jsdelivr.net/**').as('codemirror')
    cy.get('[placeholder="Title"]').type(title)
    cy.get('.CodeMirror').type(description)
    cy.wait('@codemirror')
  })

  // this is better a component test app/issues/new/pageNewIssuePage.cy.tsx
  // but at the moment we have issues there with cyct and next13+
  it.only('should error', () => {
    cy.intercept('POST', '/api/issues', {statusCode: 400}).as('submit-error')
    cy.getByCy('submit-new-issue').click()
    cy.wait('@submit-error')
    cy.getByCy('submit-error').should('be.visible')
  })

  it('should submit a new issue', () => {
    cy.intercept('POST', '/api/issues').as('submit-new-issue')
    cy.intercept('GET', '/issues*').as('get-all-issues')

    cy.getByCy('submit-new-issue').click()
    cy.wait('@submit-new-issue')
    cy.wait('@get-all-issues')

    cy.location('pathname').should('eq', '/issues')

    cy.deleteIssueBy({title})
  })
})
