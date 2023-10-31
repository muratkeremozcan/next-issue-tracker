it('should visit', () => {
  cy.visit('/')
  cy.contains('Hello')

  cy.contains('Dashboard').click()
  cy.location('pathname').should('equal', '/dashboard')

  cy.contains('Issues').click()
  cy.location('pathname').should('equal', '/issues')
})
