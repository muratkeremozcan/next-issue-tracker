import React from 'react'
import EditIssueButton from './EditIssueButton'

describe('<EditIssueButton />', () => {
  it('should nav to the issue by id', () => {
    cy.mount(<EditIssueButton issueId={2} />)
    cy.getByCy('edit-issue-comp').click()
    cy.location('pathname').should('eq', '/issues/2/edit')
  })
})
