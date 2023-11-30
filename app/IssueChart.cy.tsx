import React from 'react'
import IssueChart from './IssueChart'

describe('<IssueChart />', () => {
  it('should render the chart', () => {
    cy.mount(<IssueChart open={1} inProgress={3} closed={4} />)
    cy.contains('tspan', 'Open').should('be.visible')
    cy.contains('tspan', 'In-progress').should('be.visible')
    cy.contains('tspan', 'Closed').should('be.visible')
    // testing the chart would be perfect for visual testing
  })
})
