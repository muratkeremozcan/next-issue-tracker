import NavBar from './NavBar'
import {SessionProvider} from 'next-auth/react'

describe('<NavBar />', () => {
  it('should show the links and child', () => {
    cy.intercept(
      {
        method: 'GET',
        url: '**/api/auth/session',
      },
      {statusCode: 400},
    )
    cy.mount(
      <SessionProvider>
        <NavBar />
      </SessionProvider>,
    )

    cy.getByCy('auth-status-comp').should('not.exist')
    cy.getByCy('login').should('be.visible')
    cy.getByCy('nav-links-comp').should('be.visible')
  })
})
