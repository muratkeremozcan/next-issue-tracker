/* eslint-disable cypress/unsafe-to-chain-command */
import '../support/commands/api'
import {createRandomIssue} from '@support/utils'

describe('Edit an issue', () => {
  const issue = createRandomIssue()
  const {title, description} = issue

  it('passes', () => {
    cy.createIssue(issue)
      .its('body')
      .then(({id, title, description}) => {
        cy.visit(`/issues/${id}`)

        cy.contains(title).should('be.visible')
        cy.contains(description).should('be.visible')
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
    cy.location('pathname').should('eq', '/issues')

    cy.contains(editedTitle).should('be.visible').click()
    cy.contains(editedDescription).should('be.visible')

    cy.deleteIssueBy({title: editedTitle})
  })
})
