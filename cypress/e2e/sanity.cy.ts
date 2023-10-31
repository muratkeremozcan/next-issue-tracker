it('should visit', () => {
  cy.visit('/')
  cy.contains('Get started by editing app/page.tsx')
})
