describe('navigation', () => {
  beforeEach(() => cy.visit('/'))
  it('should click nav to dashboard and issues', () => {
    cy.contains('Dashboard').click()
    cy.location('pathname').should('equal', '/dashboard')
  })

  it('should nav to an issue', () => {
    cy.contains('Issues').click()
    cy.location('pathname').should('equal', '/issues')

    cy.getByCy('issues-page-core-comp').should('be.visible')
    cy.getByCy('issue-title').should('have.length.gt', 0)

    cy.intercept('GET', '/issues/*').as('get-issues')
    cy.getByCyLike('issue-id').first().click()
    cy.wait('@get-issues')
    cy.getByCy('issue-detail-page-core-comp').should('be.visible')
  })
})
