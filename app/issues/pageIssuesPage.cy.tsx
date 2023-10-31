import React from 'react'
import IssuesPage from './page'

describe('<IssuesPage />', () => {
  it('renders', () => {
    cy.mount(<IssuesPage />)
    cy.contains('IssuesPage')
  })
})
