// put e2e only commands and plugins here
// better to import plugins where relevant, speeds up test warmup
// import '@testing-library/cypress/add-commands'

import './commands'
import '@bahmutov/cy-api'
import 'cypress-map'
import 'cypress-v10-preserve-cookie'

function parseCookieValue(
  setCookieHeader: string | string[],
  cookieName: string,
) {
  const cookieArray = Array.isArray(setCookieHeader)
    ? setCookieHeader
    : [setCookieHeader]

  const cookie = cookieArray.find(cookie => cookie?.startsWith(cookieName))
  return cookie ? cookie.split(';')[0].split('=')[1] : ''
}

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
      let interceptCsrfToken = ''
      let interceptCallBackUrl = ''

      // on visit, the cookie is cleared after the next-auth call
      // since we already have the cookie set, we can stub out the next-auth call
      cy.intercept('/api/auth/session', request => {
        request.reply(({headers}) => {
          const setCookieHeader = headers['set-cookie']

          interceptCsrfToken = parseCookieValue(
            setCookieHeader,
            'next-auth.csrf-token',
          )
          interceptCallBackUrl = parseCookieValue(
            setCookieHeader,
            'next-auth.callback-url',
          )

          // we get the values here
          console.log({interceptCsrfToken})
          console.log({interceptCallBackUrl})
        })
      }).as('next-auth-call')

      // the above intercept should be stubbed, because we used request.reply
      // however the real next-auth call goes through

      cy.visit('/')
      // cy.wait('@next-auth-call')

      cy.then(() => {
        // we also get the values here
        console.log({interceptCsrfToken})
        console.log({interceptCallBackUrl})

        // we set them
        cy.setCookie('next-auth.session-token', id_token)
        cy.setCookie('next-auth.csrf-token', interceptCsrfToken)
        cy.setCookie('next-auth.callback-url', interceptCallBackUrl)

        // at this point check the application > Cookies, the next-auth call does not get intercepted, and we see the overwritten values
      })
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
