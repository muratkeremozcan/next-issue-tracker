import LoadingIssuesPage from './loading'

describe('<LoadingIssuesPage />', () => {
  it('renders', () => {
    cy.wrappedMount(<LoadingIssuesPage />)
    cy.getByCy('issue-actions-comp').should('be.visible')
    cy.contains('Issue')
    cy.contains('Status')
    cy.contains('Created')
  })
})
