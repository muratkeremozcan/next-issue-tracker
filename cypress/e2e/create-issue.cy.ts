import '../support/commands/api'
import {createRandomIssue} from '@support/utils'
it('should submit a new issue', () => {
  cy.visit('/issues/new')

  const {title, description} = createRandomIssue()
  cy.get('[placeholder="Title"]').type(title)
  cy.get('.CodeMirror').type(description)

  cy.intercept('POST', '/api/issues').as('submit-new-issue')
  cy.intercept('GET', '/issues*').as('get-all-issues')

  cy.getByCy('submit-new-issue').click()
  cy.wait('@submit-new-issue')
  cy.wait('@get-all-issues')

  cy.location('pathname').should('eq', '/issues')

  cy.deleteIssueBy({title})
})
