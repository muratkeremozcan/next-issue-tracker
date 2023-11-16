import '../support/commands/api'
import {createRandomIssue} from '@support/utils'

describe('Submitting an issue', () => {
  const {title, description} = createRandomIssue()
  const fillForm = () => {
    cy.intercept('GET', '**/cdn.jsdelivr.net/**').as('codemirror')
    cy.get('[placeholder="Title"]').type(title)
    cy.get('.CodeMirror').type(description)
  }

  beforeEach(() => {
    cy.googleLogin()
    cy.visit('/new')
  })

  // this is better in a component test: app/issues/new/pageNewIssuePage.cy.tsx
  // but at the moment we have an issue there with cyct and next13+
  // https://github.com/cypress-io/cypress/issues/28236
  it('should show validation errors on empty form, and error on submit with filled form', () => {
    cy.getByCy('submit-new-issue').click()

    cy.getByCy('error-message').should('have.length', 2).and('be.visible')

    fillForm()
    cy.getByCy('form-title-error').should('not.exist')
    cy.getByCy('form-description-error').should('not.exist')

    cy.intercept('POST', '/api/issues', {statusCode: 400}).as('submit-error')
    cy.getByCy('submit-new-issue').click()
    cy.wait('@submit-error')
    cy.getByCy('spinner').should('not.exist')
    cy.getByCy('submit-error').should('be.visible')
  })

  it('should submit a new issue', () => {
    fillForm()
    cy.intercept('POST', '/api/issues').as('submit-new-issue')
    cy.intercept('GET', '/issues*').as('get-all-issues')

    cy.getByCy('submit-new-issue').click()
    cy.wait('@submit-new-issue')
    cy.getByCy('spinner').should('be.visible')
    cy.wait('@get-all-issues')

    cy.location('pathname').should('eq', '/issues')

    cy.deleteIssueBy({title})
  })
})
