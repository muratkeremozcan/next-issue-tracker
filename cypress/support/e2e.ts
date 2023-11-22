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

      // request.reply() with fn: the request is not sent to the server.
      // Instead, the function you provide is used to dynamically generate a response.
      // This function doesn't receive a response from the server (since there's no server interaction),
      // but you can use it to construct a custom response.

      // request.continue() with fn: the request is sent to the server.
      // The function you provide is called with the actual server response.
      // You can then modify this response before it's passed back to your application.

      cy.intercept('/api/auth/session', request => {
        request.reply(response => {
          const setCookieHeader = response.headers['set-cookie']
          response.headers['set-cookie'] = []

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

          // remove the set cookie header from the response
          response.headers['set-cookie'] = []
        })
      }).as('next-auth-call')

      // the above intercept should be stubbed, because we used request.reply
      // however the real next-auth call goes through

      cy.visit('/')
      cy.wait('@next-auth-call')

      cy.then(() => {
        // we also get the values here
        console.log({interceptCsrfToken})
        console.log({interceptCallBackUrl})

        // we set the additional cookie
        cy.setCookie('next-auth.session-token', id_token)

        // at this point check the application > Cookies,
        // we have everything, but we are not "Logged in", we still see the Login button
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
