import React from 'react'
import IssueActions from './IssueActions'

describe('<IssueActions />', () => {
  it('renders', () => {
    cy.mount(<IssueActions />)
    cy.getByCy('new-issue').contains('New Issue')
  })
})
