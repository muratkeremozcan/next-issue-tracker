/* eslint-disable cypress/unsafe-to-chain-command */
import '../support/commands/api-issue'
import {createRandomIssue} from '@support/utils'
import spok from 'cy-spok'

describe('Edit an issue', () => {
  let issueId: string | number | undefined
  let userId: string
  const issue = createRandomIssue()
  const {title, description} = issue
  const userIndex = 0

  beforeEach(() => {
    cy.intercept('GET', 'api/users').as('getUsers')

    cy.createIssue(issue)
      .its('body')
      .then(({id, title, description}) => {
        cy.visit(`/issues/${id}`)

        cy.contains(title).should('be.visible')
        cy.contains(description).should('be.visible')
        cy.location('pathname').should('eq', `/issues/${id}`)

        issueId = id
      })

    cy.wait('@getUsers')
      .its('response.body')
      .should('have.length.gt', 0)
      .its(userIndex)
      .its('id')
      .then(id => {
        userId = id
      })
  })

  afterEach(() => {
    cy.deleteIssueBy({title})
  })

  it('passes', () => {
    cy.intercept('PUT', `/api/issues/${issueId}`).as('assignIssue')
    cy.getByCy('assign').click()
    cy.getByCyLike('user-').should('have.length.gt', 0).last().click()

    cy.wait('@assignIssue')
      .its('response')
      .should(spok({statusCode: 200}))
      .its('body')
      .should(
        spok({
          assignedToUserId: userId,
          description,
          id: issueId,
          title,
          updatedAt: spok.string,
          createdAt: spok.string,
        }),
      )
  })
})
