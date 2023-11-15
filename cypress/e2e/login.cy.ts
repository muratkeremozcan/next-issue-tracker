describe('Login', () => {
  it('should stubLogin', () => {
    cy.stubLogin()
    cy.getByCy('logout').should('be.visible')
  })

  it.only('should googleLogin', () => {
    cy.googleLogin()
    // TODO: make this work
  })
})
