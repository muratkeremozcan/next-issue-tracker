import React from 'react'
import IssueSummary from './IssueSummary'

describe('<IssueSummary />', () => {
  it('should display the number of issues per status', () => {
    cy.mount(<IssueSummary open={1} inProgress={3} closed={4} />)
    cy.getByCy('Open Issues-1')
    cy.getByCy('In-progress Issues-3')
    cy.getByCy('Closed Issues-4')
  })
})
