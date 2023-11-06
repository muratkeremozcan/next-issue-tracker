import React from 'react'
import IssueStatusBadge from './IssueStatusBadge'

describe('<IssueStatusBadge />', () => {
  it('renders', () => {
    cy.mount(<IssueStatusBadge status="OPEN" />)
    cy.contains('[data-accent-color="red"]', 'Open')

    cy.mount(<IssueStatusBadge status="IN_PROGRESS" />)
    cy.contains('[data-accent-color="violet"]', 'In progress')

    cy.mount(<IssueStatusBadge status="DONE" />)
    cy.contains('[data-accent-color="green"]', 'Done')
  })
})
