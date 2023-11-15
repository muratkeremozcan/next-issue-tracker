describe('Login', () => {
  it('should stubLogin', () => {
    cy.stubLogin()
    cy.getByCy('logout').should('be.visible')
  })

  it('should googleLogin', () => {
    cy.googleLogin()
    cy.getByCy('logout').should('be.visible')
  })
})
