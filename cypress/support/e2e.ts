// put e2e only commands and plugins here
// better to import plugins where relevant, speeds up test warmup
// import '@testing-library/cypress/add-commands'

import './commands'
import '@bahmutov/cy-api'
import 'cypress-map'
import 'cypress-v10-preserve-cookie'

Cypress.Commands.add('googleLogin', () => {
  cy.log('Logging in to Google')

  return cy
    .request({
      method: 'POST',
      url: 'https://www.googleapis.com/oauth2/v4/token',
      body: {
        grant_type: 'refresh_token',
        client_id: Cypress.env('GOOGLE_CLIENT_ID'),
        client_secret: Cypress.env('GOOGLE_CLIENT_SECRET'),
        refresh_token: Cypress.env('GOOGLE_REFRESH_TOKEN'),
      },
    })
    .its('body.id_token')
    .then(id_token => {
      cy.setCookie('next-auth.session-token', id_token)
      cy.preserveCookieOnce('next-auth.session-token')
      // on visit, the cookie is cleared after the next-auth call
      // since we already have the cookie set, we can stub out the next-auth call
      cy.intercept('/api/auth/session', {status: 200}).as('next-auth-stub')
      return cy.visit('/')
    })
})

Cypress.Commands.add('stubLogin', () => {
  cy.intercept('/api/auth/session', {fixture: 'auth-session.json'}).as(
    'session',
  )

  cy.setCookie(
    'next-auth.session-token',
    'a valid cookie from your browser session',
  )
  // cy.preserveCookieOnce('next-auth.session-token') // works without this, for now
  cy.visit('/')
  cy.wait('@session')
})
