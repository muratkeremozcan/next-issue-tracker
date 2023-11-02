import React from 'react'
import IssuesPage from './page'

describe('<IssuesPage />', () => {
  it('should new to new issue', () => {
    cy.mount(<IssuesPage />)
    cy.contains('button', 'New Issue').click()
    cy.location('pathname').should('equal', '/issues/new')
  })
})
