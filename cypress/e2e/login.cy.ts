describe('Login', () => {
  it('should stubLogin', () => {
    cy.stubLogin()
    cy.getByCy('avatar').should('be.visible')
  })

  it('should googleLogin', () => {
    cy.googleLogin()
    cy.get('.rt-AvatarFallback').should('be.visible')
  })
})
