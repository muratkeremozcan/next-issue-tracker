/* eslint-disable cypress/unsafe-to-chain-command */
import '../support/commands/api-issue'
import {createRandomIssue} from '@support/utils'
import {statusOptions} from '@/app/api/issues/schema'

const updateStatus = (newStatus: (typeof statusOptions)[number]) => {
  cy.getByCy('status-select').click()
  cy.intercept('PUT', '/api/issues/*').as(`updateStatus-to-${newStatus}`)
  cy.getByCy(`status-${newStatus}`).click()
  cy.wait(`@updateStatus-to-${newStatus}`)
    .its('request.body.status')
    .should('eq', newStatus)
}

describe('Edit an issue', () => {
  const issue = createRandomIssue()
  const {title, description} = issue

  it('should change status, and the issue, and retain that status', () => {
    cy.cleanUpIssues()
    cy.createIssue(issue)
      .its('body')
      .then(({id, title, description, status}) => {
        cy.visit(`/issues/${id}`)

        cy.contains(title).should('be.visible')
        cy.contains(description).should('be.visible')
        cy.getByCy('status-select').contains(status)

        updateStatus('IN_PROGRESS')
        cy.contains('In progress').should('be.visible')

        cy.getByCy('edit-issue-comp').click()
        cy.location('pathname').should('eq', `/issues/${id}/edit`)
      })

    const editedTitle = `edited-${title}`
    const editedDescription = `edited-${description}`
    cy.get('[placeholder="Title"]').clear().type(editedTitle)
    // markdown editor is different than text editor, clear() doesn't work well
    cy.get('.CodeMirror')
      .click()
      .type('{selectAll}{backspace}')
      .type(editedDescription)
    cy.getByCy('submit-new-issue').click()
    cy.location('pathname').should('eq', '/issues/list')

    cy.contains(editedTitle).should('be.visible').click()
    cy.contains(editedDescription).should('be.visible')
    cy.contains('In progress').should('be.visible')
    cy.getByCy('status-select').contains('IN_PROGRESS')

    cy.log('**set it to Done**')
    updateStatus('DONE')
    cy.contains('Done').should('be.visible')

    cy.deleteIssueBy({title: editedTitle})
  })
})
