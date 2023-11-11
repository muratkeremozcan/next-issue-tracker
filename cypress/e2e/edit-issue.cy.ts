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

    const editedTitle = `edit-${title}`
    const editedDescription = `edit-${description}`
    cy.get('[placeholder="Title"]').clear().type(editedTitle)
    cy.get('.CodeMirror').type(editedDescription)
    cy.getByCy('submit-new-issue').click()
    cy.location('pathname').should('eq', '/issues')

    cy.reload()
    cy.contains(editedTitle).should('be.visible').click()
    cy.contains(editedDescription).should('be.visible')

    cy.deleteIssueBy({title: editedTitle})
  })
})
