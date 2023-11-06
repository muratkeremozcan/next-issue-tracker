import LoadingIssuesPage from './loading'

describe('<LoadingIssuesPage />', () => {
  it('renders', () => {
    cy.mount(<LoadingIssuesPage />)
    cy.getByCy('issue-actions-comp').should('be.visible')
    cy.contains('Issue')
    cy.contains('Status')
    cy.contains('Created')
  })
})
