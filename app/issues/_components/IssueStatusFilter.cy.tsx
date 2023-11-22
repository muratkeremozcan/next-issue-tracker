import IssueStatusFilter from './IssueStatusFilter'

describe('<IssueStatusFilter />', () => {
  it('should list statuses', () => {
    cy.wrappedMount(<IssueStatusFilter />)
    cy.getByCy('filter-by-status').click()
    cy.getByCyLike('status-').should('have.length', 4)
  })
})
