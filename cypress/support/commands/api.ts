// faker is large and slows down test startup
// don't put it in e2e.ts and cause non-faker e2e to be slow
import {createRandomIssue} from '@support/utils' // faker stuff...
import type {Issue} from '@/app/api/issues/schema'

Cypress.Commands.add(
  'createIssue',
  (body = createRandomIssue(), allowedToFail = false) => {
    cy.log('**createIssue**')
    return cy.api({
      method: 'POST',
      url: '/api/issues',
      body,
      retryOnStatusCodeFailure: !allowedToFail,
      failOnStatusCode: !allowedToFail,
    })
  },
)

Cypress.Commands.add('getIssue', (id: string, failOnStatusCode = false) => {
  cy.log('**getIssue**')
  return cy.api({
    method: 'GET',
    url: `/api/issues/${id}`,
    retryOnStatusCodeFailure: !failOnStatusCode,
    failOnStatusCode: !failOnStatusCode,
  })
})

Cypress.Commands.add('getIssues', (failOnStatusCode = false) => {
  cy.log('**getIssues**')
  return cy.api({
    method: 'GET',
    url: `/api/issues`,
    retryOnStatusCodeFailure: !failOnStatusCode,
    failOnStatusCode: !failOnStatusCode,
  })
})

Cypress.Commands.add('deleteIssue', (id: string, allowedToFail = false) => {
  cy.log('**deleteIssue**')
  return cy.api({
    method: 'DELETE',
    url: `/api/issues/${id}`,
    retryOnStatusCodeFailure: !allowedToFail,
    failOnStatusCode: !allowedToFail,
  })
})

Cypress.Commands.add(
  'updateIssue',
  (id: string, body: Partial<Issue>, allowedToFail = false) => {
    cy.log('**updateIssue**')
    return cy.api({
      method: 'PUT',
      url: `/api/issues/${id}`,
      body,
      retryOnStatusCodeFailure: !allowedToFail,
      failOnStatusCode: !allowedToFail,
    })
  },
)
export type IssueSelector =
  | Required<Pick<Issue, 'title'>>
  | Required<Pick<Issue, 'description'>>

const deleteIssueBy = (selector: IssueSelector) =>
  cy
    .getIssues()
    .its('body')
    .should('be.an', 'array')
    .findOne(selector)
    .its('id')
    .then(id => cy.deleteIssue(id))
Cypress.Commands.add('deleteIssueBy', deleteIssueBy)
