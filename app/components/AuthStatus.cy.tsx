import AuthStatus from './AuthStatus'
import {SessionProvider} from 'next-auth/react'

describe('<AuthStatus />', () => {
  it('should show loading and Sign in', () => {
    cy.intercept(
      {
        method: 'GET',
        url: '**/api/auth/session',
      },
      {statusCode: 400},
    )
    cy.mount(
      <SessionProvider>
        <AuthStatus />
      </SessionProvider>,
    )

    cy.getByCy('login').should('be.visible')
  })

  it('should show user name when authenticated, and not show after sign out', () => {
    cy.intercept(
      {
        method: 'GET',
        url: '**/api/auth/session',
      },
      {fixture: 'auth-session.json', statusCode: 200},
    )
    cy.mount(
      <SessionProvider>
        <AuthStatus />
      </SessionProvider>,
    )

    cy.getByCy('login').should('not.exist')
  })
})
