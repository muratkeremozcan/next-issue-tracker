import '../support/commands/api-issue'
import {createRandomIssue} from '@support/utils'

describe('navigation', () => {
  const body = createRandomIssue()
  const {title} = body

  it('should click nav to dashboard and issues', () => {
    cy.visit('/')
    cy.contains('Dashboard').click()
    cy.location('pathname').should('equal', '/dashboard')
    cy.contains('Latest Issues')
  })

  it('should nav to an issue', () => {
    cy.createIssue(body)
    cy.visit('/')
    cy.contains('Issues').click()
    cy.location('pathname').should('equal', '/issues/list')

    cy.getByCy('issues-page-core-comp').should('be.visible')
    cy.getByCy('issue-title').should('have.length.gt', 0)

    cy.intercept('GET', '/issues/*').as('get-issues')
    cy.contains(title).click()
    cy.wait('@get-issues')
    cy.getByCy('issue-detail-page-core-comp').should('be.visible')

    cy.deleteIssueBy({title})
  })
})
