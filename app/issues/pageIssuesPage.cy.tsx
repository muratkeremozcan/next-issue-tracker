import React from 'react'
import IssuesPage from './page'

describe('<IssuesPage />', () => {
  it('should new to new issue', () => {
    cy.mount(<IssuesPage />)
    cy.getByCy('new-issue').click()
    cy.location('pathname').should('equal', '/issues/new')
  })
})
