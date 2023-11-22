describe('Login', () => {
  it('should stubLogin', () => {
    cy.stubLogin()
    cy.get('.rt-AvatarFallback').should('be.visible')
  })

  it.only('should googleLogin', () => {
    cy.googleLogin()
    cy.get('.rt-AvatarFallback').should('be.visible')
  })
})
